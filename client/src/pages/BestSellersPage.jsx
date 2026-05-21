import { HeartIcon, EyeIcon } from "../components/icons/Icons";
import Navbar2 from "../components/Navbar2";
import heroImage from "../assets/bestsellerhero.png";
import heritageBg from "../assets/temple_footer_bg.png";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ ADD
import AddToCartButton from "../components/AddToCartButton";

export const bestSellersGrouped = {
  "Top Picks": [
    { id: "cashew-biscuit", category: "bakery", name: "Cookies", img1: "/categories/chocochipscookies.jpg", type: "zoom", reviews: 65 },
    { id: "groundnut-chikki", category: "sweets", name: "Classic Groundnut Chikki", img1: "/categories/groundnutchikki.jpg", img2: "/categories/groundnutchikki2.jpg", type: "swap", reviews: 42 },
    { id: "thirunelveli-halwa", category: "sweets", name: "Halwa", img1: "/categories/halwa1.jpg", img2: "/categories/halwa2.jpg", type: "swap", reviews: 19 },
    { id: "gheeladoo", category: "sweets", name: "Ghee Ladoo", img1: "/categories/gheeladdoo.avif", type: "zoom", reviews: 27 },
  ],
  "Customer Favorites": [
    { id: "potato-chips", category: "savouries", name: "Potato Chips", img1: "/categories/potatochips.avif", type: "zoom", reviews: 33 },
    { id: "plum-cake", category: "bakery", name: "Plum Cake", img1: "/categories/blumcake.jpg", type: "zoom", reviews: 21 },
    { id: "red-velvet", category: "bakery", name: "Red Velvet Cake", img1: "/categories/redvelvetcake.jpg", type: "zoom", reviews: 18 },
    { id: "egg-puff", category: "bakery", name: "Egg Puff", img1: "/categories/eggpuff.jpg", type: "zoom", reviews: 24 },
  ],
};

const BestSellersPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ ADD

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
    <section style={{ 
      background: `linear-gradient(rgba(253, 251, 247, 0.75), rgba(253, 251, 247, 0.75)), url(${heritageBg})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'top center',
      paddingBottom: '60px'
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="relative text-center flex flex-col justify-center items-center h-96 overflow-hidden bg-[#2a0f0a]">
          <img src={heroImage} alt="Best Sellers Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-7xl font-black text-[#D4AF37] tracking-wide drop-shadow-xl">
              BEST SELLERS
            </h1>
            <p className="mt-4 text-[#F3E6B6] text-lg tracking-widest">
              Customer Favorites • Most Loved
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full z-10">
            <Navbar2 />
          </div>
        </div>

        {Object.entries(bestSellersGrouped).map(([groupName, products], index, array) => (
          <div key={groupName} style={{ marginBottom: index === array.length - 1 ? '0px' : '48px' }}>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#ea580c', marginLeft: '12px', marginTop: '16px', marginBottom: '16px' }}>
              {groupName}
            </h2>

            <div className="product-grid">
              {products.map((product, index) => (
                <div key={index} style={{ background: 'transparent', overflow: 'hidden', position: 'relative' }} className="group bestseller-card">

                  <div onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                    <div className="product-img-wrap">
                      {product.type === "zoom" && (
                        <img src={product.img1} alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      {product.type === "swap" && (
                        <>
                          <img src={product.img1} alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                          />
                          <img src={product.img2} alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          />
                        </>
                      )}
                    </div>

                    <div className="product-text-wrap">
                      <h3 className="text-orange-400 font-medium mb-1 product-title">
                        {product.name}
                      </h3>
                      <p className="product-reviews text-orange-300">
                        ⭐⭐⭐⭐⭐ ({product.reviews})
                      </p>
                    </div>
                  </div>

                  <AddToCartButton
                    product={product}
                    className="w-full py-3 bg-transparent border border-[#6b1f0e] text-[#6b1f0e] hover:bg-[#6b1f0e] hover:text-white font-medium tracking-wide transition-colors"
                  >
                    ADD TO CART
                  </AddToCartButton>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Footer Wrapper with Dedicated Space for Floral Border */}
    <div className="category-footer-wrapper">
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
      <Footer transparentBg={true} />
    </div>
   </>
  );
};

export default BestSellersPage;