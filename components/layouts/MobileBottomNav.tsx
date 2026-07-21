"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "./navigation";

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="flex shrink-0 border-t border-border bg-card md:hidden">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors ${active
                            ? "text-primary"
                            : "text-muted-foreground"
                            }`}
                    >
                        <Icon
                            size={20}
                            strokeWidth={active ? 2.5 : 2}
                        />

                        <span className="max-w-full truncate px-1 text-[11px] font-medium">
                            {item.mobileLabel ?? item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}