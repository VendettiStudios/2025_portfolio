"use client";

import styles from "./ProjectModal.module.css";

interface ProjectModalProps {
  title: string;
  description: string;
  imageSrc: string;  // ✅ Ensure this matches the `ProjectCard` props
  link: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ title, description, imageSrc, link, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen) return null; // ✅ Prevent unnecessary renders

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>✖</button>
        </div>

        {/* Modal Content */}
        <div className={styles.modalContent}>
          <img src={imageSrc} alt={title} className={styles.projectImage} />
          <p className={styles.description}>{description}</p>
          <a href={link} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
            Visit Project
          </a>
        </div>
      </div>
    </div>
  );
}