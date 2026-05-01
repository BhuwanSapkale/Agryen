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
  { title: "How We Work", icon: <ArrowRight className="w-12 h-12" />, desc: "Our end-to-end multi-disciplinary approach.", url: "/how-we-work" },
  { title: "Projects", icon: <ArrowRight className="w-12 h-12" />, desc: "Explore our cross-industry portfolio.", url: "/projects" },
  { title: "Contact Us", icon: <ArrowRight className="w-12 h-12" />, desc: "Get in touch with our team.", url: "/contact" },
];

export function DivisionsHorizontal() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>('.project-wrap');
    
    items.forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} id="portfolio" className="bg-background text-foreground py-32 relative w-full border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase inline-block border-b border-primary pb-4">Across The Board.</h2>
        </div>

        <div className="flex flex-col gap-12 items-center">
          {divisions.map((div, i) => (
            <div key={i} className={`project-wrap w-full md:w-[85%] lg:w-[70%] flex flex-col md:flex-row items-center gap-8 bg-white border border-primary/20 rounded-3xl p-8 hover:border-primary/50 transition-colors shadow-2xl group ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="text-primary bg-black border border-primary/30 w-32 h-32 rounded-full flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(172,146,95,0.3)]">
                <div className="scale-[1.5]">
                  {div.icon}
                </div>
              </div>
              <div className={`flex flex-col flex-1 text-center ${i % 2 !== 0 ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}>
                <h3 className="text-3xl md:text-4xl font-black mb-4 text-black uppercase tracking-widest">{div.title}</h3>
                <p className="text-xl text-black/70 mb-8 leading-relaxed font-medium">{div.desc}</p>
                <a href={div.url} className="inline-flex items-center justify-center text-black font-black bg-primary px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors text-lg uppercase tracking-wider shadow-[0_0_15px_rgba(172,146,95,0.4)]">
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
