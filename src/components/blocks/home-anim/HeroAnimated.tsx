"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer, SplitText, ScrollTrigger);
}

const slides = [
  { 
    text: "AGRYEN", 
    subtext: "लोकजीवनस्य उन्नतिः", 
    logo: "/chatgpt-logo-transparent.png",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2669" 
  },
  { text: "Smart Home Automation", img: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2672" },
  { text: "Software Solutions", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672" },
  { text: "Renewable Energy", img: "https://images.unsplash.com/photo-1509391366360-12009a30f1aa?auto=format&fit=crop&q=80&w=2672" },
  { text: "Advanced Infrastructure", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2672" },
  { text: "Pharmaceuticals", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=2672" }
];

export function HeroAnimated() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    let sections = gsap.utils.toArray<HTMLElement>(".hero-section");
    let images = gsap.utils.toArray<HTMLElement>(".hero-bg");
    let headings = gsap.utils.toArray<HTMLElement>(".hero-heading");
    let outerWrappers = gsap.utils.toArray<HTMLElement>(".hero-outer");
    let innerWrappers = gsap.utils.toArray<HTMLElement>(".hero-inner");
    let logos = gsap.utils.toArray<HTMLElement>(".hero-logo");
    let subtexts = gsap.utils.toArray<HTMLElement>(".hero-subtext");
    
    // Split Headings
    let splitHeadings = headings.map(heading => {
      gsap.set(heading, { color: "white" });
      return new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" });
    });

    // Split Subtexts if they exist
    let splitSubtexts = subtexts.map(subtext => {
      return new SplitText(subtext, { type: "chars,words,lines", linesClass: "clip-text" });
    });

    // Make all sections invisible except the first one
    gsap.set(sections, { autoAlpha: 0, zIndex: 0 });
    gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });
    
    // Set the initial physical state of the hidden slides
    gsap.set(outerWrappers.slice(1), { yPercent: 100 });
    gsap.set(innerWrappers.slice(1), { yPercent: -100 });
    gsap.set(images.slice(1), { yPercent: 15 });

    // Initial animation for the first slide immediately on page load
    const introTl = gsap.timeline();

    introTl.fromTo(splitHeadings[0].chars, {
      yPercent: 150,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power2.out",
      duration: 1,
      immediateRender: false
    });
    
    if (logos[0]) {
      introTl.fromTo(logos[0], {
        yPercent: 150,
        opacity: 0,
      }, {
        yPercent: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1,
        immediateRender: false
      }, "<");
    }

    if (splitSubtexts[0]) {
      introTl.fromTo(splitSubtexts[0].chars, {
        yPercent: 150,
        opacity: 0,
      }, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "power2.out",
        duration: 1,
        immediateRender: false
      }, "<");
    }
    
    // Create an indestructible scrubbed timeline locked to ScrollTrigger natively
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      }
    });

    // Loop through and stack each slide's animation
    sections.forEach((section, index) => {
      if (index === 0) return; // Skip slide zero as it's already visible
      
      tl.to(section, { autoAlpha: 1, zIndex: 1, duration: 0.01 })
        .to(splitHeadings[index - 1].chars, { opacity: 0, yPercent: -100, duration: 0.8, ease: "power2.inOut", stagger: 0.01 }, "<")
        .to(images[index - 1], { yPercent: -15, duration: 1 }, "<");
      
      // Animate out logo and subtext of previous slide if they exist
      if (logos[index - 1]) {
        tl.to(logos[index - 1], { opacity: 0, yPercent: -100, duration: 0.8, ease: "power2.inOut" }, "<");
      }
      if (splitSubtexts[index - 1]) {
        tl.to(splitSubtexts[index - 1].chars, { opacity: 0, yPercent: -100, duration: 0.8, ease: "power2.inOut", stagger: 0.01 }, "<");
      }

      tl.to([outerWrappers[index], innerWrappers[index]], { yPercent: 0, duration: 1, ease: "power2.inOut" }, "<") 
        .to(images[index], { yPercent: 0, duration: 1 }, "<") 
        .fromTo(splitHeadings[index].chars, {
          yPercent: 150,
          opacity: 0,
        }, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.02,
          ease: "power2.out",
          duration: 0.8
        }, "-=0.2")
        .to(sections[index - 1], { autoAlpha: 0, duration: 0.01 }); 
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      {slides.map((slide, i) => (
        <section key={i} className="hero-section absolute top-0 left-0 w-full h-full" style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}>
          <div className="hero-outer w-full h-full overflow-hidden">
            <div className="hero-inner w-full h-full overflow-hidden">
              <div 
                className={`hero-bg w-full h-full bg-cover bg-center flex flex-col items-center justify-center relative`}
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="z-10 flex flex-col items-center text-center px-6">
                  {slide.logo && (
                    <div className="overflow-hidden mb-8">
                      <div className="hero-logo">
                        <Image 
                          src={slide.logo} 
                          alt="Agryen Logo" 
                          width={240} 
                          height={240} 
                          className="w-32 md:w-48 lg:w-56 h-auto drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  )}
                  
                  <h2 className="hero-heading text-[2.2rem] md:text-6xl lg:text-8xl font-black uppercase tracking-tight leading-[1.1] text-white/90 drop-shadow-2xl">
                    {slide.text}
                  </h2>

                  {slide.subtext && (
                    <p className="hero-subtext mt-6 text-xl md:text-3xl lg:text-4xl font-medium tracking-widest text-primary/90 drop-shadow-lg whitespace-nowrap">
                      {slide.subtext}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

