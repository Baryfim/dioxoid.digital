'use client';

import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter text-white leading-[0.9] ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h2 className={`text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-white leading-none ${className}`}>
    {children}
  </h2>
);

export const H3: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-light text-stone-200 leading-snug ${className}`}>
    {children}
  </h3>
);

export const H4: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h4 className={`text-lg md:text-2xl font-normal text-white ${className}`}>
    {children}
  </h4>
);

interface ParagraphProps extends TypographyProps {
  size?: 'sm' | 'base' | 'lg';
}

export const Paragraph: React.FC<ParagraphProps> = ({ 
  children, 
  className = '', 
  size = 'base' 
}) => {
  const sizes = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-base md:text-lg lg:text-xl leading-relaxed'
  };
  
  return (
    <p className={`${sizes[size]} text-stone-400 font-light ${className}`}>
      {children}
    </p>
  );
};

export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.2em] text-stone-500 uppercase mb-4 md:mb-6">
    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-600"></span>
    {children}
  </span>
);
