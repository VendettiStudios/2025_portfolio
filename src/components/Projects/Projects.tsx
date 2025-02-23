"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard/ProjectCard";
import ProjectModal from "./ProjectModal/ProjectModal";
import { projects } from "./utils/data"; // ✅ Import project data
import { ProjectData } from "./utils/types"; // ✅ Import type definitions

interface ProjectsProps {
  onSwitch: (section: "home" | "contact") => void;
}

export default function Projects({ onSwitch }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

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

  const handleProjectClick = useCallback((project: ProjectData) => {
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
          {projects.map(({ title, description, imageSrc, link }, index) => (
            <motion.div
              key={index}
              className={styles.projectSlide}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleProjectClick(projects[index])}
            >
              <ProjectCard title={title} description={description} imageSrc={imageSrc} link={link} />
            </motion.div>
          ))}
        </motion.div>

        {/* 🔥 Fixed Back to Home Button */}
        <button className={styles.backButton} onClick={() => onSwitch("home")}>
          Back to Home
        </button>

        {/* 🔥 Modal Only Renders if a Project is Selected */}
        {selectedProject && (
          <ProjectModal
            title={selectedProject.title}
            description={selectedProject.description}
            imageSrc={selectedProject.imageSrc}
            link={selectedProject.link}
            about={selectedProject.about} // ✅ Passes unique about section
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}