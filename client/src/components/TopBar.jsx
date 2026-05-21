import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const messages = [
  "Welcome Offer Coupon Code: WELCOME10",
  "Free Shipping on Orders Above ₹999",
  "Authentic Kovilpatti Kadalai Mittai",
  "Pure Jaggery • Handmade • Fresh",
];

const TopBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? messages.length - 1 : prev - 1
    );
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % messages.length);
  };

  return (
      <div className="relative z-50 w-full bg-[#6b1f0e] text-white text-xs sm:text-sm">
      
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-center gap-4 sm:gap-10 md:gap-20 overflow-hidden flex-nowrap">


        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="opacity-70 hover:opacity-100 transition flex-shrink-0"
        >
          <ChevronLeft size={16} className="sm:w-[18px]" />
        </button>

        {/* TEXT */}
        <span
          key={index}
          className="font-medium tracking-wide whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-500 max-w-[65vw] sm:max-w-none px-2"
        >
          {messages[index]}
        </span>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="opacity-70 hover:opacity-100 transition flex-shrink-0"
        >
          <ChevronRight size={16} className="sm:w-[18px]" />
        </button>

      </div>
    </div>
  );
};

export default TopBar;
