import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'flat' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = ({
  variant = 'flat',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) => {
  const baseStyles = 'rounded-[1rem] border transition-all duration-300 overflow-hidden';
  
  const variantStyles = {
    flat: 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800',
    glass: 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-white/20 dark:border-slate-800/50 shadow-2xl',
    elevated: 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-none',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
