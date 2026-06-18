import React from "react";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DivisionTemplateProps {
  title: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
  description: string;
  services: string[];
  projects: { title: string; desc: string }[];
  contactText?: string;
}

export function DivisionTemplate({
  title,
  subtitle,
  image,
  imagePosition,
  description,
  services,
  projects,
  contactText = "Contact Us"
}: DivisionTemplateProps) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white">
      {/* Header Banner */}
      <section className="relative py-40 bg-black flex items-center justify-center overflow-hidden border-b border-primary/20">
        <img 
          src={image} 
          className={`absolute inset-0 w-full h-full object-cover opacity-30 ${imagePosition || 'object-center'}`}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight drop-shadow-2xl">{title}</h1>
          <p className="text-xl md:text-2xl text-primary font-light uppercase tracking-widest border border-primary/40 px-8 py-3 rounded-full inline-block backdrop-blur-md bg-black/30 w-max mx-auto">{subtitle}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-8 uppercase tracking-widest text-primary border-b border-primary/20 pb-4 inline-block">What We Do</h2>
          <p className="text-xl text-white/70 font-light leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-12 text-center uppercase tracking-widest text-white">Core Services</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={i} className="flex items-center bg-secondary/40 p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors shadow-2xl backdrop-blur-sm group">
                <CheckCircle2 className="text-primary w-8 h-8 mr-6 flex-shrink-0 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(172,146,95,0.5)]" />
                <span className="text-xl font-medium text-white/90 font-light tracking-wide">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-24 bg-secondary/30 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672')] bg-cover opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-black mb-16 text-center uppercase tracking-widest text-white">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((p, i) => (
                <div key={i} className="p-10 rounded-3xl border border-primary/20 bg-black/60 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(172,146,95,0.15)] hover:-translate-y-2 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-primary uppercase tracking-wider">{p.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Preview */}
      <section className="py-24 bg-black text-center border-t border-primary/20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-8 uppercase tracking-widest text-white">Our Process</h2>
          <p className="text-xl text-white/60 mb-12 font-light">
            We follow AGRYEN's standardized 6-step project delivery workflow across all scale operations, from initial consultation to final support.
          </p>
          <a href="/how-we-work" className="inline-flex items-center justify-center h-14 px-8 text-lg font-black uppercase tracking-widest bg-secondary text-white hover:bg-secondary/80 border border-white/10 rounded-md">
            View Delivery Process <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-black mb-6 uppercase tracking-tight drop-shadow-lg">Ready to Start?</h2>
          <p className="text-2xl opacity-90 mb-12 max-w-2xl mx-auto font-light">Get in touch with our division specialists today.</p>
          <a href="/contact" className="inline-block bg-white text-primary px-12 py-5 rounded-full font-black uppercase text-xl shadow-2xl hover:scale-105 transition-transform">{contactText}</a>
        </div>
      </section>
    </div>
  );
}
