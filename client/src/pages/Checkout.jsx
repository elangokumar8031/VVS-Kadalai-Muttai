import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFDF5] p-4">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-4xl">
          🥜
        </div>
        <p className="text-xl font-bold text-amber-900 mb-6">Your basket is empty!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg"
        >
          Back to Sweets Shop
        </button>
      </div>
    );
  }

  const { selections, products, totalAmount } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOrder = {
      customer: formData,
      items: selections,
      total: totalAmount,
      date: new Date().toISOString(),
    };
    console.log("Order Submitted:", finalOrder);
    alert("Order Received! Preparing your fresh Peanut Candies.");
    navigate("/order-success", { state: { orderId: "PKM-" + Math.random().toString(36).substr(2, 7).toUpperCase() } });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-amber-950 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">VVK  &   sons</span>
          <h1 className="text-4xl font-black text-amber-900 tracking-tight mt-1">Complete Your Order</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: DELIVERY FORM */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-white border-2 border-amber-800 p-8 rounded-[2rem] shadow-sm">
              <h2 className="text-2xl font-black text-amber-900 mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white text-lg italic font-serif">P</span>
                Delivery Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-amber-800 ml-1">Full Name</label>
                    <input
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full bg-amber-50/50 border-2 border-amber-800 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-amber-800 ml-1">Mobile Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      className="w-full bg-amber-50/50 border-2 border-amber-100 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-amber-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-amber-800 ml-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="For order updates"
                    className="w-full bg-amber-50/50 border-2 border-amber-100 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-amber-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-amber-800 ml-1">Full Shipping Address</label>
                  <textarea
                    required
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No, Street Name, Area..."
                    className="w-full bg-amber-50/50 border-2 border-amber-100 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-amber-200 resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-amber-800 ml-1">Town / City</label>
                    <input
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-amber-50/50 border-2 border-amber-100 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-amber-800 ml-1">Pincode</label>
                    <input
                      required
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-amber-50/50 border-2 border-amber-100 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>


              </form>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-[#451A03] text-amber-50 rounded-[2rem] p-8 sticky top-8 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">🎁</span> Your Selection
              </h2>

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(selections).map(([name, sel]) => {
                  if (sel.qty <= 0) return null;
                  const itemPrice = products[name].packages.find(p => p.id === sel.packageId).price;
                  return (
                    <div key={name} className="flex justify-between items-start border-b border-amber-900/50 pb-4">
                      <div>
                        <p className="font-bold text-amber-200 uppercase tracking-tight">{name}</p>
                        <p className="text-xs text-amber-400 font-medium mt-1">
                          {sel.packageId} pkg <span className="mx-2">|</span> Qty: {sel.qty}
                        </p>
                      </div>
                      <p className="font-bold">₹{sel.qty * itemPrice}</p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-amber-400/80 text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-amber-400/80 text-sm">
                  <span>Shipping Fee</span>
                  <span className="text-green-400 font-bold tracking-widest">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-amber-800">
                  <span className="text-lg font-bold">Total Payable</span>
                  <span className="text-3xl font-black text-amber-400">₹{totalAmount}</span>
                </div>
                <button
                  type="submit"
                  className="w-full mt-9 bg-amber-600 hover:bg-amber-700 text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-amber-200 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Order Now - ₹{totalAmount}
                </button>
              </div>

              <div className="mt-8 bg-amber-900/30 border border-amber-800 p-5 rounded-2xl">
                <div className="flex gap-4">
                  <span className="text-2xl">🌿</span>
                  <p className="text-xs text-amber-200/70 leading-relaxed">
                    <strong className="text-amber-100 block mb-1 uppercase tracking-wider">Freshness Guaranteed</strong>
                    Our peanut candies are prepared in small batches using organic jaggery and premium hand-picked peanuts.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;