import { NavLink } from "react-router-dom";

const Navbar2 = () => {
  return (
    <div className="w-full bg-[#6b1f0e] ">
      <div className="max-w-7xl mx-auto flex justify-start md:justify-center overflow-x-auto whitespace-nowrap gap-6 md:gap-10 py-3 px-4 md:px-0 scrollbar-hide">
        
        <NavLink
          to="/sweets"
            className={({ isActive }) =>
            `relative text-base md:text-lg font-medium text-white pb-2
            after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
            after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400
            after:transition-all after:duration-300
            hover:after:w-full
            ${isActive ? "after:w-full" : ""}`
            }


        >
          Sweets
        </NavLink>

        <NavLink
          to="/savouries"
           className={({ isActive }) =>
            `relative text-base md:text-lg font-medium text-white pb-2
            after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
            after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400
            after:transition-all after:duration-300
            hover:after:w-full
            ${isActive ? "after:w-full" : ""}`
            }


        >
          Savouries
        </NavLink>

        <NavLink
          to="/chikki"
          className={({ isActive }) =>
            `relative text-base md:text-lg font-medium text-white pb-2
            after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
            after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400
            after:transition-all after:duration-300
            hover:after:w-full
            ${isActive ? "after:w-full" : ""}`
            }


        >
          Chikki
        </NavLink>

         <NavLink
          to="/category/KitchenSpecial"
           className={({ isActive }) =>
            `relative text-base md:text-lg font-medium text-white pb-2
            after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
            after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-400
            after:transition-all after:duration-300
            hover:after:w-full
            ${isActive ? "after:w-full" : ""}`
            }

        >
          Kithen Special
        </NavLink>

      </div>
    </div>
  );
};

export default Navbar2;
