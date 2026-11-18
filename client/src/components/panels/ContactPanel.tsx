import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/email";

interface ContactPanelProps {
  preselectedService?: string;
  onClearService?: () => void;
}

export default function ContactPanel({ preselectedService, onClearService }: ContactPanelProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    description: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
      if (onClearService) {
        // Clear it after setting so it doesn't override manual changes if user switches away and back
        onClearService();
      }
    }
  }, [preselectedService, onClearService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        toast.success(result.message);
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          description: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          05
        </span>
        <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mt-4">
          Let's Work Together
        </h2>
        <p className="text-[#8A8A8A] text-lg mt-4 max-w-xl">
          Every great project begins with a conversation. Tell me about your vision and let's create something exceptional together.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-[#8A8A8A] mb-3">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#232323] py-3 text-[#F5F5F5] text-base focus:border-[#4F7CFF] focus:outline-none transition-colors duration-300 placeholder:text-[#333]"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-[#8A8A8A] mb-3">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#232323] py-3 text-[#F5F5F5] text-base focus:border-[#4F7CFF] focus:outline-none transition-colors duration-300 placeholder:text-[#333]"
                placeholder="your@email.com"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-[#8A8A8A] mb-3">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#232323] py-3 text-[#F5F5F5] text-base focus:border-[#4F7CFF] focus:outline-none transition-colors duration-300 placeholder:text-[#333]"
                placeholder="Your company"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-[#8A8A8A] mb-3">
                Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#232323] py-3 text-[#F5F5F5] text-base focus:border-[#4F7CFF] focus:outline-none transition-colors duration-300 appearance-none"
              >
                <option value="" className="bg-[#080808]">Select a service</option>
                <option value="Product Landing Page" className="bg-[#080808]">Product Landing Page</option>
                <option value="Label & Packaging Design" className="bg-[#080808]">Label & Packaging Design</option>
                <option value="Advertising Posters" className="bg-[#080808]">Advertising Posters</option>
                <option value="Other" className="bg-[#080808]">Other</option>
              </select>
            </div>

            {/* Budget */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-[#8A8A8A] mb-3">
                Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#232323] py-3 text-[#F5F5F5] text-base focus:border-[#4F7CFF] focus:outline-none transition-colors duration-300 appearance-none"
              >
                <option value="" className="bg-[#080808]">Select budget range</option>
                <option value="under-1500" className="bg-[#080808]">Under MDL 1,500</option>
                <option value="1500-3500" className="bg-[#080808]">MDL 1,500 - 3,500</option>
                <option value="3500-6500" className="bg-[#080808]">MDL 3,500 - 6,500</option>
                <option value="6500-10000" className="bg-[#080808]">MDL 6,500 - 10,000</option>
                <option value="10000+" className="bg-[#080808]">MDL 10,000+</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-[#8A8A8A] mb-3">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full bg-transparent border-b border-[#232323] py-3 text-[#F5F5F5] text-base focus:border-[#4F7CFF] focus:outline-none transition-colors duration-300 resize-none placeholder:text-[#333]"
                placeholder="Tell me about your project, goals, and timeline..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 px-10 py-4 text-sm font-medium bg-[#4F7CFF] text-white rounded-sm hover:bg-[#5a88ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#4F7CFF]/10 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1 pt-2">
            <p className="text-[11px] text-[#555]">
              Your message will be sent securely to the email address configured for this form.
            </p>
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-[11px] font-medium text-[#8A8A8A] uppercase tracking-wider">
                Average response time: &lt; 9 hours
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
