import React from 'react';
import Icon from './Icon';
import type { IconType } from './Icon';

// 按钮变体
type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';

// 按钮尺寸
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  isFullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  isFullWidth = false,
  disabled = false,
  className = '',
  onClick,
}) => {
  // 根据变体获取基础类名
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-neo-primary text-neo-dark hover:shadow-neo-glow';
      case 'secondary':
        return 'bg-neo-secondary text-neo-light hover:shadow-neo-glow';
      case 'accent':
        return 'bg-neo-accent text-neo-light hover:shadow-neo-accent-glow';
      case 'outline':
        return 'bg-transparent border-2 border-neo-primary text-neo-primary hover:bg-neo-primary hover:text-neo-dark';
      case 'ghost':
        return 'bg-transparent text-neo-light hover:bg-neo-primary/10';
      default:
        return 'bg-neo-primary text-neo-dark hover:shadow-neo-glow';
    }
  };
  
  // 根据尺寸获取类名
  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return 'px-2 py-1 text-xs';
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-6 py-2';
      case 'lg':
        return 'px-8 py-3 text-lg';
      default:
        return 'px-6 py-2';
    }
  };
  
  // 按钮基础类名
  const baseClass = 'inline-flex items-center justify-center rounded-md transition-all duration-300 font-medium focus:outline-none';
  
  // 组合所有类名
  const buttonClass = `
    ${baseClass}
    ${getVariantClass()}
    ${getSizeClass()}
    ${isFullWidth ? 'w-full' : ''}
    ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;
  
  // 图标尺寸映射
  const iconSizeMap = {
    'xs': 'xs',
    'sm': 'sm',
    'md': 'sm',
    'lg': 'md',
  } as const;
  
  // 渲染加载指示器
  const renderLoader = () => (
    <svg 
      className={`animate-spin ${iconPosition === 'left' ? '-ml-1 mr-2' : '-mr-1 ml-2'} h-4 w-4`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          {iconPosition === 'left' && renderLoader()}
          {children}
          {iconPosition === 'right' && renderLoader()}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon 
              type={icon} 
              size={iconSizeMap[size]} 
              className={children ? 'mr-2' : ''} 
            />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <Icon 
              type={icon} 
              size={iconSizeMap[size]} 
              className={children ? 'ml-2' : ''} 
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button; 