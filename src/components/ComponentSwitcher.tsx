"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";

export default function ComponentSwitcher() {
  const [activeComponent, setActiveComponent] = useState<"hero" | "projects">("hero");
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false); // Prevent animations on first render

  // **Ensure state persists across reloads**
  useEffect(() => {
    const savedComponent = localStorage.getItem("activeComponent");
    if (savedComponent === "projects" || savedComponent === "hero") {
      setActiveComponent(savedComponent);
    }
  }, []);

  // **Handle smooth fade transition between components**
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    localStorage.setItem("activeComponent", activeComponent); // Save state for reload

    const fadeOut = activeComponent === "hero" ? projectsRef.current : heroRef.current;
    const fadeIn = activeComponent === "hero" ? heroRef.current : projectsRef.current;

    if (fadeOut && fadeIn) {
      gsap.timeline()
        .to(fadeOut, { opacity: 0, duration: 0.5, ease: "power2.out" })
        .set(fadeOut, { display: "none" })
        .set(fadeIn, { display: "block", opacity: 0 })
        .to(fadeIn, { opacity: 1, duration: 0.5, ease: "power2.out" });
    }
  }, [activeComponent]);

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div
        ref={heroRef}
        style={{ 
          position: "absolute", 
          width: "100%", 
          height: "100%", 
          display: activeComponent === "hero" ? "block" : "none",
        }}
      >
        <Hero onSwitch={() => setActiveComponent("projects")} />
      </div>
      <div
        ref={projectsRef}
        style={{ 
          position: "absolute", 
          width: "100%", 
          height: "100%", 
          display: activeComponent === "projects" ? "block" : "none",
        }}
      >
        <Projects onSwitch={() => setActiveComponent("hero")} />
      </div>
    </main>
  );
}