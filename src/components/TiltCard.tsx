import React, { useRef, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltMax?: number; // max tilt in degrees, default 10
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  tiltMax = 8,
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltMax;
    const rotateY = ((x - centerX) / centerX) * tiltMax;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0.18';
      sheenRef.current.style.background = `radial-gradient(circle 280px at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(243, 183, 117, 0.45), transparent 75%)`;
    }
  }, [tiltMax]);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transition: style?.transition
          ? `${style.transition}, transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)`
          : 'transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Specular Light Sheen Overlay */}
      <div
        ref={sheenRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 0,
          background: 'radial-gradient(circle 280px at 50% 50%, rgba(243, 183, 117, 0.45), transparent 75%)',
        }}
      />
      {children}
    </div>
  );
};
