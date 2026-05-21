import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts } from "../utils/getAllProducts";

const allProducts = getAllProducts();

const MobileSearch = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const filteredProducts =
    search.trim() === ""
      ? []
      : allProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );

  // Focus input when opened and lock body scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
      // Lock scroll robustly
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      setSearch("");
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset scroll to top when opened, search query changes, or keyboard toggles
  useEffect(() => {
    const resetScroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    };

    resetScroll();
    
    // Resize listener for keyboard toggle
    window.addEventListener("resize", resetScroll);
    return () => window.removeEventListener("resize", resetScroll);
  }, [search, isOpen]);

  const trendingTags = ["Kadalai Mittai", "Halwa", "Mysore Pak", "Laddu", "Karasevu"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden flex flex-col justify-end p-4 pb-6 gap-3">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#6b1f0e]/20 backdrop-blur-md touch-none"
          />

          {/* 1. RESULTS / SUGGESTIONS BOX */}
          <AnimatePresence mode="wait">
            <motion.div
              key={search.trim() === "" ? "suggestions" : "results"}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative w-full max-w-[440px] mx-auto bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col border border-white ring-1 ring-black/[0.05] z-20 pointer-events-auto"
              style={{ maxHeight: "calc(100dvh - 140px)" }}
            >
              {search.trim() === "" ? (
                /* SUGGESTIONS VIEW */
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center">
                      <TrendingUp size={12} className="text-orange-600" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#6b1f0e]/40">
                      Trending Now
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {trendingTags.map((tag) => (
                      <button 
                        key={tag}
                        onClick={() => setSearch(tag)}
                        className="px-5 py-2.5 bg-white hover:bg-[#6b1f0e] hover:text-white rounded-[16px] text-[13px] font-bold text-[#6b1f0e] transition-all active:scale-95 border border-[#6b1f0e]/5 shadow-sm"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* RESULTS VIEW */
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-white/50 sticky top-0 z-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#6b1f0e]/40">
                      Found {filteredProducts.length} Delights
                    </span>
                    {filteredProducts.length > 0 && (
                      <div className="flex items-center gap-1.5 animate-pulse">
                        <div className="w-1 h-1 rounded-full bg-orange-400" />
                        <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">Live Search</span>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto p-3 custom-scrollbar overscroll-contain touch-pan-y"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    {filteredProducts.length > 0 ? (
                      <div className="space-y-1.5">
                        {filteredProducts.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-3 hover:bg-[#6b1f0e]/5 rounded-[22px] transition-all active:scale-[0.98] group"
                          >
                            <div className="w-16 h-16 rounded-[18px] overflow-hidden bg-gray-50 flex-shrink-0 border border-white shadow-sm">
                              <img
                                src={item.img1}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-[#6b1f0e] font-black text-[15px] leading-tight mb-1">{item.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-orange-600 font-black text-sm">₹{item.price || 180}</span>
                                <span className="text-[10px] text-[#6b1f0e]/30 font-bold uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                  {item.category}
                                </span>
                              </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 border border-gray-50">
                              <ArrowRight size={18} className="text-[#6b1f0e]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-16 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-4 border border-orange-100/50">
                          <Search size={32} className="text-orange-300" />
                        </div>
                        <h5 className="text-[#6b1f0e] font-black text-lg mb-1">No matches found</h5>
                        <p className="text-[#6b1f0e]/40 text-xs font-bold tracking-wide">Try searching for something else</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* 2. SEARCH INPUT BAR */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative w-full max-w-[440px] mx-auto bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-2 flex items-center gap-2 border border-white ring-1 ring-black/[0.05] z-20 pointer-events-auto"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b1f0e]/30" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for delights..."
                className="w-full pl-11 pr-4 py-3.5 bg-[#6b1f0e]/[0.03] border-none rounded-[18px] focus:ring-0 outline-none text-[#6b1f0e] placeholder:text-[#6b1f0e]/25 font-semibold text-[15px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={onClose}
              className="p-3 text-[#6b1f0e]/40 hover:text-[#6b1f0e] transition-colors bg-gray-50 rounded-[16px]"
            >
              <X size={20} />
            </button>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearch;
