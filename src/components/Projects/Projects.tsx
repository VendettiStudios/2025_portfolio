"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard/ProjectCard";
import ProjectModal from "./ProjectModal/ProjectModal";

interface ProjectsProps {
  onSwitch: (section: "home" | "contact") => void; // ✅ Updated to use "home" instead of "hero"
}

const projects = [
  {
    title: "MET Corp USA",
    description:
      "A logistics and fulfillment company handling eCommerce, warehousing, and distribution.",
    imageSrc: "/metco.png",
    link: "https://metcorpusa.com",
  },
  {
    title: "Vendetti Studios",
    description:
      "End to End Digital Experience Design and Development Studio.",
    imageSrc: "/vendettistudios.png",
    link: "https://vendettistudios.com",
  },
];

export default function Projects({ onSwitch }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  interface Project {
    title: string;
    description: string;
    imageSrc: string;
    link: string;
  }

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const updateSizes = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);

    return () => {
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    console.log("🔥 Updated selectedProject:", selectedProject);
  }, [selectedProject]);

  // ✅ Optimized `handleProjectClick` using `useCallback`
  const handleProjectClick = useCallback((project: Project) => {
    console.log("Clicked Project:", project);
    setSelectedProject(project);
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>My Projects</h2>

        {/* 🔥 Horizontal Scroll Wrapper */}
        <motion.div
          ref={scrollContainerRef}
          className={styles.scrollContainer}
          drag="x"
          dragConstraints={{
            left: windowWidth ? -((projects.length - 1) * windowWidth * 0.22) : 0,
            right: 0,
          }}
          dragElastic={0.1}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={styles.projectSlide}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleProjectClick(project)}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {/* 🔥 Fixed Back to Home Button */}
        <button className={styles.backButton} onClick={() => onSwitch("home")}>
          Back to Home
        </button>

        {/* 🔥 Modal Outside JSX Rendering Condition */}
        {selectedProject && (
          <ProjectModal
            title={selectedProject.title}
            description={selectedProject.description}
            imageSrc={selectedProject.imageSrc}
            link={selectedProject.link}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}