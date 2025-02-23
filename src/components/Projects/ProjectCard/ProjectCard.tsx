"use client";

import Image from "next/image";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  subtitle:string;
  description: string;
  imageSrc: string;
  link: string;
  backgroundImage: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageSrc,
  // link,
  backgroundImage,
}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      {/* ✅ Background Image - Fully Covers Card */}
      <div className={styles.backgroundWrapper}>
        <Image
          src={backgroundImage}
          alt={`${title} Background`}
          fill
          className={styles.backgroundImage}
          priority
        />
      </div>

      {/* ✅ Content Layer (Title, Image, Description) */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <h2 className={styles.subtitle}>{subtitle}</h2>

        {/* ✅ Project Thumbnail - Now Centered & Movable */}
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

        <p className={styles.description}>{description}</p>
        {/* <a href={link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
          Visit Project
        </a> */}
      </div>
    </div>
  );
}