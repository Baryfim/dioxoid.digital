'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Input.module.scss';

// --- Text Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', ...props }) => (
  <div className={`${styles.inputWrapper} ${className}`}>
    {label && <label className={styles.label}>{label}</label>}
    <input 
      className={`${styles.input} ${error ? styles.error : ''}`}
      {...props}
    />
    {error && <span className={styles.errorText}>{error}</span>}
    {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
  </div>
);

// --- Checkbox ---
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className={`${styles.checkboxLabel} ${className}`}>
      <div className={styles.checkboxContainer}>
        <input type="checkbox" className={styles.checkboxInput} {...props} />
        <div className={styles.checkboxBox}></div>
        <Check className={styles.checkIcon} />
      </div>
      <span className={styles.checkboxText}>{label}</span>
    </label>
  );
};

// --- Radio ---
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Radio: React.FC<RadioProps> = ({ label, className = '', ...props }) => {
  return (
    <label className={`${styles.radioLabel} ${className}`}>
      <div className={styles.radioContainer}>
        <input type="radio" className={styles.radioInput} {...props} />
        <div className={styles.radioCircle}></div>
        <div className={styles.radioDot}></div>
      </div>
      <span className={styles.radioText}>{label}</span>
    </label>
  );
};

// --- Toggle ---
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => (
  <div className={styles.toggleContainer}>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${styles.toggleButton} ${checked ? styles.checked : ''}`}
    >
      <span className={styles.toggleSwitch} />
    </button>
    {label && <span className={styles.toggleLabel}>{label}</span>}
  </div>
);

// --- Select / Dropdown ---
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange, placeholder = 'Select...', label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find(opt => opt.value === value)?.label;

  return (
    <div className={styles.selectContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.selectButton} ${isOpen ? styles.open : ''}`}
      >
        <span className={`${styles.selectText} ${value ? '' : styles.placeholder}`}>
          {selectedLabel || placeholder}
        </span>
        {isOpen ? <ChevronUp className={styles.selectIcon} /> : <ChevronDown className={styles.selectIcon} />}
      </button>
      
      {isOpen && (
        <div className={styles.selectDropdown}>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`${styles.selectOption} ${value === opt.value ? styles.selected : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div className={styles.selectBackdrop} onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  );
};
