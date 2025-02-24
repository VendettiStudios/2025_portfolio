"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

export default function HeroClient() {
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 4;
        const y = (clientY / window.innerHeight - 0.5) * 4;

        gsap.to(glowRef.current, {
          x: x * 1.2,
          y: y * 1.2,
          duration: 1.2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <>
      <div ref={glowRef} className={styles.heroGlow}></div>
      {/* <div className={styles.heroLightSweep}></div> */}
    </>
  );
}