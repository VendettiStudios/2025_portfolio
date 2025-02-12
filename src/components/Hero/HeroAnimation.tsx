"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function HeroAnimation() {
  useEffect(() => {
    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        "[data-hero-title]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          "[data-hero-subtitle]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    });
  }, []);

  return null;
}