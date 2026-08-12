import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement } from "react";
import Sidebar, { type SectionId } from "./Sidebar";
import CustomCursor from "./CustomCursor";
import HomePanel from "./panels/HomePanel";
import AboutPanel from "./panels/AboutPanel";
import WorkPanel from "./panels/WorkPanel";
import ServicesPanel from "./panels/ServicesPanel";
import ProcessPanel from "./panels/ProcessPanel";
import ContactPanel from "./panels/ContactPanel";

export default function DashboardLayout() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback((section: SectionId, service?: string) => {
    setActiveSection(section);
    if (service) {
      setSelectedService(service);
    }
    // Scroll content panel to top
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleMobileClose = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const handleMobileToggle = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const panels: Record<SectionId, ReactElement> = {
    home: <HomePanel onNavigate={handleNavigate} />,
    about: <AboutPanel />,
    work: <WorkPanel />,
    services: <ServicesPanel onNavigate={handleNavigate} />,
    process: <ProcessPanel />,
    contact: <ContactPanel preselectedService={selectedService} onClearService={() => setSelectedService(undefined)} />,
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex">
      <CustomCursor />

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileOpen}
        onMobileClose={handleMobileClose}
      />

      {/* Mobile Menu Toggle (visible on mobile) */}
      <button
        onClick={handleMobileToggle}
        className="fixed top-5 left-5 z-[80] lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] p-2"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="block w-5 h-[1.5px] bg-[#F5F5F5] origin-center"
        />
        <motion.span
          animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="block w-5 h-[1.5px] bg-[#F5F5F5]"
        />
        <motion.span
          animate={isMobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="block w-5 h-[1.5px] bg-[#F5F5F5] origin-center"
        />
      </button>

      {/* Main Content Area */}
      <main
        ref={contentRef}
        className="flex-1 lg:ml-[280px] min-h-screen overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {panels[activeSection]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
