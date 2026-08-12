import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Discovery", description: "Understanding your brand goals and audience to set a clear creative direction." },
  { number: "02", title: "Strategy & Design", description: "Creating high-fidelity visual layouts and interactive systems exclusively in Figma." },
  { number: "03", title: "Iteration", description: "Refining the design based on your feedback to ensure every detail is perfect." },
  { number: "04", title: "Delivery", description: "Handing off pixel-perfect, developer-ready Figma files for seamless implementation." },
];

export default function ProcessPanel() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
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
          04
        </span>
        <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mt-4">
          Process
        </h2>
        <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
          A structured approach that ensures every project delivers exceptional results on time.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line - desktop */}
        <div className="hidden lg:block absolute left-[1.75rem] top-0 bottom-0 w-px bg-[#232323]" />

        <div className="space-y-10 lg:space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className={`relative lg:grid lg:grid-cols-12 lg:gap-16 ${i > 0 ? "lg:pt-14" : ""}`}
            >
              {/* Step indicator */}
              <div className="lg:col-span-2 flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
                <div className="relative z-10 flex items-center lg:justify-center">
                  <div className="w-10 h-10 rounded-full border border-[#232323] bg-[#080808] flex items-center justify-center">
                    <span className="text-xs font-medium text-[#4F7CFF]">{step.number}</span>
                  </div>
                </div>
                {/* Connecting line for mobile */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute left-5 top-12 w-px h-12 bg-[#232323]" />
                )}
              </div>

              {/* Content */}
              <div className="lg:col-span-10 pl-0 lg:pl-8 pb-8 lg:pb-14">
                <h3 className="text-2xl lg:text-3xl font-semibold text-[#F5F5F5] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#8A8A8A] text-base leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
