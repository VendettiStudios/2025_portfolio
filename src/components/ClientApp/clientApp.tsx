"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "../Hero/Hero";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import styles from "./clientApp.module.css";
import { ProjectData } from "../Projects/utils/types";

interface ClientAppProps {
  projects: ProjectData[];
}

export default function ClientApp({ projects }: ClientAppProps) {
  const searchParams = useSearchParams();
  const [activeComponent, setActiveComponent] = useState<"home" | "projects" | "contact">("home");

  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "projects" || view === "contact" || view === "home") {
      setActiveComponent(view);
    }
  }, [searchParams]);

  return (
    <main className={styles.container}>
      <div className={`${styles.section} ${activeComponent === "home" ? styles.active : styles.hidden}`}>
        <Hero onSwitch={setActiveComponent} />
      </div>

      <div className={`${styles.section} ${activeComponent === "projects" ? styles.active : styles.hidden}`}>
        <Projects onSwitch={setActiveComponent} projects={projects} />
      </div>

      <div className={`${styles.section} ${activeComponent === "contact" ? styles.active : styles.hidden}`}>
        <Contact onSwitch={() => setActiveComponent("home")} />
      </div>
    </main>
  );
}