import { motion, AnimatePresence } from "framer-motion";
import { sectionReveal } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Lucian transformed our brand identity completely. The attention to detail and strategic thinking behind every design decision was exceptional. Our new visual identity has significantly elevated our market presence.",
    author: "Alexandra M.",
    role: "CEO",
    company: "Noble Skincare",
  },
  {
    id: 2,
    quote: "Working with Lucian was a seamless experience. He understood our vision from the first conversation and delivered a website design that exceeded all expectations. The process was efficient and the result speaks for itself.",
    author: "Marcus K.",
    role: "Founder",
    company: "Apex Digital",
  },
  {
    id: 3,
    quote: "The design system Lucian created for us has been transformative. It's not just beautiful — it's functional, scalable, and our entire team can use it effectively. Best investment we've made in our brand.",
    author: "Sarah L.",
    role: "Marketing Director",
    company: "FinFlow",
  },
];

export default function TestimonialsSection() {
  const { ref, isInView } = useInView(0.1);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => setCurrent(index), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 lg:py-32 border-t border-[#232323]">
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
              06
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
              Testimonials
            </h2>
            <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
              What clients say about working together.
            </p>
          </motion.div>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[220px] lg:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="text-center"
              >
                {/* Quote mark */}
                <span className="text-5xl lg:text-6xl text-[#232323] leading-none block mb-6">&ldquo;</span>
                <p className="text-lg lg:text-2xl text-[#F5F5F5] font-light leading-relaxed max-w-3xl mx-auto mb-8">
                  {testimonials[current].quote}
                </p>
                <div>
                  <p className="text-sm font-semibold text-[#F5F5F5]">
                    {testimonials[current].author}
                  </p>
                  <p className="text-xs text-[#8A8A8A] mt-1">
                    {testimonials[current].role} at {testimonials[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  current === i
                    ? "w-8 h-2 bg-[#4F7CFF]"
                    : "w-2 h-2 bg-[#232323] hover:bg-[#333]"
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
