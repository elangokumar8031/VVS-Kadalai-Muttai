import { useState } from "react";
import { useCart } from "../context/CartContext";

const AddToCartButton = ({ product, className = "", children, ...props }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    
    // Add product formatting logic similar to existing usage (e.g. adding img1)
    const productToAdd = product.img1 ? product : { ...product, img1: product.img };
    
    addToCart(productToAdd);
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500); // 1.5 seconds animation duration
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`relative overflow-hidden flex items-center justify-center transition-all duration-300 ${className} ${
        isAdded ? "!bg-[#5C1A0B] !border-[#5C1A0B] !text-white" : ""
      }`}
    >
      <span
        className={`absolute transition-transform duration-300 flex items-center justify-center ${
          isAdded ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span
        className={`transition-opacity duration-300 flex items-center justify-center w-full h-full ${
          isAdded ? "opacity-0" : "opacity-100"
        }`}
      >
        {children || "ADD TO CART"}
      </span>
    </button>
  );
};

export default AddToCartButton;
