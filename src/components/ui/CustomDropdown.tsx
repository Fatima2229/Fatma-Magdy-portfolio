import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  hasError = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full px-4 py-3 rounded-xl bg-[#faf9fc] hover:bg-white text-sm flex items-center justify-between text-start transition-all duration-200 border cursor-pointer ${
          hasError
            ? 'border-rose-400 ring-2 ring-rose-200 bg-white'
            : isOpen
            ? 'border-[#8c52ff] ring-2 ring-[#8c52ff]/20 bg-white'
            : 'border-slate-200/80 hover:border-[#8c52ff]/50'
        }`}
      >
        <span
          className={`truncate ${
            selectedOption ? 'text-slate-800 font-semibold' : 'text-slate-400'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          size={16}
          className={`text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#8c52ff]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full mt-1.5 inset-x-0 z-40 bg-white/95 backdrop-blur-2xl rounded-2xl p-1.5 shadow-xl border border-[#e6d8f8] space-y-1 animate-scale-up max-h-60 overflow-y-auto"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0e1a36] text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-[#f6f0fc] hover:text-[#733cd6]'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && <Check size={14} className="text-[#c4a1eb] shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
