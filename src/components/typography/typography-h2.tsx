import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function TypographyH2({ children, className }: Props) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-[400] tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  );
}
