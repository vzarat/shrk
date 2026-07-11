"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Client-side execution only
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isDesktop && !prefersReducedMotion) {
      setIsEnabled(true);
    }
  }, []);

  useGSAP(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Ripples state
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      opacity: number;
    }
    const ripples: Ripple[] = [];

    // Mouse positions
    const realMouse = { x: 0, y: 0 };
    const smoothedMouse = { x: 0, y: 0 };

    // GSAP quickTo for smoothed inertia
    const quickX = gsap.quickTo(smoothedMouse, "x", { duration: 0.35, ease: "power2.out" });
    const quickY = gsap.quickTo(smoothedMouse, "y", { duration: 0.35, ease: "power2.out" });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      realMouse.x = e.clientX;
      realMouse.y = e.clientY;
      quickX(e.clientX);
      quickY(e.clientY);
      hasMoved = true;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Dynamic wave generation timer
    let lastX = 0;
    let lastY = 0;

    const interval = setInterval(() => {
      if (!hasMoved) return;

      const dist = Math.hypot(smoothedMouse.x - lastX, smoothedMouse.y - lastY);
      
      // Generate ripple if the smoothed cursor is moving
      if (dist > 1.5 && ripples.length < 50) {
        const baseRadius = gsap.utils.random(4, 7);
        const ripple = {
          x: smoothedMouse.x,
          y: smoothedMouse.y,
          radius: baseRadius,
          opacity: 1,
        };

        ripples.push(ripple);

        // Animate the ripple ring scaling up and fading out
        gsap.to(ripple, {
          radius: baseRadius * gsap.utils.random(2.0, 2.8),
          opacity: 0,
          duration: gsap.utils.random(0.7, 1.1),
          ease: "power2.out",
          onComplete: () => {
            const index = ripples.indexOf(ripple);
            if (index > -1) {
              ripples.splice(index, 1);
            }
          },
        });

        lastX = smoothedMouse.x;
        lastY = smoothedMouse.y;
      }
    }, 45);

    // Canvas drawing loop linked to GSAP Ticker
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.forEach((r) => {
        // Draw the main expanding ripple line (concentric water wave)
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 49, 154, ${r.opacity * 0.35})`; // Brand blue: #00319A
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Draw a tiny solid center droplet that fades away
        ctx.beginPath();
        ctx.arc(r.x, r.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 49, 154, ${r.opacity * 0.55})`;
        ctx.fill();
      });
    };

    gsap.ticker.add(tick);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(interval);
      gsap.ticker.remove(tick);
    };
  }, { dependencies: [isEnabled] });

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
