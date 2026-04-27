"use client";

import React, { useEffect } from "react";
import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hook GSAP ScrollTrigger strictly onto Lenis's ticker to fix any parallax pinning bugs
  const lenis = useLenis(ScrollTrigger.update);
  
  useEffect(() => {
    if (!lenis) return;
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
    
    // Hard refresh all ScrollTriggers when Next.js route shifts successfully
    let timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      gsap.ticker.remove(lenis.raf);
      clearTimeout(timeoutId);
    };
  }, [lenis, pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
