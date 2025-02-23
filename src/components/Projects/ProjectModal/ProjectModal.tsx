"use client";

import { useEffect, useRef } from "react";
import styles from "./ProjectModal.module.css";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

interface ProjectModalProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  about: string[]; // ✅ Added about as a prop to remove hardcoded content
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ title, description, imageSrc, link, about, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && overlayRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render when not open

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={onClose}>
      <div ref={modalRef} className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        
        {/* Image with Link */}
        <Link href={link} passHref legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <Image src={imageSrc} alt={title} width={400} height={250} className={styles.image} />
          </a>
        </Link>

        <h2 className={styles.title}>{title}</h2>

        {/* 🔥 Dynamic About Section */}
        <div className={styles.projectOverview}>
          {about.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <p className={styles.description}>{description}</p>

        {/* Project Link */}
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
          View Project
        </a>
      </div>
    </div>
  );
}