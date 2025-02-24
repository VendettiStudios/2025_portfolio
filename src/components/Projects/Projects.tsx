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
  const [, setWindowWidth] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

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

  // 🔥 Center First Card on Load
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.children[0] as HTMLElement;
  
      if (firstCard) {
        const containerWidth = container.clientWidth;
        const firstCardWidth = firstCard.offsetWidth;
  
        // Ensure we center it using the full scrollable width
        const totalScrollWidth = container.scrollWidth;
        const firstCardPosition = firstCard.offsetLeft;
  
        // Correct scroll position
        const scrollOffset = firstCardPosition - (totalScrollWidth / 2) + (firstCardWidth / 2);
  
        console.log("Container Width:", containerWidth);
        console.log("Total Scroll Width:", totalScrollWidth);
        console.log("First Card Offset Left:", firstCardPosition);
        console.log("Updated Scroll Offset:", scrollOffset);
  
        container.scrollLeft = Math.max(0, scrollOffset); // Ensure no negative values
      }
    }
  }, []);

  const handleProjectClick = useCallback((project: ProjectData) => {
    console.log("Clicked Project:", project);
    setSelectedProject(project);
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectsSection}>
      <h2 className={styles.title}>My Projects</h2>
      <div className={styles.container}>

        {/* 🔥 Horizontal Scroll Wrapper */}
        <motion.div
          ref={scrollContainerRef}
          className={styles.scrollContainer}
          drag="x"
          dragConstraints={
            scrollContainerRef.current
              ? {
                  left:
                    -scrollContainerRef.current.scrollWidth +
                    window.innerWidth /* ✅ Ensures full scrolling */,
                  right: 0,
                }
              : undefined
          }
          dragElastic={0.1}
        >
          {projects.map(
            (
              { title, subtitle, description, imageSrc, link, backgroundImage },
              index
            ) => (
              <motion.div
                key={index}
                className={styles.projectSlide}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleProjectClick(projects[index])}
              >
                <ProjectCard
                  title={title}
                  subtitle={subtitle}
                  description={description}
                  imageSrc={imageSrc}
                  link={link}
                  backgroundImage={backgroundImage} // ✅ Pass the correct class name
                />
              </motion.div>
            )
          )}
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