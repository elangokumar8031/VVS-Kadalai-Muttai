import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const categories = [
  {
    id: "coco-mittai",
    category: "kitchen-special",
    name: "Coco Mittai",
    img1: "/categories/cocobar.png",
    img2: "/categories/cocobar2.png",
  },
  {
    id: "theanga-mittai",
    category: "kitchen-special",
    name: "Theanga Mittai",
    img1: "/categories/coconut2.png",
    img2: "/categories/coconut1.png",
  },
  {
    id: "thean-mittai",
    category: "kitchen-special",
    name: "Thean Mittai",
    img1: "/categories/honey1.png",
    img2: "/categories/honey2.png",
  },
  {
    id: "ellu-mittai",
    category: "kitchen-special",
    name: "Ellu Mittai",
    img1: "/categories/sesame1.png",
    img2: "/categories/sesame2.png",
  },
  {
    id: "special-kadalai-mittai",
    category: "kitchen-special",
    name: "Special Kadalai Mittai",
    img1: "/categories/penautcandy.png",
    img2: "/categories/peanut2.png",
  },
];

const ShopCollectionSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleProductClick = (cat) => {
    navigate(`/product/${cat.id}`);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="relative bg-white pt-2 pb-2 lg:pt-10 lg:pb-20 overflow-hidden">

      {/* Mandala background (top-right mirrored) */}
      <img
        src="mandala.png"
        alt=""
        className="absolute top-0 right-0 w-[250px] opacity-20 pointer-events-none select-none scale-x-[-1] scale-y-[-1] translate-x-1/4 -translate-y-1/4"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        {/* Heading */}
        <div className="text-center mb-4 lg:mb-14 px-4">
          <p className="text-sm tracking-widest text-gray-500 mb-2 uppercase">kitchen</p>
          <h2 className="text-3xl lg:text-4xl font-serif text-orange-500">specials</h2>
        </div>

        {/* DESKTOP VIEW - FLEX GRID (With Wrap to prevent overflow) */}
        <div className="hidden lg:flex justify-center items-center gap-5 max-w-7xl mx-auto px-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer"
              onClick={() => handleProductClick(cat)}
            >
              <div
                className="
                  relative w-[200px] h-[200px] xl:w-[220px] xl:h-[220px] rounded-full
                  bg-gradient-to-b from-[#e8b87d] to-[#d9a05f]
                  flex items-center justify-center
                  shadow-lg overflow-hidden
                  transition-transform duration-300
                  group-hover:scale-105
                "
              >
                <img
                  src={cat.img1}
                  alt={cat.name}
                  className="w-[160px] xl:w-[180px] object-contain transition-transform duration-500 group-hover:scale-105 product-glow"
                />
              </div>
              <p className="mt-5 text-lg font-medium text-orange-500">
                {cat.name}
              </p>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW - CAROUSEL (Restored original behavior) */}
        <div className="lg:hidden relative flex flex-col items-center">
          <div className="relative w-full h-[280px] flex justify-center items-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute flex flex-col items-center cursor-pointer"
                onClick={() => handleProductClick(categories[currentIndex])}
              >
                {/* Circle */}
                <div
                  className="
                                relative w-[200px] h-[200px] rounded-full
                                bg-gradient-to-b from-[#e8b87d] to-[#d9a05f]
                                flex items-center justify-center
                                shadow-lg overflow-hidden
                            "
                >
                  <img
                    src={categories[currentIndex].img1}
                    alt={categories[currentIndex].name}
                    className="absolute w-[160px] object-contain product-glow"
                  />
                </div>
                {/* Label */}
                <p className="mt-4 text-xl font-bold text-orange-600 uppercase tracking-widest text-center">
                  {categories[currentIndex].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination / Dots */}
          <div className="flex gap-2 mt-4 mb-2">
            {categories.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-6 bg-orange-500' : 'w-1.5 bg-gray-200'}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-10 mt-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCollectionSection;