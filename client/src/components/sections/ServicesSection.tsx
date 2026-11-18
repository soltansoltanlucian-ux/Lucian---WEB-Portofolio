import ServicesPanel from "@/components/panels/ServicesPanel";
import type { SectionId } from "@/components/Sidebar";

/**
 * Compatibility wrapper for the original section-based layout.
 * The active portfolio uses DashboardLayout, but keeping this wrapper in sync
 * prevents a second, outdated services data source from drifting over time.
 */
export default function ServicesSection() {
  const handleNavigate = (section: SectionId) => {
    if (section === "contact") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <ServicesPanel onNavigate={handleNavigate} />;
}
