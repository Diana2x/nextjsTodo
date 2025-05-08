import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  type = 'button',
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-pink-500 hover:bg-pink-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-300',
    danger: 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-300',
  };
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={buttonStyles}
    >
      {children}
    </button>
  );
};

export default Button;
