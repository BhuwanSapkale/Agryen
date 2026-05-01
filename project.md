# AGRYEN Project Documentation: A Deep Dive into Cinematic Web Engineering

This document provides a comprehensive technical overview of the AGRYEN website, a high-performance, cinematic corporate platform built with Next.js and advanced animation libraries.

---

## 1. Core Tech Stack & Dependencies

- **Framework**: Next.js 16.2.4 (App Router)
- **Animation**: GSAP (GreenSock Animation Platform) 3.15.0
  - Plugins: ScrollTrigger, SplitText, MorphSVG, Flip, Observer
- **Styling**: Tailwind CSS 4
- **Smooth Scroll**: Lenis 1.3.23 (Inertial Scrolling)
- **Icons**: Lucide React

---

## 2. Key Components & Animations

### **A. Hero Section (`HeroAnimated.tsx`)**
- **Cinematic Reveal**: Uses a dual-wrapper parallax system (`hero-outer` and `hero-inner`) to create a window-reveal effect.
- **FOUC Protection**: Implements `immediateRender: false` on GSAP timelines and inline `style` visibility guards to ensure zero flicker on initial load.
- **Content**: Features a multi-slide cinematic intro starting with the "AGRYEN" brand name, a premium gold logo icon, and the Sanskrit subtext "लोकजीवनस्य उन्नतिः".
- **Dynamic Text**: Uses `SplitText` for character-by-character reveals of both the main brand name and the Sanskrit subtext, synchronized with scroll position.

### **B. Across The Board & Core Values**
- **Architecture**: Transitions from horizontal scrolling to a **Vertical Alternating Layout**.
- **Visuals**: Light-themed cards (White background, Black text) for maximum readability against the site's dark core.
- **Entrance**: Implements alternating `x` offsets (Left-Right-Left) triggered by `ScrollTrigger` as the user scrolls.

### **C. Process Timeline (`HowWeWorkPage`)**
- **Animation Logic**: Uses a **Triggered Animation System** instead of a scrub.
  - **Start**: `top 95%` (Instant feedback as the card enters the viewport).
  - **Ease**: `power2.out` for a snappy, responsive feel.
- **Performance**: Removed `bg-fixed` and added `will-change` hints to cards to ensure 60fps scrolling on mobile devices.
- **Mobile Layout**: Responsive stacking where process numbers sit vertically above the description text.

### **D. Scroll Navigation Menu (`scroll-navigation-menu.tsx`)**
- **Mobile UX**: 
  - **Centered Modal**: A floating card-style menu that is vertically centered using `flex items-center`.
  - **Adaptive Height**: Uses `max-h-[80vh]` with internal `overflow-y-auto` to prevent cutoff on small screens.
  - **Cutoff Prevention**: Implements significant internal bottom padding (`pb-32`) to ensure all links are scrollable and visible.
  - **UI Clarity**: Close button (`X`) is placed in a dedicated header row to avoid overlap with the "Home" link.
- **Behavior**: An adaptive navbar that morphs into a floating hamburger button upon scrolling 100px.

---

## 3. Global Optimizations

- **Mobile Overflow Lock**: `overflow-x: hidden` is enforced globally on `html` and `body` to prevent horizontal scrollbars during entrance animations.
- **Responsive Buttons**: Global call-to-action buttons use `flex-col md:flex-row` to stack vertically on mobile while maintaining side-by-side alignment on desktop.
- **Layout Stability**: Centralized `ScrollTrigger.refresh()` logic with a `500ms` delay on hydration to account for Next.js layout shifts.

---

## 4. Contact & Global Identity

- **Headquarters**: Updated to Amravati, Maharashtra, reflecting the company's regional hub.
- **Visual Identity**: Integrated a custom-generated minimalist gold logo icon across the hero section to reinforce the premium brand aesthetic.
- **Contact Details**: Global reach maintained via `contact@agryen.com` and a dedicated support line at `+91 75888 76025`.
