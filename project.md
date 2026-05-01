# AGRYEN Project Documentation: A Deep Dive into Cinematic Web Engineering

This document provides a comprehensive technical overview of the AGRYEN website, a high-performance, cinematic corporate platform built with Next.js and advanced animation libraries.

---

## 1. Core Tech Stack & Dependencies

- **Next.js 16.2.4 (App Router)**
- **GSAP (GreenSock Animation Platform) 3.15.0**
  - ScrollTrigger, SplitText, MorphSVG, Flip, Observer
- **Tailwind CSS 4**
- **Lenis 1.3.23** (Smooth Scrolling)

---

## 2. Key Components & Animations

### **A. Hero Section (`HeroAnimated.tsx`)**
- **Cinematic Reveal**: Uses parallax reveal with `outerWrapper` and `innerWrapper`.
- **FOUC Fix**: Implements inline styles and `gsap.fromTo` with `immediateRender: false` for perfect initial rendering.
- **Title Slide**: Features "AGRYEN" as the first cinematic entry.

### **B. Across The Board (`DivisionsHorizontal.tsx`)**
- **Layout**: Vertical alternating cards with light-themed styling (white bg, black text).
- **Animations**: Alternating left-to-right and right-to-left slide-ins using `ScrollTrigger`.
- **Responsive**: Stacks into a clean vertical list on mobile devices.

### **C. Core Values (`about/page.tsx`)**
- **Layout**: Similar to the Divisions section, using vertical alternating cards with light-themed backgrounds.
- **Animations**: Snap-in entrance effects from alternating sides for a dynamic reading experience.

### **D. Process Timeline (`HowWeWorkPage`)**
- **Performance**: Removed `bg-fixed` to eliminate mobile scroll jank.
- **Cinematic Feel**: Implemented `scrub: 1` on card animations for perfect scroll-synchronization.
- **Trigger**: Starts at `top bottom` for immediate entry.
- **Mobile Layout**: Responsive stacking of process steps for vertical readability.

### **E. Navigation Menu (`scroll-navigation-menu.tsx`)**
- **Mobile UX**: Hidden scrollbars on the top-down menu overlay for a cleaner, premium aesthetic.
- **Behavior**: Adaptive navbar that switches to a floating hamburger on scroll.
- **Mobile Lock**: `overflow-x: hidden` enforced globally to prevent animation-induced scroll breakage.
- **Layout Stability**: Centralized `ScrollTrigger.refresh()` logic on route changes.
