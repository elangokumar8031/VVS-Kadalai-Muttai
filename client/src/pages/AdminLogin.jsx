  import { useState, useEffect } from "react";
  import Breadcrumb from "../components/Breadcrumb";
  import { auth } from "../firebase";
  import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
  import { useNavigate } from "react-router-dom";


  const ADMIN_NUMBER = "9751582693"; // 👈 replace with real number
  
  const AdminLogin = () => {
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [greeting, setGreeting] = useState("Good Morning");
    const navigate = useNavigate();

    useEffect(() => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    }, []);

    const sendOtp = async () => {
  setMessage({ type: "", text: "" });

  if (mobile.length !== 10) {
    setMessage({ type: "error", text: "Enter a valid 10-digit mobile number" });
    return;
  }

  // 🔐 ADMIN CHECK
  if (mobile !== ADMIN_NUMBER) {
    setMessage({
      type: "error",
      text: "Access denied. Not an admin number.",
    });
    return;
  }

    try {
      const phoneNumber = "+91" + mobile;

      // ✅ ADD THIS ABOVE (clear old one if exists)
if (window.recaptchaVerifier) {
  window.recaptchaVerifier.clear();
}

// ✅ THEN CREATE NEW
window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "invisible",
  }
);

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      window.confirmationResult = confirmationResult;

      setOtpSent(true);
      setMessage({ type: "success", text: "OTP sent successfully" });

    } catch (error) {
      console.error("FULL ERROR:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const verifyOtp = async () => {
    setMessage({ type: "", text: "" });
      if (!window.confirmationResult) {
    setMessage({ type: "error", text: "Please request OTP first" });
    return;
  }

    try {
      const result = await window.confirmationResult.confirm(otp);

      console.log("Admin logged in:", result.user);

      setMessage({ type: "success", text: "Login successful!" });
      
      // ✅ Save role
      localStorage.setItem("role", "admin");

      // Optionally navigate to admin orders after login
      navigate("/admin/orders");

    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Invalid OTP" });
    }
  };

    const breadcrumbItems = [
      { label: "Home", to: "/" },
      { label: "Admin Login" },
    ];

    return (
      <div className="flex-1 flex flex-col">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">
            <h2 className="text-3xl font-black text-center text-[#6b1f0e] font-serif tracking-wide drop-shadow-sm mb-1">
              {greeting} Murugan
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6 mt-1">
              Verify that it is you
            </p>

            {/* Mobile Input */}
            <div className={`flex items-center border ${otpSent ? 'border-gray-200 bg-gray-100' : 'border-gray-300'} rounded-lg px-3 py-2.5 transition-colors`}>
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                className={`mr-2 ${otpSent ? 'opacity-60' : ''}`}
              />
              <span className={`mr-2 ${otpSent ? 'text-gray-400' : 'text-gray-600'}`}>+91</span>

              <input
                type="tel"
                placeholder="Enter mobile number"
                className={`outline-none text-black flex-1 bg-transparent placeholder-gray-400 ${otpSent ? 'text-gray-500' : ''}`}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent}
              />
            </div>

            {!otpSent ? (
              <button
                onClick={sendOtp}
                className="mt-5 w-full bg-[#6b1f0e] hover:bg-[#5a1a0c] text-white py-2.5 rounded-lg font-medium shadow-sm transition-all"
              >
                Send OTP
              </button>
            ) : (
              <div className="mt-5 space-y-3">
                <div className="relative pt-1 pb-1">
                  <input
                    type="text"
                    placeholder="------"
                    className="border-2 border-gray-200 bg-gray-50 w-full py-3 rounded-xl text-black outline-none focus:bg-white focus:border-[#6b1f0e] focus:ring-4 focus:ring-[#6b1f0e]/10 transition-all text-center text-3xl font-bold shadow-sm font-mono"
                    style={{ letterSpacing: '0.4em', paddingLeft: '0.4em' }}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                    autoComplete="one-time-code"
                  />
                </div>

                <button
                  onClick={verifyOtp}
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-2.5 rounded-lg font-medium shadow-sm"
                >
                  Verify OTP
                </button>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setMessage({ type: "", text: "" });
                  }}
                  className="w-full text-sm text-gray-500 hover:text-[#6b1f0e] mt-1 transition-colors font-medium"
                >
                  Edit Mobile Number
                </button>
              </div>
            )}

            {message.text && (
              <div className={`mt-5 text-center text-sm font-medium px-2 py-2 rounded ${message.type === 'success' ? 'text-green-700 bg-green-50 bg-opacity-50' : 'text-red-600 bg-red-50 bg-opacity-50'}`}>
                {message.text}
              </div>
            )}
            <div id="recaptcha-container" className="relative"></div>
          </div>
        </div>
        
      </div>
    );
  };

  export default AdminLogin;
