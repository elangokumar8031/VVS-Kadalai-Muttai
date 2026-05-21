import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext"; // ✅ ADD
import AddToCartButton from "./AddToCartButton";

const PRODUCTS = [
  { id: "karasevu", name: "Karasevu", reviews: 75, rating: 4, price: 120, img: "./categories/karasevu.jpg" },
  { id: "karuppati-sevu", name: "Karupatti Sevu", reviews: 55, rating: 4, price: 120, img: "./categories/karupattisev.webp" },
  { id: "onion-murukku", name: "Onion Murukku", reviews: 21, rating: 3, price: 150, img: "./categories/OnionMurukku.webp" },
  { id: "mixture", name: "Mixture", reviews: 35, rating: 4, price: 120, img: "./categories/mixture.jpg" },
  { id: "banana-chips", name: "Banana Chips", reviews: 36, rating: 3, price: 120, img: "./categories/bananachips.jpg" },
  { id: "pakkoda", name: "Pakoda", reviews: 28, rating: 4, price: 120, img: "./categories/pakkoda.webp" },
];

function StarRating({ rating, max = 5 }) {
  return (
    <span style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < rating ? "#E8A020" : "#D4C4B4"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();


  return (
    <motion.div
      className="savory-product-card"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 210, maxWidth: 210,
        display: "flex", flexDirection: "column",
        background: "#fff", borderRadius: 0, overflow: "hidden",
        boxShadow: hovered ? "0 10px 30px rgba(92,26,11,0.18)" : "0 2px 10px rgba(0,0,0,0.02)",
        border: "1px solid #f0e4d8",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div style={{ width: "100%", height: 190, overflow: "hidden", position: "relative" }}>
        <motion.img 
          src={product.img} 
          alt={product.name}
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      <div style={{ padding: "14px 16px 0" }}>
        <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#2C1A0E" }}>
          {product.name}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 12, color: "#7A5C44", fontFamily: "'Lato', sans-serif", opacity: 0.8 }}>
            ({product.reviews})
          </span>
        </div>
        <p style={{ margin: "8px 0 0", fontFamily: "'Lato', sans-serif", fontSize: 15, fontWeight: 700, color: "#5C1A0B" }}>
          Rs. {product.price}.00
        </p>
      </div>

      <AddToCartButton
        product={{ ...product, img1: product.img, price: product.price }}
        style={{
          margin: "14px", padding: "12px 0",
          background: "#5C1A0B",
          color: "#fff", border: "none", borderRadius: 4,
          fontFamily: "'Lato', sans-serif", fontWeight: 700,
          fontSize: 13, letterSpacing: 0.8, cursor: "pointer",
          transition: "all 0.3s ease", textTransform: "uppercase",
          boxShadow: hovered ? "0 4px 12px rgba(92,26,11,0.2)" : "none",
        }}
      >
        Add To Cart
      </AddToCartButton>
    </motion.div>
  );
}

export default function SavoryTreasures() {
  const scrollRef = useRef(null);
  const [rightClickCount, setRightClickCount] = useState(0);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
    if (dir === 1) setRightClickCount((prev) => prev + 1);
  };

  return (
    <section className="savory-section" style={{ padding: "48px 40px 60px", background: "#FFF8F0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Lato:wght@400;600;700&display=swap');
        .scroll-row::-webkit-scrollbar { display: none; }
        .scroll-row { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 768px) {
          .savory-section { padding: 32px 0 40px !important; }
          .savory-arrows { display: none !important; }
          .savory-scroll-wrapper { padding: 0 !important; }
          .scroll-row {
            overflow-x: scroll !important;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 0 !important;
          }
          .scroll-row > * {
            scroll-snap-align: center;
            flex-shrink: 0;
            min-width: 85vw !important;
            max-width: 85vw !important;
          }
          .savory-intro-card {
            min-width: 85vw !important;
            max-width: 85vw !important;
            border-radius: 12px !important;
            margin-left: 7.5vw;
          }
          .savory-product-card {
            min-width: 85vw !important;
            max-width: 85vw !important;
            border-radius: 12px !important;
          }
          .savory-product-card:last-child {
            margin-right: 7.5vw;
          }
          .scroll-row-container {
            padding: 0 7.5vw;
          }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontStyle: "italic", color: "#5C1A0B", margin: 0, lineHeight: 1.1 }}>
          Savory Treasures
        </h2>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 17, color: "#7A5C44", margin: "10px 0 0" }}>
          A Taste of India's Flavorful Snacks and Delicacies
        </p>
      </div>

      <div className="savory-scroll-wrapper" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          className="savory-arrows"
          onClick={() => scroll(-1)}
          style={{ ...arrowStyle, visibility: rightClickCount >= 2 ? "visible" : "hidden" }}
        >‹</button>

        <div ref={scrollRef} className="scroll-row"
          style={{ display: "flex", flex: 1, overflow: "hidden", gap: 0, borderRadius: 8 }}>

          <div className="savory-intro-card" style={{
            minWidth: 300, maxWidth: 300, background: "#3a3028",
            position: "relative", overflow: "hidden",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "36px 28px", borderRadius: "8px 0 0 8px",
          }}>
            <img src="./savouriessecbg.jpg" alt="Savouries"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.38 }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>
                Savouries 
              </h3>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 15, color: "#f0e8df", lineHeight: 1.55, margin: "0 0 22px" }}>
                Savour the crunch, relive the tradition.
              </p>
              <a href="#" style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "underline" }}>
                View More
              </a>
            </div>
          </div>

          {PRODUCTS.map((p, index) => <ProductCard key={p.id} product={p} index={index} />)}
        </div>

        <button className="savory-arrows" onClick={() => scroll(1)} style={arrowStyle}>›</button>
      </div>
    </section>
  );
}

const arrowStyle = {
  width: 38, height: 38, borderRadius: "50%",
  border: "1px solid #e0d4cc", background: "#fff",
  fontSize: 22, cursor: "pointer", flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "#2C1A0E", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", lineHeight: 1,
};