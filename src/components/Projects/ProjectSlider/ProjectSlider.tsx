"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { PanInfo } from "framer-motion"; // ✅ Import corre
import { gsap } from "gsap";
import styles from "./ProjectSlider.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "MET Corp USA",
    description: "A logistics and fulfillment company handling eCommerce, warehousing, and distribution.",
    imageSrc: "/metco.png",
    link: "https://metcorpusa.com",
  },
  {
    title: "Project 2",
    description: "A second project example with smooth animations and GSAP.",
    imageSrc: "/project2.png",
    link: "https://example.com/project2",
  },
  {
    title: "Project 3",
    description: "A third example project card for demonstrating layout.",
    imageSrc: "/project3.png",
    link: "https://example.com/project3",
  },
];

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scrolling
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
  
    if (offset < -100 || velocity < -300) {
      setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1));
    } else if (offset > 100 || velocity > 300) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className={styles.sliderWrapper}>
      <motion.div 
        ref={containerRef}
        className={styles.sliderContainer}
        drag="x"
        dragConstraints={{ left: -((projects.length - 1) * 100), right: 0 }}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={styles.projectSlide}
            animate={{
              opacity: index === currentIndex ? 1 : 0.5,
              scale: index === currentIndex ? 1 : 0.9,
            }}
            transition={{ duration: 0.5 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}