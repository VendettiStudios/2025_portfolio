"use client";

import { useState } from "react";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import Contact from "./Contact/Contact";
import styles from "./page.module.css"; // Handles visibility transitions

export default function Page() {
  const [activeComponent, setActiveComponent] = useState<"home" | "projects" | "contact">("home");

  return (
    <main className={styles.container}>
      {/* 🔹 Home Section */}
      <div className={`${styles.section} ${activeComponent === "home" ? styles.active : styles.hidden}`}>
        <Hero onSwitch={(section) => setActiveComponent(section)} />
      </div>

      {/* 🔹 Projects Section */}
      <div className={`${styles.section} ${activeComponent === "projects" ? styles.active : styles.hidden}`}>
        <Projects onSwitch={(section) => setActiveComponent(section)} /> {/* ✅ Now correctly navigates */}
      </div>

      {/* 🔹 Contact Section */}
      <div className={`${styles.section} ${activeComponent === "contact" ? styles.active : styles.hidden}`}>
        <Contact onSwitch={() => setActiveComponent("home")} /> {/* ✅ Now correctly navigates */}
      </div>
    </main>
  );
}