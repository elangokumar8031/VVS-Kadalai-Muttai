import { useState } from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import CarouselTextOverlay from "../components/CarouselTextOverlay";
import SearchSidebar from "../components/SearchSidebar";
import MobileBottomNav from "../components/MobileBottomNav";
import MobileSearch from "../components/MobileSearch";

const MainLayout = ({ children }) => {
  const [activeOverlay, setActiveOverlay] = useState(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setIsScrolled(latest > 50);

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    // Set to true when within 150px of the bottom
    setIsAtBottom(latest + windowHeight >= documentHeight - 150);

    // Hide when scrolling down, show when scrolling up
    if (latest > previous && latest > 150 && !activeOverlay) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <>
    <motion.div 
      className="fixed lg:sticky top-0 left-0 w-full z-[100]"
      animate={isHidden ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <TopBar />

      <Navbar
        isScrolled={isScrolled}
        openSearch={() => setIsSearchOpen(true)}
        openKitchen={() => setActiveOverlay("kitchen")}
        closeKitchen={() => setActiveOverlay(null)}
        openSweets={() => setActiveOverlay("sweets")}
        closeSweets={() => setActiveOverlay(null)}
        openBakery={() => setActiveOverlay("bakery")}
        closeBakery={() => setActiveOverlay(null)}
        openSavouries={() => setActiveOverlay("savouries")}
        closeSavouries={() => setActiveOverlay(null)}
      />
    </motion.div>

      {/* OVERLAY (hover dropdown) */}
      <div className="relative z-30">
        <AnimatePresence>
          {activeOverlay && (
            <CarouselTextOverlay
              type={activeOverlay}
              onMouseEnter={() => setActiveOverlay(activeOverlay)}
              onMouseLeave={() => setActiveOverlay(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ✅ SECONDARY NAVBAR (ALL USER PAGES) */}
      

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* ✅ DESKTOP SEARCH */}
      <div className="hidden lg:block">
        <SearchSidebar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>

      {/* ✅ MOBILE SEARCH */}
      <MobileSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MobileBottomNav 
        openSearch={() => setIsSearchOpen(true)} 
        isHidden={isAtBottom} 
      />
    </>
  );
};

export default MainLayout;
