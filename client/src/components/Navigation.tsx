import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: bgOpacity,
          backdropFilter: bgOpacity.get() > 0 ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(35,35,35,0.5)" : "1px solid transparent",
        }}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
                <path
                  d="M4 4H8V28H4V4Z"
                  fill="#4F7CFF"
                  className="transition-opacity duration-300 group-hover:opacity-80"
                />
                <path
                  d="M8 28H28V24H8V28Z"
                  fill="#4F7CFF"
                  className="transition-opacity duration-300 group-hover:opacity-80"
                />
              </svg>
            </div>
            <span className="text-base lg:text-lg font-bold tracking-wider text-[#F5F5F5]">LUCIAN</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center px-5 py-2.5 text-[13px] font-medium bg-[#4F7CFF] text-white rounded-sm hover:bg-[#5a88ff] transition-colors duration-300"
              >
                Start a Project
              </a>
            </MagneticButton>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-[#F5F5F5] origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-5 h-[1.5px] bg-[#F5F5F5]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-[#F5F5F5] origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0, pointerEvents: "auto" as const } : { opacity: 0, y: -20, pointerEvents: "none" as const }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-16 left-0 right-0 z-40 bg-[#080808]/98 backdrop-blur-xl border-b border-[#232323] md:hidden"
      >
        <nav className="container py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-[#F5F5F5] hover:text-[#4F7CFF] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center justify-center px-6 py-3.5 text-base font-medium bg-[#4F7CFF] text-white rounded-sm w-fit"
          >
            Start a Project
          </a>
        </nav>
      </motion.div>
    </>
  );
}
