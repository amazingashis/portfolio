"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-32 px-6">
      <Navbar />
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6">Let's Connect</h1>
          <p className="text-gray-400 text-lg mb-12">
            Have a project in mind, or just want to say hi? Drop a message below and I'll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                placeholder="How can I help you?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-center mt-4">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center mt-4">Failed to send message. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </main>
  );
}
