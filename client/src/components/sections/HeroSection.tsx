import { motion } from "framer-motion";
import MagneticButton from "../MagneticButton";
import { sectionReveal } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "url(/manus-storage/new_hero_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-transparent to-[#080808]" />

      <div className="container relative z-10 pt-28 lg:pt-32 pb-24">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            animate="visible"
            className="mb-6 lg:mb-10"
          >
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[#4F7CFF]">
              <span className="w-10 h-[1px] bg-[#4F7CFF]" />
              Brand & Digital Designer
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={sectionReveal}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-[clamp(3.5rem,9vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[#F5F5F5] mb-8 lg:mb-10"
          >
            <span className="block">SOLTAN LUCIAN</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={sectionReveal}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-base lg:text-xl text-[#8A8A8A] max-w-2xl leading-[1.7] mb-12 lg:mb-16"
          >
            I design modern websites, visual identities, labels and digital experiences that help businesses stand out.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-medium bg-[#4F7CFF] text-white rounded-sm hover:bg-[#5a88ff] transition-all duration-300"
              >
                Start a Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium border border-[#232323] text-[#F5F5F5] rounded-sm hover:border-[#4F7CFF]/50 hover:text-[#4F7CFF] transition-all duration-300"
              >
                View Portfolio
              </a>
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#555]">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-8 bg-[#232323]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
