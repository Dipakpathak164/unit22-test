import React from 'react';

export function LightGridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.055) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 45%, black 100%)',
        maskImage: 'radial-gradient(ellipse at center, transparent 45%, black 100%)',
      }}
    />
  );
}

export function DarkGridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.065) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 45%, black 100%)',
        maskImage: 'radial-gradient(ellipse at center, transparent 45%, black 100%)',
      }}
    />
  );
}

