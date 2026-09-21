"use client";

import Link from "next/link";
import { BriefcaseBusiness, FolderKanban, Home, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { flushSync } from "react-dom";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/experience", label: "Experience", icon: BriefcaseBusiness },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/playground", label: "Playground", icon: Sparkles },
];

export function BottomDock() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const themeTransitionRunning = useRef(false);

  const toggleTheme = async () => {
    if (themeTransitionRunning.current) return;
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme);
      return;
    }

    themeTransitionRunning.current = true;
    const root = document.documentElement;
    let transition: ViewTransition | undefined;

    try {
      // Decode the incoming artwork before the browser captures the new theme.
      if (document.querySelector(".hero-scene")) {
        const artwork = new Image();
        artwork.src = `/images/portfolio/hero-${nextTheme === "dark" ? "night" : "day"}-sketch.webp`;
        await artwork.decode().catch(() => undefined);
      }

      // Match the left-center origin in the reference recording.
      const x = window.innerWidth * 0.28;
      const y = window.innerHeight * 0.5;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      transition = document.startViewTransition(() => {
        root.dataset.themeTransition = "active";
        flushSync(() => setTheme(nextTheme));
      });
      // Handle a skipped transition without leaving an unhandled rejection.
      const finished = transition.finished.catch(() => undefined);
      await transition.ready;
      const reveal = root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 950,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          fill: "both",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      await reveal.finished;
      await finished;
    } catch {
      // Theme switching still works if the browser cannot animate the snapshots.
      transition?.skipTransition();
      await transition?.updateCallbackDone.catch(() => undefined);
      setTheme(nextTheme);
    } finally {
      delete root.dataset.themeTransition;
      themeTransitionRunning.current = false;
    }
  };

  return (
    <div className="dock-wrap">
      <nav className="dock" aria-label="Primary navigation">
        {links.map(({ href, label, icon: Icon }) => (
          <Link className="dock-link" data-active={pathname === href} href={href} key={href} aria-label={label} title={label}>
            <Icon aria-hidden="true" />
          </Link>
        ))}
        <span className="dock-divider" aria-hidden="true" />
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle color theme" title="Toggle color theme">
          <Sun className="theme-icon-sun" aria-hidden="true" />
          <Moon className="theme-icon-moon" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
