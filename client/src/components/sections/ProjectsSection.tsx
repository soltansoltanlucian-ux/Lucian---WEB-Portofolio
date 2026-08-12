import { motion } from "framer-motion";
import { sectionReveal } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Noble Skincare",
    category: "Premium Label & Packaging Design",
    year: "2024",
    image: "/manus-storage/project1_12b9f1a9.png",
  },
  {
    id: 2,
    title: "Legenda Real Estate",
    category: "Website Design",
    year: "2024",
    image: "/manus-storage/legend_thumb.png",
  },
  {
    id: 3,
    title: "Poster Design Collection",
    category: "Advertising Posters",
    year: "2025",
    image: "/manus-storage/posters_collection.png",
  },
  {
    id: 4,
    title: "ARCHIVE Fashion App",
    category: "UI/UX Design",
    year: "2026",
    image: "/manus-storage/archive_app_mockup.png",
  },
];

export default function ProjectsSection() {
  const { ref, isInView } = useInView(0.05);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 lg:py-32 border-t border-[#232323]">
      <div className="container">
        {/* Section Header */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <span className="text-[5rem] lg:text-[8rem] font-light text-[#1a1a1a] leading-none tracking-tighter">
              03
            </span>
          </motion.div>
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="lg:col-span-10"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em]">
              Selected Work
            </h2>
            <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
              A curated selection of projects that showcase the breadth and depth of my design practice.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer"
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden rounded-sm ${project.id === 3 ? "aspect-[3/2]" : "aspect-[4/3]"}`}>
                <motion.div
                  animate={{
                    scale: hoveredId === project.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-[#080808]/60 flex items-center justify-center transition-opacity duration-500"
                  style={{ opacity: hoveredId === project.id ? 1 : 0 }}
                >
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="#F5F5F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#F5F5F5] group-hover:text-[#4F7CFF] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#8A8A8A] mt-1">{project.category}</p>
                </div>
                <span className="text-xs text-[#555] font-medium">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
