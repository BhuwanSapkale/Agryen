"use client";

import React, { useRef } from "react";
import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { MorphSVGPlugin } from "gsap-trial/MorphSVGPlugin";
import { Observer } from "gsap-trial/Observer";
import { useGSAP } from "@gsap/react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, Observer);
}

const downPath = 'M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z';
const centerPath = 'M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z';

export function WhyChooseUsMorph() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Morph Animation Logic
    ScrollTrigger.create({
      trigger: '.morph-trigger-zone',
      start: 'top bottom',
      toggleActions: 'play pause resume reverse',
      onEnter: (self) => {
        const velocity = self.getVelocity();
        // Fallback for variation in case velocity is extremely high or 0
        const variation = Math.min(Math.max(Math.abs(velocity) / 3000, 0.1), 0.9);

        gsap.fromTo('#bouncy-path', {
          morphSVG: downPath
        }, {
          duration: 2,
          morphSVG: centerPath,
          ease: `elastic.out(${1 + variation}, ${1 - variation})`,
          overwrite: 'auto'
        });
      }
    });

    // Scrolling Marquee Logic
    const scrollingText = gsap.utils.toArray<HTMLElement>('.rail h4');
    if (scrollingText.length) {
      function horizontalLoop(items: HTMLElement[], config: any) {
        items = gsap.utils.toArray(items);
        config = config || {};
        let tl: gsap.core.Timeline = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); }
          }),
          length = items.length,
          startX = items[0].offsetLeft,
          times = [],
          widths: number[] = [],
          xPercents: number[] = [],
          curIndex = 0,
          pixelsPerSecond = (config.speed || 1) * 100,
          snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
          totalWidth: number, curX: number, distanceToStart: number, distanceToLoop: number, item: HTMLElement, i: number;
        
        gsap.set(items, {
          xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 + (gsap.getProperty(el, "xPercent") as number));
            return xPercents[i];
          }
        });
        gsap.set(items, { x: 0 });
        totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) + (parseFloat(config.paddingRight) || 0);
        
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX;
          distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
          tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        
        if (config.reversed) {
          tl.vars.onReverseComplete && tl.vars.onReverseComplete();
          tl.reverse();
        }
        return tl;
      }

      const loopTl = horizontalLoop(scrollingText, {
        repeat: -1,
        paddingRight: 30,
      });

      Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onChangeY(self) {
          let factor = 2.5;
          if (self.deltaY < 0) {
            factor *= -1;
          }
          gsap.timeline({
            defaults: {
              ease: "none",
            }
          })
          .to(loopTl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
          .to(loopTl, { timeScale: factor > 0 ? 1 : -1, duration: 1 }, "+=0.3");
        }
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col w-full relative bg-background">
      
      {/* 1. SCROLLING MARQUEE (Merged Native Component) */}
      <section className="pt-32 pb-48 bg-secondary text-white flex flex-col items-center justify-center -mb-8 relative z-20">
        <div className="scrolling-text w-full overflow-hidden flex whitespace-nowrap mb-16 cursor-default">
          <div className="rail flex items-center">
            <h4 className="text-6xl md:text-9xl font-black uppercase text-transparent tracking-tighter mx-4" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>Ready To Work With Us? • </h4>
            <h4 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-4 text-white/90"> Whether you need enterprise software, a commercial solar installation • </h4>
            <h4 className="text-6xl md:text-9xl font-black uppercase text-transparent tracking-tighter mx-4" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>or smart home integration, we have the team to deliver. • </h4>
            <h4 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-4 hover:italic text-white">Ready To Work With Us? • </h4>
            <h4 className="text-6xl md:text-9xl font-black uppercase text-transparent tracking-tighter mx-4 hover:italic" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}> Whether you need enterprise software, a commercial solar installation • </h4>
            <h4 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-4 text-white/90">or smart home integration, we have the team to deliver. • </h4>
          </div>
        </div>

        <div className="flex gap-6 z-10 relative">
          <a href="/contact" className="inline-flex items-center justify-center h-14 px-8 text-lg bg-white text-black hover:bg-white/90 rounded-full font-black uppercase shadow-xl transition-transform hover:scale-105">
            Contact Us Today
          </a>
          <a href="/divisions" className="inline-flex items-center justify-center h-14 px-8 text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-black uppercase transition-all hover:scale-105">
            Explore Services
          </a>
        </div>
      </section>

      {/* 2. SVG MORPH & WHY CHOOSE US FOOTER (Unified Wrapper) */}
      <div className="relative w-full h-auto z-10 morph-trigger-zone">
        <svg 
          preserveAspectRatio="none" 
          id="footer-img" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 2278 683"
          className="w-full h-full text-foreground fill-current -mb-1 block drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="grad-1" x1="0" y1="0" x2="2278" y2="683" gradientUnits="userSpaceOnUse">
              <stop offset="0.2" stopColor="var(--background)"></stop>
              <stop offset="0.8" stopColor="var(--background)"></stop>
            </linearGradient>
          </defs>
          <path id="bouncy-path" d={centerPath} className="text-background fill-current" />
        </svg>
        
        {/* Content underneath the wave */}
        <div className="bg-background text-foreground w-full pb-32 pt-16 -mt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">Why Choose AGRYEN?</h2>
                <ul className="grid grid-cols-1 gap-8">
                  {[
                    { title: "Cross-Industry Innovation", desc: "We bring best practices from software into construction, from solar into smart homes." },
                    { title: "Uncompromising Quality", desc: "Rigorous standards applied across every project and every division." },
                    { title: "Customer-Centric Approach", desc: "Your success is our primary metric. We build solutions around your needs." }
                  ].map((item, i) => (
                    <li key={i} className="flex flex-col p-8 rounded-3xl bg-muted/30 border hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-10 h-10 text-primary mb-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-2xl mb-2">{item.title}</h4>
                        <p className="opacity-80 text-lg leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Restored Corporate Image */}
              <div className="rounded-3xl overflow-hidden min-h-[400px] md:h-full md:min-h-[600px] shadow-2xl relative w-full border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670" 
                  alt="Customer Centric Approach" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
