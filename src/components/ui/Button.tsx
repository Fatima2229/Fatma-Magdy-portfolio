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
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#f472b6]/50 shadow-sm cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 shadow-md',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#131d38] text-white hover:bg-[#1e2b4f] hover:shadow-lg hover:shadow-[#131d38]/20 border border-[#131d38]',
    secondary:
      'bg-white text-[#131d38] hover:bg-[#fdf2f8] hover:text-[#db2777] border border-slate-200/80 hover:border-[#f472b6]/40 hover:shadow-md',
    'soft-pink':
      'bg-[#fdf2f8] text-[#db2777] hover:bg-[#fce7f3] hover:text-[#be185d] border border-[#fbcfe8]',
    outline:
      'bg-transparent text-[#131d38] hover:bg-white/80 border border-[#131d38]/30 hover:border-[#131d38] hover:shadow-sm',
    ghost:
      'bg-transparent text-[#131d38] hover:bg-[#fdf2f8] hover:text-[#db2777] border border-transparent shadow-none',
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
