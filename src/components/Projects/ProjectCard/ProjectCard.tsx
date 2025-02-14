"use client";

import Image from "next/image";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

export default function ProjectCard({ title, description, imageSrc, link }: ProjectCardProps) {
  return (
    <div className={styles.card}>
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
        <p className={styles.description}>
          {description}
        </p>
        {/* ✅ Add clickable link within the card */}
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
          Visit Project
        </a>
      </div>
    </div>
  );
}