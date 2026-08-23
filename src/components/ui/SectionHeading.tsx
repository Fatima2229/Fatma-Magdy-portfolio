import React from 'react';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentStyles = {
    left: 'text-start items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-end items-end ms-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-12 md:mb-14 ${alignmentStyles} ${className}`}>
      {/* Refined Minimalist Badge */}
      <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#f6f0fc] text-[#733cd6] text-[11px] font-bold tracking-wider uppercase mb-3 border border-[#e6d8f8]">
        {badge}
      </span>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0e1a36] font-editorial leading-tight mb-3">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs sm:text-sm md:text-base text-slate-500 font-normal leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
