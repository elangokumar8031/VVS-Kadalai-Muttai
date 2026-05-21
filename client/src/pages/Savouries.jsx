import { HeartIcon, EyeIcon } from "../components/icons/Icons";
import Navbar2 from "../components/Navbar2";
import { useCart } from "../context/CartContext"; // ✅ ADD
import heritageBg from "../assets/temple_footer_bg.png";
import Footer from "../components/Footer";
import AddToCartButton from "../components/AddToCartButton";

export const savouriesGrouped = {
  Sev: [
    { id: "karasevu", name: "Karasevu", img1: "/categories/karasevu.jpg", type: "zoom", reviews: 18 },
    { id: "milagu-sevu", name: "Milagu Sevu", img1: "/categories/milagsevu.webp", type: "zoom", reviews: 12 },
    { id: "seeni-sevu", name: "Seeni Sevu", img1: "/categories/sweetsevu.png", type: "zoom", reviews: 15 },
    { id: "karuppati-sevu", name: "Karuppati Sevu", img1: "/categories/karupattisev.webp", type: "zoom", reviews: 9 },
  ],

  Seeval: [
    { id: "ribbon-seeval", name: "Ribbon Seeval", img1: "/categories/ribbionseeval.jpg", type: "zoom", reviews: 11 },
    { id: "seeval", name: "Seeval", img1: "/categories/seeval.webp", type: "zoom", reviews: 13 },
    { id: "pakkoda", name: "Pakkoda", img1: "/categories/pakkoda.webp", type: "zoom", reviews: 16 },
  ],

  Mixture: [
    { id: "mixture", name: "Mixture", img1: "/categories/mixture.jpg", type: "zoom", reviews: 20 },
    { id: "kara-boondi", name: "Kara Boondi", img1: "/categories/karabhoondi.jpg", type: "zoom", reviews: 14 },
    { id: "bombay-mixture", name: "Bombay Mixture", img1: "/categories/BombayMixture.webp", type: "zoom", reviews: 17 },
    { id: "ompodi", name: "Ompodi", img1: "/categories/oomapodi.webp", type: "zoom", reviews: 10 },
  ],

  Murukku: [
    { id: "onion-murukku", name: "Onion Murukku", img1: "/categories/OnionMurukku.webp", type: "zoom", reviews: 15 },
    { id: "ragi-murukku", name: "Ragi Murukku", img1: "/categories/ragimurruku.webp", type: "zoom", reviews: 12 },
    { id: "murukku", name: "Murukku", img1: "/categories/murukku.jpg", type: "zoom", reviews: 19 },
  ],

  Chips: [
    { id: "corn-chips", name: "Corn Chips", img1: "/categories/cornchips.webp", type: "zoom", reviews: 8 },
    { id: "potato-chips", name: "Potato Chips", img1: "/categories/potatochips.avif", type: "zoom", reviews: 8 },
  ],
};

const Savouries = () => {
  const { addToCart } = useCart(); // ✅ CONNECT CART

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

          {/* Hero Section */}
          <div
            className="relative text-center flex flex-col justify-center items-center h-96"
            style={{
              backgroundImage: "url('/savouriessecbg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10">
              <h1 className="text-6xl md:text-7xl font-black text-white tracking-wide drop-shadow-xl">
                SAVOURIES
              </h1>
              <p className="mt-4 text-orange-200 text-lg tracking-widest">
                Crispy • Spicy • Traditional
              </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full z-10">
              <Navbar2 />
            </div>
          </div>

          {/* Products Section */}
          {Object.entries(savouriesGrouped).map(([groupName, products]) => (
            <div key={groupName} className="mb-12">

              <h2 className="text-3xl font-serif text-orange-600 mx-6 mt-4 mb-8">
                {groupName}
              </h2>

              <div className="product-grid">
                {products.map((product) => (
                  <div key={product.id} className="group relative bestseller-card">

                    <div className="relative h-[180px] sm:h-[260px] overflow-hidden">
                      <img
                        src={product.img1}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-red-600 hover:text-orange-500">
                          <HeartIcon />
                        </button>

                        <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-red-600 hover:text-orange-500">
                          <EyeIcon />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <h3 className="text-orange-400 font-medium mb-1 text-sm sm:text-base line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[10px] sm:text-sm text-orange-300">
                        ⭐⭐⭐⭐⭐
                        <span className="text-[10px] sm:text-xs"> ({product.reviews})</span>
                      </p>
                    </div>

                    {/* ✅ THIS MAKES CART OPEN FROM RIGHT */}
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

        </div>
      </section>
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

export default Savouries;