"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap-trial";
import { Flip } from "gsap-trial/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const radios = gsap.utils.toArray<HTMLInputElement>('input[type="radio"]');
    const items = gsap.utils.toArray<HTMLElement>('.item');

    function updateFilters(selectedId: string) {
      // get the current state
      const state = Flip.getState(items); 
      
      const matches = selectedId === 'all' ? items : gsap.utils.toArray<HTMLElement>("." + selectedId);

      // adjust the display property of each item
      items.forEach(item => {
        item.style.display = (selectedId !== 'all' && matches.indexOf(item) === -1) 
          ? "none" 
          : "inline-flex";
      });

      // animate from the previous state
      Flip.from(state, {
        duration: 0.7,
        scale: true,
        ease: "power1.inOut",
        stagger: 0.08,
        absolute: true,
        onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: 1}),
        onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 1})
      });
    }

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.checked) updateFilters(target.id);
    };

    radios.forEach(btn => btn.addEventListener('change', handleChange));

    return () => {
      radios.forEach(btn => btn.removeEventListener('change', handleChange));
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden pb-32">
      {/* 1. Cinematic Dark Hero */}
      <section className="relative w-full h-[60vh] overflow-hidden bg-black text-white flex items-center justify-center border-b border-primary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2672')` }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <div className="relative z-10 text-center px-4 mt-16 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-none text-white/90 drop-shadow-2xl mb-8">
            Our Projects
          </h1>
          <p className="text-xl md:text-3xl font-light text-primary tracking-wide uppercase border border-primary/40 px-8 py-3 rounded-full inline-block backdrop-blur-md bg-black/40">
            Cross-Industry Portfolio
          </p>
        </div>
      </section>

      {/* Filter Section (Light Mode Relief) */}
      <div className="w-full bg-white py-16 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="buttons-container flex flex-wrap justify-center gap-4">
            {[
              { id: "all", label: "All" },
              { id: "gradient-software", label: "Software" },
              { id: "gradient-automation", label: "Automation" },
              { id: "gradient-solar", label: "Solar" },
              { id: "gradient-construction", label: "Construction" },
              { id: "gradient-pharma", label: "Pharma" }
            ].map((btn, i) => (
              <label key={i} className="tag-button cursor-pointer select-none bg-black/5 hover:bg-black/10 px-8 py-4 rounded-full flex items-center gap-3 transition-colors text-lg font-bold border border-black/10 hover:border-primary">
                <input type="radio" name="project-filter" id={btn.id} defaultChecked={btn.id === "all"} className="w-5 h-5 accent-primary" /> 
                <span className="text-black/80">{btn.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 mt-24">
        
        {/* Cinematic Box Container */}
        <div className="box-container flex flex-wrap gap-8 justify-center min-h-[500px]">
          <div className="item gradient-software shadow-2xl shadow-black/50 w-full md:w-[30%] lg:w-[23%] h-80 rounded-3xl bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400')] bg-cover bg-center border border-primary/30 flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <span className="relative z-10 text-primary font-bold text-2xl group-hover:scale-110 transition-transform tracking-widest uppercase">SW-V1</span>
          </div>
          <div className="item gradient-automation shadow-2xl shadow-black/50 w-full md:w-[30%] lg:w-[23%] h-80 rounded-3xl bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400')] bg-cover bg-center border border-primary/20 flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <span className="relative z-10 text-white/50 font-bold text-2xl group-hover:scale-110 transition-transform tracking-widest uppercase">AUTO-X</span>
          </div>
          <div className="item gradient-solar shadow-2xl shadow-black/50 w-full md:w-[30%] lg:w-[23%] h-80 rounded-3xl bg-[url('https://images.unsplash.com/photo-1509391366360-12009a30f1aa?q=80&w=400')] bg-cover bg-center border border-primary/40 flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
             <span className="relative z-10 text-primary font-bold text-2xl group-hover:scale-110 transition-transform tracking-widest uppercase">SLR-9</span>
          </div>
          <div className="item gradient-automation shadow-2xl shadow-black/50 w-full md:w-[63%] lg:w-[48%] h-80 rounded-3xl bg-[url('https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600')] bg-cover bg-center border border-primary/50 flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
             <span className="relative z-10 text-white/80 font-bold text-2xl group-hover:scale-110 transition-transform tracking-widest uppercase">SMART HUB ALPHA</span>
          </div>
          <div className="item gradient-software shadow-2xl shadow-black/50 w-full md:w-[30%] lg:w-[23%] h-80 rounded-3xl bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400')] bg-cover bg-center border border-primary/20 flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
             <span className="relative z-10 text-primary font-bold text-2xl group-hover:scale-110 transition-transform tracking-widest uppercase">DEV-SEC</span>
          </div>
          <div className="item gradient-construction shadow-2xl shadow-black/50 w-full md:w-[30%] lg:w-[23%] h-80 rounded-3xl bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400')] bg-cover bg-center border border-primary/30 flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
             <span className="relative z-10 text-white font-bold text-2xl tracking-widest uppercase">SITEHQ</span>
          </div>
          <div className="item gradient-pharma shadow-2xl shadow-black/50 w-full md:w-[30%] lg:w-[23%] h-80 rounded-3xl bg-[url('https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400')] bg-cover bg-center border border-primary/40 flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
             <span className="relative z-10 text-white/60 font-bold text-2xl tracking-widest uppercase">MED-DIST</span>
          </div>
          <div className="item gradient-solar shadow-2xl shadow-black/50 w-full md:w-[30%] lg:w-[23%] h-80 rounded-3xl bg-[url('https://images.unsplash.com/photo-1508514177221-18d14?q=80&w=400')] bg-cover bg-center border border-white/20 flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
             <span className="relative z-10 text-primary font-bold text-2xl tracking-widest uppercase">FLEX STRIP</span>
          </div>
          <div className="item gradient-software shadow-2xl shadow-black/50 w-full md:w-[100%] h-64 rounded-3xl bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000')] bg-cover bg-center border border-primary flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
             <span className="relative z-10 text-white font-black text-4xl tracking-widest uppercase">CORE INFRASTRUCTURE MODULE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
