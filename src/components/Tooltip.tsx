import { ReactNode } from 'react';

interface TooltipProps {
  label: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

/** Lightweight CSS-only tooltip wrapper. Uses named group (group/tip) to avoid conflicts. */
export function Tooltip({ label, children, position = 'bottom', className = '' }: TooltipProps) {
  const isBottom = position === 'bottom';
  return (
    <div className={`relative group/tip inline-flex ${className}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2
          ${isBottom ? 'top-full mt-2' : 'bottom-full mb-2'}
          px-2.5 py-1.5 bg-gray-900/95 dark:bg-slate-700 text-white
          text-[10px] font-black uppercase tracking-widest rounded-lg
          whitespace-nowrap opacity-0 group-hover/tip:opacity-100
          transition-opacity duration-150 shadow-lg z-[9999]`}
      >
        {label}
        <span className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 dark:bg-slate-700 rotate-45 ${isBottom ? '-top-1' : '-bottom-1'}`} />
      </span>
    </div>
  );
}
