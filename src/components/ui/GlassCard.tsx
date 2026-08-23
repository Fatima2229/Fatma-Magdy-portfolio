import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  dark?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  dark = false,
  onClick,
}) => {
  const baseClasses = dark
    ? 'bg-[#0f172a] text-white border border-slate-800 shadow-lg'
    : 'bg-white/90 text-[#0f172a] border border-slate-200/70 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] backdrop-blur-md';

  const hoverClasses = hoverEffect ? 'glass-panel-hover' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 sm:p-7 relative transition-all duration-300 ${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
    >
      {children}
    </div>
  );
};
