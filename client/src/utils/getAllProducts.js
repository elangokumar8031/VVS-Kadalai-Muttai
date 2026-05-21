import { products } from "../data/Products";

export const getAllProducts = () => {
  const result = [];

  Object.values(products).forEach((category) => {
    
    // If category is array (KitchenSpecial or Ladoo etc)
    if (Array.isArray(category)) {
      result.push(...category);
    }

    // If category is object (Savouries, Bakery)
    else if (typeof category === "object") {
      Object.values(category).forEach((subCategory) => {
        result.push(...subCategory);
      });
    }

  });

  return result;
};