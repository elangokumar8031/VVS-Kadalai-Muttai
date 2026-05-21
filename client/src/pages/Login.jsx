import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { User, Mail, Phone, MapPin, Home, Building2, Map, ArrowRight, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    doorNo: "",
    city : "",
    pincode: "",
    state: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      handlePincodeLookup(value);
    }
  };

  const handlePincodeLookup = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
        const { District, State } = data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          city: District,
          state: State
        }));
      }
    } catch (error) {
      console.error("Pincode lookup failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Handle Login
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setMessage({ type: "error", text: "Please fill in email and password" });
        return;
      }
      setIsSubmitting(true);
      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage({ type: "success", text: "Login successful!" });
          // Typically you would save a token or user info here and redirect to home
          // window.location.href = "/";
        } else {
          setMessage({ type: "error", text: data.message || "Invalid credentials" });
        }
      } catch (error) {
        console.error("Login failed:", error);
        setMessage({ type: "error", text: "Server error" });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (!isLogin && step === 1) {
      // Step 1 Validation
      if (!formData.fullName || !formData.phone || !formData.email || !formData.password) {
        setMessage({ type: "error", text: "Please fill in all Step 1 fields" });
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await fetch("http://localhost:5000/api/auth/check-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json();
        
        if (data.exists) {
          setIsLogin(true);
          setMessage({ type: "error", text: "You are already a user. Please sign in." });
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        console.error("Check user failed:", error);
      }
      setIsSubmitting(false);

      setStep(2);
      return;
    }

    // Final Submission Validation
    const requiredFields = ["fullName", "phone", "email", "password", "doorNo", "city", "pincode", "state"];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          street: formData.doorNo,
          city: formData.city,
          pincode: formData.pincode,
          state: formData.state,
        }),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Account created successfully",
        });
        setIsLogin(true); // Automatically switch to sign-in on success
      } else {
        setMessage({
          type: "error",
          text: data.message || "Something went wrong",
        });
      }

    } catch (error) {
      console.error("❌ FETCH ERROR:", error);

      setMessage({
        type: "error",
        text: "Server error",
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setMessage({ type: "", text: "" });
  };

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: isLogin ? "Sign In" : "Join Us" },
  ];

  return (
    <div className="bg-[#fffcf8] min-h-screen flex flex-col font-sans">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-brown-100 rounded-full blur-3xl opacity-30" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(107,31,14,0.1)] w-full max-w-[450px] relative z-10 border border-orange-50"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <motion.div 
                key={isLogin ? "login-icon" : `register-icon-${step}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block p-3 bg-orange-50 rounded-2xl relative"
              >
                {!isLogin && step === 2 ? (
                  <MapPin className="w-8 h-8 text-[#6b1f0e]" />
                ) : (
                  <User className="w-8 h-8 text-[#6b1f0e]" />
                )}
              </motion.div>
            </div>
            
            <h2 className="text-3xl font-bold text-[#6b1f0e] mb-2 tracking-tight">
              {isLogin ? "Welcome Back" : step === 1 ? "Join the Legacy" : "Your Address"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin 
                ? "Sign in to access your account" 
                : step === 1 
                  ? "Experience the authentic taste of South India" 
                  : "Help us reach you faster"}
            </p>

            {/* Progress Indicator */}
            {!isLogin && (
              <div className="flex justify-center gap-2 mt-4">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-[#6b1f0e]' : 'w-4 bg-orange-100'}`} />
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-[#6b1f0e]' : 'w-4 bg-orange-100'}`} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {isLogin || step === 1 ? (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {!isLogin && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6b1f0e] transition-colors" />
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-3.5 bg-white border border-black rounded-2xl outline-none focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/5 transition-all text-gray-800 placeholder-gray-400"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {!isLogin && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                      <div className="relative group flex">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-gray-200">
                          <span className="text-sm font-medium text-gray-500">+91</span>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Mobile number"
                          className="w-full pl-16 pr-4 py-3.5 bg-white border border-black rounded-2xl outline-none focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/5 transition-all text-gray-800 placeholder-gray-400"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength={10}
                        />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6b1f0e] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-black rounded-2xl outline-none focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/5 transition-all text-gray-800 placeholder-gray-400"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6b1f0e] transition-colors" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-black rounded-2xl outline-none focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/5 transition-all text-gray-800 placeholder-gray-400"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Door No, Street, Village or Town */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Door no, street name, village or Town</label>
                    <div className="relative group">
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6b1f0e] transition-colors" />
                      <input
                        type="text"
                        name="doorNo"
                        placeholder="Door no, street, village or town"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-black rounded-2xl outline-none focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/5 transition-all text-gray-800 placeholder-gray-400"
                        value={formData.doorNo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Pincode and City */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Pincode</label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6b1f0e] transition-colors" />
                        <input
                          type="text"
                          name="pincode"
                          placeholder="6 digits"
                          className="w-full pl-12 pr-4 py-3.5 bg-white border border-black rounded-2xl outline-none focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/5 transition-all text-gray-800 placeholder-gray-400"
                          value={formData.pincode}
                          onChange={handleChange}
                          maxLength={6}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">District</label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6b1f0e] transition-colors" />
                        <input
                          type="text"
                          name="city"
                          placeholder="District"
                          className="w-full pl-12 pr-4 py-3.5 bg-white border border-black rounded-2xl outline-none focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/5 transition-all text-gray-800 placeholder-gray-400"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* State */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">State</label>
                    <div className="relative group">
                      <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6b1f0e] transition-colors" />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-black rounded-2xl outline-none focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/5 transition-all text-gray-800 placeholder-gray-400"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 mt-8">
              {!isLogin && step === 2 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className={`${!isLogin && step === 2 ? 'flex-[2]' : 'w-full'} bg-[#6b1f0e] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#6b1f0e]/20 flex items-center justify-center gap-2 hover:bg-[#5a1a0c] transition-all disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : step === 1 ? "Continue" : "Create Account"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Messages */}
          <AnimatePresence>
            {message.text && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-6 p-4 rounded-2xl flex items-center gap-3 ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-100' 
                    : 'bg-red-50 text-red-700 border border-red-100'
                }`}
              >
                {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : null}
                <p className="text-sm font-medium">{message.text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "New to VVS?" : "Already have an account?"}{" "}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setStep(1);
                  setMessage({ type: "", text: "" });
                }}
                className="text-[#6b1f0e] font-bold hover:underline"
              >
                {isLogin ? "Join Us" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;