import Link from "next/link";
import styles from "./Hero.module.css";
import HeroClient from "./HeroClient";
import Image from "next/image";

interface HeroProps {
  onSwitch: (section: "projects" | "contact") => void; // ✅ Ensures proper navigation
}

export default function Hero({ onSwitch }: HeroProps) {
  return (
    <section className={styles.hero}>
      <HeroClient /> {/* Animations & Interactions */}
      <div className={styles.socialIcons}>
        <Link
          href="https://github.com/VendettiStudios"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubIcon}
        >
          <Image src="/github.svg" alt="GitHub" width={35} height={35} />
        </Link>

        <Link
          href="https://linkedin.com/in/hollowaydaniel"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedinIcon}
        >
          <Image src="/linkedin.png" alt="LinkedIn" width={40} height={35} />
        </Link>
      </div>
      <div className={styles.container}>
        <h1 className={styles.heroTitle} data-hero-title>
          I&apos;m <span className={styles.highlight}>Daniel Holloway</span>,<br/> a Full-Stack Developer
        </h1>
        <p className={styles.subtitle} data-hero-subtitle>
          Building scalable systems | Next.js | React | Business Ops
        </p>
        <div className={styles.ctaWrapper} data-hero-cta>
          <button className={styles.cta} onClick={() => onSwitch("projects")}>
            View My Work
          </button>
          <button className={styles.ctaOutline} onClick={() => onSwitch("contact")}>
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}