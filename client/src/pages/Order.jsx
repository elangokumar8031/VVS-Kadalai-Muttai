import { useState } from "react";
import { createOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";


const Order = () => {
  const [activeTab, setActiveTab] = useState("Kadalai Mittai");

  // Product Data
  const products = {
  "Kadalai Mittai": {
    img: "/kadalai.jpeg",
    desc: "Traditional handmade peanut candy with pure jaggery.",
    packages: [
      { id: "500g", label: "500 g", price: 50 },
      { id: "1kg", label: "1 kg", price: 90 },
      { id: "2kg", label: "2 kg", price: 145 },
    ],
  },

  "Sesame Candy": {
    img: "/sesame.jpg",
    desc: "Nutritious Ellu Mittai made with black sesame seeds.",
    packages: [
      { id: "500g", label: "500 g", price: 55 },
      { id: "1kg", label: "1 kg", price: 100 },
      { id: "2kg", label: "2 kg", price: 150 },
    ],
  },

  "Coco Muttai": {
    img: "/coco.png",
    desc: "Crushed peanut candy with soft crunchy texture.",
    packages: [
      { id: "500g", label: "500 g", price: 60 },
      { id: "1kg", label: "1 kg", price: 110 },
      { id: "2kg", label: "2 kg", price: 170 },
    ],
  },

  "Coconut Candy": {
    img: "/coconut.png",
    desc: "Fresh coconut candy with natural sweetness.",
    packages: [
      { id: "500g", label: "500 g", price: 50 },
      { id: "1kg", label: "1 kg", price: 95 },
      { id: "2kg", label: "2 kg", price: 160 },
    ],
  },

  "Honey Candy": {
    img: "/honey.png",
    desc: "Traditional Then Mittai made with pure honey.",
    packages: [
      { id: "500g", label: "500 g", price: 55 },
      { id: "1kg", label: "1 kg", price: 110 },
      { id: "2kg", label: "2 kg", price: 175 },
    ],
  },
};
  const navigate = useNavigate();

const handleBuyNow = () => {
  // Optional: prevent going empty
  const hasItems = Object.values(selections).some(
    item => item.qty > 0
  );

  if (!hasItems) {
    alert("Please select at least one item");
    return;
  }

  navigate("/checkout", {
    state: {
      selections,
      products,
      totalAmount,
    },
  });
};


  const [selections, setSelections] = useState({
  "Kadalai Mittai": { packageId: "1kg", qty: 1 },
  "Sesame Candy": { packageId: "500g", qty: 0 },
  "Coco Muttai": { packageId: "500g", qty: 0 },
  "Coconut Candy": { packageId: "500g", qty: 0 },
  "Honey Candy": { packageId: "500g", qty: 0 },
});

  // DERIVED quantities object (FIXES THE ERROR)
const quantities = Object.fromEntries(
  Object.entries(selections).map(([key, val]) => [key, val.qty])
);



  const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const adjustQuantity = (product, change) => {
  setSelections(prev => {
    const newQty = Math.max(0, prev[product].qty + change);
    return {
      ...prev,
      [product]: {
        ...prev[product],
        qty: newQty,
      },
    };
  });
};  
    const handlePackageChange = (product, packageId) => {
  setSelections(prev => ({
    ...prev,
    [product]: {
      ...prev[product],
      packageId,
    },
  }));
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    

    try {
      await createOrder({
        ...formData,
        items: selections,
      });

      alert("🎉 Order placed successfully! Thank you for shopping with us.");
      
      // Reset
      setFormData({ customerName: "", mobileNumber: "", address: "", paymentMethod: "Cash on Delivery" });
    } catch (error) {
      alert(error.response?.data?.message || "❌ Failed to place order");
    }
  };

  const totalAmount = Object.entries(selections).reduce((sum, [name, sel]) => {
  if (sel.qty === 0) return sum;

  const pack = products[name].packages.find(
    p => p.id === sel.packageId
  );

  return sum + (pack.price * sel.qty);
}, 0);


  return (
    <div className="min-h-screen bg-[#FDFCF0] text-slate-800 font-sans pb-20">
      
      {/* 1. HERO SECTION (Peanut Candy) */}
      <div className="max-w-6xl mx-auto pt-10 px-4">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-80 md:h-auto overflow-hidden">
            <img 
              src={products["Kadalai Mittai"].img} 
              alt="Peanut Candy" 
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700"
            />
            <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              BEST SELLER
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50/30">
            <h1 className="text-4xl font-black text-orange-900 mb-2">Kovilpatti Kadalai Mittai</h1>
            <p className="text-slate-600 mb-6 text-lg">{products["Kadalai Mittai"].desc}</p>
            
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-orange-100 shadow-sm">
              <div>
                <span className="text-sm text-slate-500 block">Price per kg</span>
                <span className="text-2xl font-bold text-orange-600">
                    ₹{
                      products["Kadalai Mittai"].packages.find(
                        p => p.id === selections["Kadalai Mittai"].packageId
                      ).price
                    }
                  </span>

              </div>
              {/* KG / PACKAGE SELECTOR */}
<div className="relative">

  <select
    value={selections["Kadalai Mittai"].packageId}
    onChange={(e) =>
      handlePackageChange("Kadalai Mittai", e.target.value)
    }
    className="
      w-full
      bg-orange-800
      text-white
      border
      border-orange-700
      rounded-lg
      px-3
      py-2
      pr-10
      text-sm
      appearance-none
      cursor-pointer
      focus:ring-2
      focus:ring-orange-500
      peer
    "
  >
    {products["Kadalai Mittai"].packages.map(pkg => (
      <option key={pkg.id} value={pkg.id}>
        {pkg.label}
      </option>
    ))}
  </select>

  {/* DOWN ARROW */}
  <svg
    className="
      pointer-events-none
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      h-4
      w-4
      text-white
      transition-transform
      duration-200
      peer-focus:rotate-180
    "
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>

</div>

            </div>
          </div>
        </div>
      </div>

      {/* 2. OTHER SWEETS SECTION */}
      <div className="max-w-6xl mx-auto mt-20 px-4">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[2px] flex-grow bg-orange-200"></div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic">Explore Other Sweets</h2>
          <div className="h-[2px] flex-grow bg-orange-200"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(products).slice(1).map((name) => (
            <div key={name} className="bg-white rounded-3xl p-5 shadow-lg border border-orange-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="h-40 rounded-2xl overflow-hidden mb-4">
                <img src={products[name].img} alt={name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">{name}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">{products[name].desc}</p>
              <div className="space-y-2 mb-4">
                <span className="block font-bold text-orange-600 text-lg">
                  ₹{
                    products[name].packages.find(
                      p => p.id === selections[name].packageId
                    ).price
                  }
                </span>

                <select
                  value={selections[name].packageId}
                  onChange={(e) => handlePackageChange(name, e.target.value)}
                  className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-orange-500 bg-orange-800 text-white"
                >
                  {products[name].packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.label}
                    </option>
                  ))}
                </select>
              </div>


              <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                <button onClick={() => adjustQuantity(name, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-lg hover:bg-red-500 hover:text-white transition-colors">−</button>
                    <span className="font-bold">
                      {quantities[name]} pack(s)
                    </span>

                <button onClick={() => adjustQuantity(name, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-lg hover:bg-green-500 hover:text-white transition-colors">+</button>
              </div> 
            </div>
          ))}
        </div>
      </div>
<div className="flex justify-center">
  <button onClick={handleBuyNow}
    className=" bg-orange-600 hover:bg-orange-500 text-white py-5 px-5 rounded-2xl font-black text-xl mt-8"
  >
    Buy now
  </button>
</div>



    
    </div>
  );
};

export default Order;