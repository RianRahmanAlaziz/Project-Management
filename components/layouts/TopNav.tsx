"use client";

import { useEffect, useState } from "react";
import {
    Bell,
    Moon,
    Plus,
    Search,
    Sun,
} from "lucide-react";

import { Avatar, Button } from "@/components/ui";
import {
    NOTIFICATIONS,
    USERS,
} from "@/data/data";

interface TopNavProps {
    title: string;
    breadcrumbs?: string[];
    darkMode: boolean;
    onToggleDark: () => void;
    onNavigate: (page: string) => void;
}

const RECENT_SEARCHES = [
    "ProjectFlow v2.0",
    "Kanban board",
    "Database schema",
];

export function TopNav({
    title,
    breadcrumbs,
    darkMode,
    onToggleDark,
    onNavigate,
}: TopNavProps) {
    const [showSearch, setShowSearch] = useState(false);

    const unreadNotifications = NOTIFICATIONS.filter(
        (notification) => !notification.read,
    ).length;

    const currentUser = USERS[0] ?? {
        name: "Alex Rivera",
        role: "Owner",
    };

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

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-5 lg:px-6">
                {/* Breadcrumb */}
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    {breadcrumbs?.length ? (
                        <nav
                            aria-label="Breadcrumb"
                            className="flex min-w-0 items-center gap-2"
                        >
                            {breadcrumbs.map((breadcrumb, index) => {
                                const isLast =
                                    index === breadcrumbs.length - 1;

                                return (
                                    <div
                                        key={`${breadcrumb}-${index}`}
                                        className="flex min-w-0 items-center gap-2"
                                    >
                                        {index > 0 && (
                                            <span className="text-sm text-muted-foreground/50">
                                                /
                                            </span>
                                        )}

                                        <span
                                            className={`truncate text-sm ${isLast
                                                ? "font-semibold text-foreground"
                                                : "text-muted-foreground"
                                                }`}
                                        >
                                            {breadcrumb}
                                        </span>
                                    </div>
                                );
                            })}
                        </nav>
                    ) : (
                        <h1 className="truncate text-lg font-semibold text-foreground">
                            {title}
                        </h1>
                    )}
                </div>

                {/* Topbar actions */}
                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowSearch(true)}
                        aria-label="Open search"
                        className="flex h-10 items-center gap-2 rounded-lg bg-muted/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                    >
                        <Search size={17} />

                        <span className="hidden md:inline">
                            Search...
                        </span>

                        <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 text-[11px] md:inline">
                            ⌘K
                        </kbd>
                    </button>

                    <button
                        type="button"
                        onClick={onToggleDark}
                        aria-label={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                    >
                        {darkMode ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => onNavigate("notifications")}
                        aria-label={`Notifications, ${unreadNotifications} unread`}
                        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                    >
                        <Bell size={18} />

                        {unreadNotifications > 0 && (
                            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground">
                                {unreadNotifications > 9
                                    ? "9+"
                                    : unreadNotifications}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => onNavigate("profile")}
                        aria-label="Open profile"
                        className="flex h-10 items-center gap-2 rounded-lg pl-1 pr-2 transition-colors hover:bg-muted cursor-pointer"
                    >
                        <Avatar name={currentUser.name} size="md" />

                        <div className="hidden min-w-0 text-left xl:block">
                            <p className="max-w-28 truncate text-sm font-semibold text-foreground">
                                {currentUser.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {currentUser.role}
                            </p>
                        </div>
                    </button>
                </div>
            </header>

            {/* Search dialog */}
            {showSearch && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Global search"
                    onClick={() => setShowSearch(false)}
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
                >
                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                    >
                        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
                            <Search
                                size={19}
                                className="shrink-0 text-muted-foreground"
                            />

                            <input
                                autoFocus
                                type="search"
                                placeholder="Search tasks, projects, workspaces..."
                                className="h-full min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                            />

                            <kbd className="rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground">
                                Esc
                            </kbd>
                        </div>

                        <div className="p-3">
                            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Recent searches
                            </p>

                            <div className="space-y-1">
                                {RECENT_SEARCHES.map((searchItem) => (
                                    <button
                                        key={searchItem}
                                        type="button"
                                        className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-foreground transition-colors hover:bg-muted"
                                    >
                                        <Search
                                            size={16}
                                            className="shrink-0 text-muted-foreground"
                                        />

                                        <span className="truncate">
                                            {searchItem}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}