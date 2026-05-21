  import React, { useState, useEffect } from "react";

  const images = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
    "/banner4.jpg",
  ];

  const BannerCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 4000);

      return () => clearInterval(timer);
    }, []);

    return (
      <section className="relative w-full h-[70vh] md:h-[60vh] overflow-hidden">

        {images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt=""
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        index === current ? "opacity-100" : "opacity-0"
      }`}
    />
  ))}
        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Progress Bars */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 md:w-full md:max-w-md flex gap-1.5 md:gap-3 z-30">
          {images.map((_, index) => (
            <div key={index} className="flex-1 h-[2px] md:h-1 bg-white/30 rounded-full overflow-hidden">
              {index === current && (
                <div
                  key={current}
                  className="h-full bg-white animate-progress"
                  style={{ animationDuration: "4000ms" }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default BannerCarousel;
