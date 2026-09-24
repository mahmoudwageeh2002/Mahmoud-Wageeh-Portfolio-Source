"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function animateFrames(duration: number, draw: (progress: number) => void, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    let frame = 0;
    let start: number | undefined;
    const cancel = () => {
      cancelAnimationFrame(frame);
      reject(new Error("Navigation animation cancelled"));
    };
    if (signal.aborted) return cancel();
    signal.addEventListener("abort", cancel, { once: true });
    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      draw(progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else {
        signal.removeEventListener("abort", cancel);
        resolve();
      }
    };
    frame = requestAnimationFrame(tick);
  });
}

// Rounded, uneven edges give the wipe the flowing ink shape of the reference.
function inkShape(x: number, y: number, radius: number, phase: number) {
  const points = Array.from({ length: 120 }, (_, index) => {
    const angle = (index / 120) * Math.PI * 2;
    const ripple = 1 + 0.075 * Math.sin(angle * 3 + phase) + 0.04 * Math.cos(angle * 5 - phase);
    return `${x + Math.cos(angle) * radius * ripple},${y + Math.sin(angle) * radius * ripple}`;
  });
  return `M${points.join(" L")} Z`;
}

export function useNavigationTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<SVGSVGElement>(null);
  const inkRef = useRef<SVGPathElement>(null);
  const swirlRef = useRef<SVGPathElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const pendingRoute = useRef<{ href: string; ready: () => void } | null>(null);

  useEffect(() => {
    if (pendingRoute.current?.href === pathname) pendingRoute.current.ready();
  }, [pathname]);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const runTransition = async (href: string) => {
    const overlay = overlayRef.current;
    const ink = inkRef.current;
    const swirl = swirlRef.current;
    if (!overlay || !ink || !swirl) {
      router.push(href);
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    document.documentElement.dataset.navigationTransition = "active";
    overlay.style.visibility = "visible";
    let navigationStarted = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const drawInk = (progress: number, opening: boolean) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = width / 2;
      const y = height / 2;
      const radius = Math.hypot(x, y) * 1.18;
      overlay.setAttribute("viewBox", `0 0 ${width} ${height}`);
      const outer = `M0,0 H${width} V${height} H0 Z`;
      if (opening) {
        const ease = 1 - Math.pow(1 - progress, 3);
        ink.setAttribute("d", `${outer} ${inkShape(x, y, radius * ease, progress * 2.4)}`);
        swirl.style.opacity = "0";
      } else {
        const growth = Math.max(0, (progress - 0.2) / 0.8);
        const ease = growth * growth * (3 - 2 * growth);
        ink.setAttribute("d", inkShape(x, y, radius * ease, progress * 3));
        const size = Math.min(width, height) * 0.075;
        swirl.setAttribute("transform", `translate(${x} ${y}) rotate(${progress * 160}) scale(${size / 50})`);
        swirl.style.strokeDashoffset = String(1 - Math.min(progress / 0.32, 1));
        swirl.style.opacity = String(Math.min(progress / 0.1, 1));
      }
    };

    try {
      drawInk(0, false);
      await animateFrames(560, progress => drawInk(progress, false), controller.signal);

      // Start navigation under the cover and wait for the new route to commit.
      await new Promise<void>((resolve, reject) => {
        const abort = () => reject(new Error("Navigation cancelled"));
        const ready = () => {
          clearTimeout(timeout);
          controller.signal.removeEventListener("abort", abort);
          resolve();
        };
        pendingRoute.current = { href, ready };
        controller.signal.addEventListener("abort", abort, { once: true });
        timeout = setTimeout(() => {
          controller.signal.removeEventListener("abort", abort);
          reject(new Error("Navigation timed out"));
        }, 8000);
        navigationStarted = true;
        router.push(href);
      });

      await animateFrames(680, progress => drawInk(progress, true), controller.signal);
    } catch {
      if (!controller.signal.aborted && !navigationStarted) router.push(href);
    } finally {
      clearTimeout(timeout);
      pendingRoute.current = null;
      controllerRef.current = null;
      overlay.style.visibility = "hidden";
      ink.setAttribute("d", "");
      delete document.documentElement.dataset.navigationTransition;
    }
  };

  const navigate = (event: { preventDefault: () => void }, href: string) => {
    if (href === pathname || controllerRef.current || document.documentElement.dataset.themeTransition) {
      event.preventDefault();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    void runTransition(href);
  };

  const overlay = (
    <svg ref={overlayRef} className="navigation-transition" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path ref={inkRef} fill="currentColor" fillRule="evenodd" />
      <path
        ref={swirlRef}
        d="M 26 -35 C -8 -48 -43 -17 -30 15 C -18 45 25 32 20 5 C 16 -17 -9 -9 -5 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
    </svg>
  );

  return { navigate, overlay };
}
