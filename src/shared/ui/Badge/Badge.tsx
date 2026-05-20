import React from 'react';

type BadgeColor = 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet' | 'slate';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  variant?: 'subtle' | 'solid' | 'outline';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  color = 'indigo',
  variant = 'subtle',
  icon,
  className = '',
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all';
  
  const colorStyles: Record<BadgeColor, string> = {
    indigo: variant === 'subtle' 
      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800' 
      : 'bg-indigo-600 text-white border-indigo-600',
    emerald: variant === 'subtle' 
      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' 
      : 'bg-emerald-600 text-white border-emerald-600',
    amber: variant === 'subtle' 
      ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800' 
      : 'bg-amber-600 text-white border-amber-600',
    rose: variant === 'subtle' 
      ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800' 
      : 'bg-rose-600 text-white border-rose-600',
    sky: variant === 'subtle' 
      ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-800' 
      : 'bg-sky-600 text-white border-sky-600',
    violet: variant === 'subtle' 
      ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-800' 
      : 'bg-violet-600 text-white border-violet-600',
    slate: variant === 'subtle' 
      ? 'bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-gray-100 dark:border-slate-700' 
      : 'bg-gray-600 text-white border-gray-600',
  };

  const outlineStyles = variant === 'outline' ? 'bg-transparent' : '';

  return (
    <span className={`${baseStyles} ${colorStyles[color]} ${outlineStyles} ${className}`}>
      {icon}
      {children}
    </span>
  );
};
