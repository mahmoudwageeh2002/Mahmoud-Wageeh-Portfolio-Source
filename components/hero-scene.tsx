"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasRatio > imageRatio) {
    drawHeight = width / imageRatio;
    offsetY = (height - drawHeight) / 2;
  } else {
    drawWidth = height * imageRatio;
    offsetX = (width - drawWidth) / 2;
  }

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function HeroScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    setReady(false);

    const context = canvas.getContext("2d", { alpha: false });
    const maskCanvas = document.createElement("canvas");
    const maskContext = maskCanvas.getContext("2d");
    const revealCanvas = document.createElement("canvas");
    const revealContext = revealCanvas.getContext("2d");
    if (!context || !maskContext || !revealContext) return;

    const isDark = resolvedTheme === "dark";
    const frontImage = new Image();
    const backImage = new Image();
    frontImage.src = isDark
      ? "/images/portfolio/hero-night-sketch.webp"
      : "/images/portfolio/hero-day-sketch.webp";
    backImage.src = isDark
      ? "/images/portfolio/hero-night.webp"
      : "/images/portfolio/hero-day.webp";

    let width = 1;
    let height = 1;
    let dpr = 1;
    let loadedImages = 0;
    let animationFrame = 0;
    let disposed = false;
    let lastPoint: Point | null = null;
    let targetPoint: Point | null = null;
    let brushStrength = 1;
    let pointerIsDown = false;
    let distanceToNextCloud = 0;
    let lastFrameTime = 0;

    const cloudRadius = () => Math.max(48, Math.min(88, Math.min(width, height) * 0.085));
    const nextCloudSpacing = () => cloudRadius() * (0.18 + Math.random() * 0.1);

    const syncCanvasSize = () => {
      const rect = root.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;

      for (const target of [canvas, maskCanvas, revealCanvas]) {
        target.width = Math.round(width * dpr);
        target.height = Math.round(height * dpr);
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      maskContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      revealContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastPoint = null;
      targetPoint = null;
    };

    const addCloudDab = (point: Point, strength = 1) => {
      const radius = cloudRadius() * strength * (0.9 + Math.random() * 0.2);
      const lobes = 6 + Math.floor(Math.random() * 4);
      maskContext.save();
      maskContext.globalCompositeOperation = "source-over";
      maskContext.globalAlpha = 0.32;
      maskContext.translate(point.x, point.y);
      maskContext.rotate(Math.random() * Math.PI * 2);
      maskContext.scale(1.1 + Math.random() * 0.35, 0.75 + Math.random() * 0.25);

      const puff = (x: number, y: number, puffRadius: number) => {
        const gradient = maskContext.createRadialGradient(x, y, 0, x, y, puffRadius);
        gradient.addColorStop(0, "rgba(255,255,255,0.96)");
        gradient.addColorStop(0.35, "rgba(255,255,255,0.78)");
        gradient.addColorStop(0.7, "rgba(255,255,255,0.3)");
        gradient.addColorStop(0.9, "rgba(255,255,255,0.06)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        maskContext.fillStyle = gradient;
        maskContext.beginPath();
        maskContext.arc(x, y, puffRadius, 0, Math.PI * 2);
        maskContext.fill();
      };

      // A connected center and uneven overlapping lobes form a soft cloud silhouette.
      puff(0, 0, radius * 0.58);
      for (let index = 0; index < lobes; index += 1) {
        const angle = ((index + Math.random() * 0.5) / lobes) * Math.PI * 2;
        const distance = radius * (0.4 + Math.random() * 0.26);
        const puffRadius = radius * (0.32 + Math.random() * 0.27);
        puff(Math.cos(angle) * distance, Math.sin(angle) * distance, puffRadius);
      }

      maskContext.restore();
    };

    const paintStroke = (from: Point, to: Point, strength = 1) => {
      const distance = Math.hypot(to.x - from.x, to.y - from.y);
      if (distance === 0) return;
      // Closely spaced translucent clouds blend into a continuous, soft trail.
      let travelled = distanceToNextCloud;
      for (; travelled <= distance; travelled += nextCloudSpacing()) {
        const progress = travelled / distance;
        addCloudDab(
          {
            x: from.x + (to.x - from.x) * progress,
            y: from.y + (to.y - from.y) * progress,
          },
          strength,
        );
      }
      distanceToNextCloud = travelled - distance;
    };

    const pointFromEvent = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return null;
      }
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && !pointerIsDown) return;
      targetPoint = pointFromEvent(event);
      brushStrength = event.pointerType === "mouse" ? 1 : 1.12;
      if (!targetPoint) {
        lastPoint = null;
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerIsDown = true;
      targetPoint = pointFromEvent(event);
      brushStrength = event.pointerType === "mouse" ? 1 : 1.16;
      if (!targetPoint) lastPoint = null;
    };

    const handlePointerUp = () => {
      pointerIsDown = false;
      lastPoint = null;
      targetPoint = null;
    };

    const render = (now: number) => {
      if (disposed) return;
      syncCanvasSize();
      const elapsed = lastFrameTime ? now - lastFrameTime : 1000 / 60;
      lastFrameTime = now;

      if (loadedImages === 2) {
        maskContext.save();
        maskContext.globalCompositeOperation = "destination-out";
        maskContext.fillStyle = `rgba(0,0,0,${1 - Math.exp(-elapsed / 1150)})`;
        maskContext.fillRect(0, 0, width, height);
        maskContext.restore();

        // Follow the pointer on animation frames with the same easing at any refresh rate.
        if (targetPoint) {
          if (!lastPoint) {
            lastPoint = { ...targetPoint };
            addCloudDab(lastPoint, brushStrength);
            distanceToNextCloud = nextCloudSpacing();
          } else {
            const distance = Math.hypot(targetPoint.x - lastPoint.x, targetPoint.y - lastPoint.y);
            if (distance > 0.1) {
              const ease = 1 - Math.exp(-elapsed / 42);
              const nextPoint = {
                x: lastPoint.x + (targetPoint.x - lastPoint.x) * ease,
                y: lastPoint.y + (targetPoint.y - lastPoint.y) * ease,
              };
              paintStroke(lastPoint, nextPoint, brushStrength);
              lastPoint = nextPoint;
            }
          }
        }

        context.clearRect(0, 0, width, height);
        drawCover(context, frontImage, width, height);

        revealContext.clearRect(0, 0, width, height);
        revealContext.globalCompositeOperation = "source-over";
        drawCover(revealContext, backImage, width, height);
        revealContext.globalCompositeOperation = "destination-in";
        revealContext.drawImage(maskCanvas, 0, 0, width, height);
        revealContext.globalCompositeOperation = "source-over";
        context.drawImage(revealCanvas, 0, 0, width, height);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const markImageLoaded = () => {
      loadedImages += 1;
      if (loadedImages === 2 && !disposed) setReady(true);
    };
    frontImage.addEventListener("load", markImageLoaded);
    backImage.addEventListener("load", markImageLoaded);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("blur", handlePointerUp);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      frontImage.removeEventListener("load", markImageLoaded);
      backImage.removeEventListener("load", markImageLoaded);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", handlePointerUp);
    };
  }, [resolvedTheme]);

  return (
    <div ref={rootRef} className="hero-scene" aria-hidden="true">
      <div className="hero-scene-static" />
      <canvas ref={canvasRef} className={`hero-scene-canvas${ready ? " is-ready" : ""}`} />
    </div>
  );
}
