'use client';

import React from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h1 className={`${styles.h1} ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h2 className={`${styles.h2} ${className}`}>
    {children}
  </h2>
);

export const H3: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h3 className={`${styles.h3} ${className}`}>
    {children}
  </h3>
);

export const H4: React.FC<TypographyProps> = ({ children, className = '' }) => (
  <h4 className={`${styles.h4} ${className}`}>
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
  return (
    <p className={`${styles.paragraph} ${styles[size]} ${className}`}>
      {children}
    </p>
  );
};

export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={styles.sectionLabel}>
    <span className={styles.dot}></span>
    {children}
  </span>
);
