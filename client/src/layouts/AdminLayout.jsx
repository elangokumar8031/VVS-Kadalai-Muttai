import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Admin Top Bar with Marquee */}
      <div className="relative z-50 w-full bg-[#6b1f0e] text-white text-xs sm:text-sm overflow-hidden">
        <div className="py-3 sm:py-4 flex whitespace-nowrap">
          <div
            className="flex justify-around min-w-[200%]"
            style={{ animation: "marquee 15s linear infinite" }}
          >
            {/* First Half */}
            <span className="font-medium tracking-wide">VVS kadalai mittai</span>
            <span className="font-medium tracking-wide">VVS kadalai mittai</span>
            <span className="font-medium tracking-wide">VVS kadalai mittai</span>
            
            {/* Second Half for seamless looping */}
            <span className="font-medium tracking-wide">VVS kadalai mittai</span>
            <span className="font-medium tracking-wide">VVS kadalai mittai</span>
            <span className="font-medium tracking-wide">VVS kadalai mittai</span>
          </div>
        </div>
      </div>

      {/* No Navbar included for Admin */}

      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};

export default AdminLayout;
