import ProcessPanel from "@/components/panels/ProcessPanel";

/**
 * Compatibility wrapper for the original section-based layout.
 * The active portfolio uses DashboardLayout and ProcessPanel directly.
 */
export default function ProcessSection() {
  return (
    <section id="process" className="border-t border-[#232323]">
      <div className="container">
        <ProcessPanel />
      </div>
    </section>
  );
}
