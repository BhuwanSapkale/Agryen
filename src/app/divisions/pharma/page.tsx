import { DivisionTemplate } from "@/components/ui/division-template";

export default function PharmaDivision() {
  return (
    <DivisionTemplate 
      title="Pharmaceuticals"
      subtitle="Distributing health and advancing medical science."
      image="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=3000&auto=format&fit=crop"
      description="Healthcare is the bedrock of a thriving society. AGRYEN's Pharmaceuticals division leverages our rigorous approach to quality control and our vast logistical network to ensure that vital medicines and healthcare products reach the institutions that need them most."
      services={[
        "Medicine Distribution",
        "Healthcare Products",
        "Research Support"
      ]}
      projects={[
        { title: "Healthcare Supply Projects", desc: "Secured supply chain framework for 50+ regional hospitals." }
      ]}
    />
  );
}
