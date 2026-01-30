'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { Variant, Size } from '../types';
import styles from './Button.module.scss';

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
  const variantClass = styles[variant];
  const sizeClass = variant !== 'link' ? styles[size] : '';
  
  return (
    <button 
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className={styles.icon} style={{ animation: 'spin 1s linear infinite' }} />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
