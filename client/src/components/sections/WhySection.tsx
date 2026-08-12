import { motion } from "framer-motion";
import { sectionReveal } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const reasons = [
  {
    title: "Premium Quality",
    description: "Every pixel is intentional. I deliver designs that meet the highest standards of visual excellence.",
  },
  {
    title: "Modern Design",
    description: "Staying at the forefront of design trends while maintaining timeless principles of great communication.",
  },
  {
    title: "Fast Communication",
    description: "Responsive, transparent, and proactive. You'll never wonder about the status of your project.",
  },
  {
    title: "Pixel Perfect",
    description: "Precision in every detail. Designs are delivered with meticulous attention to spacing, alignment, and consistency.",
  },
  {
    title: "Responsive",
    description: "Every design is crafted to look stunning across all devices — from mobile phones to ultra-wide monitors.",
  },
  {
    title: "Business Focused",
    description: "Design that drives results. Every decision is made with your business goals and audience in mind.",
  },
];

export default function WhySection() {
  const { ref, isInView } = useInView(0.05);

  return (
    <section className="py-24 lg:py-32 border-t border-[#232323] bg-[#0a0a0a]">
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
              05
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
              Why Work With Me
            </h2>
            <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
              Six reasons businesses choose to partner with me for their design needs.
            </p>
          </motion.div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="group p-7 lg:p-8 border border-[#232323] rounded-sm hover:border-[#4F7CFF]/30 transition-all duration-500 bg-[#080808]"
            >
              <div className="w-9 h-9 rounded-sm bg-[#111111] flex items-center justify-center mb-5 group-hover:bg-[#4F7CFF]/10 transition-colors duration-500">
                <span className="text-[11px] font-bold text-[#4F7CFF]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2 group-hover:text-[#4F7CFF] transition-colors duration-500">
                {reason.title}
              </h3>
              <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
