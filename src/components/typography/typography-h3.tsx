import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function TypographyH3({ children, className }: Props) {
  return (
    <h3
      className={cn('scroll-m-20 text-lg font-[400] tracking-tight', className)}
    >
      {children}
    </h3>
  );
}
