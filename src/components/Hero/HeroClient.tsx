"use client"; // ✅ Ensures this runs on the client

import HeroAnimation from "./HeroAnimation";

export default function HeroClient() {
  return <HeroAnimation />; // ✅ Loads animations only on the client
}