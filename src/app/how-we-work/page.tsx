"use client";

import { useRef } from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowWeWorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { name: "Consultation", desc: "We sit down to understand your exact requirements and pain points." },
    { name: "Requirement Analysis", desc: "Our analysts draft a comprehensive scope document." },
    { name: "Planning", desc: "We map out the architecture, timeline, resources, and budget." },
    { name: "Execution", desc: "Our specialized division gets to work, providing transparent updates." },
    { name: "Delivery", desc: "Quality assurance checks followed by official handover." },
    { name: "Support", desc: "Long-term maintenance and warranty fulfillment." }
  ];

  useGSAP(() => {
    // Header fade-in
    gsap.from(".work-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Step cards scroll animation
    const stepCards = gsap.utils.toArray<HTMLElement>(".step-card");
    stepCards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        scale: 0.9,
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.2)"
      });
    });

    // Arrow down animations continuous bounce
    const arrows = gsap.utils.toArray<HTMLElement>(".step-arrow");
    arrows.forEach(arrow => {
      gsap.fromTo(arrow, 
        { y: -10 },
        { 
          y: 10, 
          duration: 1, 
          repeat: -1, 
          yoyo: true, 
          ease: "sine.inOut" 
        }
      );
    });

    // Final quality assure box
    gsap.from(".quality-box", {
      scrollTrigger: {
        trigger: ".quality-box",
        start: "top 90%"
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col w-full min-h-screen bg-black text-white">
      {/* 1. Cinematic Dark Hero */}
      <section className="relative w-full h-[60vh] overflow-hidden flex items-center justify-center border-b border-primary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542744173-053264015859?q=80&w=2670')` }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10 mt-16">
          <h1 className="work-header text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase drop-shadow-2xl text-white/90">How We Work</h1>
          <p className="work-header text-xl md:text-3xl text-primary uppercase tracking-widest font-light border border-primary/40 px-8 py-3 rounded-full inline-block backdrop-blur-md bg-black/30">The 6-Step AGRYEN Standard.</p>
        </div>
      </section>

      {/* 2. Timeline Flow */}
      <section className="py-32 bg-secondary/20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672')] bg-cover bg-fixed bg-center relative">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="step-card w-full bg-white/95 border border-primary/20 rounded-3xl p-8 flex items-center shadow-2xl backdrop-blur-md hover:bg-white hover:border-primary/50 transition-all duration-300">
                  <div className="bg-primary text-black border border-black w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl flex-shrink-0 mr-8 shadow-[0_0_15px_rgba(172,146,95,0.3)]">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-3 tracking-tight text-black uppercase">{step.name}</h3>
                    <p className="text-lg text-black/70 font-medium">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="py-8">
                    <ArrowDown className="step-arrow text-primary w-10 h-10 drop-shadow-[0_0_10px_rgba(172,146,95,0.8)]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="quality-box mt-32 bg-black/80 p-12 rounded-3xl border border-primary/50 text-center shadow-[0_0_40px_rgba(172,146,95,0.2)] relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            
            <CheckCircle2 className="relative z-10 w-24 h-24 text-primary mx-auto mb-8 drop-shadow-[0_0_15px_rgba(172,146,95,0.5)]" />
            <h3 className="relative z-10 text-4xl font-black mb-6 tracking-tighter uppercase text-white">Quality Assured</h3>
            <p className="relative z-10 text-xl text-white/70 leading-relaxed font-light">
              This standardized process is enforced across every single division of AGRYEN to guarantee predictable, high-quality outcomes regardless of industry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
