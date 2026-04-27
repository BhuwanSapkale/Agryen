import { ExternalLink, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SmartHomePage() {
  const services = [
    "Home Automation",
    "Smart Lighting",
    "Security Systems",
    "Energy Monitoring",
    "IoT Integration"
  ];

  const projects = [
    { title: "Residential Automation", desc: "Full smart home conversion for a luxury villa." },
    { title: "Office Automation", desc: "Energy-efficient lighting and access controls for a 10-story workspace." },
    { title: "Smart Security Installation", desc: "Integrated IoT surveillance and biometric access." }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header Banner */}
      <section className="relative py-32 bg-black flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=3000&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Smart Home"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Smart Home Automation</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Intelligent living spaces powered by advanced IoT.</p>
        </div>
      </section>

      {/* Intro & Core Offering */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">What We Do</h2>
          <p className="text-lg text-muted-foreground mb-12">
            As a currently operating and highly successful business under the AGRYEN umbrella, our Smart Home Automation division provides turn-key solutions that seamlessly integrate all aspects of modern living spaces—bringing you unrivaled comfort, security, and efficiency.
          </p>
          
          {/* SmartAsure CTA */}
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-10 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Visit Our Dedicated Platform</h3>
            <p className="text-muted-foreground mb-8 max-w-lg">
              Explore our full catalog of smart home products and specialized automation packages on our dedicated storefront.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-lg">
              <a href="https://smartasure.in" target="_blank" rel="noopener noreferrer">
                Visit smartasure.in <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services & Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Services</h2>
            <div className="space-y-4">
              {services.map((s, i) => (
                <div key={i} className="flex items-center bg-background p-4 rounded-xl border">
                  <CheckCircle2 className="text-primary w-6 h-6 mr-4" />
                  <span className="text-lg font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>Because we don't just sell gadgets—we build integrated ecosystems. Our proprietary process ensures that every sensor, lightbulb, and security camera speaks the same language.</p>
              <ul>
                <li>Seamless App Integration</li>
                <li>24/7 Priority Support Ecosystem</li>
                <li>Future-proof Wiring & Protocols</li>
                <li>Energy Bill Reduction Guarantees</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="p-8 rounded-3xl border bg-card hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Automate?</h2>
        <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto">Get in touch with our smart home specialists for a free consultation and home assessment.</p>
        <Button asChild size="lg" variant="secondary" className="h-14 px-10 text-lg text-primary">
          <a href="/contact" className="inline-block bg-primary text-black px-8 py-3 rounded-full font-black uppercase shadow-lg">Contact Us</a>
        </Button>
      </section>
    </div>
  );
}
