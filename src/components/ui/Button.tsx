import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft-pink';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  as = 'button',
  href,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8c52ff]/40 shadow-sm cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 shadow-md',
  }[size];

  // RATIONALE: Updated palette with exact logo Midnight Navy (#0e1a36) and Regal Lavender/Purple (#8c52ff)
  const variantStyles = {
    primary:
      'bg-[#0e1a36] text-white hover:bg-[#162447] hover:shadow-lg hover:shadow-[#0e1a36]/25 border border-[#0e1a36]',
    secondary:
      'bg-white text-[#0e1a36] hover:bg-[#f6f0fc] hover:text-[#8c52ff] border border-slate-200/80 hover:border-[#8c52ff]/40 hover:shadow-md',
    'soft-pink':
      'bg-[#f6f0fc] text-[#733cd6] hover:bg-[#eedcfc] hover:text-[#5b2b99] border border-[#e2d2f7]',
    outline:
      'bg-transparent text-[#0e1a36] hover:bg-white/80 border border-[#0e1a36]/30 hover:border-[#0e1a36] hover:shadow-sm',
    ghost:
      'bg-transparent text-[#0e1a36] hover:bg-[#f6f0fc] hover:text-[#8c52ff] border border-transparent shadow-none',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-block transition-transform group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-block transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        className={`group ${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`group ${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
