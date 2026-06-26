"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Bell,
    ChevronRight,
    Moon,
    Search,
    Sun,
} from "lucide-react";

import { Avatar } from "@/components/ui";
import {
    NOTIFICATIONS,
    USERS,
} from "@/data/data";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface TopNavProps {
    darkMode: boolean;
    onToggleDark: () => void;
}

const RECENT_SEARCHES = [
    "ProjectFlow v2.0",
    "Kanban board",
    "Database schema",
];

function toTitleCase(text: string) {
    return text
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function TopNav({
    darkMode,
    onToggleDark,
}: TopNavProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [showSearch, setShowSearch] = useState(false);

    const unreadNotifications =
        NOTIFICATIONS.filter((item) => !item.read).length;

    const currentUser = USERS[0] ?? {
        name: "Alex Rivera",
        role: "Owner",
    };

    const segments = pathname
        .split("/")
        .filter(Boolean);

    const breadcrumbs = segments.map((segment, index) => ({
        label: toTitleCase(segment),
        href:
            "/" +
            segments
                .slice(0, index + 1)
                .join("/"),
    }));

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setShowSearch(false);
            }

            if (
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault();
                setShowSearch(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
    }, []);
    console.log("DashboardShell", breadcrumbs);
    return (
        <>
            <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-5 lg:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex min-w-0 items-center text-sm"
                    >
                        {breadcrumbs.map((item, index) => {
                            const isLast =
                                index === breadcrumbs.length - 1;

                            return (
                                <div
                                    key={item.href}
                                    className="flex items-center"
                                >
                                    {index > 0 && (
                                        <span className="mx-2 text-muted-foreground/40">
                                            /
                                        </span>
                                    )}

                                    {isLast ? (
                                        <span className="font-semibold text-foreground">
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-2">

                    <button
                        onClick={() => setShowSearch(true)}
                        className="cursor-pointer flex h-10 items-center gap-2 rounded-lg bg-muted/60 px-3 text-sm text-muted-foreground hover:bg-muted"
                    >
                        <Search size={17} />

                        <span className="hidden md:block">
                            Search...
                        </span>

                        <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 text-[11px] md:block">
                            ⌘K
                        </kbd>
                    </button>

                    <button
                        onClick={onToggleDark}
                        className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted cursor-pointer"
                    >
                        {darkMode ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    <button
                        onClick={() =>
                            router.push("/notifications")
                        }
                        className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted cursor-pointer"
                    >
                        <Bell size={18} />

                        {unreadNotifications > 0 && (

                            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">

                                {unreadNotifications > 9
                                    ? "9+"
                                    : unreadNotifications}

                            </span>

                        )}
                    </button>

                    {/* Profile */}

                    <button
                        onClick={() =>
                            router.push("/profile")
                        }
                        className="flex h-10 items-center gap-2 rounded-lg px-1 hover:bg-muted cursor-pointer"
                    >
                        <Avatar
                            name={currentUser.name}
                            size="md"
                        />

                        <div className="hidden xl:block text-left">

                            <p className="max-w-28 truncate text-sm font-semibold">
                                {currentUser.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {currentUser.role}
                            </p>

                        </div>

                    </button>

                </div>

            </header>

            {/* Search Dialog */}

            {showSearch && (

                <div
                    onClick={() => setShowSearch(false)}
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
                    >

                        <div className="flex h-14 items-center gap-3 border-b border-border px-4">

                            <Search
                                size={18}
                                className="text-muted-foreground"
                            />

                            <input
                                autoFocus
                                type="search"
                                placeholder="Search projects, tasks..."
                                className="flex-1 bg-transparent outline-none"
                            />

                            <kbd className="rounded border border-border bg-muted px-2 py-1 text-xs">
                                Esc
                            </kbd>

                        </div>

                        <div className="p-3">

                            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Recent searches
                            </p>

                            {RECENT_SEARCHES.map((item) => (

                                <button
                                    key={item}
                                    className="flex h-11 w-full items-center gap-3 rounded-lg px-3 hover:bg-muted"
                                >

                                    <Search
                                        size={15}
                                        className="text-muted-foreground"
                                    />

                                    <span>{item}</span>

                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}