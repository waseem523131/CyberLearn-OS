import React from 'react';

export default function CyberGridBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-40"></div>

      {/* Subtle Glowing Radial Spotlights */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse-glow"></div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-10 w-full animate-scanline opacity-30"></div>
    </div>
  );
}
