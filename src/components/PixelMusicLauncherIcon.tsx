import React from 'react';

interface PixelMusicLauncherIconProps {
  className?: string;
  size?: number | string;
  withContainer?: boolean;
}

export const PixelMusicLauncherIcon: React.FC<PixelMusicLauncherIconProps> = ({
  className = '',
  size = 48,
  withContainer = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 ${className}`}
    >
      <defs>
        {/* Soft pastel squircle background gradient */}
        <linearGradient id="bgGrad" x1="60" y1="40" x2="460" y2="480" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2F2FF" />
          <stop offset="50%" stopColor="#F0EEFF" />
          <stop offset="100%" stopColor="#FDEBFF" />
        </linearGradient>

        {/* 3D Cyan-to-Blue Top Glass Petal */}
        <linearGradient id="bluePetal" x1="140" y1="110" x2="380" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67C6FF" />
          <stop offset="40%" stopColor="#2589FE" />
          <stop offset="100%" stopColor="#1750EE" />
        </linearGradient>

        {/* 3D Violet/Indigo Back Glass Petal */}
        <linearGradient id="purplePetal" x1="220" y1="160" x2="430" y2="370" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="55%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Lower Curled Wave Petal */}
        <linearGradient id="curlGrad" x1="160" y1="280" x2="330" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2F7FFF" />
          <stop offset="70%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        {/* Specular White Rim Highlight */}
        <linearGradient id="rimGlow" x1="160" y1="110" x2="300" y2="210" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>

        {/* White Music Note Surface Gradient */}
        <linearGradient id="noteGrad" x1="220" y1="160" x2="230" y2="370" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="85%" stopColor="#F5F7FF" />
          <stop offset="100%" stopColor="#E4EAFF" />
        </linearGradient>

        {/* Drop shadow filters for realistic 3D depth */}
        <filter id="petalShadow" x="80" y="70" width="360" height="380" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#2563EB" floodOpacity="0.35" />
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1E3A8A" floodOpacity="0.25" />
        </filter>

        <filter id="noteShadow" x="140" y="140" width="180" height="250" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.28" />
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1E3A8A" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Optional Rounded Squircle Background Frame */}
      {withContainer && (
        <rect
          x="16"
          y="16"
          width="480"
          height="480"
          rx="124"
          fill="url(#bgGrad)"
        />
      )}

      {/* Glassmorphic 3D Play Button Triangle Geometry */}
      <g filter="url(#petalShadow)">
        {/* Rear Violet / Purple Depth Flange */}
        <path
          d="M 230 145 
             C 275 160, 360 215, 385 240 
             C 415 270, 410 295, 375 330 
             C 335 370, 275 395, 230 380 
             C 200 370, 185 340, 205 305 
             C 230 260, 240 200, 230 145 Z"
          fill="url(#purplePetal)"
          opacity="0.95"
        />

        {/* Lower Curled Wave Petal */}
        <path
          d="M 180 260
             C 210 245, 255 275, 280 315
             C 305 355, 285 395, 245 408
             C 190 425, 140 375, 135 325
             C 130 275, 155 270, 180 260 Z"
          fill="url(#curlGrad)"
        />

        {/* Main Curved Play Triangle (Cyan-Blue Gloss Body) */}
        <path
          d="M 180 115 
             C 240 95, 320 170, 358 220 
             C 388 260, 375 285, 330 325 
             C 280 370, 195 400, 150 375 
             C 120 358, 125 300, 128 250 
             C 130 195, 135 130, 180 115 Z"
          fill="url(#bluePetal)"
        />

        {/* Specular Rim Glow on Top Left */}
        <path
          d="M 175 118 
             C 235 98, 305 165, 345 215 
             C 330 195, 260 135, 190 138 
             C 155 140, 140 180, 138 215 
             C 134 175, 145 128, 175 118 Z"
          fill="url(#rimGlow)"
        />
      </g>

      {/* Floating 3D White Music Note (♪) */}
      <g filter="url(#noteShadow)">
        {/* Note Stem & Flag */}
        <path
          d="M 234 165
             C 234 156, 242 150, 252 153
             C 275 160, 298 160, 318 152
             C 328 148, 338 155, 338 166
             C 338 174, 332 181, 324 185
             C 298 198, 275 204, 256 220
             L 256 312
             C 252 309, 245 307, 236 307
             C 202 307, 175 329, 175 356
             C 175 383, 202 405, 236 405
             C 267 405, 292 387, 294 362
             L 294 220
             C 305 212, 320 205, 335 200
             C 336 200, 337 200, 338 200
             L 294 212
             L 256 225
             L 256 165
             Z"
          fill="url(#noteGrad)"
        />

        {/* Circular Note Head Highlight */}
        <circle cx="236" cy="356" r="42" fill="url(#noteGrad)" />
      </g>
    </svg>
  );
};
