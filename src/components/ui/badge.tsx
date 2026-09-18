import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-cyan-800 bg-cyan-950/50 text-cyan-300',
        secondary: 'border-gray-700 bg-gray-800/50 text-gray-300',
        destructive: 'border-red-800 bg-red-950/50 text-red-300',
        outline: 'border-gray-600 text-gray-400',
        success: 'border-emerald-800 bg-emerald-950/50 text-emerald-300',
        amber: 'border-amber-800 bg-amber-950/50 text-amber-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
