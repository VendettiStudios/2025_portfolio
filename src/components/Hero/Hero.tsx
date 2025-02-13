import styles from "./Hero.module.css";
import HeroClient from "./HeroClient";

interface HeroProps {
  onSwitch: () => void;
}

export default function Hero({ onSwitch }: HeroProps) {
  return (
    <section className={styles.hero}>
      <HeroClient /> {/* Animations & Interactions */}

      <div className={styles.container}>
        <h1 className={styles.heroTitle} data-hero-title>
          I&apos;m <span className={styles.highlight}>Daniel Holloway</span>, a Full-Stack Developer
        </h1>
        <p className={styles.subtitle} data-hero-subtitle>
          Building scalable systems | Next.js | React | Business Ops
        </p>
        <div className={styles.ctaWrapper} data-hero-cta>
          <button className={styles.cta} onClick={onSwitch}>
            View My Work
          </button>
          <button className={styles.ctaOutline}>
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}