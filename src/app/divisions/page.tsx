"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollingTextLoop } from "@/components/blocks/home-anim/ScrollingTextLoop";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DivisionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const list = document.querySelector(".list");
    const fill = document.querySelector(".fill");
    const listItems = gsap.utils.toArray<HTMLElement>("li", list);
    const slides = gsap.utils.toArray<HTMLElement>(".slide");
    const pinSection = document.querySelector(".pin-section");
    
    if (!pinSection || listItems.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pin-section",
        start: "top top",
        end: "+=" + listItems.length * 50 + "%",
        pin: true,
        scrub: true
      }
    });

    // First element visible, set the marker
    if (fill) {
      gsap.set(fill, {
        scaleY: 1 / listItems.length,
        transformOrigin: "top left"
      });
    }

    listItems.forEach((item, i) => {
      const previousItem = listItems[i - 1];
      if (previousItem) {
        tl.set(item, { color: "var(--primary)" }, 0.5 * i)
          .to(
            slides[i],
            {
              autoAlpha: 1,
              duration: 0.2
            },
            "<"
          )
          .set(previousItem, { color: "var(--muted-foreground)" }, "<") 
          .to(
            slides[i - 1],
            {
              autoAlpha: 0,
              duration: 0.2
            },
            "<"
          );
      } else {
        gsap.set(item, { color: "var(--primary)" });
        gsap.set(slides[i], { autoAlpha: 1 });
      }
    });

    if (fill) {
      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration()
        },
        0
      ).to({}, {});
    }

    // Refresh for Next.js routing issues (soft link hydration)
    let timeouts = [
      setTimeout(() => ScrollTrigger.refresh(), 100),
      setTimeout(() => ScrollTrigger.refresh(), 500),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col w-full min-h-screen bg-black text-white">
      {/* 1. Cinematic Dark Hero (Brightened) */}
      <section className="relative w-full h-[70vh] overflow-hidden bg-black flex items-center justify-center border-b border-primary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2672')` }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <div className="relative z-10 text-center mt-16 px-4">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight text-white/90 drop-shadow-2xl mb-8">
            Our Divisions
          </h1>
          <p className="text-xl md:text-3xl font-light text-primary tracking-wide uppercase border border-primary/40 px-8 py-3 rounded-full inline-block backdrop-blur-md bg-black/30">
            A Multi-Industry Powerhouse
          </p>
        </div>
      </section>

      {/* 1.5 Animated Bridge (Filling the Gap) */}
      <section className="py-24 bg-secondary/20 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">Built for Scalability</h2>
          <div className="flex gap-4 justify-center items-center">
            <div className="w-12 h-1 bg-primary rounded-full animate-pulse"></div>
            <p className="text-lg md:text-xl text-white/60 font-light uppercase tracking-[0.3em]">Excellence in Execution</p>
            <div className="w-12 h-1 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </section>
      
      {/* 2. Seamless Scrolling Division Cards */}
      <section className="divisions-grid py-32 space-y-32">
        {[
          { title: "Smart Home Automation", img: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2672", desc: "Experience the ultimate in intelligent living with our cutting-edge automation systems.", url: "/divisions/smart-home" },
          { title: "Software & Digital Solutions", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672", desc: "Building the future of digital infrastructure with scalable, secure software solutions.", url: "#" },
          { title: "Solar & Renewable Energy", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2672", desc: "Powering the world sustainably through advanced solar technology and energy storage.", url: "#", position: "object-bottom" },
          { title: "Construction & Infrastructure", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2672", desc: "Redefining the modern landscape with robust, high-end construction and architectural excellence.", url: "#" },
          { title: "Pharmaceuticals", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=2672", desc: "Advancing global health through innovative research and high-quality pharmaceutical manufacturing.", url: "#" }
        ].map((div, i) => (
          <div key={i} className="division-card group relative w-full h-[80vh] flex items-center justify-center overflow-hidden border-y border-white/5">
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
               <img src={div.img} alt={div.title} className={`w-full h-full object-cover opacity-80 ${div.position || 'object-center'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
              <span className="text-primary font-black text-2xl mb-4 block tracking-[0.5em] uppercase opacity-60">Division 0{i+1}</span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter drop-shadow-2xl">{div.title}</h2>
              <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">{div.desc}</p>
              <a href={div.url} className="inline-block bg-primary text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white transition-colors shadow-2xl">
                Explore Division
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Outro Section with Loop (Light Theme) */}
      <section className="bg-white border-t border-primary/20">
         <div className="py-20 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter text-black">Unified by Excellence</h2>
            <p className="text-xl text-black/50 font-medium tracking-widest uppercase">Every division. One standard. AGRYEN.</p>
         </div>
         <ScrollingTextLoop />
      </section>
    </div>
  );
}
