// app/ClientApp.tsx
"use client";

import { useState } from "react";
import Hero from "../Hero/Hero";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import styles from "./clientApp.module.css";
import { ProjectData } from "../Projects/utils/types"; // adjust path as needed

interface ClientAppProps {
  projects: ProjectData[];
}

export default function ClientApp({ projects }: ClientAppProps) {
  const [activeComponent, setActiveComponent] = useState<"home" | "projects" | "contact">("home");

  return (
    <main className={styles.container}>
      {/* Home Section */}
      <div className={`${styles.section} ${activeComponent === "home" ? styles.active : styles.hidden}`}>
        <Hero onSwitch={(section) => setActiveComponent(section)} />
      </div>

      {/* Projects Section */}
      <div className={`${styles.section} ${activeComponent === "projects" ? styles.active : styles.hidden}`}>
        <Projects onSwitch={(section) => setActiveComponent(section)} projects={projects} />
      </div>

      {/* Contact Section */}
      <div className={`${styles.section} ${activeComponent === "contact" ? styles.active : styles.hidden}`}>
        <Contact onSwitch={() => setActiveComponent("home")} />
      </div>
    </main>
  );
}