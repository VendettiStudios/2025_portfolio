import { ProjectData } from "./types";


export const projects: ProjectData[] = [
  {
    title: "MET Corp USA",
    subtitle: "A California 3PL",
    description: "Built with Next.js and Firebase",
    imageSrc: "/metco.png",
    link: "https://metcorpusa.com",
    backgroundImage: "/cardBackground.png",
    about: [
      "This project was a full-scale development effort, where I managed everything from branding to full-stack implementation with a focus on long-term sustainability.",
      "While I’m not a designer, I applied fundamental design principles to ensure a clean, cohesive visual identity, using a color palette aligned with the logo for consistency.",
      "The site was built with mobile-first responsiveness, performance optimizations, and accessibility in mind.",
      "On the backend, I developed custom internal tools behind authentication, eliminating the need for expensive third-party software.",
      "This included an in-house CRM for client and partner management, as well as a manual freight scheduling system, allowing both leadership and floor managers to approve schedules efficiently—reducing unnecessary calls and miscommunications.",
      "A major focus was SEO and analytics, where I implemented structured data, keyword research, and performance optimizations to drive organic traffic and reduce advertising costs.",
      "The site is fully integrated with analytics platforms (Google Analytics, Cloudflare, Vercel, Clarity, and Ahrefs) to monitor user behavior, track engagement, and refine performance over time.",
      "To further enhance usability and user experience, I introduced anonymous sign-in via Firebase, ensuring form data persists even after a page reload—solving a common frustration users face on many sites.",
      "Every decision, from code efficiency to deployment (via Cloudflare and Vercel), was made to create a scalable, low-maintenance solution that supports long-term business growth without ongoing technical debt.",
    ],
  },
  {
    title: "Vendetti Studios",
     subtitle: "A California 3PL",
    description: "Built with Next.JS and Three.js.",
    imageSrc: "/VendettiStudios.png",
    link: "https://vendettistudios.com",
    backgroundImage: "/cardBackground2.png", // 
    about: [
      "Vendetti Studios is currently a coming soon page featuring an interactive experience built with Three.js.",
      "The project focuses on WebGL animations and smooth transitions to create an engaging visual effect.",
      "Optimized for performance, ensuring smooth rendering across different devices while maintaining high frame rates.",
    ],
  },
];