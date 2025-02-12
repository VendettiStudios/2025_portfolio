import Hero from "../components/Hero/Hero";
import { heroContent } from "../components/Hero/heroData";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            ...heroContent,
          }),
        }}
      />
      <Hero />
    </main>
  );
}