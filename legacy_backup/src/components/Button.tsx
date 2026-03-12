import { ReactNode } from 'react';
import { Link as ScrollLink } from 'react-scroll';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  className?: string;
  download?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  download = false,
  onClick,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };
  
  const iconOnly = !children && icon;
  
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={children ? 'mr-2' : ''}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={children ? 'ml-2' : ''}>
          {icon}
        </span>
      )}
    </>
  );
  
  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${iconOnly ? 'p-2' : ''} ${className}`;
  
  if (to) {
    return (
      <ScrollLink
        to={to}
        smooth={true}
        duration={500}
        className={`cursor-pointer ${buttonClasses}`}
        onClick={onClick}
      >
        {buttonContent}
      </ScrollLink>
    );
  }
  
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        download={download}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {buttonContent}
      </a>
    );
  }
  
  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
}
