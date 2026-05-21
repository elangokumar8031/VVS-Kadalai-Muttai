import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import legacyVideo from "../assets/sweetlegacy/legacycardvideo.mp4";
import AddToCartButton from "./AddToCartButton";

const legacyProducts = [
  { id: "kaju-katli", name: "Kaju Katli", img: "/categories/KajuKatli.jpg", category: "sweets" },
  { id: "dryfruitladdo", name: "Dry Fruit Laddu", img: "/categories/dryfruitladdo.jpg", category: "sweets" },
  { id: "ghee-mysorepak", name: "Ghee Mysore Pak", img: "/categories/gheemysorepak.webp", category: "sweets" },
  { id: "thirunelveli-halwa", name: "Halwa", img: "/categories/halwa2.jpg", category: "sweets" },
  { id: "palkova", name: "Palkova", img: "/categories/Palkova.jpg", category: "sweets" },
  { id: "jangeri", name: "Jilebi", img: "/categories/jilebi1.jpg", category: "sweets" },
];

const SweetLegacy = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const [rightClickCount, setRightClickCount] = useState(0);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector('.card');
    const cardWidth = scrollRef.current.clientWidth;   // exact 1 card scroll
    const currentScroll = scrollRef.current.scrollLeft;

    // Calculate next snap point based on actual card width
    const targetScroll = (Math.round(currentScroll / cardWidth) + dir) * cardWidth;

    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    if (dir === 1) setRightClickCount((prev) => prev + 1);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
          else entry.target.classList.remove("show");
        });
      },
      { threshold: 0.4 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
    };
  }, []);

  return (
    <Section>
      <h1 ref={titleRef} className="title reveal">
        Sweet Legac<span className="y-style">y</span>
      </h1>
      <p ref={subtitleRef} className="subtitle reveal-bottom">
        Relish the richness in every bite.
      </p>

      <div className="cards-wrapper">
        <button
          className="arrow-btn left-arrow"
          onClick={() => scroll(-1)}
          style={{ visibility: rightClickCount >= 2 ? "visible" : "hidden" }}
        >
          ‹
        </button>

        <div ref={scrollRef} className="cards scroll-row">

          {/* FIRST CARD — video */}
          <div
            className="card first-card"
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => { videoRef.current?.pause(); videoRef.current.currentTime = 0; }}
          >
            <div className="card-media">
              <video className="bg-video" ref={videoRef} loop muted playsInline>
                <source src={legacyVideo} type="video/mp4" />
              </video>
            </div>
            <div className="overlay">
              <h2>Sweets</h2>
              <p>Melt-in-the-mouth magic, made with love and legacy.</p>
              <button
                className="view-more"
                onClick={() => { navigate("/sweets"); window.scrollTo(0, 0); }}
              >
                View More
              </button>
            </div>
          </div>

          {legacyProducts.map((product) => (
            <div key={product.id} className="card">
              <div
                className="card-media product-bg"
                style={{ backgroundImage: `url(${product.img})` }}
              />
              <div className="overlay small" style={{ zIndex: 1 }}>
                <h3>{product.name}</h3>
                <AddToCartButton
                  product={{ ...product, img1: product.img }}
                >
                  Add To Cart
                </AddToCartButton>
              </div>
            </div>
          ))}

        </div>

        <button className="arrow-btn right-arrow" onClick={() => scroll(1)}>›</button>
      </div>
    </Section>
  );
};

