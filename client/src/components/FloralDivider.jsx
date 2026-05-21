import React from "react";

/**
 * FloralDivider
 * Heritage-style scroll ornament band — dark brown bg + rust S-curl tiling
 * Matches the border shown in the design reference screenshot.
 */
const FloralDivider = () => (
  <div
    style={{
      width: "100%",
      background: "#1e0e08",
      lineHeight: 0,
      userSelect: "none",
    }}
    aria-hidden="true"
  >
    <svg
      width="100%"
      height="30"
      viewBox="0 0 1440 30"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dark background */}
      <rect width="1440" height="30" fill="#1e0e08" />

      {/* Thin accent lines top and bottom */}
      <line x1="0" y1="2"  x2="1440" y2="2"  stroke="#5c1a0b" strokeWidth="0.7" opacity="0.8" />
      <line x1="0" y1="28" x2="1440" y2="28" stroke="#5c1a0b" strokeWidth="0.7" opacity="0.8" />

      {/* Scrollwork pattern fills the band */}
      <defs>
        <pattern
          id="floralScroll"
          x="0" y="0"
          width="32" height="30"
          patternUnits="userSpaceOnUse"
        >
          {/*
            S-curl tile: starts center-left → bumps UP to peak → crosses center →
            bumps DOWN to trough → exits center-right. Seamlessly tiles.
          */}
          <path
            d="M0,15 C4,15 4,6 9,6 C14,6 14,15 16,15 C18,15 18,24 23,24 C28,24 28,15 32,15"
            stroke="#9b3a22"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Knot circles at the scroll peaks */}
          <circle cx="9"  cy="6"  r="2.4" fill="none" stroke="#9b3a22" strokeWidth="1.1" />
          <circle cx="23" cy="24" r="2.4" fill="none" stroke="#9b3a22" strokeWidth="1.1" />
        </pattern>
      </defs>

      <rect x="0" y="4" width="1440" height="22" fill="url(#floralScroll)" />
    </svg>
  </div>
);

export default FloralDivider;
