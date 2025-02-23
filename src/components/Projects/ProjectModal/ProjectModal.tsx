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
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ title, description, imageSrc, link, isOpen, onClose }: ProjectModalProps) {
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
        
        {/* Smaller Image */}
        <Link href="https://metcorpusa.com" passHref legacyBehavior>
  <a target="_blank" rel="noopener noreferrer">
    <Image src={imageSrc} alt={title} width={400} height={250} className={styles.image} />
  </a>
</Link>

        <h2 className={styles.title}>{title}</h2>

        {/* Project Overview */}
        <div className={styles.projectOverview}>
  <p>
    This project was a full-scale development effort, where I managed everything from branding to full-stack implementation with a focus on long-term sustainability.  
    While I’m not a designer, I applied fundamental design principles to ensure a clean, cohesive visual identity, using a color palette aligned with the logo for consistency.  
    The site was built with mobile-first responsiveness, performance optimizations, and accessibility in mind.
  </p>

  <p>
    On the backend, I developed custom internal tools behind authentication, eliminating the need for expensive third-party software.  
    This included an in-house CRM for client and partner management, as well as a manual freight scheduling system, allowing both leadership and floor managers to approve schedules efficiently—reducing unnecessary calls and miscommunications.
  </p>

  <p>
    A major focus was SEO and analytics, where I implemented structured data, keyword research, and performance optimizations to drive organic traffic and reduce advertising costs.  
    The site is fully integrated with analytics platforms (Google Analytics, Cloudflare, Vercel, Clarity, and Ahrefs) to monitor user behavior, track engagement, and refine performance over time.
  </p>

  <p>
    To further enhance usability and user experience, I introduced anonymous sign-in via Firebase, ensuring form data persists even after a page reload—solving a common frustration users face on many sites.  
    Every decision, from code efficiency to deployment (via Cloudflare and Vercel), was made to create a scalable, low-maintenance solution that supports long-term business growth without ongoing technical debt.
  </p>
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