"use client";

import { usePathname } from "next/navigation";
import { SmoothScrollWrapper } from "@/components/blocks/home-anim/SmoothScrollWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // The key attribute forces Next.js to completely destroy and rebuild the wrapper when navigating.
  // This physically destroys "dead" GSAP DOM nodes and reconstructs the new ScrollSmoother mathematically fresh.
  return <SmoothScrollWrapper key={pathname}>{children}</SmoothScrollWrapper>;
}
