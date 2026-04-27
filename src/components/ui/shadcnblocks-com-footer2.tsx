'use client';

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: {
    title: string;
    links: {
      text: string;
      url: string;
    }[];
  }[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "/logo.jpeg",
    alt: "AGREYAN Logo",
    title: "AGRYEN",
    url: "/",
  },
  tagline = "Innovating Across Industries.",
  menuItems = [
    {
      title: "Divisions",
      links: [
        { text: "Smart Home Automation", url: "/divisions/smart-home" },
        { text: "Software & Digital Solutions", url: "/divisions/software" },
        { text: "Solar & Renewable Energy", url: "/divisions/solar" },
        { text: "Construction & Infrastructure", url: "/divisions/construction" },
        { text: "Pharmaceuticals", url: "/divisions/pharma" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { text: "Home", url: "/" },
        { text: "About Us", url: "/about" },
        { text: "How We Work", url: "/how-we-work" },
        { text: "Projects & Highlights", url: "/projects" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "Partner With Us", url: "/partner" },
        { text: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Social Media",
      links: [
        { text: "LinkedIn", url: "#" },
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
      ],
    },
  ],
  copyright = "© 2024 AGRYEN. All rights reserved.",
  bottomLinks = [
    { text: "Privacy Policy", url: "#" },
    { text: "Terms of Service", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-24 bg-primary mt-auto text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <footer>
          <div className="grid grid-cols-2 gap-12 lg:grid-cols-6 border-b border-black/10 pb-16">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-4 lg:justify-start">
                <a href={logo.url}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-12 object-contain rounded-md"
                  />
                </a>
                <p className="text-3xl font-black tracking-widest uppercase text-black">{logo.title}</p>
              </div>
              <p className="mt-6 font-black uppercase tracking-widest text-black/90 max-w-xs">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 font-black tracking-wider uppercase text-black border-b border-black/20 pb-2 inline-block">{section.title}</h3>
                <ul className="space-y-4 text-black font-bold">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-white transition-colors text-[10px] uppercase tracking-widest"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 pt-4 text-xs font-black text-black uppercase tracking-widest md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-8">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-white transition-colors">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
