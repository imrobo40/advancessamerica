// app/contact/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"success" | "error" | "missing" | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("missing");
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <section className="contact-section py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question about our loan products or need assistance? Don't hesitate to reach out to us using the contact form below.
              Our team is dedicated to providing prompt and helpful responses to all inquiries.
            </p>
          </motion.div>

          {/* Alerts */}
          <AnimateStatus status={status} onClose={() => setStatus(null)} />

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your needs..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    <Send size={18} />
                    Send Message
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 text-sm text-gray-500"
          >
            <p>Or email us directly at: <a href="mailto:support@advanceamericaneft.com" className="text-blue-600 hover:underline">support@advanceamericaneft.com</a></p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Reusable animated status alert
function AnimateStatus({
  status,
  onClose,
}: {
  status: "success" | "error" | "missing" | null;
  onClose: () => void;
}) {
  if (!status) return null;

  const config = {
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      msg: "✅ Thank you! Your message has been sent successfully.",
    },
    error: {
      bg: "bg-red-100",
      text: "text-red-800",
      msg: "❌ Sorry, there was a problem sending your message. Please try again.",
    },
    missing: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      msg: "⚠️ Please fill in all required fields.",
    },
  };

  const { bg, text, msg } = config[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`mb-6 p-4 rounded-lg ${bg} ${text} flex justify-between items-center text-sm`}
    >
      <span>{msg}</span>
      <button onClick={onClose} className="font-bold">
        ✕
      </button>
    </motion.div>
  );
}
