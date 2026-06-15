import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-water-400 focus-visible:ring-offset-2";

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-water-500 text-white hover:bg-water-600 shadow-sm shadow-water-500/30",
  secondary: "bg-navy-900 text-white hover:bg-navy-800",
  ghost: "text-navy-900 hover:bg-mist-100",
  white: "bg-white text-navy-900 hover:bg-water-50",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const isExternal = /^(tel:|mailto:|https?:|wa\.me)/.test(href) || href.startsWith("https://wa.me");

  if (isExternal) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
