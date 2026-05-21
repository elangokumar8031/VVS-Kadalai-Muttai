import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, X, ShoppingCart } from "lucide-react";

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Dark backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`
          fixed top-[110px] md:top-0 right-0 h-[calc(100vh-110px)] md:h-full w-full sm:w-[400px] bg-white z-50
          flex flex-col
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Cart{" "}
            <span className="ml-1 bg-orange-500 text-white text-xs w-6 h-6 rounded-full inline-flex items-center justify-center">
              {totalItems}
            </span>
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Free delivery banner */}
        {cartItems.length > 0 && (
          <div className="bg-green-50 text-green-700 text-sm text-center py-2 border-b">
            🎉 Your order qualifies for free delivery!
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-5xl mb-4">🛒</span>
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center border-b pb-4">

                {/* Image */}
                <img
                  src={item.img1}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm flex-shrink-0"
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                  <p className="text-orange-500 text-sm font-bold mt-1">
                    Rs. {item.price || 180}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center bg-orange-50 rounded-lg border border-orange-100 overflow-hidden mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-8 text-center text-[#6b1f0e]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Subtotal + Remove */}
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Rs. {(item.price || 180) * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-xs underline"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer — Total + Buttons */}
        {cartItems.length > 0 && (
          <div className="px-6 py-5 border-t">
            <div className="flex justify-between text-gray-700 font-semibold text-base mb-4">
              <span>Total:</span>
              <span className="text-orange-500">Rs. {totalPrice}</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 font-semibold tracking-wide mb-3 transition"
            >
              Check Out
            </button>

            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/cart");
              }}
              className="w-full border border-gray-400 text-gray-700 hover:bg-gray-50 py-3 font-medium tracking-wide transition"
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;