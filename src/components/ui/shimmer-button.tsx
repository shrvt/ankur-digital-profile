import * as React from 'react';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  children: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, shimmerColor = '#ffffff', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'group relative flex items-center justify-center overflow-hidden rounded-lg bg-primary px-4 py-2 transition-all duration-300',
          'hover:bg-primary/90 active:scale-95',
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="relative flex items-center gap-2">{children}</div>
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${shimmerColor}20, transparent)`,
          }}
        />
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';

export { ShimmerButton };
