import festivalCombo from "../assets/combos/festivalcombo.jpg";
import familyCombo from "../assets/combos/familyCombo.png";
import savouryCombo from "../assets/combos/savoury-combo.png";

import { useCart } from "../context/CartContext"; // ✅ ADD
import AddToCartButton from "./AddToCartButton";
import { motion } from "framer-motion";

// ✅ Combo product data
const combos = [
  {
    id: "festival-combo",
    name: "Festival Delight Combo",
    img1: festivalCombo,
    price: 500,
    category: "combos",
    group: "combos",
    description: "A curated selection of festive treats for your family and guests.",
  },
  {
    id: "savoury-combo",
    name: "Savoury Snack Combo",
    img1: savouryCombo,
    price: 650,
    category: "combos",
    group: "combos",
    description: "Our best-selling snacks packed together for your crunch cravings.",
  },
  {
    id: "family-combo",
    name: "Family Special Combo",
    img1: familyCombo,
    price: 800,
    category: "combos",
    group: "combos",
    description: "Perfect for family gatherings — generous portions and great value.",
  },
];

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 576 512" fill="white">
    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
  </svg>
);

const ComboSection = () => {
  const { addToCart } = useCart(); // ✅ ADD

  return (
    <section className="relative bg-white pt-16 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-serif text-orange-600 mb-8">Special Combos</h2>


        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4">
          {combos.map((combo) => (
            <div key={combo.id} className="min-w-full md:min-w-0 snap-center mx-auto text-center flex flex-col justify-between">
              <div>
                <div className="inline-block overflow-hidden shadow-lg w-full">
                  <img
                    src={combo.img1}
                    alt={combo.name}
                    className="block w-full h-64 md:h-72 object-cover object-center"
                  />
                </div>

                <div className="mt-4 px-0">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">{combo.name}</h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">{combo.description}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[#5C1A0B] font-bold mb-3">Rs. {combo.price}.00</p>
                {/* ✅ UPDATED button */}
                <AddToCartButton
                  product={combo}
                  className="cart-btn w-full"
                >
                  <span className="cart-icon"><CartIcon /></span>
                  <span className="cart-text">ADD TO CART</span>
                </AddToCartButton>
                
                {/* Mobile Swipe Hint */}
                <motion.p 
                  initial={{ x: -10, opacity: 0.6 }}
                  animate={{ x: 10, opacity: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.2, 
                    ease: "easeInOut" 
                  }}
                  className="md:hidden text-[10px] text-orange-400 font-bold mt-4 uppercase tracking-[0.2em]"
                >
                  Swipe right to see more →
                </motion.p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboSection;