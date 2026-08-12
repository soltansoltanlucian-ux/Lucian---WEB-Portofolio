import { motion, AnimatePresence } from "framer-motion";
import { sectionReveal } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is your design process?",
    answer: "My process follows six key phases: Discover, Research, Wireframe, UI Design, Prototype, and Final Delivery. Each phase includes client collaboration and approval checkpoints to ensure the final result aligns perfectly with your vision.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope. A logo design typically takes 1-2 weeks, while a complete brand identity or website design may take 3-8 weeks. I provide a detailed timeline during our initial consultation.",
  },
  {
    question: "What deliverables will I receive?",
    answer: "You'll receive production-ready files in all necessary formats (Figma, PDF, PNG, SVG, etc.), brand guidelines documentation, and implementation support. For web projects, I provide developer-ready design specifications.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely. I work with clients worldwide. All communication is handled through video calls and email. Time zone differences are managed efficiently with asynchronous updates and scheduled review sessions.",
  },
  {
    question: "What is your pricing structure?",
    answer: "Each project is quoted individually based on scope, complexity, and timeline. I provide detailed proposals after our initial consultation. Payment is typically structured as 50% upfront and 50% upon completion.",
  },
  {
    question: "Can you work with my existing brand?",
    answer: "Yes. I can work within existing brand guidelines or help evolve your current visual identity. Whether it's a redesign or extension of an existing system, I ensure consistency while elevating the overall quality.",
  },
];

export default function FAQSection() {
  const { ref, isInView } = useInView(0.05);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 border-t border-[#232323] bg-[#0a0a0a]">
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
              07
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
              FAQ
            </h2>
            <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
              Common questions about working together. Can't find what you're looking for? Reach out directly.
            </p>
          </motion.div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="border-b border-[#232323]"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="text-base lg:text-lg font-medium text-[#F5F5F5] group-hover:text-[#4F7CFF] transition-colors duration-300 pr-8">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[#232323] rounded-full group-hover:border-[#4F7CFF] transition-colors duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7h10" stroke="#8A8A8A" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[#8A8A8A] text-base leading-relaxed pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
