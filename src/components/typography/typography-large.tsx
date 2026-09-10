import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

export function TypographyLarge({ children, className, muted }: Props) {
  return (
    <p
      className={cn(
        "text-base font-semibold",
        muted && "text-muted-foreground!",
        className,
      )}
    >
      {children}
    </p>
  );
}
