import ShopCollectionSection from "./ShopCollectionSection";

const KitchenSpecialPreview = () => {
  return (
    <div className="h-full overflow-hidden">
      {/* scaled preview so it fits inside banner */}
      <div className="scale-90 origin-top">
        <ShopCollectionSection />
      </div>
    </div>
  );
};

export default KitchenSpecialPreview;
