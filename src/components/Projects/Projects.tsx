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

  // ✅ Store isMobile state to prevent direct window access
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 850);

      const handleResize = () => {
        setIsMobile(window.innerWidth < 850);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
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

  // 🔥 Center Content on Load
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCard = container.children[0] as HTMLElement;
    const secondCard = container.children[1] as HTMLElement | undefined;

    let scrollOffset = 0;

    if (firstCard) {
      const containerWidth = container.clientWidth;
      const firstCardWidth = firstCard.offsetWidth;
      const secondCardWidth = secondCard?.offsetWidth || firstCardWidth;

      if (window.innerWidth < 768) {
        // 📱 **Mobile View** → Center first card
        scrollOffset = firstCard.offsetLeft - (containerWidth / 2) + (firstCardWidth / 2);
      } else {
        // 🖥 **Tablet/Desktop** → Center between first & second card
        if (secondCard) {
          const centerBetweenCards =
            (firstCard.offsetLeft + secondCard.offsetLeft) / 2 - containerWidth / 2 + (secondCardWidth / 2);
          scrollOffset = centerBetweenCards;
        }
      }
    }

    console.log("Calculated Scroll Offset:", scrollOffset);

    requestAnimationFrame(() => {
      container.scrollLeft = scrollOffset; // ✅ Apply smooth scrolling adjustment
    });
  }, []);

  // 🔥 Prevent Scroll Getting Stuck on Desktop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = container.scrollWidth - container.clientWidth - 1;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
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
          drag={isMobile ? "x" : false} // ✅ Only enable drag for mobile (<850px)
          dragConstraints={
            isMobile && scrollContainerRef.current
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