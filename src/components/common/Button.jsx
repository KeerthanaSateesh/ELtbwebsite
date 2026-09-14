import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component supporting both <button> and React Router <Link>
 * 
 * @param {string} to - Optional path for router Link
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'outline-primary' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} disabled - Disable button
 * @param {string} className - Extra CSS classes
 * @param {React.ReactNode} children - Content
 */
export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  onClick,
  type = 'button',
  ...props
}) {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass = `btn-${variant}`;
  const combinedClasses = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
