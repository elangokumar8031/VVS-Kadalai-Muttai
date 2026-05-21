import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Phone, Trophy, Copy, Check } from "lucide-react";

/**
 * Prize Data Configuration
 * Each segment occupies 45 degrees (360/8)
 */
const prizes = [
  { text: "20% OFF", code: "HERITAGE20", color: "#5C1A0B", textColor: "#ffffff" },
  { text: "FREE SHIPPING", code: "SHIPFREE", color: "#D4AF37", textColor: "#1a0e06" },
  { text: "BUY 1 GET 1", code: "BOGOPEANUT", color: "#3a3028", textColor: "#ffffff" },
  { text: "₹150 OFF", code: "VVS150", color: "#cd853f", textColor: "#ffffff" },
  { text: "25% OFF", code: "LUCKY25", color: "#5C1A0B", textColor: "#ffffff" },
  { text: "SURPRISE GIFT", code: "GIFTBOX", color: "#D4AF37", textColor: "#1a0e06" },
  { text: "₹100 OFF", code: "VVS100", color: "#3a3028", textColor: "#ffffff" },
  { text: "EXTRA SWEETS", code: "EXTRASWEET", color: "#cd853f", textColor: "#ffffff" },
];

const WheelSegment = ({ index, prize, total }) => {
  const angle = 360 / total;
  const startAngle = index * angle;
  const endAngle = (index + 1) * angle;

  // SVG Path calculation for a wedge
  const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
  const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
  const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
  const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

  return (
    <g transform={`rotate(0, 50, 50)`}>
      <path d={pathData} fill={prize.color} stroke="#f5e6c8" strokeWidth="0.5" />
      <text
        x="76"
        y="50"
        fill={prize.textColor}
        fontSize="2.6"
        fontWeight="bold"
        fontFamily="Cormorant Garamond, serif"
        transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
        style={{ textAnchor: "middle", alignmentBaseline: "middle", letterSpacing: "0.05em" }}
      >
        {prize.text}
      </text>
    </g>
  );
};

const LuckyWheelModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user has already spun
    const hasSpun = localStorage.getItem("hasSpunLuckyWheel");
    if (!hasSpun) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current overflow
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleSpin = () => {
    if (phone.length < 10 || isSpinning) return;

    setIsSpinning(true);
    // Pick a random prize
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    
    // Calculate rotation: 5 full spins + offset to land on the prize center
    // We adjust for the pointer being at the top (starts at -90deg logic)
    const segmentAngle = 360 / prizes.length;
    const targetRotation = 360 * 5 + (360 - (prizeIndex * segmentAngle + segmentAngle / 2));
    
    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prizes[prizeIndex]);
      localStorage.setItem("hasSpunLuckyWheel", "true");
      localStorage.setItem("wonPrizeCode", prizes[prizeIndex].code);
    }, 5000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wonPrize.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-start pointer-events-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => !isSpinning && !wonPrize && setIsOpen(false)}
          />

          {/* Main Modal Panel */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative w-full max-w-md h-screen bg-[#fdfbf7] shadow-2xl pointer-events-auto flex flex-col overflow-hidden border-r-2 border-[#D4AF37]"
            style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            {/* Close button — top-16 on mobile clears browser chrome, md:top-4 on desktop */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close wheel modal"
              className="absolute top-16 md:top-4 right-3 z-20 flex items-center justify-center w-10 h-10 bg-white shadow-md rounded-full transition-colors text-[#5C1A0B] touch-manipulation border border-[#D4AF3760]"
            >
              <X size={20} />
            </button>

            <div className="flex-1 flex flex-col items-center justify-start pt-14 px-4 sm:px-8 pb-12 overflow-y-auto custom-scrollbar">
              {!wonPrize ? (
                <div className="flex flex-col items-center text-center max-w-xl mx-auto w-full">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="mb-6 p-4 bg-[#5C1A0B] rounded-full text-white"
                  >
                    <Gift size={32} />
                  </motion.div>
                  
                  <h2 className="font-serif text-2xl md:text-3xl text-[#5C1A0B] mb-1 font-bold leading-tight">
                    Spin for a Heritage Surprise!
                  </h2>
                  <p className="font-sans text-[#7A5C44] mb-4 text-xs md:text-sm italic">
                    Unlock exclusive discounts and gifts from VVS Mittai Kadai.
                  </p>

                  {/* WHEEL VISUAL */}
                  <div className="relative w-56 h-56 md:w-64 md:h-64 mb-6 flex items-center justify-center">
                    {/* The Pointer */}
                    <div className="absolute top-0 z-20 transform -translate-y-2">
                       <div className="w-6 h-6 bg-white shadow-lg border-x-8 border-x-transparent border-t-[16px] border-t-[#5C1A0B] rounded-sm" />
                    </div>

                    {/* The Wheel */}
                    <motion.svg
                      viewBox="0 0 100 100"
                      className="w-full h-full drop-shadow-2xl"
                      animate={{ rotate: rotation }}
                      transition={{ duration: 5, ease: [0.12, 0, 0.39, 0] }}
                    >
                      <circle cx="50" cy="50" r="49" fill="#C8860A" stroke="#C8860A" strokeWidth="2" />
                      {prizes.map((p, i) => (
                        <WheelSegment key={i} index={i} prize={p} total={prizes.length} />
                      ))}
                      {/* Center Hub */}
                      <circle cx="50" cy="50" r="6" fill="#fdfbf7" stroke="#C8860A" strokeWidth="1.5" />
                      <circle cx="50" cy="50" r="2" fill="#5C1A0B" />
                    </motion.svg>
                  </div>

                  {/* FORM */}
                  <div className="w-full max-w-xs space-y-4">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A5C44]" size={16} />
                      <input
                        type="tel"
                        placeholder="Enter 10-digit Phone"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        disabled={isSpinning}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-[#D4AF37] rounded-lg outline-none focus:ring-2 focus:ring-[#5C1A0B] transition-all font-sans text-sm text-[#1a0e06]"
                      />
                    </div>
                    
                    <button
                      onClick={handleSpin}
                      disabled={phone.length < 10 || isSpinning}
                      className={`w-full py-3 rounded-lg font-bold tracking-widest uppercase transition-all shadow-xl text-sm
                        ${phone.length < 10 || isSpinning 
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                          : "bg-[#5C1A0B] text-white hover:bg-[#7a220e] active:scale-95"
                        }`}
                    >
                      {isSpinning ? "Spinning Heritage..." : "Spin Now"}
                    </button>
                    
                    <p className="text-[10px] text-gray-400">
                      *By spinning, you agree to receive promotional messages. No spam, only sweets!
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mb-8"
                  >
                    <Trophy size={80} className="text-[#C8860A]" />
                  </motion.div>

                  <h2 className="font-serif text-4xl text-[#5C1A0B] mb-2 font-black italic">
                    Congratulations!
                  </h2>
                  <p className="text-[#7A5C44] text-lg mb-8">
                    You've won <span className="font-bold text-[#5C1A0B] underline">{wonPrize.text}</span>
                  </p>

                  <div className="w-full bg-white border-2 border-dashed border-[#C8860A] rounded-xl p-6 mb-8 relative">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Your Unique Coupon</p>
                    <div className="flex items-center justify-between gap-4">
                       <span className="text-3xl font-black text-[#1a0e06] tracking-tighter">{wonPrize.code}</span>
                       <button 
                        onClick={copyToClipboard}
                        className="p-3 bg-[#5C1A0B] text-white rounded-lg hover:bg-[#7a220e] transition-colors"
                       >
                         {copied ? <Check size={20} /> : <Copy size={20} />}
                       </button>
                    </div>
                  </div>

                  <p className="text-sm text-[#7A5C44] italic mb-6">
                    This offer is valid for your current phone number and order.
                  </p>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 bg-[#1a0e06] text-white rounded-lg font-bold tracking-widest uppercase hover:bg-black transition-all"
                  >
                    Start Shopping
                  </button>
                </motion.div>
              )}
            </div>

            {/* Bottom Accent Decor */}
            <div className="h-1 w-full bg-gradient-to-r from-[#5C1A0B] via-[#C8860A] to-[#5C1A0B]" />
          </motion.div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #5C1A0B20; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #5C1A0B40; }
      `}</style>
    </AnimatePresence>
  );
};

export default LuckyWheelModal;
