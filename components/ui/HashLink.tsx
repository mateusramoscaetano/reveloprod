"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { scrollToHash } from "@/lib/lenis";

type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  hash: string;
  children: ReactNode;
};

export function HashLink({ hash, onClick, children, ...props }: HashLinkProps) {
  const pathname = usePathname();
  const href = pathname === "/" ? hash : `/${hash}`;

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (pathname !== "/") return;

        e.preventDefault();
        if (scrollToHash(hash)) {
          window.history.pushState(null, "", hash);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