export default SweetLegacy;

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: #f8f5f2;

  .title {
    font-size: clamp(1.8rem, 7vw, 3.2rem);
    font-family: "Playfair Display", serif;
    font-weight: 700;
    color: #8b2e0f;
    letter-spacing: 1px;
    margin-bottom: 10px;
    position: relative;
    white-space: nowrap;
  }

  .subtitle {
    margin-bottom: 3rem;
    color: #444;
  }

  .reveal {
    opacity: 0;
    transform: translateY(-40px);
    transition: all 0.8s ease;
  }
  .reveal-bottom {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }
  .reveal-bottom.show {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal.show {
    opacity: 1;
    transform: translateY(0);
  }

  .cards-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 1400px;
    margin: auto;
    scroll-behavior: smooth;
  }

  /* ✅ Only the row scrolls horizontally — never individual cards */
  .cards {
    flex: 1;
    min-width: 0;
    display: flex;
    gap: 10px;
    align-items: stretch;
    overflow-x: auto;
    overflow-y: hidden;
    /* ✅ Disabled snap on desktop to prevent conflict with manual scroll buttons */
    scroll-snap-type: none; 
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y; 
  }
  .cards::-webkit-scrollbar {
    display: none;
  }

  .card {
    width: 250px;
    height: 300px;
    flex: 0 0 250px;
    border-radius: 0 2rem 0 2rem;
    position: relative;
    overflow: hidden !important;
    background: #1a0a00;
    isolation: isolate;
    touch-action: pan-y; 
  }

  /* ✅ Disable internal scrolling for the last card */
  .card:last-child {
    touch-action: none !important;
  }

  .card-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden !important;
    z-index: 0;
    transition: none !important;
    transform: none !important;
  }

  .product-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat;
}

  .bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
    pointer-events: none;
    touch-action: none !important; /* ✅ Disable internal scrolling for video card */
    transition: none !important;
    transform: none !important;
    display: block;
  }

  .first-card {
    width: 250px;
    height: 300px;
    flex: 0 0 250px;
    border-radius: 0 2rem 0 2rem;
    position: relative;
    overflow: hidden !important;
    touch-action: none !important; /* ✅ Disable internal scrolling */
  }

  .first-card:hover {
    transform: none;
  }

  .first-card .overlay {
    position: absolute;
    z-index: 2;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 1.2rem 1.5rem 2rem 2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: white;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .overlay.small {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .arrow-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid #e0d4cc;
    background: #fff;
    font-size: 22px;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2C1A0E;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
  .arrow-btn:hover {
    background: #8b2e0f;
    color: white;
  }
  .right-arrow { right: 10px; }
  .left-arrow { left: 10px; }

  .view-more {
    background: transparent;
    border: none;
    padding: 0;
    color: inherit;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    display: inline-block;
    line-height: 1;
  }
  .view-more::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 2px;
    width: 100%;
    background: currentColor;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 240ms cubic-bezier(.2,.8,.2,1);
  }
  .view-more:hover::after { transform: scaleX(1); }
  .view-more:hover { background: transparent; }
  .view-more:focus { outline: none; }

  button {
    padding: 8px 18px;
    border: none;
    background-color: #8b2e0f;
    color: white;
    font-weight: 600;
    cursor: pointer;
    width: fit-content;
  }
  button:hover { background-color: #a63a17; }

  .y-style {
    font-family: "Playwrite NZ Basic", cursive;
    font-weight: 400;
    font-size: clamp(2rem, 7.7vw, 3.5rem);
    display: inline-block;
    transform: scaleY(1.25);
    transform-origin: top;
    position: relative;
    top: -9px;
  }

  /* ===== MOBILE ===== */
  @media (max-width: 600px) {
    /* ✅ Row scrolls horizontally, snap per card */
    .cards {
      padding: 0;
      gap: 0;
      overflow-x: scroll !important;
      overflow-y: hidden !important;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
      touch-action: pan-x pan-y !important; /* ✅ allow vertical and horizontal scroll on the ROW */
      scroll-snap-stop: always;
    }

    /* ✅ Each card is fully locked — no internal scroll at all */
    .card,
    .first-card,
    .card:last-child {
      min-width: 100% !important;
      max-width: 100% !important;
      flex: 0 0 100%;
      width: 100%;
      height: 380px;
      scroll-snap-align: start;
      border-radius: 0 1rem 0 1rem;
      overflow: hidden !important;
      position: relative;
      background: #1a0a00;
      touch-action: pan-x pan-y !important; /* ✅ fix vertical scroll lock */
    }

   

    

    /* ✅ card-media fully covers card on mobile */
    .card-media {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
      transform: none !important;
      transition: none !important;
    }

    /* ✅ product-bg fully covers on mobile */
   
    /* ✅ Video fully covers first card on mobile */
    .bg-video {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
      transition: none !important;
      transform: none !important;
      pointer-events: none !important;
      display: block !important;
      touch-action: pan-x pan-y !important; /* ✅ fix vertical scroll lock */
    }

    .overlay, .overlay.small {
      padding: 1.5rem;
      z-index: 2;
      text-align: center !important;
      align-items: center !important;
      left: 0;
      width: 100%;
    }

    .overlay h2, .overlay h3, .overlay p {
      text-align: center !important;
      width: 100%;
      margin: 0 auto;
    }

    .overlay button {
      margin: 0 auto !important;
      display: block;
    }
  }
`;