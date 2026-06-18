"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
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
  { text: "Renewable Energy", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2672", position: "bg-bottom" },
  { text: "Advanced Infrastructure", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2672" },
  { text: "Pharmaceuticals", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=2672" }
];

export function HeroAnimated() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  useGSAP(() => {
    const slidesElements = gsap.utils.toArray<HTMLElement>(".hero-slide");
    const bgElements = gsap.utils.toArray<HTMLElement>(".hero-bg");
    const headingElements = gsap.utils.toArray<HTMLElement>(".hero-heading");
    const subtextElements = gsap.utils.toArray<HTMLElement>(".hero-subtext");
    const logoElements = gsap.utils.toArray<HTMLElement>(".hero-logo");

    const prevIndex = prevIndexRef.current;

    // Clean up previous timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const activeSlide = slidesElements[activeIndex];
    const prevSlide = slidesElements[prevIndex];

    const activeBg = bgElements[activeIndex];
    const prevBg = bgElements[prevIndex];

    const activeHeading = headingElements[activeIndex];
    const prevHeading = headingElements[prevIndex];

    const activeSubtext = subtextElements[activeIndex];
    const prevSubtext = subtextElements[prevIndex];

    const activeLogo = logoElements[activeIndex];
    const prevLogo = logoElements[prevIndex];

    const activeBar = `.indicator-bar-${activeIndex}`;

    // Create main slide cycle timeline (5.5 seconds)
    const tl = gsap.timeline({
      onComplete: () => {
        prevIndexRef.current = activeIndex;
        nextSlide();
      }
    });
    timelineRef.current = tl;

    // Set visibility states
    gsap.set(activeSlide, { zIndex: 10, autoAlpha: 1 });
    if (activeIndex !== prevIndex) {
      gsap.set(prevSlide, { zIndex: 5 });
    }

    // Outgoing transitions (runs immediately if index changed)
    if (activeIndex !== prevIndex) {
      tl.to(prevSlide, {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0);

      tl.to(prevBg, {
        scale: 0.95,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0);

      tl.to(prevHeading, {
        opacity: 0,
        yPercent: -50,
        duration: 0.6,
        ease: "power2.in"
      }, 0);

      if (prevSubtext) {
        tl.to(prevSubtext, {
          opacity: 0,
          yPercent: -30,
          duration: 0.6,
          ease: "power2.in"
        }, 0);
      }

      if (prevLogo) {
        tl.to(prevLogo, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.in"
        }, 0);
      }
    }

    // Incoming transitions & Ken Burns zoom
    gsap.set(activeBg, { scale: 1.08 });
    tl.to(activeBg, {
      scale: 1.0,
      duration: 2.5,
      ease: "sine.out"
    }, 0);

    // Active Indicator line fill
    gsap.set(activeBar, { width: "0%" });
    tl.to(activeBar, {
      width: "100%",
      duration: 2.5,
      ease: "none"
    }, 0);

    // Synchronize static states of other indicators
    slides.forEach((_, idx) => {
      if (idx !== activeIndex) {
        gsap.set(`.indicator-bar-${idx}`, { width: idx < activeIndex ? "100%" : "0%" });
      }
    });

    // Split text reveal animation for header text
    if (activeHeading) {
      const split = new SplitText(activeHeading, { type: "chars,words,lines", linesClass: "clip-text" });
      gsap.set(activeHeading, { opacity: 1, yPercent: 0 });
      gsap.set(split.chars, { opacity: 0, yPercent: 120 });
      tl.to(split.chars, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.02,
        ease: "power3.out",
        duration: 0.8
      }, 0.2);
    }

    // Split text reveal for Sanskrit subtext
    if (activeSubtext) {
      const splitSub = new SplitText(activeSubtext, { type: "chars,words,lines", linesClass: "clip-text" });
      gsap.set(activeSubtext, { opacity: 1, yPercent: 0 });
      gsap.set(splitSub.chars, { opacity: 0, yPercent: 100 });
      tl.to(splitSub.chars, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.015,
        ease: "power3.out",
        duration: 0.8
      }, 0.4);
    }

    // Logo reveal animation
    if (activeLogo) {
      gsap.set(activeLogo, { opacity: 0, scale: 0.8 });
      tl.to(activeLogo, {
        opacity: 1,
        scale: 1,
        ease: "back.out(1.2)",
        duration: 1.0
      }, 0.2);
    }

    // Save current index
    prevIndexRef.current = activeIndex;

  }, { dependencies: [activeIndex], scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      {slides.map((slide, i) => (
        <section
          key={i}
          className="hero-slide absolute inset-0 w-full h-full overflow-hidden"
          style={{
            opacity: i === 0 ? 1 : 0,
            visibility: i === 0 ? 'visible' : 'hidden',
            zIndex: i === 0 ? 10 : 1
          }}
        >
          {/* Background image container for smooth scaling */}
          <div
            className={`hero-bg absolute inset-0 bg-cover ${slide.position || 'bg-center'}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
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
              <p className="hero-subtext mt-4 text-base sm:text-xl md:text-3xl lg:text-4xl font-medium tracking-wider sm:tracking-widest text-primary/90 drop-shadow-lg whitespace-normal sm:whitespace-nowrap">
                {slide.subtext}
              </p>
            )}
          </div>
        </section>
      ))}

      {/* Modern Horizontal Navigation Line Indicators at the bottom */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2 sm:space-x-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="group flex flex-col items-start focus:outline-none cursor-pointer"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-1.5 transition-colors duration-300 ${i === activeIndex ? 'text-primary' : 'text-white/40 group-hover:text-white/80'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="w-8 sm:w-12 md:w-20 h-[3px] bg-white/20 rounded-full overflow-hidden relative">
              <div
                className={`absolute top-0 left-0 h-full bg-primary rounded-full indicator-bar indicator-bar-${i}`}
                style={{ width: i < activeIndex ? '100%' : '0%' }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Side Navigation Chevron Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-primary text-white hover:text-black border border-white/10 hover:border-primary transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none hidden sm:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-primary text-white hover:text-black border border-white/10 hover:border-primary transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none hidden sm:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
