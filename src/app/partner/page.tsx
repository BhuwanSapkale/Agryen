import { Button } from "@/components/ui/button";
import { Handshake, Banknote, Briefcase, Map } from "lucide-react";

export default function PartnerPage() {
  const types = [
    { title: "Investors", icon: <Banknote className="w-8 h-8" />, desc: "Back our rapid cross-industry expansion." },
    { title: "Business Partners", icon: <Handshake className="w-8 h-8" />, desc: "Collaborate on large-scale infrastructure projects." },
    { title: "Vendors", icon: <Briefcase className="w-8 h-8" />, desc: "Supply specialized materials or software to our divisions." },
    { title: "Landowners", icon: <Map className="w-8 h-8" />, desc: "Partner with our Construction or Solar divisions for development." },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white">
      {/* 1. Cinematic Dark Hero */}
      <section className="relative w-full h-[60vh] overflow-hidden bg-black text-white flex items-center justify-center border-b border-primary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-none text-white/90 drop-shadow-2xl mb-8">
            Partner With AGRYEN
          </h1>
          <p className="text-xl md:text-3xl font-light text-primary tracking-wide uppercase border border-primary/40 px-8 py-3 rounded-full inline-block backdrop-blur-md bg-black/40">
            Unlock Massive Synergies.
          </p>
        </div>
      </section>

      <section className="py-32 bg-secondary border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black mb-12 tracking-widest uppercase text-white">Partnership Opportunities</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {types.map((t, i) => (
                <div key={i} className="bg-white/95 border border-primary/20 hover:border-primary/50 transition-colors shadow-2xl rounded-3xl p-8 group">
                  <div className="text-primary bg-black border border-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 shadow-[0_0_15px_rgba(172,146,95,0.2)] transition-transform duration-500">
                    {t.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-widest mb-4 text-black">{t.title}</h3>
                  <p className="text-black/70 text-lg font-medium leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-2xl p-10 md:p-14 rounded-3xl border border-primary/20 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-3xl font-black mb-8 uppercase tracking-widest text-black">Inquiry Form</h2>
            <form className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-bold mb-2 text-black/40 uppercase tracking-widest">Name</label>
                <input type="text" className="w-full bg-secondary/5 border border-black/10 text-black focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 transition-all" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-black/40 uppercase tracking-widest">Company</label>
                <input type="text" className="w-full bg-secondary/5 border border-black/10 text-black focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 transition-all" placeholder="Company Name" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-black/40 uppercase tracking-widest">Phone</label>
                <input type="tel" className="w-full bg-secondary/5 border border-black/10 text-black focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 transition-all" placeholder="+1..." />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-black/40 uppercase tracking-widest">Message</label>
                <textarea className="w-full bg-secondary/5 border border-black/10 text-black focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-4 h-32 transition-all resize-none" placeholder="Detailed inquiry..."></textarea>
              </div>
              <Button type="submit" className="w-full h-16 text-xl rounded-xl shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all uppercase tracking-widest font-black bg-black text-white hover:bg-black/90">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
