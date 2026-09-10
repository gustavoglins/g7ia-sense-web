import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TypographyH4({ children, className }: Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-2xl font-medium tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
}
