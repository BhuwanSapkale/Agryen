"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { ArrowRight, Cpu, Sun, Building, Pill, HomeIcon } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const divisions = [
  { title: "Smart Home", icon: <HomeIcon className="w-12 h-12" />, desc: "IoT integration, energy monitoring, and security.", url: "/divisions/smart-home" },
  { title: "Software", icon: <Cpu className="w-12 h-12" />, desc: "Web dev, AI solutions, and automation.", url: "/divisions/software" },
  { title: "Renewable", icon: <Sun className="w-12 h-12" />, desc: "Solar panels, battery storage, and consulting.", url: "/divisions/solar" },
  { title: "Construction", icon: <Building className="w-12 h-12" />, desc: "Infrastructure, project management, and renos.", url: "/divisions/construction" },
  { title: "Pharma", icon: <Pill className="w-12 h-12" />, desc: "Healthcare products and medicine distribution.", url: "/divisions/pharma" },
  // Adding placeholder panels for the others requested to be in this strip
  { title: "How We Work", icon: <ArrowRight className="w-12 h-12" />, desc: "Our end-to-end multi-disciplinary approach.", url: "/how-we-work" },
  { title: "Projects", icon: <ArrowRight className="w-12 h-12" />, desc: "Explore our cross-industry portfolio.", url: "/projects" },
  { title: "Contact Us", icon: <ArrowRight className="w-12 h-12" />, desc: "Get in touch with our team.", url: "/contact" },
];

export function DivisionsHorizontal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let pinWrap = scrollContainerRef.current;
    if (!pinWrap || !wrapperRef.current) return;

    let pinWrapWidth: number;
    let horizontalScrollLength: number;

    function refresh() {
      if (pinWrap) {
        pinWrapWidth = pinWrap.scrollWidth;
        horizontalScrollLength = pinWrapWidth - window.innerWidth;
      }
    }

    refresh();
    
    gsap.to(pinWrap, {
      scrollTrigger: {
        scrub: true,
        trigger: wrapperRef.current,
        pin: wrapperRef.current,
        pinSpacing: true,
        start: "center center",
        end: () => `+=${pinWrapWidth + 200}`,
        invalidateOnRefresh: true,
      },
      x: () => -horizontalScrollLength!,
      ease: "none"
    });

    ScrollTrigger.addEventListener("refreshInit", refresh);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", refresh);
    };

  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} id="portfolio" className="bg-background text-foreground overflow-hidden w-full h-screen flex flex-col justify-center relative">
      <div className="absolute top-16 left-8 md:left-16 z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter shadow-sm w-max">Across The Board.</h2>
      </div>

      <div className="container-fluid w-full h-[60vh] flex items-center">
        <div ref={scrollContainerRef} className="horiz-gallery-strip flex gap-8 px-8 md:px-32 h-full items-center w-max">
          {divisions.map((div, i) => (
            <div key={i} className="project-wrap w-[80vw] md:w-[40vw] lg:w-[30vw] h-[50vh] flex-shrink-0 relative group rounded-3xl overflow-hidden bg-muted/20 border flex flex-col justify-between p-8 hover:bg-muted/40 transition-colors">
              <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {div.icon}
              </div>
              <div className="mt-auto">
                <h3 className="text-3xl font-bold mb-3">{div.title}</h3>
                <p className="text-xl text-muted-foreground mb-6 line-clamp-3">{div.desc}</p>
                <a href={div.url} className="inline-flex items-center text-primary font-bold hover:underline text-lg uppercase tracking-wider">
                  View More <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
