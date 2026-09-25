import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  glowColor = 'blue',
  ...props 
}) {
  const glowClasses = {
    blue: 'glow-blue',
    cyan: 'glow-cyan',
    purple: 'glow-purple',
    green: 'glow-green',
    red: 'glow-red',
  };

  return (
    <div
      className={`glass-panel rounded-2xl p-6 ${hover ? 'glass-panel-hover' : ''} ${glow ? glowClasses[glowColor] : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
