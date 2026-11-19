import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  year?: string;
  image: string;
  fullImage?: string;
  description?: string;
  role?: string;
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
    title: "AG Essentials",
    category: "Product Landing Page",
    image: "/manus-storage/agessentials_landing_preview.webp",
    description:
      "A product-focused landing page for AG Essentials’ Matt Clay, featuring the product’s benefits, an application guide for wet and dry hair, style inspiration, and a path to order through Instagram.",
    role: "Product landing page design and build.",
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

function AGEssentialsPreview() {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden bg-[#090A09] text-[#F2F2F2]">
      <div className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center sm:min-h-[640px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,255,69,0.08),transparent_48%)]" />
        <p className="relative text-4xl font-bold tracking-[0.08em] text-[#18F53D] sm:text-6xl">AGESSENTIALS</p>
        <p className="relative mt-4 text-xl tracking-[0.22em] text-white sm:text-2xl">STAY AHEAD</p>
        <p className="relative mt-6 max-w-md text-sm text-[#969696]">Flexible hold clay with matte finish and dense texture.</p>
        <img src="/manus-storage/agessentials_landing_preview.webp" alt="AG Essentials landing page hero" className="relative mt-8 w-full max-w-[440px] rounded-sm object-cover" />
        <a href="#product-preview" className="relative mt-8 border border-[#18F53D]/60 px-6 py-3 text-xs font-medium tracking-[0.14em] text-[#18F53D]">EXPLORE PRODUCT →</a>
      </div>

      <section id="product-preview" className="border-t border-white/10 px-6 py-16 sm:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#18F53D]">The Product</p>
        <h4 className="mt-3 text-3xl font-semibold sm:text-5xl">MATT CLAY</h4>
        <p className="mt-2 text-sm text-[#999]">Premium Hair Wax for Men</p>
        <img src="/manus-storage/agessentials_live_showcase.webp" alt="Matt Clay product showcase" className="mt-10 w-full rounded-sm" />
        <p className="mt-8 text-sm leading-relaxed text-[#A7A7A7]">Matte Finish Light Hold Premium Texturizer. A flexible hold clay with a matte finish and dense texture.</p>
        <div className="mt-6 grid gap-3 text-xs text-[#C7C7C7] sm:grid-cols-2">
          <span>Flexible hold (not stiff)</span>
          <span>Matte finish (no shine)</span>
          <span>Beeswax &amp; Essential Oils formula</span>
          <span>Maximum reversibility</span>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 sm:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#18F53D]">Application Guide</p>
        <h4 className="mt-3 text-3xl font-semibold sm:text-5xl">HOW TO GET THE LOOK</h4>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="border-t border-white/15 pt-4"><p className="text-lg font-medium">WET HAIR</p><p className="mt-2 text-sm leading-relaxed text-[#999]">Apply, dry, and define for hydration, smoothness, and soft flexible hold.</p></div>
          <div className="border-t border-white/15 pt-4"><p className="text-lg font-medium">DRY HAIR</p><p className="mt-2 text-sm leading-relaxed text-[#999]">Apply, style, and restyle for matte definition and flexible texture.</p></div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 sm:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#18F53D]">Inspiration</p>
        <h4 className="mt-3 text-3xl font-semibold sm:text-5xl">STYLES THAT INSPIRE</h4>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <img key={n} src={`/manus-storage/agessentials_live_style_${n}.png`} alt={`AG Essentials style ${n}`} className="aspect-square w-full object-cover" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function WorkPanel() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
  };

  const goToNext = () => {
    if (lightboxIndex !== null && lightboxIndex < projects.length - 1) setLightboxIndex(lightboxIndex + 1);
  };

  const activeProject = lightboxIndex !== null ? projects[lightboxIndex] : null;

  return (
    <div className="py-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setLightboxIndex(i)}
            className="group relative cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(i);
              }
            }}
            aria-label={`View project: ${project.title}`}
          >
            <div className={`relative overflow-hidden rounded-sm ${project.id === 3 ? "aspect-[3/2]" : "aspect-[4/3]"}`}>
              <motion.div
                animate={{ scale: hoveredId === project.id ? 1.05 : 1 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full"
              >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </motion.div>
              <div
                className="absolute inset-0 bg-[#080808]/70 flex items-center justify-center transition-opacity duration-500"
                style={{ opacity: hoveredId === project.id ? 1 : 0 }}
              >
                <span className="text-2xl lg:text-3xl font-bold text-[#F5F5F5] tracking-[0.15em] uppercase">
                  {project.title}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#F5F5F5] group-hover:text-[#4F7CFF] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-[#8A8A8A] mt-1">{project.category}</p>
              </div>
              {project.year && <span className="text-xs text-[#555] font-medium">{project.year}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808]/95 p-4 backdrop-blur-sm sm:p-6"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} project details`}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-[10000] flex h-10 w-10 items-center justify-center text-[#8A8A8A] transition-colors duration-300 hover:text-[#F5F5F5] sm:top-6 sm:right-6"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {lightboxIndex !== null && lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                aria-label="Previous project"
                className="absolute left-2 top-1/2 z-[10000] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 text-[#8A8A8A] transition-all duration-300 hover:border-white/30 hover:text-[#F5F5F5] lg:flex lg:left-8"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}

            {lightboxIndex !== null && lightboxIndex < projects.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                aria-label="Next project"
                className="absolute right-2 top-1/2 z-[10000] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 text-[#8A8A8A] transition-all duration-300 hover:border-white/30 hover:text-[#F5F5F5] lg:flex lg:right-8"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0D0D0D] sm:h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {activeProject.liveUrl ? (
                <div className="min-h-0 flex-1 overflow-y-auto bg-[#080808] custom-scrollbar">
                  <AGEssentialsPreview />
                </div>
              ) : (
                <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
                  <img
                    src={activeProject.fullImage || activeProject.image}
                    alt={activeProject.title}
                    className="h-auto w-full object-contain"
                  />
                </div>
              )}

              <div className="shrink-0 border-t border-white/10 bg-[#0D0D0D] px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-[#F5F5F5]">{activeProject.title}</h3>
                      {activeProject.year && <span className="text-xs font-medium text-[#555]">{activeProject.year}</span>}
                    </div>
                    <p className="mt-1 text-sm text-[#8A8A8A]">{activeProject.category}</p>
                    {activeProject.description && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#A0A0A0]">{activeProject.description}</p>}
                    {activeProject.role && <p className="mt-2 text-xs text-[#777]">Role: {activeProject.role}</p>}
                  </div>
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-[#4F7CFF] px-4 py-3 text-xs font-medium text-white transition-colors hover:bg-[#5A88FF]"
                    >
                      Visit Live Website
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 10.5 10.5 2.5M5 2.5h5.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  )}
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  {projects.map((project, idx) => (
                    <button
                      key={project.id}
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`View ${project.title}`}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === lightboxIndex ? "w-6 bg-[#4F7CFF]" : "w-2 bg-[#333]"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
