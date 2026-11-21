import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  fullImage?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AGESSENTIALS",
    category: "Premium Label & Packaging Design",
    year: "2025",
    image: "/manus-storage/project1_agsentials.png",
  },
  {
    id: 5,
    title: "AGESSENTIALS STORE",
    category: "Product Landing Page",
    year: "2025",
    image: "/manus-storage/agessentials_store_fullpage.webp",
    fullImage: "/manus-storage/agessentials_store_fullpage.webp",
    liveUrl: "https://agessentials.store/",
  },
  {
    id: 2,
    title: "Legenda Real Estate",
    category: "Website Design",
    year: "2024",
    image: "/manus-storage/legend_thumb.png",
    fullImage: "/manus-storage/legend_full.png",
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

export default function WorkPanel() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close lightbox with ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setLightboxIndex(null);
    } else if (e.key === "ArrowRight") {
      setLightboxIndex((prev) => (prev !== null ? Math.min(prev + 1, projects.length - 1) : null));
    } else if (e.key === "ArrowLeft") {
      setLightboxIndex((prev) => (prev !== null ? Math.max(prev - 1, 0) : null));
    }
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, handleKeyDown]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPrev = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null && lightboxIndex < projects.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
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
          02
        </span>
        <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mt-4">
          Selected Work
        </h2>
        <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
          A curated selection of projects that showcase the breadth and depth of my design practice.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => openLightbox(i)}
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
                  className={`w-full h-full object-cover ${project.id === 5 ? "object-top" : ""}`}
                />
              </motion.div>
              {/* Hover overlay with project name */}
              <div
                className="absolute inset-0 bg-[#080808]/70 flex items-center justify-center transition-opacity duration-500"
                style={{ opacity: hoveredId === project.id ? 1 : 0 }}
              >
                <span className="text-2xl lg:text-3xl font-bold text-[#F5F5F5] tracking-[0.15em] uppercase">
                  {project.title}
                </span>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808]/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-[10000] w-10 h-10 flex items-center justify-center text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors duration-300 cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 lg:left-8 z-[10000] w-12 h-12 flex items-center justify-center border border-white/10 rounded-full text-[#8A8A8A] hover:text-[#F5F5F5] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {/* Next Button */}
            {lightboxIndex < projects.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 lg:right-8 z-[10000] w-12 h-12 flex items-center justify-center border border-white/10 rounded-full text-[#8A8A8A] hover:text-[#F5F5F5] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-[85vw] max-h-[85vh] flex flex-col items-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full overflow-y-auto max-h-[75vh] custom-scrollbar rounded-sm">
                <img
                  key={projects[lightboxIndex].id}
                  src={projects[lightboxIndex].fullImage || projects[lightboxIndex].image}
                  alt={projects[lightboxIndex].title}
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* Project Info Bar */}
              <div className="mt-6 flex items-center justify-between w-full px-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#F5F5F5]">{projects[lightboxIndex].title}</h3>
                  <p className="text-sm text-[#8A8A8A] mt-1">{projects[lightboxIndex].category}</p>
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-xs text-[#555] font-medium">{projects[lightboxIndex].year}</span>
                  {projects[lightboxIndex].liveUrl && (
                    <a
                      href={projects[lightboxIndex].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-medium text-[#4F7CFF] transition-colors hover:text-[#7D9DFF]"
                    >
                      Visit Live Website ↗
                    </a>
                  )}
                </div>
              </div>
              {/* Navigation dots */}
              <div className="flex gap-2 mt-4">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === lightboxIndex ? "bg-[#4F7CFF] w-6" : "bg-[#333]"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
