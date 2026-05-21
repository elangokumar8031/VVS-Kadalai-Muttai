import { HeartIcon, EyeIcon } from "./icons/Icons";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-transparent overflow-hidden relative">
      
      {/* Image */}
      <div className="relative h-[260px] overflow-hidden">
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

        {/* Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-red-600 hover:text-orange-500">
            <HeartIcon />
          </button>
          <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-red-600 hover:text-orange-500">
            <EyeIcon />
          </button>
        </div>
      </div>

      {/* Text + Button */}
      <div>
        <div className="p-4">
          <h3 className="text-orange-400 font-medium mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-orange-300">
            ⭐⭐⭐⭐⭐ <span className="text-xs">({product.reviews} reviews)</span>
          </p>
        </div>

        <AddToCartButton
          product={product}
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide"
        >
          ADD TO CART
        </AddToCartButton>
      </div>
    </div>
  );
};

export default ProductCard;
