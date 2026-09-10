import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

export function TypographyH6({ children, className, muted }: Props) {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-lg font-medium tracking-tight",
        muted && "text-muted-foreground!",
        className,
      )}
    >
      {children}
    </h5>
  );
}
