import { About } from "@/components/home/About";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { HeroPhotoBand } from "@/components/home/HeroPhotoBand";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ImpactTicker } from "@/components/home/ImpactTicker";
import { Initiatives } from "@/components/home/Initiatives";
import { JoinCTA } from "@/components/home/JoinCTA";
import { Testimonials } from "@/components/home/Testimonials";

export function HomePage() {
  return (
    <>
      <Hero />
      <HeroPhotoBand />
      <ImpactTicker />
      <About />
      <HowItWorks />
      <Initiatives />
      <Testimonials />
      <Gallery />
      <JoinCTA />
    </>
  );
}
