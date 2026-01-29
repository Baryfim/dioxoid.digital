'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

// --- Text Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', ...props }) => (
  <div className={`flex flex-col gap-1.5 w-full ${className}`}>
    {label && <label className="text-sm font-medium text-stone-700">{label}</label>}
    <input 
      className={`
        flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400
        transition-all duration-250 ease-linear
        focus:outline-none focus:ring-2 focus:ring-stone-200 focus:border-stone-400
        disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-400
        ${error ? 'border-red-400 focus:ring-red-100' : 'border-stone-200 hover:border-stone-300'}
      `}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
    {!error && helperText && <span className="text-xs text-stone-500">{helperText}</span>}
  </div>
);

// --- Checkbox ---
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer group ${className}`}>
      <div className="relative flex items-center">
        <input type="checkbox" className="peer sr-only" {...props} />
        <div className="w-5 h-5 border border-stone-300 rounded transition-all duration-250 ease-linear bg-white peer-checked:bg-stone-900 peer-checked:border-stone-900 group-hover:border-stone-400"></div>
        <Check className="w-3.5 h-3.5 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
      </div>
      <span className="text-sm text-stone-700 select-none group-hover:text-stone-900 transition-colors">{label}</span>
    </label>
  );
};

// --- Radio ---
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Radio: React.FC<RadioProps> = ({ label, className = '', ...props }) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer group ${className}`}>
      <div className="relative flex items-center">
        <input type="radio" className="peer sr-only" {...props} />
        <div className="w-5 h-5 border border-stone-300 rounded-full transition-all duration-250 ease-linear bg-white peer-checked:border-stone-900 group-hover:border-stone-400"></div>
        <div className="w-2.5 h-2.5 bg-stone-900 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-all duration-250 scale-0 peer-checked:scale-100"></div>
      </div>
      <span className="text-sm text-stone-700 select-none group-hover:text-stone-900 transition-colors">{label}</span>
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
  <div className="flex items-center gap-3">
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
        transition-colors duration-250 ease-linear focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2
        ${checked ? 'bg-stone-900' : 'bg-stone-200'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
          transition duration-250 ease-linear
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
    {label && <span className="text-sm font-medium text-stone-700">{label}</span>}
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
    <div className="relative w-full min-w-[200px]">
      {label && <label className="text-sm font-medium text-stone-700 block mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full h-10 px-3 py-2 text-sm text-left bg-white border rounded-lg 
          transition-all duration-250 ease-linear focus:outline-none focus:ring-2 focus:ring-stone-200
          ${isOpen ? 'border-stone-400 ring-2 ring-stone-200' : 'border-stone-200 hover:border-stone-300'}
        `}
      >
        <span className={value ? 'text-stone-800' : 'text-stone-400'}>
          {selectedLabel || placeholder}
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-stone-100 rounded-lg shadow-lg py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-2 text-sm text-left transition-colors duration-150
                ${value === opt.value ? 'bg-stone-50 text-stone-900 font-medium' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  );
};
