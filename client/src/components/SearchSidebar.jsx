import { useState, useEffect } from "react";
import { X, Search, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts } from "../utils/getAllProducts";

const allProducts = getAllProducts();

const SearchSidebar = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const filteredProducts =
    search.trim() === ""
      ? []
      : allProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Search Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 top-0 md:top-0 md:bottom-0 md:right-0 md:left-auto md:w-[450px] bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4 p-4 md:p-6 border-b border-gray-100">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6b1f0e] transition-colors" size={20} />
                <input
                  autoFocus
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#6b1f0e]/10 outline-none text-lg text-gray-900 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button 
                onClick={onClose}
                className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
              <div className="p-6">
                {search.trim() === "" ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Trending Searches</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Kadalai Mittai", "Halwa", "Mysore Pak", "Laddu"].map(tag => (
                          <button 
                            key={tag}
                            onClick={() => setSearch(tag)}
                            className="px-4 py-2 bg-gray-50 hover:bg-[#6b1f0e] hover:text-white rounded-full text-sm font-medium transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-500">
                        {filteredProducts.length} products found
                      </p>
                    </div>
                    
                    {filteredProducts.length > 0 ? (
                      <div className="grid gap-4">
                        {filteredProducts.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={item.img1}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-gray-900 font-bold group-hover:text-[#6b1f0e] transition-colors">{item.name}</h4>
                              <p className="text-[#6b1f0e] font-bold mt-0.5">₹{item.price || 180}</p>
                            </div>
                            <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowLeft className="rotate-180 text-gray-400" size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                          <Search size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-500 font-medium">We couldn't find any products matching "{search}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchSidebar;