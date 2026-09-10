import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  medium?: boolean;
  muted?: boolean;
  leading?: boolean;
  xs?: boolean;
};

export function TypographySmall({
  children,
  className,
  muted,
  medium,
  leading,
  xs,
}: Props) {
  return (
    <small
      className={cn(
        'text-sm leading-none font-normal',
        muted && 'text-muted-foreground',
        medium && 'font-medium',
        leading && 'leading-5',
        xs && 'text-xs!',
        className,
      )}
    >
      {children}
    </small>
  );
}
