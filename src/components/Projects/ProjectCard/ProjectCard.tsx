"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProjectCard.module.css";
import ProjectModal from "../ProjectModal/ProjectModal";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

export default function ProjectCard({ title, description, imageSrc, link }: ProjectCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.card} onClick={() => setModalOpen(true)}>
        <div className={styles.imageContainer}>
          <Image 
            src={imageSrc} 
            alt={title} 
            width={600} 
            height={400} 
            className={styles.image} 
            priority
            sizes="(max-width: 768px) 90vw, 600px"
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      {/* 🛠️ Only Render Modal if Open */}
      {isModalOpen && (
        <ProjectModal 
          title={title}
          description={description}
          imageSrc={imageSrc}
          link={link}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}