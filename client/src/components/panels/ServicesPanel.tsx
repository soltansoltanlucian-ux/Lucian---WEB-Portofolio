import { motion } from "framer-motion";
import { useState } from "react";
import type { SectionId } from "../Sidebar";

interface Service {
  id: number;
  title: string;
  description: string;
  price?: string;
  priceDetails?: string[];
  delivery?: string;
  scope: string[];
  available: boolean;
}

const services: Service[] = [
  {
    id: 1,
    title: "Product Landing Page",
    description:
      "Design and build of a simple, mobile-responsive website that presents one product clearly and guides visitors to contact or order through Instagram or WhatsApp.",
    price: "MDL 6,500+",
    delivery: "7–10 days",
    scope: [
      "One page for one product",
      "Up to five content sections",
      "Responsive design for mobile and desktop",
      "One simple contact or order call to action",
      "Client provides the final product information, copy, and photographs",
      "Domain, paid hosting, e-commerce, payment processing, complex backend features, and advanced integrations are not included; these can be discussed separately",
    ],
    available: true,
  },
  {
    id: 2,
    title: "Label & Packaging Design",
    description:
      "Original visual design for a product label or packaging, developed to present the product clearly and consistently.",
    priceDetails: [
      "Label only: MDL 1,500+",
      "Label + packaging: MDL 3,500+",
    ],
    delivery: "7–12 days",
    scope: [
      "One product or SKU",
      "One initial visual direction",
      "Up to two rounds of revisions",
      "Presentation mockup included",
      "Client supplies product information and the package dimensions or dieline",
      "Printing and physical production are not included",
      "Print-ready technical files are included only if agreed in advance and based on the printer’s specifications",
    ],
    available: true,
  },
  {
    id: 3,
    title: "Advertising Posters",
    description:
      "Original poster designs for products, offers, launches, and local promotions, created in Figma.",
    priceDetails: [
      "1 poster: MDL 500+",
      "Set of 3: MDL 1,200+",
    ],
    delivery: "1 poster: 2–3 days · 3 posters: 4–6 days",
    scope: [
      "One round of minor revisions",
      "Client supplies or approves the final copy, product details, and photographs",
      "Use client-supplied or properly licensed visual assets; do not use AI-generated imagery in client deliverables",
      "Story-size adaptations, photography, extensive copywriting, printing, and additional revisions are quoted separately",
      "Delivery starts after all required content and the project deposit are received",
    ],
    available: true,
  },
  {
    id: 4,
    title: "UI/UX Design",
    description:
      "Interface and user-flow design for apps and digital products, including clickable Figma prototypes.",
    scope: [],
    available: false,
  },
  {
    id: 5,
    title: "Social Media Design",
    description: "Visual templates and design systems for consistent social media content.",
    scope: [],
    available: false,
  },
];

interface ServicesPanelProps {
  onNavigate: (section: SectionId, service?: string) => void;
}

export default function ServicesPanel({ onNavigate }: ServicesPanelProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="py-4">
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
          Focused design services for products, packaging, websites, and promotional visuals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 bg-transparent border-l border-t border-[#232323]">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative bg-[#080808] border-r border-b border-[#232323] p-6 lg:p-8 group transition-all duration-500 ${
              !service.available ? "opacity-75" : ""
            }`}
            style={{
              backgroundColor: hoveredId === service.id ? "#0c0c0c" : "#080808",
            }}
          >
            <div
              className="absolute top-0 left-0 h-[2px] bg-[#4F7CFF] transition-all duration-500"
              style={{ width: hoveredId === service.id && service.available ? "100%" : "0%" }}
            />

            <div className="flex items-start justify-between gap-4">
              <span className="text-[11px] font-medium text-[#232323] group-hover:text-[#4F7CFF] transition-colors duration-500 tracking-[0.1em]">
                {String(service.id).padStart(2, "0")}
              </span>
              {!service.available && (
                <span className="shrink-0 rounded-full border border-[#3A3A3A] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-[#777]">
                  Currently unavailable
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-[#F5F5F5] mt-3 mb-3 group-hover:text-[#4F7CFF] transition-colors duration-500">
              {service.title}
            </h3>

            <p className="text-[13px] text-[#8A8A8A] leading-relaxed mb-5">
              {service.description}
            </p>

            {service.available ? (
              <>
                <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-4 mb-5">
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#555] uppercase tracking-[0.08em]">Price</span>
                    {service.price && (
                      <p className="text-[13px] font-semibold text-[#F5F5F5] leading-snug">{service.price}</p>
                    )}
                    <div className="space-y-1">
                      {service.priceDetails?.map((price) => (
                      <p key={price} className="text-[13px] font-semibold text-[#F5F5F5] leading-snug">
                        {price}
                      </p>
                    ))}
                    </div>
                  </div>
                  <div className="min-w-0 border-l border-[#232323] pl-4">
                    <span className="text-[10px] text-[#555] uppercase tracking-[0.08em]">Delivery</span>
                    <p className="text-[13px] font-semibold text-[#F5F5F5] leading-snug">
                      {service.delivery}
                    </p>
                  </div>
                </div>

                <details className="mb-5 group/details">
                  <summary className="cursor-pointer list-none text-[11px] font-medium text-[#8A8A8A] transition-colors duration-300 hover:text-[#4F7CFF] [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex items-center gap-2">
                      Scope details
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-open/details:rotate-180">
                        <path d="m2 3.5 3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <ul className="mt-3 space-y-2 border-l border-[#232323] pl-4 text-[11px] leading-relaxed text-[#777]">
                    {service.scope.map((detail) => (
                      <li key={detail} className="relative before:absolute before:-left-[9px] before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[#4F7CFF]">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </details>

                <button
                  onClick={() => onNavigate("contact", service.title)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8A8A8A] group-hover:text-[#4F7CFF] transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
                >
                  Get a Quote
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="mt-6 border-t border-[#232323] pt-4 text-[11px] leading-relaxed text-[#555]">
                This service is not currently accepting new projects.
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
