import { DivisionTemplate } from "@/components/ui/division-template";

export default function ConstructionDivision() {
  return (
    <DivisionTemplate 
      title="Construction & Infrastructure"
      subtitle="Building the foundations of modern society."
      image="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=3000&auto=format&fit=crop"
      description="Strong economies require strong foundations. Our Construction & Infrastructure division is tasked with monumental development projects. From residential high-rises to sprawling commercial complexes, we employ precision engineering, advanced project management, and sustainable building materials."
      services={[
        "Building Construction",
        "Infrastructure Development",
        "Project Management",
        "Renovation"
      ]}
      projects={[
        { title: "Residential Buildings", desc: "A 5-tower luxury residential complex." },
        { title: "Commercial Complex", desc: "A 500,000 sq ft shopping and business hub." }
      ]}
    />
  );
}
