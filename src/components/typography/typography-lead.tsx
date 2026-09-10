import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TypographyLead({ children, className }: Props) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}
