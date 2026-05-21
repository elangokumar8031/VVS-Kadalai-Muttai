import { useState } from "react";

const Logi_n = () => {
  const [mobile, setMobile] = useState("");

  const sendOtp = () => {
    console.log("Send OTP to:", mobile);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Login with Mobile
        </h2>

        {/* Mobile Input */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <img
            src="https://flagcdn.com/w20/in.png"
            alt="India"
            className="mr-2"
          />
          <span className="mr-2 text-gray-600">+91</span>

          <input
            type="tel"
            placeholder="Enter mobile number"
            className="outline-none flex-1"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <button
          onClick={sendOtp}
          className="mt-5 w-full bg-[#6b1f0e] text-white py-2 rounded-lg"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default Logi_n;