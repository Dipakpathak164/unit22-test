'use client';

import React from 'react';

export function CustomerSupportVector() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[280px] min-[400px]:max-w-xs sm:max-w-md mx-auto bg-transparent rounded-none border-0 flex items-center justify-center font-sans">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
        fill="none"
      >
        <defs>
          {/* Metallic Industrial Gradients */}
          <linearGradient id="contactDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          <linearGradient id="redAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fa0d13" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>

          <linearGradient id="goldGearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="metalChrome" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e4e4e7" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a1a1aa" />
          </linearGradient>

          <filter id="vectorShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* CSS Keyframe Animations inline */}
        <style>
          {`
            @keyframes gearRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes gearRotateRev {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes pulseRing {
              0% { r: 40px; opacity: 0.8; }
              100% { r: 110px; opacity: 0; }
            }
            @keyframes floatY {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .gear-spin { transform-origin: 400px 300px; animation: gearRotate 20s linear infinite; }
            .gear-spin-small { transform-origin: 270px 210px; animation: gearRotateRev 12s linear infinite; }
            .pulse-ring-1 { animation: pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
            .pulse-ring-2 { animation: pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) 1.5s infinite; }
            .float-card { animation: floatY 4s ease-in-out infinite; }
          `}
        </style>

        {/* Background Radar Signal Rings */}
        <circle cx="400" cy="300" r="40" className="pulse-ring-1" stroke="#fa0d13" strokeWidth="2" fill="none" />
        <circle cx="400" cy="300" r="40" className="pulse-ring-2" stroke="#25d366" strokeWidth="1.5" fill="none" />

        {/* Background Dark Technical Hexagon Badge */}
        <polygon
          points="400,120 560,210 560,390 400,480 240,390 240,210"
          fill="url(#contactDarkGrad)"
          stroke="#3f3f46"
          strokeWidth="3"
          filter="url(#vectorShadow)"
        />

        {/* Small Counter-Rotating Secondary Gear */}
        <g className="gear-spin-small" opacity="0.4">
          <circle cx="270" cy="210" r="45" stroke="url(#goldGearGrad)" strokeWidth="8" strokeDasharray="12 8" fill="none" />
          <circle cx="270" cy="210" r="25" fill="#18181b" />
        </g>

        {/* Main Central Rotating Engineering Gear */}
        <g className="gear-spin">
          <circle cx="400" cy="300" r="110" stroke="#fa0d13" strokeWidth="12" strokeDasharray="20 14" fill="none" />
          <circle cx="400" cy="300" r="80" stroke="#3f3f46" strokeWidth="4" fill="none" />
        </g>

        {/* Central Master Mechanic Wrench & Cross-Tools Emblem */}
        <g filter="url(#vectorShadow)">
          {/* Crossed Wrench 1 */}
          <path
            d="M340 360 L460 240 M450 230 C470 210 490 230 470 250 L460 240 M350 370 C330 390 310 370 330 350 L340 360"
            stroke="url(#metalChrome)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Crossed Wrench 2 */}
          <path
            d="M460 360 L340 240 M470 350 C490 370 470 390 350 370 L360 360 M330 250 C310 230 330 210 350 230 L340 240"
            stroke="url(#metalChrome)"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </g>

        {/* Central Unit22 Badge Disc with Official Logo */}
        <circle cx="400" cy="300" r="56" fill="#000000" stroke="#fa0d13" strokeWidth="4" filter="url(#vectorShadow)" />
        <image
          href="/logo.png"
          x="346"
          y="268"
          width="108"
          height="64"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* ================= FLOATING CONTACT INTERACTION CARDS ================= */}

        {/* Card 1: Direct Phone Hotline Card (Top Left) */}
        <g className="float-card" filter="url(#vectorShadow)">
          <rect x="110" y="140" width="210" height="64" rx="10" fill="#ffffff" />
          <circle cx="145" cy="172" r="18" fill="#fa0d13" />
          {/* Phone Icon */}
          <path
            d="M140 166 C140 164 143 162 146 165 C147 166 148 168 147 170 C146 172 144 174 146 176 C148 178 150 180 152 179 C154 178 156 176 157 177 C159 178 160 181 158 183 C156 186 152 186 146 180 C140 174 140 170 140 166 Z"
            fill="#ffffff"
          />
          <text x="175" y="165" fill="#000000" fontFamily="sans-serif" fontSize="12" fontWeight="900">
            DIRECT PHONE LINE
          </text>
          <text x="175" y="182" fill="#fa0d13" fontFamily="monospace" fontSize="11" fontWeight="bold">
            +91 98765 43210
          </text>
        </g>

        {/* Card 2: Instant WhatsApp Tech Help Card (Bottom Right) */}
        <g className="float-card" style={{ animationDelay: '2s' }} filter="url(#vectorShadow)">
          <rect x="480" y="380" width="220" height="64" rx="10" fill="#ffffff" />
          <circle cx="515" cy="412" r="18" fill="#25d366" />
          {/* WhatsApp Chat Icon */}
          <path
            d="M510 405 C505 410 505 418 512 422 C514 423 514 424 513 426 L510 428 L513 426 C516 427 521 425 523 420 C526 414 524 406 517 404 C513 403 511 404 510 405 Z"
            fill="#ffffff"
          />
          <text x="545" y="405" fill="#000000" fontFamily="sans-serif" fontSize="12" fontWeight="900">
            WHATSAPP DESK
          </text>
          <text x="545" y="422" fill="#25d366" fontFamily="monospace" fontSize="11" fontWeight="bold">
            INSTANT PHOTO/VIDEO
          </text>
        </g>

        {/* Floating Top Badge: Master Mechanics Status */}
        <g className="animate-pulse">
          <rect x="300" y="50" width="200" height="32" rx="16" fill="#18181b" stroke="#fa0d13" strokeWidth="1.5" />
          <circle cx="318" cy="66" r="4" fill="#10b981" />
          <text x="330" y="70" fill="#ffffff" fontFamily="monospace" fontSize="10" fontWeight="bold">
            WORKSHOP MECHANICS ON CALL
          </text>
        </g>
      </svg>

      {/* Outer Floating Badge */}
      <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-md px-3 py-1 text-white border border-white/10 shadow-lg">
        <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
          ⚙️ WORKSHOP DIRECT CONTACT HUB
        </span>
      </div>
    </div>
  );
}
