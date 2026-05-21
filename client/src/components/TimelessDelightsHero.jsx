import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import heroMain from "../assets/hero_heritage_main.png";

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400,900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400,700&family=Libre+Baskerville:ital@0;1&display=swap');

    .hero-section {
        width: 100%;
        min-height: 420px;
        background-color: #fdfbf7;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: 40px 0;
    }

    .mandala-bg {
        position: absolute;
        bottom: -150px;
        left: -150px;
        width: 500px;
        height: 500px;
        opacity: 0.08;
        pointer-events: none;
        z-index: 1;
    }

    .hero-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: 40px;
        align-items: center;
        position: relative;
        z-index: 2;
    }

    .hero-text-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .hero-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(48px, 6vw, 72px);
        font-weight: 400;
        color: #4a332a;
        line-height: 1.1;
        letter-spacing: -0.01em;
    }

    .hero-subtitle {
        font-family: 'Libre Baskerville', serif;
        font-size: clamp(18px, 2vw, 24px);
        color: #6b4f44;
        line-height: 1.6;
        max-width: 480px;
        opacity: 0.85;
    }

    .hero-btn {
        display: inline-block;
        padding: 14px 40px;
        border: 1.5px solid #4a332a;
        color: #4a332a;
        font-family: 'Libre Baskerville', serif;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        background: transparent;
        width: fit-content;
    }

    .hero-btn:hover {
        background: #4a332a;
        color: #fdfbf7;
        transform: translateY(-2px);
    }

    .hero-visuals {
        position: relative;
        display: flex;
        justify-content: flex-end;
    }

    .video-box {
        position: relative;
        width: 100%;
        max-width: 380px;
        aspect-ratio: 1;
        background: #eee;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2);
        z-index: 5;
    }

    .video-thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .play-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.1);
        cursor: pointer;
    }

    .play-circle {
        width: 64px;
        height: 64px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        transition: transform 0.3s ease;
    }

    .play-circle:hover {
        transform: scale(1.1);
    }

    .circular-text {
        position: absolute;
        width: 110px;
        height: 110px;
        animation: rotate 20s linear infinite;
    }

    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .circular-text text {
        fill: white;
        font-family: 'Libre Baskerville', serif;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 0.2em;
        text-transform: uppercase;
    }

    .heritage-backdrop {
        position: absolute;
        right: -40px;
        bottom: -20px;
        width: 80%;
        height: 60%;
        background: #e5e7eb;
        z-index: 4;
        border-radius: 8px;
        opacity: 0.6;
        display: flex;
        align-items: flex-end;
        padding: 20px;
    }

    .since-text {
        position: absolute;
        bottom: 20px;
        right: 20px;
        text-align: right;
        color: #4a332a;
        font-family: 'Cormorant Garamond', serif;
    }

    .since-year {
        font-size: 48px;
        font-weight: 700;
        line-height: 1;
        opacity: 0.1;
    }

    @media (max-width: 1024px) {
        .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            padding-bottom: 40px;
        }
        .hero-text-content {
            align-items: center;
        }
        .hero-visuals {
            justify-content: center;
            margin-top: 40px;
        }
        .mandala-bg {
            width: 300px;
            height: 300px;
        }
    }
`;

const TimelessDelightsHero = () => {
    return (
        <>
            <style>{styles}</style>
            <section className="hero-section">
                {/* Decorative Mandala */}
                <img src="/mandala.png" className="mandala-bg" alt="" />

                <div className="hero-container">
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="hero-text-content"
                    >
                        <h1 className="hero-title">Timeless Delights</h1>
                        <p className="hero-subtitle">
                            A taste of India's heritage in every sweet and savoury.
                        </p>
                        <Link to="/our-story" className="hero-btn">
                            Our Story
                        </Link>
                    </motion.div>

                    {/* Right Visuals */}
                    <div className="hero-visuals">
                        {/* Background Heritage Card */}
                        <div className="heritage-backdrop">
                            <div className="since-text">
                                <div className="since-year">1914</div>
                                <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Journey of taste</div>
                            </div>
                        </div>

                        {/* Video Box */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="video-box"
                        >
                            <img src={heroMain} alt="Heritage sweets" className="video-thumbnail" />
                            
                            {/* Play Overlay */}
                            <div className="play-overlay">
                                <div className="relative flex items-center justify-center">
                                    {/* Circular Text */}
                                    <svg className="circular-text" viewBox="0 0 100 100">
                                        <path
                                            id="circlePath"
                                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                            fill="transparent"
                                        />
                                        <text>
                                            <textPath xlinkHref="#circlePath">
                                                VVS BAKES • Since 1999 • 
                                            </textPath>
                                        </text>
                                    </svg>

                                    {/* Play Button */}
                                    <div className="play-circle">
                                        <Play size={24} fill="#4a332a" color="#4a332a" className="ml-1" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TimelessDelightsHero;