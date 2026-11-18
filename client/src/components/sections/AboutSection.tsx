import { motion } from "framer-motion";
import { sectionReveal } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

export default function AboutSection() {
  const { ref, isInView } = useInView(0.15);

  const skills = [
    "Product Landing Pages",
    "Label & Packaging Design",
    "Advertising Posters",
  ];

  return (
    <section id="about" className="py-24 lg:py-32 border-t border-[#232323]">
      <div className="container">
        {/* Section Header */}
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Section Number */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <span className="text-[5rem] lg:text-[8rem] font-light text-[#1a1a1a] leading-none tracking-tighter">
              01
            </span>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="lg:col-span-6"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F5F5] mb-8 tracking-[-0.02em]">
              About
            </h2>
            <p className="text-[#8A8A8A] text-base lg:text-lg leading-relaxed mb-6">
              I’m Lucian Soltan, a designer with 3+ years of experience working in <strong className="text-[#F5F5F5]">Figma</strong>. I design and build simple, mobile-responsive product landing pages, and create original labels, packaging, and advertising posters for products and small brands.
            </p>
            <p className="text-[#8A8A8A] text-base lg:text-lg leading-relaxed mb-10">
              My focus is clear product presentation, thoughtful visual hierarchy, and practical designs that help visitors understand the product and know what to do next. Product landing pages can guide visitors to contact or order through Instagram or WhatsApp; they are not complex online stores or custom software products.
            </p>

            {/* Design Philosophy */}
            <div className="border-l-2 border-[#4F7CFF] pl-6 mb-12">
              <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#4F7CFF] mb-2">
                Design Philosophy
              </p>
              <p className="text-[#F5F5F5] text-lg font-medium leading-relaxed">
                “Good design should make a product easier to understand and the next step clear.”
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="px-3.5 py-1.5 text-[11px] font-medium text-[#8A8A8A] border border-[#232323] rounded-sm hover:border-[#4F7CFF] hover:text-[#4F7CFF] transition-colors duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
            className="lg:col-span-4"
          >
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src="/manus-storage/about-photo_84e4dcce.png"
                  alt="Lucian — Professional Designer"
                  className="w-full h-full object-cover grayscale-[50%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 bg-gradient-to-t from-[#080808] to-transparent">
                <div className="flex gap-6 lg:gap-8">
                  <div>
                    <span className="block text-xl lg:text-2xl font-bold text-[#F5F5F5]">3+</span>
                    <span className="text-[11px] text-[#8A8A8A] tracking-wide">Years Exp.</span>
                  </div>
                  <div>
                    <span className="block text-xl lg:text-2xl font-bold text-[#F5F5F5]">15</span>
                    <span className="text-[11px] text-[#8A8A8A] tracking-wide">Projects</span>
                  </div>
                  <div>
                    <span className="block text-xl lg:text-2xl font-bold text-[#F5F5F5]">7+</span>
                    <span className="text-[11px] text-[#8A8A8A] tracking-wide">Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
