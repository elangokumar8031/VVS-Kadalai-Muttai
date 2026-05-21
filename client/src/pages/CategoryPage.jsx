import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import { products } from "../data/Products";
import { useCart } from "../context/CartContext";
import { HeartIcon, EyeIcon } from "../components/icons/Icons";
import heritageBg from "../assets/temple_footer_bg.png";
import Footer from "../components/Footer";
import AddToCartButton from "../components/AddToCartButton";

// Category Metadata for Titles and Banners
const categoryMeta = {
  Savouries: {
    title: "SAVOURIES",
    subtitle: "Crispy • Spicy • Traditional",
    bannerImg: "/savouriessecbg.png",
  },
  Bakery: {
    title: "BAKERY",
    subtitle: "Freshly Baked • Everyday Delight",
    bannerImg: "/categories/backerysec.jpg",
  },
  Ladoo: {
    title: "LADDU",
    subtitle: "Sweet Rounds of Joy",
    bannerImg: "/savouriessecbg.png",
  },
  Mittai: {
    title: "MITTAI",
    subtitle: "Traditional Jaggery Treats",
    bannerImg: "/savouriessecbg.png",
  },
  Halwa: {
    title: "HALWA",
    subtitle: "Melt-in-the-mouth Excellence",
    bannerImg: "/savouriessecbg.png",
  },
  Jangri: {
    title: "JANGERI",
    subtitle: "Golden Coils of Sweetness",
    bannerImg: "/savouriessecbg.png",
  },
  MysorePak: {
    title: "MYSORE PAK",
    subtitle: "Ghee-soaked Perfection",
    bannerImg: "/savouriessecbg.png",
  },
  Chikki: {
    title: "CHIKKI",
    subtitle: "Crunchy Nutty Delights",
    bannerImg: "/savouriessecbg.png",
  },
  KitchenSpecial: {
    title: "KITCHEN SPECIAL",
    subtitle: "Handcrafted with Love",
    bannerImg: "/savouriessecbg.png",
  },
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Get data for the current category
  const categoryData = products[categoryName];
  const meta = categoryMeta[categoryName] || {
    title: categoryName?.toUpperCase() || "PRODUCTS",
    subtitle: "Premium Heritage Delights",
    bannerImg: "/savouriessecbg.png",
  };

  // Determine if data is grouped (object) or flat (array)
  const isGrouped = !Array.isArray(categoryData) && typeof categoryData === "object";

  // Normalize data for looping
  const groupedData = useMemo(() => {
    if (!categoryData) return {};
    if (isGrouped) return categoryData;
    return { "Our Collection": categoryData };
  }, [categoryData, isGrouped]);

  // Related Items Logic: Pick items from the SAME category but excluding ones potentially already main-featured
  const relatedItems = useMemo(() => {
    if (!categoryData) return [];
    
    let allItems = [];
    if (isGrouped) {
        allItems = Object.values(categoryData).flat();
    } else {
        allItems = categoryData;
    }

    // Shuffle and pick 4
    return [...allItems].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [categoryData, isGrouped]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  if (!categoryData) {
    return (
      <div className="h-96 flex items-center justify-center text-2xl font-serif">
        Category Not Found
      </div>
    );
  }

  return (
    <>
    <section style={{ paddingBottom: '60px', position: 'relative' }}>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `linear-gradient(rgba(253, 251, 247, 0.75), rgba(253, 251, 247, 0.75)), url(${heritageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          zIndex: -1,
          willChange: 'transform',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)'
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div
          className="relative text-center flex flex-col justify-center items-center h-96"
          style={{
            backgroundImage: `url('${meta.bannerImg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-wide drop-shadow-xl">
              {meta.title}
            </h1>
            <p className="mt-4 text-orange-200 text-lg tracking-widest">
              {meta.subtitle}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full z-10">
            <Navbar2 />
          </div>
        </div>

        {/* PRODUCTS RENDERING */}
        {Object.entries(groupedData).map(([groupName, items]) => (
          <div key={groupName} className="mb-12">
            <h2 className="text-3xl font-serif text-orange-600 mx-6 mt-4 mb-4">
              {groupName}
            </h2>

            <div className="product-grid">
              {items.map((product) => (
                <div key={product.id} className="group relative bestseller-card">
                  
                  {/* Image & Info (Navigates) */}
                  <div 
                    onClick={() => handleProductClick(product)} 
                    className="cursor-pointer"
                  >
                    <div className="relative h-[180px] sm:h-[260px] overflow-hidden">
                      <img 
                        src={product.img1} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-orange-400 font-medium mb-1 text-sm sm:text-base line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[10px] sm:text-sm text-orange-300">
                        ⭐⭐⭐⭐⭐ ({product.reviews})
                      </p>
                    </div>
                  </div>

                  {/* Add to Cart (Separate) */}
                  <AddToCartButton
                    product={product}
                    className="w-full py-2 sm:py-3 bg-transparent border border-[#6b1f0e] text-[#6b1f0e] hover:bg-[#6b1f0e] hover:text-white text-xs sm:font-medium tracking-wide transition-colors"
                  >
                    ADD TO CART
                  </AddToCartButton>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* RELATED ITEMS SECTION */}
        <div className="py-16 px-6 border-t border-orange-200">
            <h2 className="text-3xl font-serif text-orange-600 text-center mb-12 italic">
                More from this Collection
            </h2>
            <div className="product-grid max-w-6xl mx-auto">
                {relatedItems.map((item) => (
                    <div 
                        key={item.id} 
                        className="group relative bestseller-card"
                    >
                        <div 
                          onClick={() => handleProductClick(item)}
                          className="cursor-pointer"
                        >
                          <div className="relative h-[180px] sm:h-[260px] overflow-hidden">
                              <img 
                                  src={item.img1} 
                                  alt={item.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                              />
                          </div>
                          <div className="p-3 sm:p-4">
                            <h3 className="text-orange-400 font-medium mb-1 text-sm sm:text-base line-clamp-1">
                                {item.name}
                            </h3>
                            <p className="text-[10px] sm:text-sm text-orange-300">
                              ⭐⭐⭐⭐⭐ ({item.reviews})
                            </p>
                          </div>
                        </div>
                        <AddToCartButton
                          product={item}
                          className="w-full py-2 sm:py-3 bg-transparent border border-[#6b1f0e] text-[#6b1f0e] hover:bg-[#6b1f0e] hover:text-white text-xs sm:font-medium tracking-wide transition-colors"
                        >
                          ADD TO CART
                        </AddToCartButton>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      paddingTop: '40px', 
      background: `linear-gradient(rgba(253, 251, 247, 0.75), rgba(253, 251, 247, 0.75)), url(${heritageBg})`,
      backgroundSize: 'cover'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '40px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='40' viewBox='0 0 400 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20C40 20 60 18 100 20C140 22 160 20 200 20C240 20 260 18 300 20C340 22 360 20 400 20' stroke='%233d2b1f' stroke-width='0.5'/%3E%3Cpath d='M50 19C50 19 55 8 68 14C58 19 50 19 50 19Z' fill='%233d2b1f'/%3E%3Cpath d='M150 21C150 21 155 10 168 16C158 21 150 21 150 21Z' fill='%233d2b1f'/%3E%3Cpath d='M250 19C250 19 255 8 268 14C258 19 250 19 250 19Z' fill='%233d2b1f'/%3E%3Cpath d='M350 21C350 21 355 10 368 16C358 21 350 21 350 21Z' fill='%233d2b1f'/%3E%3Cpath d='M100 21C100 21 105 32 118 26C108 21 100 21 100 21Z' fill='%233d2b1f'/%3E%3Cpath d='M200 19C200 19 205 30 218 24C208 19 200 19 200 19Z' fill='%233d2b1f'/%3E%3Cpath d='M300 21C300 21 305 32 318 26C308 21 300 21 300 21Z' fill='%233d2b1f'/%3E%3Cpath d='M400 19C400 19 405 30 418 24C408 19 400 19 400 19Z' fill='%233d2b1f'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
        transform: 'rotate(180deg)',
        zIndex: 50,
        pointerEvents: 'none'
      }} />
      <Footer />
    </div>
    </>
  );
};

export default CategoryPage;
