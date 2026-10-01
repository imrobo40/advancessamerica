// app/about/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section*/}
      <section className="about-hero-section py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="row align-items-start">
            <div className="col-md-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">About Advance America</h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Advance America is a loan company that offers a wide range of products and services, including personal loans, payday loans, business loans, and debt consolidation.
                Established in 1900, we were founded with the idea of providing loans to citizens with poor credit, offering financial help through easy monthly installments with low-interest rates.
                This rich history and unique approach to lending set us apart from other loan companies.
              </p>
            </div>
          </div>

          {/* Spacing */}
          <div className="mt-12"></div>

          {/* Hero Image */}
          <div className="row align-items-end justify-content-end">
            <div className="col-md-8 ms-auto">
              <div
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src="/img/about-1.png"
                  alt="A couple at a business meeting"
                  width={800}
                  height={500}
                  className={`w-full h-auto transition-transform duration-500 ${isHovered ? "scale-105" : ""}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <Image
                src="/img/about-2.png"
                alt="Shake on It"
                width={600}
                height={400}
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
            </div>
            <div className="col-md-6 ms-auto ps-md-5">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At Advance America, we are committed to revolutionizing the lending experience for our customers. Our goal is to empower individuals with the financial assistance they need to make informed decisions, achieve their goals, and secure their financial future.
              </p>
              <p className="text-blue-600 font-medium mt-2">
                Join us in our mission to transform the lending industry and help everyone access the financial support they deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-700 text-lg">
              Our dedicated team at Advance America is committed to providing exceptional service and expertise to our valued customers.
            </p>
          </div>

          <div className="row g-4">
            {/* Team Member 1 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm team-member rounded-xl overflow-hidden">
                <Image
                  src="/img/team-1.png"
                  alt="Johnny Miller"
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5 text-center">
                  <p className="text-sm text-gray-500">CEO</p>
                  <h5 className="font-semibold text-gray-900">Johnny Miller</h5>
                  <p className="text-gray-600 text-sm mt-2">
                    Johnny excels in building relationships with clients and driving sales to meet and exceed targets.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm team-member rounded-xl overflow-hidden">
                <Image
                  src="/img/team-2.png"
                  alt="Josh Smith"
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5 text-center">
                  <p className="text-sm text-gray-500">Operations Manager</p>
                  <h5 className="font-semibold text-gray-900">Josh Smith</h5>
                  <p className="text-gray-600 text-sm mt-2">
                    Josh is dedicated to providing top-notch customer support, ensuring all inquiries are handled promptly and efficiently.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm team-member rounded-xl overflow-hidden">
                <Image
                  src="/img/team-3.png"
                  alt="Sarah Brown"
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5 text-center">
                  <p className="text-sm text-gray-500">Sales Associate</p>
                  <h5 className="font-semibold text-gray-900">Sarah Brown</h5>
                  <p className="text-gray-600 text-sm mt-2">
                    Sarah manages the day-to-day operations, optimizing processes to enhance productivity and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
