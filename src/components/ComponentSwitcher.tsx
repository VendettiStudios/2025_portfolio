"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import Contact from "../app/Contact/Contact";

export default function ComponentSwitcher() {
  const [activeComponent, setActiveComponent] = useState<"hero" | "projects" | "contact">("hero");

  // Refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const refs = {
      hero: heroRef.current,
      projects: projectsRef.current,
      contact: contactRef.current,
    };

    const fadeOut = Object.values(refs).filter((ref) => ref && ref !== refs[activeComponent]);
    const fadeIn = refs[activeComponent];

    if (fadeIn && fadeOut.length) {
      gsap
        .timeline()
        .to(fadeOut, { opacity: 0, duration: 0.4, ease: "power2.out", pointerEvents: "none" })
        .set(fadeOut, { display: "none" })
        .set(fadeIn, { display: "flex", opacity: 0 })
        .to(fadeIn, { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" });
    }
  }, [activeComponent]);

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* 🔹 Hero Section */}
      <div ref={heroRef} style={{ position: "absolute", width: "100%", height: "100%", display: activeComponent === "hero" ? "flex" : "none" }}>
        <Hero onSwitch={() => setActiveComponent("projects")} />
      </div>

      {/* 🔹 Projects Section */}
      <div ref={projectsRef} style={{ position: "absolute", width: "100%", height: "100%", display: activeComponent === "projects" ? "flex" : "none" }}>
        <Projects onSwitch={() => setActiveComponent("contact")} />
      </div>

      {/* 🔹 Contact Section */}
      <div ref={contactRef} style={{ position: "absolute", width: "100%", height: "100%", display: activeComponent === "contact" ? "flex" : "none" }}>
        <Contact onSwitch={() => setActiveComponent("hero")} />
      </div>
    </main>
  );
}