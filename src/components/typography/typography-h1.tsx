import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TypographyH1({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-6xl font-semibold tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h1>
  );
}
