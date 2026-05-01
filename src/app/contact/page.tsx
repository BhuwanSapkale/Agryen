"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollingTextLoop } from "@/components/blocks/home-anim/ScrollingTextLoop";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header
    gsap.from(".contact-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Info blocks
    gsap.from(".contact-info-block", {
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 80%"
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Map
    gsap.from(".contact-map", {
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 80%"
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: "power2.out"
    });

    // Form
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 80%"
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });

    // Inputs inside form stagger
    gsap.from(".contact-input", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 85%"
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.5)"
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
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2670')` }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10 mt-16">
          <h1 className="contact-header text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase drop-shadow-2xl text-white/90">Contact Us</h1>
          <p className="contact-header text-xl md:text-3xl text-primary uppercase tracking-widest font-light border border-primary/40 px-8 py-3 rounded-full inline-block backdrop-blur-md bg-black/30 w-max mx-auto">
            AGRYEN Global Hub
          </p>
        </div>
      </section>

      <section className="py-32 bg-white contact-grid border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-8 tracking-tighter uppercase text-black">Get In Touch</h2>
              <div className="space-y-8">
                <div className="contact-info-block flex items-center p-6 rounded-2xl bg-secondary/5 border border-primary/10 hover:bg-secondary/10 transition-colors group">
                  <div className="w-16 h-16 bg-black border border-primary/30 text-primary rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(172,146,95,0.2)]">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-wider text-primary">Headquarters</h3>
                    <p className="text-black/70 text-lg font-medium">amravati maharashtra</p>
                  </div>
                </div>
                <div className="contact-info-block flex items-center p-6 rounded-2xl bg-secondary/5 border border-primary/10 hover:bg-secondary/10 transition-colors group">
                  <div className="w-16 h-16 bg-black border border-primary/30 text-primary rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(172,146,95,0.2)]">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-wider text-primary">Phone</h3>
                    <p className="text-black/70 text-lg font-medium">+91 75888 76025</p>
                  </div>
                </div>
                <div className="contact-info-block flex items-center p-6 rounded-2xl bg-secondary/5 border border-primary/10 hover:bg-secondary/10 transition-colors group">
                  <div className="w-16 h-16 bg-black border border-primary/30 text-primary rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(172,146,95,0.2)]">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-wider text-primary">Email</h3>
                    <p className="text-black/70 text-lg font-medium">contact@agryen.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="contact-map w-full h-[400px] bg-black rounded-3xl border border-primary/20 overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-color z-10"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119262.57391903114!2d77.7684455!3d20.91411255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a4a67774bc15%3A0x3c7b3f78ca4f9635!2sAmravati%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1775750730513!5m2!1sen!2sin" 
                className="w-full h-full opacity-100"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="contact-form bg-black/40 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-3xl font-black mb-8 uppercase tracking-widest text-white/90">Send Us a Message</h2>
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="contact-input">
                  <label className="block text-sm font-medium mb-2 text-white/50 uppercase tracking-widest">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 transition-all" placeholder="Your Name" />
                </div>
                <div className="contact-input">
                  <label className="block text-sm font-medium mb-2 text-white/50 uppercase tracking-widest">Phone</label>
                  <input type="tel" className="w-full bg-black/50 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 transition-all" placeholder="Your Phone" />
                </div>
              </div>
              <div className="contact-input">
                <label className="block text-sm font-medium mb-2 text-white/50 uppercase tracking-widest">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 transition-all" placeholder="your@email.com" />
              </div>
              <div className="contact-input">
                <label className="block text-sm font-medium mb-2 text-white/50 uppercase tracking-widest">Division (Optional)</label>
                <select className="w-full bg-black/50 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 transition-all appearance-none cursor-pointer">
                  <option className="bg-secondary">General Inquiry</option>
                  <option className="bg-secondary">Smart Home Automation</option>
                  <option className="bg-secondary">Software & Digital Solutions</option>
                  <option className="bg-secondary">Solar & Renewable Energy</option>
                  <option className="bg-secondary">Construction & Infrastructure</option>
                  <option className="bg-secondary">Pharmaceuticals</option>
                </select>
              </div>
              <div className="contact-input">
                <label className="block text-sm font-medium mb-2 text-white/50 uppercase tracking-widest">Message</label>
                <textarea className="w-full bg-black/50 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 h-32 transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full h-16 mt-8 text-xl rounded-xl shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 transition-all uppercase tracking-widest font-black bg-primary text-black flex items-center justify-center cursor-pointer relative z-30"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Append the rolling marquee here as well for added effect */}
      <div className="bg-secondary">
        <ScrollingTextLoop />
      </div>
    </div>
  );
}
