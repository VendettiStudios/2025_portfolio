import styles from "./Hero.module.css";
import HeroAnimation from "./HeroAnimation"; // ✅ Runs GSAP only on the client

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title} data-hero-title>
          I'm <span className={styles.highlight}>Daniel Holloway</span>, a Full-Stack Developer
        </h1>
        <p className={styles.subtitle} data-hero-subtitle>
          Building scalable systems | Next.js | React | Business Ops
        </p>
        <div className={styles.ctaWrapper} data-hero-cta>
          <a href="#projects" className={styles.cta}>View My Work</a>
          <a href="#contact" className={styles.ctaOutline}>Get in Touch</a>
        </div>
      </div>
      <HeroAnimation /> {/* ✅ Runs animations on the client */}
    </section>
  );
}