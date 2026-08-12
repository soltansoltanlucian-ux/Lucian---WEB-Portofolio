import { motion } from "framer-motion";

export default function AboutPanel() {
  const skills = [
    "Web Design",
    "UI/UX Design",
    "Logo Design",
    "Packaging",
    "Social Media Posters",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } },
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
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[3rem] lg:text-[5rem] font-light text-[#1a1a1a] leading-none tracking-tighter">
            01
          </span>
        </div>
        <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em]">
          About
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7"
        >
          <p className="text-[#8A8A8A] text-base lg:text-lg leading-relaxed mb-6">
            I'm a multidisciplinary designer with over 3 years of experience specializing in high-impact brand identities and digital experiences. My playground is <strong className="text-[#F5F5F5]">Figma</strong>, where I’ve mastered the art of turning complex ideas into seamless, pixel-perfect realities.
          </p>
          <p className="text-[#8A8A8A] text-base lg:text-lg leading-relaxed mb-10">
            I don't just build layouts; I craft evolving visual systems that grow with your business. I work with ambitious brands to create designs that don't just look beautiful — they perform and leave a lasting impression.
          </p>

          {/* Design Philosophy */}
          <div className="border-l-2 border-[#4F7CFF] pl-6 mb-12">
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#4F7CFF] mb-2">
              Design Philosophy
            </p>
            <p className="text-[#F5F5F5] text-lg font-medium leading-relaxed">
              "Design isn't just about how it looks; it's about how it feels and functions. I create experiences that resonate instantly—because true talent is measured by impact, not just decades on a clock."
            </p>
          </div>

          {/* Skills */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#8A8A8A] mb-4">
              Skills & Expertise
            </p>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="px-3.5 py-1.5 text-[11px] font-medium text-[#8A8A8A] border border-[#232323] rounded-sm hover:border-[#4F7CFF] hover:text-[#4F7CFF] transition-colors duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          className="lg:col-span-5 flex h-full"
        >
          <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-sm border border-[#242424] bg-[#F8E94E]">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/manus-storage/about_travel.webp"
                alt="Yellow travel-ticket editorial artwork"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            {/* Stats overlay */}
            <div className="absolute inset-x-4 bottom-4 rounded-sm border border-[#3A3A3A] bg-[#080808]/95 p-4 shadow-2xl backdrop-blur-sm lg:inset-x-5 lg:bottom-5 lg:p-5">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="block text-2xl font-bold leading-none text-[#F5F5F5] lg:text-3xl">3+</span>
                  <span className="mt-2 block text-[9px] font-medium uppercase tracking-[0.12em] text-[#A0A0A0] lg:text-[10px]">Years Exp.</span>
                </div>
                <div className="border-x border-[#2A2A2A]">
                  <span className="block text-2xl font-bold leading-none text-[#F5F5F5] lg:text-3xl">30+</span>
                  <span className="mt-2 block text-[9px] font-medium uppercase tracking-[0.12em] text-[#A0A0A0] lg:text-[10px]">Projects</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold leading-none text-[#F5F5F5] lg:text-3xl">10+</span>
                  <span className="mt-2 block text-[9px] font-medium uppercase tracking-[0.12em] text-[#A0A0A0] lg:text-[10px]">Clients</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
