"use client";

import Image from "next/image";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  subtitle: string;
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
  backgroundImage,
}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      {/* ✅ Background Image - Lazy Loaded */}
      <Image
        src={backgroundImage}
        alt={`${title} Background`}
        fill
        className={styles.backgroundImage}
        loading="lazy" /* ✅ Lazy load instead of priority */
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* ✅ Content Layer */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <h2 className={styles.subtitle}>{subtitle}</h2>

        {/* ✅ Project Thumbnail - Also Lazy Loaded */}
        <div className={styles.imageContainer}>
          <Image
            src={imageSrc}
            alt={title}
            width={600}
            height={400}
            className={styles.image}
            loading="lazy" /* ✅ Lazy load project image */
            sizes="(max-width: 768px) 90vw, 600px"
          />
        </div>

        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}