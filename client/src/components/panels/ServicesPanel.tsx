import { motion } from "framer-motion";
import { useState } from "react";
import type { SectionId } from "../Sidebar";

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  delivery: string;
}

const services: Service[] = [
  { id: 1, title: "Website Design", description: "High-end visual layouts for landing pages and corporate sites. I craft stunning, pixel-perfect Figma designs that capture your brand's essence and are ready for developer handoff.", price: "From $1,200", originalPrice: "$1,500", delivery: "2-4 weeks" },
  { id: 2, title: "UI/UX Design", description: "Advanced interface design focused on user behavior and interactive logic. I build clickable Figma prototypes and detailed user flows that demonstrate exactly how your product functions.", price: "From $2,000", delivery: "3-5 weeks" },
  { id: 3, title: "Logo Design", description: "Distinctive logo marks that capture the essence of your brand. Multiple concepts with full revision process.", price: "From $375", originalPrice: "$500", delivery: "1-2 weeks" },
  { id: 4, title: "Premium Label & Packaging Design", description: "High-end labels and packaging that command attention. I create visual experiences for physical products that communicate quality and drive sales.", price: "From $800", delivery: "2-3 weeks" },
  { id: 5, title: "Social Media Design", description: "Strategic visual systems for your social presence. I create cohesive templates and daily content that maintain brand consistency across all platforms.", price: "From $400", delivery: "1-2 weeks" },
  { id: 6, title: "Advertising Posters", description: "Hero visual pieces designed for maximum impact. I craft unique, conceptual posters that stop the scroll and turn heads in both digital and print spaces.", price: "From $450", originalPrice: "$600", delivery: "1-2 weeks" },
];

interface ServicesPanelProps {
  onNavigate: (section: SectionId, service?: string) => void;
}

export default function ServicesPanel({ onNavigate }: ServicesPanelProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <div className="py-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="mb-12"
      >
        <span className="text-[3rem] lg:text-[5rem] font-light text-[#1a1a1a] leading-none tracking-tighter">
          03
        </span>
        <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mt-4">
          Services
        </h2>
        <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
          End-to-end design solutions tailored to elevate your brand and digital presence.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#232323]">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative bg-[#080808] p-6 lg:p-8 group transition-all duration-500"
            style={{
              backgroundColor: hoveredId === service.id ? "#0c0c0c" : "#080808",
            }}
          >
            {/* Hover accent line */}
            <div
              className="absolute top-0 left-0 h-[2px] bg-[#4F7CFF] transition-all duration-500"
              style={{ width: hoveredId === service.id ? "100%" : "0%" }}
            />

            {/* Service Number */}
            <span className="text-[11px] font-medium text-[#232323] group-hover:text-[#4F7CFF] transition-colors duration-500 tracking-[0.1em]">
              {String(service.id).padStart(2, "0")}
            </span>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[#F5F5F5] mt-3 mb-3 group-hover:text-[#4F7CFF] transition-colors duration-500">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-[13px] text-[#8A8A8A] leading-relaxed mb-5">
              {service.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-5">
              <div>
                <span className="text-[11px] text-[#555] tracking-wide">Starting</span>
                <div className="flex items-center gap-2">
                  {service.originalPrice && (
                    <span className="text-[13px] text-[#8A8A8A] line-through decoration-[#F5F5F5]/60 decoration-1">
                      {service.originalPrice}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-[#F5F5F5]">{service.price}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-[#232323]" />
              <div>
                <span className="text-[11px] text-[#555] tracking-wide">Delivery</span>
                <p className="text-sm font-semibold text-[#F5F5F5]">{service.delivery}</p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onNavigate("contact", service.title)}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
            >
              Get a Quote
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
