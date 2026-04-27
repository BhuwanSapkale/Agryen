"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

export function ScrollingTextLoop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scrollingText = gsap.utils.toArray<HTMLElement>('.rail h4');
    if (!scrollingText.length) return;

    // The user's provided helper function
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

    const tl = horizontalLoop(scrollingText, {
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
        .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
        .to(tl, { timeScale: factor > 0 ? 1 : -1, duration: 1 }, "+=0.3"); // fallback to normal timescale
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-secondary text-white overflow-hidden flex flex-col items-center justify-center">
      
      <div className="scrolling-text w-full overflow-hidden flex whitespace-nowrap mb-12 cursor-default">
        <div className="rail flex items-center">
          <h4 className="text-6xl md:text-9xl font-black uppercase text-transparent tracking-tighter mx-4" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>Ready To Work With Us? • </h4>
          <h4 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-4 text-white/90"> Whether you need enterprise software, a commercial solar installation • </h4>
          <h4 className="text-6xl md:text-9xl font-black uppercase text-transparent tracking-tighter mx-4" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>or smart home integration, we have the team to deliver. • </h4>
          {/* Duplicates to handle initial width issues if screen is too wide */}
          <h4 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-4 hover:italic text-white">Ready To Work With Us? • </h4>
          <h4 className="text-6xl md:text-9xl font-black uppercase text-transparent tracking-tighter mx-4 hover:italic" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}> Whether you need enterprise software, a commercial solar installation • </h4>
          <h4 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-4 text-white/90">or smart home integration, we have the team to deliver. • </h4>
        </div>
      </div>

      <div className="mt-8 flex gap-6 z-10 relative">
        <a href="/contact" className="inline-flex items-center justify-center h-14 px-8 text-lg bg-white text-black hover:bg-white/90 rounded-full font-bold">
          Contact Us Today
        </a>
        <a href="/divisions" className="inline-flex items-center justify-center h-14 px-8 text-lg border border-white text-white hover:bg-white/10 rounded-full font-bold">
          Explore Services
        </a>
      </div>
    </section>
  );
}
