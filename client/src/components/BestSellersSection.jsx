import { HeartIcon, EyeIcon } from "./icons/Icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AddToCartButton from "./AddToCartButton";

const products = [
  {
    id: "karasevu",           // ✅ matches products.js id
    category: "savouries",
    name: "Karasevu",
    img1: "/categories/karasevu.jpg",
    type: "zoom",
    reviews: 65,
  },
  {
    id: "groundnut-chikki",  // ⚠️ add this to products.js if missing
    category: "sweets",
    name: "Classic Groundnut Chikki",
    img1: "/categories/groundnutchikki.jpg",
    img2: "/categories/groundnutchikki2.jpg",
    type: "swap",
    reviews: 42,
  },
  {
    id: "kaju-katli",        // ⚠️ add to products.js if missing
    category: "sweets",
    name: "Kaju Katli",
    img1: "/categories/KajuKatli.jpg",
    img2: "/categories/kajukatli2.jpg",
    type: "swap",
    reviews: 19,
  },
  {
    id: "ribbon-seeval",     // ✅ matches
    category: "savouries",
    name: "Ribbon Seval",
    img1: "/categories/ribbionseeval.jpg",
    type: "zoom",
    reviews: 27,
  },

  {
    id: "mixture",
    category: "savouries",
    name: "Mixture",
    img1: "/categories/mixture.jpg",
    type: "zoom",
    reviews: 33,
  },
  {
    id: "banana-chips",
    category: "savouries",
    name: "Banana chips",
    img1: "/categories/bananachips.jpg",
    img2: "/categories/bananachips2.jpg",
    type: "swap",
    reviews: 21,
  },
  {
    id: "seeni-sevu",
    category: "savouries",
    name: "Sweet Sevu",
    img1: "/categories/sweetsevu.png",
    type: "zoom",
    reviews: 18,
    hideMobile: true,
  },
  {
    id: "jangeri",
    category: "sweets",
    name: "jilebi",
    img1: "/categories/jilebi2.jpg",
    img2: "/categories/jilebi1.jpg",
    type: "swap",
    reviews: 24,
    hideMobile: true,
  },
];

const BestSellersSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };
  return (
    <section
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('bgimage.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#2a0f0a]/90"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-orange-400 mb-2">
            Best Sellers
          </h2>
          <p className="text-orange-200 max-w-2xl">
            From crunchy to traditional Indian sweets and snacks, every bite
            tells a story.
          </p>
        </div>

        {/* Grid */}
        <div className="product-grid">
          {products.map((product, index) => (
            <div
              key={index}
              onClick={() => handleProductClick(product)}
              className={`group bg-transparent overflow-hidden relative cursor-pointer ${product.hideMobile ? 'hide-on-mobile' : ''}`}
            >
              {/* Image area */}
              <div className="product-img-wrap">
                {product.type === "zoom" && (
                  <img
                    src={product.img1}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                {product.type === "swap" && (
                  <>
                    <img
                      src={product.img1}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                    <img
                      src={product.img2}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </>
                )}

                {/* Hover icons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-red-600 hover:text-orange-500 transition-colors">
                    <HeartIcon />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-red-600 hover:text-orange-500 transition-colors">
                    <EyeIcon />
                  </button>
                </div>
              </div>

              {/* Text */}
              <div className="product-text-wrap">
                <h3 className="text-orange-400 font-medium mb-1 product-title">
                  {product.name}
                </h3>
                <p className="product-reviews text-orange-300">
                  ⭐⭐⭐⭐⭐ <span>({product.reviews} reviews)</span>
                </p>
              </div>

              {/* Button */}
              <AddToCartButton
                product={product}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide transition-colors"
              >
                ADD TO CART
              </AddToCartButton>
            </div>
          ))}
        </div>
        {/* View More Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/bestsellers")}
            className="
      px-10 py-3
      border border-white
      text-white
      bg-transparent
      font-medium tracking-wide
      transition-all duration-300
      hover:bg-white
      hover:text-black
    "
          >
            VIEW MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
