import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Plus, Minus, X, ShoppingCart } from "lucide-react";
import heritageBg from "../assets/temple_footer_bg.png";
import Footer from "../components/Footer";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.price || 180),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col pt-[110px]" style={{ 
        background: `linear-gradient(rgba(253, 251, 247, 0.8), rgba(253, 251, 247, 0.8)), url(${heritageBg})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center flex-1 flex flex-col justify-center items-center">
          <div className="bg-orange-50 p-6 rounded-full mb-6">
            <ShoppingCart size={64} className="text-orange-300" />
          </div>
          <h2 className="text-3xl font-serif text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">Looks like you haven't added any of our traditional treats to your cart yet.</p>
          <Link to="/" className="bg-[#7B2D1E] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#9B3D2E] transition-all">
            Start Shopping
          </Link>
        </div>
        <Footer transparentBg={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-[110px]" style={{ 
      background: `linear-gradient(rgba(253, 251, 247, 0.85), rgba(253, 251, 247, 0.85)), url(${heritageBg})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex-1 w-full">
        <h1 className="text-2xl sm:text-3xl font-serif text-orange-600 mb-6 sm:mb-8 border-b border-orange-200 pb-4">
          Your Cart ({totalItems} items)
        </h1>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-6 border-b pb-6">

            {/* Image */}
            <img
              src={item.img1}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md shadow"
            />

            {/* Details */}
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
              <p className="text-orange-500 font-bold mt-1">Rs. {item.price || 180}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center bg-white border border-orange-200 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-2 text-orange-600 hover:bg-orange-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 sm:px-4 py-1 sm:py-2 border-x border-orange-100 font-bold text-[#6b1f0e] min-w-[40px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-2 text-orange-600 hover:bg-orange-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Subtotal */}
            <p className="hidden sm:block w-24 text-right font-bold text-[#6b1f0e]">
              Rs. {(item.price || 180) * item.quantity}
            </p>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-400 hover:text-red-600 transition-colors"
              aria-label="Remove item"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Total + Checkout */}
      <div className="mt-8 flex justify-between items-center border-t pt-6">
        <p className="text-xl font-semibold text-gray-700">
          Total: <span className="text-orange-500">Rs. {totalPrice}</span>
        </p>
        <button className="bg-[#7B2D1E] hover:bg-[#9B3D2E] text-white px-10 py-3 font-semibold tracking-wide">
          CHECKOUT
        </button>
      </div>
      </div>
      <Footer transparentBg={true} />
    </div>
  );
};

export default Cart; // ✅ THIS LINE IS CRITICAL — must be present  