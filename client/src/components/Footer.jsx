import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import heritageBg from "../assets/temple_footer_bg.png";

// Payment Logo Imports
import amexLogo from "../assets/footerstuffs/americanexpress.png";
import visaLogo from "../assets/footerstuffs/Visa.png";
import rupayLogo from "../assets/footerstuffs/RuPay.png";
import gpayLogo from "../assets/footerstuffs/Google_Pay_Logo.svg.png";
import paytmLogo from "../assets/footerstuffs/paytm.png";
import mastercardLogo from "../assets/footerstuffs/MasterCard_Logo.svg.png";

const Footer = ({ transparentBg }) => {
  const categories = {
    savouries: [
      { name: "Savouries", key: "Savouries" },
      { name: "Bakery", key: "Bakery" },
      { name: "Kitchen Special", key: "KitchenSpecial" }
    ],
    sweets: [
      { name: "Mittai", key: "Mittai" },
      { name: "Ladoo", key: "Ladoo" },
      { name: "Mysore Pak", key: "MysorePak" },
      { name: "Halwa", key: "Halwa" },
      { name: "Jangri", key: "Jangri" },
      { name: "Chikki", key: "Chikki" }
    ],
    information: ["About Us", "Terms and Conditions", "Privacy Policy", "Delivery & Shipping Policy", "Return Policy", "Contact Us", "Sitemap"],
    myAccount: ["My Account", "Order History", "Wish List"],
  };

  return (
    <FooterContainer $transparentBg={transparentBg}>
      <FooterContent>
        <div className="grid-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="column"
          >
            <h3>Savouries & More</h3>
            <ul>{categories.savouries.map(item => <li key={item.key}><Link to={`/category/${item.key}`}>{item.name}</Link></li>)}</ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="column"
          >
            <h3>Traditional Sweets</h3>
            <ul>{categories.sweets.map(item => <li key={item.key}><Link to={`/category/${item.key}`}>{item.name}</Link></li>)}</ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="column"
          >
            <h3>Information</h3>
            <ul>{categories.information.map(item => <li key={item}><a href="#">{item}</a></li>)}</ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="column"
          >
            <h3>My Account</h3>
            <ul>{categories.myAccount.map(item => <li key={item}><a href="#">{item}</a></li>)}</ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="column contact-col"
          >
            <h3>Contact Us</h3>
            <p>No 77, Pillayar Kovil Street, Sattur - 626203.</p>
            <p>Virudhunagar District, Tamilnadu, India.</p>
            <p className="phone">+91 95009 93465</p>
            <div className="social-icons">
              {/* Simple SVGs for Socials */}
              <a href="#"><FacebookIcon /></a>
              <a href="#"><InstagramIcon /></a>
              <a href=""><YoutubeIcon /></a>
            </div>
          </motion.div>
        </div>

        {/* FSSAI SECTION */}
        <ComplianceSection>
          <div className="fssai-box">
             <FSSAILogo />
             <p>License Number: 12422032000859</p>
          </div>
          <p className="copyright">© 2008–2026 VVS Kadalai Mittai. All Rights Reserved.</p>
        </ComplianceSection>

        {/* PAYMENT SECTION */}
        <PaymentSection>
          <p>100% Secure Shopping</p>
          <div className="payment-badges">
             <img src={amexLogo} alt="Amex" />
             <img src={visaLogo} alt="Visa" className="small-logo" />
             <img src={rupayLogo} alt="RuPay" className="small-logo" />
             <img src={gpayLogo} alt="Google Pay" />
             <img src={paytmLogo} alt="Paytm" />
             <img src={mastercardLogo} alt="MasterCard" />
          </div>
        </PaymentSection>
      </FooterContent>
    </FooterContainer>
  );
};

// --- STYLED COMPONENTS ---

const FooterContainer = styled.footer`
  position: relative;
  background-color: ${props => props.$transparentBg ? 'transparent' : '#fdfbf7'};
  /* Increased background visibility by reducing overlay opacity from 0.9 to 0.75 */
  background-image: ${props => props.$transparentBg ? 'none' : `linear-gradient(rgba(253, 251, 247, 0.75), rgba(253, 251, 247, 0.75)), url(${heritageBg})`};
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  padding-top: 0; 
  color: #5C1A0B;
  overflow: hidden;
  border-top: none;
  margin-top: 0;
  
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px 30px; /* No top gap — touches TimelessDelightsHero directly */
  position: relative;
  z-index: 1;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 30px;
    margin-bottom: 30px; /* Reduced from 60px */
  }

  .column {
    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 18px; /* Reduced from 20px */
      font-weight: 700;
      margin-bottom: 18px; /* Reduced from 24px */
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 30px;
        height: 2px;
        background-color: #C8860A;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 10px; /* Reduced from 12px */
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        font-weight: 500; /* Slightly heavier for visibility */

        a {
          text-decoration: none;
          color: #4A3020; /* Darker brown for better contrast */
          transition: all 0.3s ease;

          &:hover {
            color: #5C1A0B;
            padding-left: 2px;
          }
        }
      }
    }
  }

  .contact-col {
    p {
      font-family: 'Lato', sans-serif;
      font-size: 14px;
      color: #7A5C44;
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .phone {
      font-weight: 700;
      color: #5C1A0B;
      font-size: 16px;
      margin-top: 15px;
    }
    .social-icons {
      display: flex;
      gap: 16px;
      margin-top: 20px;

      a {
        color: #5C1A0B;
        opacity: 0.8;
        transition: transform 0.3s ease, opacity 0.3s ease;
        &:hover {
          transform: scale(1.2);
          opacity: 1;
        }
      }
    }
  }
`;

const ComplianceSection = styled.div`
  border-top: 1px solid rgba(92, 26, 11, 0.15);
  padding-top: 25px; /* Reduced from 40px */
  text-align: center;

  .fssai-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;

    p {
      font-family: 'Lato', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #5C1A0B;
    }
  }

  .copyright {
    font-size: 12px;
    color: #7A5C44;
    font-family: 'Lato', sans-serif;
    opacity: 0.7;
  }
`;

const PaymentSection = styled.div`
  margin-top: 25px; /* Reduced from 40px */
  text-align: center;

  p {
    font-size: 11px; /* Slightly smaller */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    color: #5C1A0B;
    opacity: 0.9;
  }

  .payment-badges {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px; /* Increased gap slightly */
    flex-wrap: wrap;
    opacity: 0.9;

    img {
      height: 24px; /* Consistent height for all logos */
      width: auto;
      object-fit: contain;
      filter: grayscale(10%) brightness(1.1);
      transition: all 0.3s ease;
      
      &:hover {
        filter: grayscale(0%) brightness(1);
        transform: scale(1.1);
      }
    }

    img.small-logo {
      height: 18px; /* Specifically smaller for Visa and RuPay as requested */
    }
  }
`;

// --- ICONS (Minimalist SVG components) ---

const FacebookIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
const YoutubeIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
);

const FSSAILogo = () => (
  <div style={{ padding: "4px 12px", border: "2px solid #5C1A0B", borderRadius: "10px", fontWeight: "900", fontStyle: "italic", fontSize: "22px", fontFamily: "serif", color: "#5C1A0B" }}>
    fssai
  </div>
);

export default Footer;

