import { Heart, ShoppingCart, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const NavbarActions = ({ isMobile = false, openSearch }) => {
  const actions = [
    { icon: <Search size={isMobile ? 24 : 20} />, label: "Search", action: openSearch },
    { icon: <User size={isMobile ? 24 : 20} />, label: "Profile", link: "/login" },
    { icon: <Heart size={isMobile ? 24 : 20} />, label: "Wishlist", link: "/wishlist" },
    { icon: <ShoppingCart size={isMobile ? 24 : 20} />, label: "Cart", link: "/cart" },
  ];

  // In mobile view, we only show Wishlist here because Search, Profile, and Cart are moved to the bottom bar
  const filteredActions = isMobile 
    ? actions.filter(item => item.label === "Wishlist")
    : actions;

  return (
    <div className={`flex items-center ${isMobile ? 'flex-col items-start gap-4 p-6' : 'gap-2'} text-[#6b1f0e]`}>
      {filteredActions.map((item, index) =>
        item.link ? (
          <Link
            key={index}
            to={item.link}
            className={`group relative flex items-center ${isMobile ? 'w-full py-3 border-b border-gray-100 last:border-0' : 'px-3 py-2 rounded-lg'} transition-all duration-300 hover:bg-orange-50/50`}
          >
            <span>{item.icon}</span>
            <span className={`ml-3 text-base ${!isMobile ? 'max-w-0 overflow-hidden opacity-0 group-hover:max-w-[80px] group-hover:opacity-100' : 'opacity-100'} transition-all duration-300 whitespace-nowrap`}>
              {item.label}
            </span>
          </Link>
        ) : (
          <button
            key={index}
            onClick={item.action}
            className={`group relative flex items-center ${isMobile ? 'w-full py-3 border-b border-gray-100' : 'px-3 py-2 rounded-lg'} transition-all duration-300 hover:bg-orange-50/50`}
          >
            <span>{item.icon}</span>
            <span className={`ml-3 text-base ${!isMobile ? 'max-w-0 overflow-hidden opacity-0 group-hover:max-w-[80px] group-hover:opacity-100' : 'opacity-100'} transition-all duration-300 whitespace-nowrap`}>
              {item.label}
            </span>
          </button>
        )
      )}
    </div>
  );
};

export default NavbarActions;