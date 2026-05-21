import BannerCarousel from "../components/BannerCarousel";
import ShopCollectionSection from "../components/ShopCollectionSection";
import BestSellersSection from "../components/BestSellersSection";
import ComboSection from "../components/ComboSection";
import SweetLegacy from "../components/SweetLegacy";
import SavoryTreasures from '../components/SavoryTreasures';
import TimelessDelightsHero from '../components/TimelessDelightsHero';
import CustomerFeedback from '../components/CustomerFeedback';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import LuckyWheelModal from "../components/LuckyWheelModal";

/**
 * SectionGap — a small transparent strip between sections.
 * The page-level brown + mandala background shows through here,
 * acting as a decorative heritage separator.
 */
const SectionGap = () => (
  <div
    style={{
      width: "100%",
      height: "18px",
      background: "transparent",
      pointerEvents: "none",
    }}
  />
);

const Home = () => {
  return (
    /* Page-level brown + mandala background — sits behind all sections */
    <div
      style={{
        background: "#3d1508",
        backgroundImage: `url("/mandala.png")`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center top",
        backgroundSize: "auto 120px",
        backgroundAttachment: "local",
      }}
    >
      <BannerCarousel />
      <ShopCollectionSection />
      <BestSellersSection />
      <ComboSection />
      <SectionGap />
      <SweetLegacy />
      <SectionGap />
      <SavoryTreasures />
      <TimelessDelightsHero />
      <CustomerFeedback />
      <LocationSection />
      <Footer />
      <LuckyWheelModal />
    </div>
  );
};

export default Home;
