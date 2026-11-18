import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Brief & Scope",
    description:
      "We clarify your product, audience, goals, deliverables, timeline, and the materials needed before work begins.",
  },
  {
    number: "02",
    title: "Visual Direction",
    description:
      "I develop a clear visual direction and design the landing page, label, packaging, or poster in Figma.",
  },
  {
    number: "03",
    title: "Review & Refinement",
    description:
      "You review the first version and share feedback. Revisions are completed according to the scope agreed for your project.",
  },
  {
    number: "04",
    title: "Build & Delivery",
    description:
      "Product landing pages are built and checked on mobile and desktop. Poster and packaging projects are delivered in the agreed export formats, with editable Figma files when included in the project.",
  },
];

export default function ProcessPanel() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="py-4">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="mb-10 lg:mb-12"
      >
        <span className="text-[3rem] lg:text-[5rem] font-light text-[#1a1a1a] leading-none tracking-tighter">
          04
        </span>
        <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mt-4">
          Process
        </h2>
        <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
          A clear, collaborative process from the first conversation to final delivery.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-[#232323]">
        {steps.map((step, i) => (
          <motion.article
            key={step.number}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : i * 0.06,
              duration: shouldReduceMotion ? 0 : 0.5,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="relative border-r border-b border-[#232323] bg-[#0A0A0A] p-6 lg:p-8"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <span className="text-xs font-medium tracking-[0.12em] text-[#4F7CFF]">
                {step.number}
              </span>
              <span className="h-px flex-1 bg-[#232323]" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#F5F5F5] lg:text-2xl">
              {step.title}
            </h3>
            <p className="max-w-lg text-sm leading-relaxed text-[#8A8A8A] lg:text-base">
              {step.description}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
