import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, type ReactElement } from "react";

export type SectionId = "home" | "about" | "work" | "services" | "process" | "contact";

interface SidebarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems: { id: SectionId; label: string; icon: ReactElement }[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
  },
  {
    id: "work",
    label: "Work",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: "services",
    label: "Services",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id: "process",
    label: "Process",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

interface SocialData {
  id: string;
  name: string;
  handle: string;
  url: string;
  description: string;
  color: string;
  icon: ReactElement;
}

const socials: SocialData[] = [
  {
    id: "telegram",
    name: "Telegram",
    handle: "@Lucian_SL",
    url: "https://t.me/Lucian_SL",
    description: "Fast & direct communication",
    color: "#26A5E4",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@luci_4n",
    url: "https://www.instagram.com/luci_4n",
    description: "Daily design inspiration",
    color: "#E4405F",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Lucian Soltan",
    url: "https://www.linkedin.com/in/lucian-soltan-4b3173261",
    description: "Professional network & career",
    color: "#0A66C2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export default function Sidebar({ activeSection, onNavigate, isMobileOpen, onMobileClose }: SidebarProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeSocial, setActiveSocial] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActiveSocial(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeSocialData = socials.find((s) => s.id === activeSocial);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-[70] w-[280px] bg-[#080808] border-r border-[#1a1a1a]
          flex flex-col
          transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          lg:translate-x-0
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
                <path d="M4 4H8V28H4V4Z" fill="#4F7CFF" />
                <path d="M8 28H28V24H8V28Z" fill="#4F7CFF" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-[0.15em] text-[#F5F5F5]">SOLTAN LUCIAN</span>
          </div>
          <p className="text-[11px] text-[#555] tracking-[0.1em] uppercase mt-3">
            Brand & Digital Designer
          </p>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-[#1a1a1a]" />

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onMobileClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium
                  transition-all duration-300 group
                  ${activeSection === item.id
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                    : "text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-[#111]"
                  }
                `}
              >
                <span className={`transition-colors duration-300 ${activeSection === item.id ? "text-[#4F7CFF]" : "text-[#555] group-hover:text-[#8A8A8A]"}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4F7CFF]"
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Divider */}
        <div className="mx-6 h-px bg-[#1a1a1a]" />

        {/* Status + Social */}
        <div className="px-6 py-5 space-y-5 relative">
          {/* Availability Status */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className="flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-[#555]"}`} />
              <span className="text-[11px] text-[#8A8A8A] tracking-wide">
                {isAvailable ? "Available for projects" : "Currently busy"}
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <button
                key={social.id}
                onClick={() => setActiveSocial(activeSocial === social.id ? null : social.id)}
                className={`w-8 h-8 rounded-sm border flex items-center justify-center transition-all duration-300 ${
                  activeSocial === social.id
                    ? "border-[#F5F5F5]/60 text-[#F5F5F5] bg-[#F5F5F5]/[0.06]"
                    : "border-[#2a2a2a] text-[#666] hover:text-[#F5F5F5] hover:border-[#555]"
                }`}
              >
                {social.icon}
              </button>
            ))}
          </div>

          {/* Social Popup Card */}
          <AnimatePresence mode="wait">
            {activeSocialData && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="absolute bottom-20 left-6 right-6 bg-[#0d0d0d] border border-[#2a2a2a] rounded-sm p-4 shadow-2xl shadow-black/50"
              >
                {/* Top row: icon + name */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Circular icon with brand color */}
                  <div className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center shrink-0 text-[#F5F5F5]">
                    {activeSocialData.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#F5F5F5] truncate">
                      {activeSocialData.name}
                    </p>
                    <p className="text-[11px] text-[#555] truncate">
                      {activeSocialData.handle}
                    </p>
                  </div>
                  {/* Close button */}
                  <button
                    onClick={() => setActiveSocial(null)}
                    className="w-6 h-6 flex items-center justify-center rounded-sm text-[#555] hover:text-[#F5F5F5] hover:bg-[#1a1a1a] transition-all duration-200"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                {/* Description */}
                <p className="text-[11px] text-[#666] mb-4">
                  {activeSocialData.description}
                </p>

                {/* Follow button */}
                <a
                  href={activeSocialData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm bg-[#F5F5F5] text-[#080808] text-sm font-medium transition-all duration-300 hover:bg-white active:scale-[0.98]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Follow on {activeSocialData.name}
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer text */}
          <p className="text-[10px] text-[#333]">
            &copy; {new Date().getFullYear()} Soltan Lucian
          </p>
        </div>
      </aside>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => onNavigate(activeSection)}
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
    </>
  );
}
