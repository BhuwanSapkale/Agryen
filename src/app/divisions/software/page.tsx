import { DivisionTemplate } from "@/components/ui/division-template";

export default function SoftwareDivision() {
  return (
    <DivisionTemplate 
      title="Software & Digital Solutions"
      subtitle="Enterprise-grade technology to scale your business."
      image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3000&auto=format&fit=crop"
      description="In the modern world, every business is a digital business. Our Software & Digital Solutions division specializes in building robust, highly scalable, and user-centric digital products. From consumer-facing mobile apps to complex internal automation systems driven by Artificial Intelligence, we deliver the code that runs modern commerce."
      services={[
        "Web Development",
        "Mobile App Development",
        "AI Solutions",
        "Cloud Services",
        "Automation Systems"
      ]}
      projects={[
        { title: "Business Website", desc: "Corporate platform redesign yielding 200% conversion increase." },
        { title: "CRM System", desc: "Custom internal tooling for a 500-person sales team." },
        { title: "AI Chatbot", desc: "Automated customer support saving 40 hours per week." },
        { title: "Automation Dashboard", desc: "Cross-platform analytics reporting engine." }
      ]}
    />
  );
}
