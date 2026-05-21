import React, { useMemo } from 'react';

const generateDots = () => {
  const dots = [];
  // Adjusted grid to fit the viewBox="0 0 350 550"
  for (let y = 10; y < 540; y += 12) {
    for (let x = 10; x < 340; x += 12) {
      dots.push({ x, y });
    }
  }
  return dots;
};

const DottedMap = ({ markers, renderMarkerOverlay }) => {
  const dots = useMemo(() => generateDots(), []);
  const id = React.useId();

  // The stylized Tamil Nadu path from your provided code
  const tnPath = "M120 20 L170 35 L220 70 L255 120 L270 180 L280 250 L295 320 L290 390 L275 470 L245 515 L205 530 L160 520 L125 490 L105 445 L80 400 L65 350 L55 300 L60 240 L72 190 L88 140 L95 95 Z";

  return (
    <svg
      viewBox="0 0 350 550"
      className="w-full h-full max-h-[550px] mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="tnClip">
          <path d={tnPath} />
        </clipPath>
        
        {/* Glow for markers */}
        <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Shape Shadow */}
      <path
        d={tnPath}
        fill="rgba(242,201,76,0.05)"
        stroke="#f2c94c"
        strokeWidth="1"
        opacity="0.2"
      />

      {/* Dots clipped inside Tamil Nadu */}
      <g clipPath="url(#tnClip)">
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r="1.5"
            fill="#ffffff"
            opacity="0.3"
          />
        ))}
      </g>

      {/* Border Outline */}
      <path
        d={tnPath}
        fill="none"
        stroke="#f2c94c"
        strokeWidth="2"
        opacity="0.3"
      />

      {/* Location Markers */}
      {markers.map((marker, index) => {
        const { x, y } = marker;
        const r = marker.size * 1.5;

        return (
          <g key={index}>
            {/* Pulsing Outer Circle */}
            <circle cx={x} cy={y} r="8" fill="#f2c94c" opacity="0.2">
              <animate
                attributeName="r"
                values="5;15;5"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Core Marker Point */}
            <circle cx={x} cy={y} r="4" fill="#f2c94c" filter="url(#markerGlow)" />

            {/* Premium Overlay (Flag + Label) from your original code */}
            {renderMarkerOverlay({ marker, x, y, r, index })}
          </g>
        );
      })}
    </svg>
  );
};

export default DottedMap;
