import { cn } from 'cn';

type StatusDotProps = {
  className?: string;
  label?: string;
};

export function StatusDot({
  className,
  label = 'Status ativo',
}: StatusDotProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn('relative inline-flex size-2 shrink-0', className)}
    >
      <span
        aria-hidden="true"
        className="absolute inline-flex size-full animate-ping rounded-full bg-primary/75 motion-reduce:animate-none"
      />
      <span
        aria-hidden="true"
        className="relative inline-flex size-2 rounded-full bg-primary ring-2 ring-primary/20"
      />
    </span>
  );
}
