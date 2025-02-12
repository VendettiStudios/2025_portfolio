// /types/hero.ts
export type HeroContent = {
    name: string;
    title: string;
    subtitle: string;
    ctas: {
      label: string;
      href: string;
    }[];
  };