"use client";

import { useRef } from "react";
import { Target, Trophy, Clock, Zap, Globe, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesScrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.from(".about-header-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    });

    // Story paragraphs
    gsap.from(".story-para", {
      scrollTrigger: {
        trigger: ".story-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out"
    });

    // Vision and Mission Cards
    gsap.from(".v-m-card", {
      scrollTrigger: {
        trigger: ".vm-section",
        start: "top 75%",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });

    // Core Values Horizontal Scroll
    const pinWrap = valuesScrollRef.current;
    if (pinWrap && valuesRef.current) {
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
          trigger: valuesRef.current,
          pin: valuesRef.current,
          pinSpacing: true,
          start: "center center",
          end: () => `+=${pinWrapWidth + 500}`, // added 500px extra scroll padding so it doesn't collide
          invalidateOnRefresh: true,
        },
        x: () => -horizontalScrollLength!,
        ease: "none"
      });

      ScrollTrigger.addEventListener("refreshInit", refresh);
    }

    // Future Parallax
    gsap.to(".future-bg", {
      scrollTrigger: {
        trigger: ".future-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      yPercent: 30,
      ease: "none"
    });

    // Enforce massive recalculation to defeat Next.js lazy layout shifts
    let timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col w-full min-h-screen bg-black text-white">
      {/* 1. Cinematic Dark Hero */}
      <section className="relative w-full h-[60vh] overflow-hidden bg-black text-white flex items-center justify-center border-b border-primary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2669')` }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <h1 className="about-header-text text-5xl md:text-8xl font-black uppercase tracking-tight leading-none text-white/90 drop-shadow-2xl mb-8">
            About AGRYEN
          </h1>
          <p className="about-header-text text-xl md:text-3xl font-light text-primary tracking-wide uppercase border border-primary/40 px-8 py-3 rounded-full inline-block backdrop-blur-md bg-black/40">
            Innovating Across Industries.
          </p>
        </div>
      </section>

      {/* 2. Our Story (Light Theme) */}
      <section className="story-section pt-32 pb-16 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="story-para text-4xl lg:text-5xl font-black mb-12 tracking-widest uppercase text-black">Our Story</h2>
            <p className="story-para text-black/70 leading-relaxed max-w-3xl mx-auto mb-8 font-medium text-xl">
              AGRYEN began with a simple but powerful idea: that the most transformative innovations 
              happen at the intersection of different industries. What started as a focused smart home 
              automation business has evolved into a multi-division global powerhouse.
            </p>
            <p className="story-para text-black/70 leading-relaxed font-medium text-xl max-w-3xl mx-auto">
              Today, AGRYEN acts as the parent company overseeing distinct but highly synergistic divisions. 
              Our growth vision is simple: bring high-quality, smart, and sustainable solutions to every 
              major pillar of modern infrastructure—from the software that runs businesses to the 
              solar panels that power them, and the buildings that house them.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission (Tight spacing, matched background) */}
      <section className="vm-section pb-32 pt-16 bg-black border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="v-m-card bg-secondary/40 backdrop-blur-xl p-12 rounded-3xl border border-white/5 flex flex-col items-start hover:border-primary/50 transition-colors duration-500 shadow-2xl group">
              <Target className="w-16 h-16 text-primary mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" />
              <h2 className="text-3xl font-black mb-6 tracking-widest uppercase text-white">Our Vision</h2>
              <p className="text-xl text-white/60 leading-relaxed font-light">
                To be the global benchmark for cross-industry excellence. We envision a future where 
                smart technology, renewable energy, robust infrastructure, and advanced healthcare 
                work together seamlessly under the AGRYEN umbrella to improve lives globally.
              </p>
            </div>
            <div className="v-m-card bg-secondary/40 backdrop-blur-xl p-12 rounded-3xl border border-white/5 flex flex-col items-start hover:border-primary/50 transition-colors duration-500 shadow-2xl group">
              <Trophy className="w-16 h-16 text-primary mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" />
              <h2 className="text-3xl font-black mb-6 tracking-widest uppercase text-white">Our Mission</h2>
              <p className="text-xl text-white/60 leading-relaxed font-light">
                To deliver scalable, high-quality solutions by leveraging deeply specialized expertise 
                in each of our divisions, while maintaining the unified standard of excellence, 
                reliability, and customer focus that defines AGRYEN.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section ref={valuesRef} className="values-section bg-secondary text-white overflow-hidden w-full h-screen flex flex-col justify-center relative shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] border-b border-primary/20">
        <div className="absolute top-16 left-8 md:left-16 z-10 hidden sm:block">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-widest uppercase w-max text-white border-b border-primary pb-4">Core Values</h2>
        </div>

        <div className="container-fluid w-full h-[60vh] flex items-center">
          <div ref={valuesScrollRef} className="core-values-strip flex gap-8 px-8 md:px-32 h-full items-center w-max">
            {[
              { title: "Integrity", icon: <Shield className="w-12 h-12"/>, desc: "Honesty and transparency in absolutely all of our deals and processes." },
              { title: "Innovation", icon: <Zap className="w-12 h-12"/>, desc: "Constantly pushing tech boundaries to discover better solutions." },
              { title: "Quality", icon: <Trophy className="w-12 h-12"/>, desc: "Zero compromises on deliverables across any division." },
              { title: "Customer Focus", icon: <Globe className="w-12 h-12"/>, desc: "Your success is practically wired directly into our internal goals." },
            ].map((v, i) => (
              <div key={i} className="w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] h-[50vh] flex-shrink-0 relative group rounded-3xl overflow-hidden bg-white/95 border border-primary/20 flex flex-col justify-center text-center p-6 md:p-8 hover:border-primary/50 transition-colors shadow-2xl">
                <div className="text-primary w-20 h-20 md:w-24 md:h-24 mx-auto bg-black border border-primary/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 shadow-[0_0_15px_rgba(172,146,95,0.3)] transition-all duration-500">
                  {v.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 text-black uppercase tracking-widest">{v.title}</h3>
                <p className="text-black/70 text-lg md:text-xl font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Future Direction */}
      <section className="future-section relative py-40 bg-black text-white overflow-hidden">
        <div className="future-bg absolute inset-0 -top-[50%] bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Clock className="w-24 h-24 mx-auto mb-10 text-primary drop-shadow-[0_0_15px_rgba(172,146,95,0.5)]" />
          <h2 className="text-4xl lg:text-5xl font-black mb-8 tracking-widest uppercase">Future Direction</h2>
          <p className="text-2xl mb-8 text-white/60 leading-relaxed font-light px-4">
            AGRYEN is not stopping here. Our roadmap includes aggressive expansion plans, 
            the creation of new specialized divisions, and entry into highly competitive international markets.
          </p>
        </div>
      </section>
    </div>
  );
}
