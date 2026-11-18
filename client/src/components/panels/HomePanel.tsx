import { motion } from "framer-motion";
import type { SectionId } from "../Sidebar";

interface HomePanelProps {
  onNavigate: (section: SectionId) => void;
}

export default function HomePanel({ onNavigate }: HomePanelProps) {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      {/* Background subtle texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none lg:left-[280px]"
        style={{
          backgroundImage: "url(/manus-storage/new_hero_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[#4F7CFF]">
            <span className="w-10 h-[1px] bg-[#4F7CFF]" />
            Brand & Digital Designer
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[#F5F5F5] mb-8"
        >
          <span className="block">SOLTAN LUCIAN</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          className="text-base lg:text-xl text-[#8A8A8A] max-w-xl leading-[1.7] mb-12"
        >
          I design and build simple, mobile-ready landing pages for individual products, and create original labels, packaging, and advertising posters. Each project presents the product clearly and guides customers toward the next step, such as contacting or ordering through Instagram or WhatsApp.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          className="flex gap-10 mb-14"
        >
          <div>
            <span className="block text-3xl font-bold text-[#F5F5F5]">3+</span>
            <span className="text-[11px] text-[#555] tracking-wide">Years Exp.</span>
          </div>
          <div>
            <span className="block text-3xl font-bold text-[#F5F5F5]">15</span>
            <span className="text-[11px] text-[#555] tracking-wide">Projects</span>
          </div>
          <div>
            <span className="block text-3xl font-bold text-[#F5F5F5]">7+</span>
            <span className="text-[11px] text-[#555] tracking-wide">Clients</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-medium bg-[#4F7CFF] text-white rounded-sm hover:bg-[#5a88ff] transition-all duration-300 cursor-pointer"
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => onNavigate("work")}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium border border-[#232323] text-[#F5F5F5] rounded-sm hover:border-[#4F7CFF]/50 hover:text-[#4F7CFF] transition-all duration-300 cursor-pointer"
          >
            View Portfolio
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-3"
        >
          {[
            { label: "Services", id: "services" as SectionId },
            { label: "Process", id: "process" as SectionId },
            { label: "About", id: "about" as SectionId },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="text-xs text-[#555] hover:text-[#4F7CFF] transition-colors duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-4 h-[1px] bg-[#232323]" />
              {link.label}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
