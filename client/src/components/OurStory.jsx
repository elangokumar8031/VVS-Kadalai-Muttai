import React from 'react';

const OurStory = () => {
  return (
    <div className="w-full bg-[#fdfbf7] py-8 px-6 md:px-12 flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Heading Section */}
        <div className="flex items-center justify-center gap-3 md:gap-5 mb-4">
          <span className="text-5xl md:text-7xl font-serif font-black text-black tracking-wider uppercase drop-shadow-sm">
            Our
          </span>
          {/* 
            Image for "Story" 
            Place your image in the client/public/ folder and rename it to 'story-text.png'
            or change the src attribute below to match your file format (e.g., .svg).
          */}
          <img 
            src="/story-text.svg" 
            alt="Story" 
            className="h-20 md:h-32 object-contain drop-shadow-sm" 
          />
        </div>

        {/* Story Content Section */}
        <div className="relative w-full max-w-5xl px-8 py-20 md:px-24 md:py-16 mt-4 flex justify-center">
          <img 
            src="/para-outline.svg" 
            alt="Outline" 
            className="absolute inset-0 w-full h-full object-fill pointer-events-none opacity-90"
          />
          <div className="relative z-10 space-y-4 text-[#4a332a] text-base md:text-lg font-medium leading-relaxed font-handwriting text-justify md:text-center px-2 md:px-6">
            <p>
              Rooted in the rich heritage of Kovilpatti, VVS Kadalai Mittai has been a symbol of tradition, taste, and trust for generations. Known for its authentic preparation of kadalai mittai (peanut chikki), the brand follows time-honoured methods using carefully selected groundnuts and pure jaggery. Each batch is crafted with precision to achieve the perfect balance of crunch and sweetness, preserving the original flavours that define this iconic delicacy.
            </p>
            <p className="hidden md:block">
              Over the years, VVS Kadalai Mittai has grown from a small local favorite into a widely recognized name, while staying true to its roots in Kovilpatti — a town famous for its unique style of peanut candy. With a strong commitment to quality, hygiene, and authenticity, VVS continues to deliver products that carry the warmth of tradition in every bite, connecting generations through a shared love for classic South Indian sweets.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default OurStory;
