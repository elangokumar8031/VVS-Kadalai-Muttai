import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileBottomNav = ({ openSearch, isHidden }) => {
  return (
    <motion.div 
      initial={{ x: "-50%", y: 0, opacity: 1 }}
      animate={{ 
        x: "-50%",
        y: isHidden ? 100 : 0, 
        opacity: isHidden ? 0 : 1 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="lg:hidden fixed bottom-6 left-1/2 z-[100] w-[92%] max-w-[400px]"
    >
      <div className="bg-white/50 backdrop-blur-[20px] border border-white/50 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-[24px] flex items-center justify-around p-1.5 ring-1 ring-black/[0.05]">
        {/* HOME */}
        <Link to="/" className="flex p-3 text-[#6b1f0e] hover:bg-orange-50 rounded-xl transition-all active:scale-90">
          <svg className="icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
          </svg>
        </Link>

        {/* SEARCH */}
        <button onClick={openSearch} className="flex p-3 text-[#6b1f0e] hover:bg-orange-50 rounded-xl transition-all active:scale-90">
          <svg className="icon" stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* PROFILE */}
        <Link to="/login" className="flex p-3 text-[#6b1f0e] hover:bg-orange-50 rounded-xl transition-all active:scale-90">
          <svg className="icon" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
          </svg>
        </Link>

        {/* CART */}
        <Link to="/cart" className="flex p-3 text-[#6b1f0e] hover:bg-orange-50 rounded-xl transition-all active:scale-90">
          <svg className="icon" stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <circle cx={9} cy={21} r={1} />
            <circle cx={20} cy={21} r={1} />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default MobileBottomNav;
