const socialLinks = [
  {
    name: "Telegram",
    href: "https://t.me/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "Behance",
    href: "https://behance.net/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h8a3 3 0 010 6H3M3 13h9a3 3 0 010 6H3"/>
        <path d="M15 14h5"/>
        <circle cx="18" cy="7" r="3"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#232323] py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
                  <path d="M4 4H8V28H4V4Z" fill="#4F7CFF" />
                  <path d="M8 28H28V24H8V28Z" fill="#4F7CFF" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-wider text-[#F5F5F5]">LUCIAN</span>
            </div>
            <p className="text-sm text-[#8A8A8A] leading-relaxed max-w-xs">
              Brand & Digital Designer crafting visual experiences that help businesses stand out.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#8A8A8A] mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {["Work", "Services", "Process", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-[#F5F5F5] hover:text-[#4F7CFF] transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#8A8A8A] mb-6">
              Services
            </h4>
            <nav className="flex flex-col gap-3">
              {["Website Design", "Brand Identity", "UI/UX Design", "Logo Design", "Packaging"].map((service) => (
                <span key={service} className="text-sm text-[#8A8A8A]">
                  {service}
                </span>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h4 className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#8A8A8A] mb-6">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-[#4F7CFF] transition-colors duration-300"
                >
                  <span className="transition-transform duration-300 hover:translate-x-0.5">
                    {social.icon}
                  </span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#232323] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555]">
            &copy; {new Date().getFullYear()} Lucian. All rights reserved.
          </p>
          <p className="text-xs text-[#555]">
            Made with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
