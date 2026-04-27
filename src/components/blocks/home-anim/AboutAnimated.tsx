"use client";

import React, { useRef } from "react";
import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const listData = ["Cross-Industry Innovation", "Uncompromising Quality", "Customer-Centric Approach", "Sustainable Scalability"];
const images = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2542&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1542382103-68d874ee5d64?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
];

export function AboutAnimated() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const listItems = gsap.utils.toArray<HTMLElement>(".about-li");
    const slides = gsap.utils.toArray<HTMLElement>(".about-slide");
    const fill = document.querySelector(".about-fill") as HTMLElement;

    if (!listItems.length || !slides.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pin-section",
        start: "top top",
        end: `+=${listItems.length * 80}%`, // Gives plenty of scroll space to read each point
        pin: true,
        scrub: true,
      }
    });

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
          .to(slides[i], {
              autoAlpha: 1,
              duration: 0.2
            }, "<")
          .set(previousItem, { color: "var(--muted-foreground)" }, "<")
          .to(slides[i - 1], {
              autoAlpha: 0,
              duration: 0.2
            }, "<");
      } else {
        gsap.set(item, { color: "var(--primary)" });
        gsap.set(slides[i], { autoAlpha: 1 });
      }
    });

    if (fill) {
      tl.to(fill, {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration()
        }, 0
      ).to({}, {}); // small pause at end
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white text-black w-full relative">
      <section className="section py-20 flex justify-center items-center h-[30vh] bg-white">
        <h3 className="text-xl md:text-3xl uppercase tracking-widest text-black/40">Our Commitment</h3>
      </section>
      
      <section className="section pin-section h-screen w-full flex items-center justify-center p-8 bg-white">
        <div className="content max-w-6xl w-full h-[60vh] flex flex-col md:flex-row relative">
          
          {/* Left Text List */}
          <div className="left flex-1 relative flex items-center">
            <div className="about-fill absolute left-0 top-0 w-1 h-full bg-primary origin-top shadow-[0_0_10px_rgba(172,146,95,0.5)]"></div>
            <ul className="list space-y-6 md:space-y-12 pl-8">
              {listData.map((text, i) => (
                <li key={i} className="about-li text-4xl md:text-6xl font-black uppercase tracking-tight text-black/10 transition-colors duration-300">
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image Slides */}
          <div className="right flex-1 relative mt-12 md:mt-0 ml-0 md:ml-12 overflow-hidden rounded-3xl shadow-2xl">
            {images.map((src, i) => (
              <div key={i} className="about-slide absolute inset-0 w-full h-full flex items-center justify-center opacity-0 invisible" style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}>
                <img src={src} alt="" className="w-full h-full object-cover rounded-3xl" />
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="section py-20 flex justify-center items-center h-[30vh] bg-white">
        <h3 className="text-xl md:text-3xl uppercase tracking-widest text-black/20">A Unified Standard</h3>
      </section>
    </div>
  );
}
