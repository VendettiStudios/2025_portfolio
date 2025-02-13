"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function HeroAnimation() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      requestAnimationFrame(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          "[data-hero-title]",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" }
        )
          .fromTo(
            "[data-hero-subtitle]",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" },
            "-=0.8"
          )
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
            "-=0.6"
          );
      });
    });

    return () => ctx.revert(); // ✅ Clean up GSAP animations
  }, []);

  return null;
}