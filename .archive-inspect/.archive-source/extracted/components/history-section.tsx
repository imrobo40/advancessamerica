// components/OurHistorySection.tsx
"use client";

import { motion } from "framer-motion";
import { companyName } from "../lib/constants";
import Image from "next/image";

export  function HistorySection() {
  return (
    <section className="our-history-section py-16 bg-white">
      <div className="container-xl max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Column: Text + Button + Main Image (our-history-2.png) */}
          <div className="col-lg-5 flex flex-col justify-between">
            {/* Text Content */}
            <div>
              <motion.h2
                className="section-title text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Our History
              </motion.h2>
              <motion.p
                className="history-description mb-6 text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {companyName} has been a trusted lending partner, designed to simplify your financial journey. 
                Our company offers intuitive features that help you manage loans, plan for the future, 
                and achieve financial stability. With {companyName}, take control of your financial 
                future and reach your goals with ease.
              </motion.p>
              <motion.a
                href="/about"
                className="btn btn-primary mission-btn inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Our Mission
              </motion.a>
            </div>

            {/* Bottom Image: our-history-2.png */}
            <motion.div
              className="mt-8 lg:mt-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Image
                src="/img/our-history-2.png"
                alt="Business Meeting"
                width={500}
                height={200}
                className="w-full h-auto object-cover rounded-lg shadow-md m-2"
              />
            </motion.div>
          </div>

          {/* Right Column: Full-height Image (our-history-1.png) */}
          <div className="col-lg-7 flex items-center justify-center">
            <motion.div
              className="w-full h-80 lg:h-96 overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/img/our-history-1.png"
                alt="A couple at a business meeting"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
