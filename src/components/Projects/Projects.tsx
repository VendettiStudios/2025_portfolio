"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

  // ✅ Track screen size category
  const [screenCategory, setScreenCategory] = useState<"mobile" | "tablet" | "desktop">("mobile");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateScreenCategory = () => {
      const width = window.innerWidth;

      if (width < 850) {
        setScreenCategory("mobile");
      } else if (width >= 850 && projects.length >= 3) {
        setScreenCategory("tablet");
      } else {
        setScreenCategory("desktop");
      }
    };

    updateScreenCategory();
    window.addEventListener("resize", updateScreenCategory);
    return () => window.removeEventListener("resize", updateScreenCategory);
  }, []);

  // 🔥 Center Content on Load & Screen Resize
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstCard = container.children[0] as HTMLElement;
    const secondCard = container.children[1] as HTMLElement | undefined;
    const thirdCard = container.children[2] as HTMLElement | undefined;

    let scrollOffset = 0;

    if (screenCategory === "mobile") {
      if (firstCard) {
        const containerWidth = container.clientWidth;
        const firstCardWidth = firstCard.offsetWidth;
        scrollOffset = firstCard.offsetLeft - (containerWidth / 2) + (firstCardWidth / 2);
      }
    } else if (screenCategory === "tablet" || screenCategory === "desktop") {
      if (projects.length === 2 && firstCard && secondCard) {
        const containerWidth = container.clientWidth;
        const centerBetweenCards =
          (firstCard.offsetLeft + secondCard.offsetLeft) / 2 - containerWidth / 2;
        scrollOffset = centerBetweenCards;
      } else if (projects.length >= 3 && thirdCard) {
        const containerWidth = container.clientWidth;
        const middleCard = Math.floor(projects.length / 2);
        const middleCardElement = container.children[middleCard] as HTMLElement;
        scrollOffset = middleCardElement.offsetLeft - (containerWidth / 2) + (middleCardElement.offsetWidth / 2);
      }
    }

    requestAnimationFrame(() => {
      container.scrollLeft = scrollOffset;
    });
  }, [screenCategory]);

  const handleProjectClick = useCallback((project: ProjectData) => {
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
          drag={screenCategory === "mobile" ? "x" : false} // ✅ Only enable drag for mobile
          dragConstraints={
            screenCategory === "mobile" && scrollContainerRef.current
              ? {
                  left: -scrollContainerRef.current.scrollWidth + window.innerWidth,
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
                  backgroundImage={backgroundImage}
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
            about={selectedProject.about}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}