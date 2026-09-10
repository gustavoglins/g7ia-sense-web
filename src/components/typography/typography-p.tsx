import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  medium?: boolean;
};

export function TypographyP({ children, className, muted, medium }: Props) {
  return (
    <p
      className={cn(
        "text-base leading-6",
        muted && "text-muted-foreground!",
        medium && "font-medium!",
        className,
      )}
    >
      {children}
    </p>
  );
}
