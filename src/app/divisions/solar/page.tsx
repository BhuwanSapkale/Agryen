import { DivisionTemplate } from "@/components/ui/division-template";

export default function SolarDivision() {
  return (
    <DivisionTemplate 
      title="Solar & Renewable Energy"
      subtitle="Powering the future with sustainable, clean energy."
      image="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=3000&auto=format&fit=crop"
      imagePosition="object-bottom"
      description="Energy independence is not just an environmental imperative; it is an economic advantage. Our Solar & Renewable Energy division manages end-to-end solar installations for both residential and commercial clients. We handle everything from site assessment and energy consulting to long-term battery storage solutions."
      services={[
        "Solar Panel Installation",
        "Energy Consulting",
        "Maintenance",
        "Battery Storage"
      ]}
      projects={[
        { title: "Residential Solar System", desc: "10kW home installation achieving net-zero grid reliance." },
        { title: "Commercial Solar Installation", desc: "150kW roof installation for a manufacturing plant." }
      ]}
    />
  );
}
