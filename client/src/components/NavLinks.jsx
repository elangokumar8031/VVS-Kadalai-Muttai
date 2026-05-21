import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { products } from "../data/Products";

const NavLinks = ({
  openKitchen,
  closeKitchen,
  openSweets,
  closeSweets,
  openBakery,
  closeBakery,
  openSavouries,
  closeSavouries,
  isMobile = false,
  closeMobileMenu,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Helper to get sub-items for display
  const getSubItems = (category) => {
    switch (category) {
      case "Sweets":
        return ["Ladoo", "Mittai", "Halwa", "Jangri", "MysorePak", "Chikki"];
      case "Savouries":
        return Object.keys(products.Savouries || {});
      case "Bakery":
        return Object.keys(products.Bakery || {});
      case "Kitchen Special":
        return (products.KitchenSpecial || []).map(p => p.name);
      default:
        return [];
    }
  };

  const navItems = [
    { name: "Sweets", to: "/sweets", type: "sweets" },
    { name: "Bakery", to: "/bakery", type: "bakery" },
    { name: "Savouries", to: "/savouries", type: "savouries" },
    { name: "Kitchen Special", to: "/category/KitchenSpecial", type: "kitchen" },
  ];

  return (
    <ul className={`flex ${isMobile ? 'flex-col gap-2 w-full px-6 py-2' : 'gap-4 lg:gap-6 xl:gap-10 text-base lg:text-lg'} text-[#6b1f0e] font-semibold transition-all duration-300`}>
      
      {navItems.map((item) => (
        <li key={item.name} className="w-full">
           <div 
             className={`flex items-center justify-between py-2 hover:text-orange-600 transition-colors ${isMobile ? 'border-b border-gray-50' : ''}`}
             onMouseEnter={!isMobile ? (item.type === 'sweets' ? openSweets : item.type === 'bakery' ? openBakery : item.type === 'savouries' ? openSavouries : openKitchen) : undefined}
             onMouseLeave={!isMobile ? (item.type === 'sweets' ? closeSweets : item.type === 'bakery' ? closeBakery : item.type === 'savouries' ? closeSavouries : closeKitchen) : undefined}
           >
              <NavLink
                to={item.to}
                className={({ isActive }) => `whitespace-nowrap ${(!isMobile && isActive) ? "text-orange-600" : ""}`}
                onClick={() => isMobile && closeMobileMenu?.()}
              >
                {item.name}
              </NavLink>
              
              {isMobile && (
                <motion.div
                  animate={{ rotate: expandedCategory === item.name ? 90 : 0 }}
                  className="p-2 text-gray-400 hover:text-orange-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCategory(expandedCategory === item.name ? null : item.name);
                  }}
                >
                  <ChevronRight size={18} />
                </motion.div>
              )}
           </div>

           {/* Mobile Nested Items */}
           <AnimatePresence>
             {isMobile && expandedCategory === item.name && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: "auto", opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="overflow-hidden bg-gray-50/50 rounded-lg mt-1"
               >
                 <ul className="flex flex-col py-2 px-4 gap-3">
                    {getSubItems(item.name).map((sub) => (
                      <li key={sub}>
                        <NavLink
                          to={`/category/${sub.replace(/\s+/g, '')}`}
                          className="text-sm text-gray-600 hover:text-orange-500 font-medium block py-1"
                          onClick={() => closeMobileMenu?.()}
                        >
                          {sub}
                        </NavLink>
                      </li>
                    ))}
                    {/* View All Link */}
                    <li>
                        <NavLink 
                            to={item.to} 
                            className="text-xs text-orange-400 font-bold uppercase tracking-wider block py-1 mt-1"
                            onClick={() => closeMobileMenu?.()}
                        >
                            View All {item.name} →
                        </NavLink>
                    </li>
                 </ul>
               </motion.div>
             )}
           </AnimatePresence>
        </li>
      ))}

      <li className={`py-2 hover:text-orange-600 transition-colors ${isMobile ? 'border-b border-gray-50' : ''}`}>
        <NavLink 
          to="/bulk-enquiry" 
          className="whitespace-nowrap"
          onClick={() => closeMobileMenu?.()}
        >
          Bulk Enquiry
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;