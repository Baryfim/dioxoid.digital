'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { Variant, Size } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props 
}) => {
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-250 ease-linear rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-stone-900 text-white hover:bg-stone-700 shadow-sm border border-transparent",
    secondary: "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-transparent",
    outline: "bg-transparent text-stone-700 border border-stone-200 hover:border-stone-400 hover:bg-stone-50",
    ghost: "bg-transparent text-stone-600 hover:bg-stone-100 border border-transparent",
    link: "bg-transparent text-stone-600 hover:text-stone-800 underline-offset-4 hover:underline p-0 h-auto border-none",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm gap-1.5",
    md: "h-10 px-5 text-sm gap-2",
    lg: "h-12 px-8 text-base gap-2.5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${variant !== 'link' ? sizes[size] : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
