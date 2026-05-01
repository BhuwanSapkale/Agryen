import { HeroAnimated } from "@/components/blocks/home-anim/HeroAnimated";
import { DivisionsHorizontal } from "@/components/blocks/home-anim/DivisionsHorizontal";
import { WhyChooseUsMorph } from "@/components/blocks/home-anim/WhyChooseUsMorph";
import { ScrollingTextLoop } from "@/components/blocks/home-anim/ScrollingTextLoop";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground">
      {/* Animated Fullscreen Sections Hero */}
      <HeroAnimated />

      {/* Horizontal Scroll Gallery for Divisions, How We Work, Projects, Contact */}
      <DivisionsHorizontal />

      {/* SVG Velocity Footer/Why Choose Us natively combined with Marquee */}
      <WhyChooseUsMorph />
    </div>
  );
}
