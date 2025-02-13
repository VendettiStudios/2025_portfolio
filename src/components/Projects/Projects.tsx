"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard/ProjectCard";

interface ProjectsProps {
  onSwitch: () => void;
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
    title: "Project 2",
    description: "A second project example with smooth animations and GSAP.",
    imageSrc: "/metco2.png",
    link: "https://example.com/project2",
  },
  {
    title: "Project 3",
    description: "A third example project card for demonstrating layout.",
    imageSrc: "/metco3.png",
    link: "https://example.com/project3",
  },
  {
    title: "Project 4",
    description: "Another unique project with animations.",
    imageSrc: "/metco4.png",
    link: "https://example.com/project4",
  },
];

export default function Projects({ onSwitch }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Dynamically update scroll constraints based on screen size
  useEffect(() => {
    const updateSizes = () => {
      if (scrollContainerRef.current) {
        setScrollWidth(scrollContainerRef.current.scrollWidth);
        setContainerWidth(scrollContainerRef.current.clientWidth);
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
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
            left: -((projects.length - 1) * window.innerWidth * 0.22), // Adjusted constraint
            right: 0,
          }}
          dragElastic={0.1}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={styles.projectSlide}
              whileTap={{ scale: 0.95 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        <button className={styles.backButton} onClick={onSwitch}>
          Back to Hero
        </button>
      </div>
    </section>
  );
}
