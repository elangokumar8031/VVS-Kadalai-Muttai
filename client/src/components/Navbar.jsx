import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CircularText from "../pages/CircularText";
import NavLinks from "./NavLinks";
import NavbarActions from "./NavbarActions";


const Navbar = ({
  isScrolled,
  openSearch,
  openKitchen,
  closeKitchen,
  openSweets,
  closeSweets,
  openBakery,
  closeBakery,
  openSavouries,
  closeSavouries,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/sweets") return "Sweets";
    if (path === "/bakery") return "Bakery";
    if (path === "/savouries") return "Savouries";
    return null;
  };

  const currentCategory = getBreadcrumb();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`w-full transition-all duration-300 h-[70px] sm:h-[80px] flex items-center px-4 sm:px-8 relative z-50 ${isScrolled ? "bg-white/70 backdrop-blur-[12px] border-b border-white/20 shadow-sm lg:bg-white lg:backdrop-blur-none lg:border-b-0 lg:shadow-sm" : "bg-transparent lg:bg-white lg:shadow-sm"}`}>
      
      {/* DESKTOP VIEW RENDERING (UNCHANGED LOGIC) */}
      <div className="hidden lg:flex items-center w-full">
        {/* LEFT - LOGO + BREADCRUMB */}
        <div className="flex items-center gap-6 min-w-[240px]">
          <Link to="/" className="flex-shrink-0">
            <CircularText
              text="*VVS*VVS*VVS*VVS"
              spinDuration={21}
              onHover="pause"
              size={56}
            />
          </Link>

          {currentCategory && (
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#6b1f0e]">
              <Link to="/" className="hover:text-orange-500 transition-colors opacity-60">HOME</Link>
              <span className="opacity-30">/</span>
              <span className="text-orange-600">{currentCategory}</span>
            </div>
          )}
        </div>

        {/* CENTER - LINKS */}
        <div className="flex-1 flex justify-center">
          <NavLinks
            openKitchen={openKitchen}
            closeKitchen={closeKitchen}
            openSweets={openSweets}
            closeSweets={closeSweets}
            openBakery={openBakery}
            closeBakery={closeBakery}
            openSavouries={openSavouries}
            closeSavouries={closeSavouries}
            closeMobileMenu={closeAllMenus}
          />
        </div>

        {/* RIGHT - ACTIONS */}
        <div className="min-w-[240px] flex justify-end">
          <NavbarActions openSearch={openSearch} />
        </div>
      </div>

      {/* MOBILE VIEW RENDERING (RESTACKED) */}
      <div className="lg:hidden flex items-center justify-between w-full relative h-full">
        {/* MOBILE LEFT - HAMBURGER */}
        <div className="flex items-center">
            <button 
                onClick={toggleMenu}
                className="p-2 bg-white/50 backdrop-blur-md text-[#6b1f0e] border border-white/50 shadow-sm rounded-md transition-all active:scale-95"
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* MOBILE CENTER - SHOP NAME (Mathematically Centered) */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <div className={`font-serif text-lg leading-tight uppercase font-bold tracking-[0.1em] transition-colors duration-300 ${isScrolled ? "text-[#6b1f0e]" : "text-white drop-shadow-md"}`}>VVS BAKES</div>
            <div className={`text-[9px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${isScrolled ? "text-[#6b1f0e] opacity-80" : "text-white opacity-90"}`}>Since 1999</div>
        </div>

        {/* MOBILE RIGHT - SPACER (To keep Categories centered if needed) */}
        <div className="w-[44px]"></div>
      </div>


      {/* ACTION MENU OVERLAY (MOBILE) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl shadow-xl lg:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="py-2">
                {/* Categories first */}
                <div className="px-6 py-2">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Categories</p>
                  <NavLinks
                    isMobile
                    openKitchen={openKitchen}
                    closeKitchen={closeKitchen}
                    openSweets={openSweets}
                    closeSweets={closeSweets}
                    openBakery={openBakery}
                    closeBakery={closeBakery}
                    openSavouries={openSavouries}
                    closeSavouries={closeSavouries}
                    closeMobileMenu={closeAllMenus}
                  />
                </div>
                
                {/* Actions (Search, Profile, etc.) second */}
                <div className="border-t border-gray-50 mt-2">
                  <NavbarActions isMobile openSearch={openSearch} closeMobileMenu={closeAllMenus} />
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
