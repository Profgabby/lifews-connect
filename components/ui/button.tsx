import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-xl px-4 py-2 text-sm font-medium transition",
        variant === "primary" && "bg-primary text-white hover:opacity-90",
        variant === "secondary" && "bg-slate-100 text-slate-800 hover:bg-slate-200",
        className
      )}
      {...props}
    />
  );
}
