import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md min-h-dvh container mx-auto flex flex-col items-center justify-center">
      <main>{children}</main>
    </div>
  );
}
