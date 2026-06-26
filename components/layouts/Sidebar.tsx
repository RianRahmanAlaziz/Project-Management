"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
    BarChart2,
    Bell,
    Briefcase,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
    FolderOpen,
    LayoutDashboard,
    Plus,
    SquareDashedKanban,
    Users,
    Zap,
} from "lucide-react";

import { Avatar, Tooltip } from "@/components/ui";
import { USERS } from "@/data/data";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

interface NavigationItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface WorkspaceItem {
    id: string;
    name: string;
    slug: string;
    color: string;
}

const NAV_ITEMS: NavigationItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Workspaces",
        href: "/workspaces",
        icon: Briefcase,
    },
    {
        label: "Projects",
        href: "/projects",
        icon: FolderOpen,
    },
    {
        label: "Kanban",
        href: "/kanban",
        icon: SquareDashedKanban,
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: CheckSquare,
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart2,
    },
    {
        label: "Members",
        href: "/members",
        icon: Users,
    },
    {
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
    },
];

const WORKSPACES: WorkspaceItem[] = [
    {
        id: "ws1",
        slug: "acme-corp",
        name: "Acme Corp",
        color: "bg-indigo-500",
    },
    {
        id: "ws2",
        slug: "design-hub",
        name: "Design Hub",
        color: "bg-violet-500",
    },
    {
        id: "ws3",
        slug: "growth-team",
        name: "Growth Team",
        color: "bg-emerald-500",
    },
];

const currentUser = USERS[0] ?? {
    name: "Alex Rivera",
    role: "Owner",
};

export function Sidebar({
    collapsed,
    onToggle,
}: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={`relative flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ${collapsed ? "w-20" : "w-72"
                }`}
        >
            {/* Logo */}

            <div
                className={`flex h-16 items-center border-b border-sidebar-border px-4 ${collapsed ? "justify-center" : "gap-3"
                    }`}
            >
                <Link
                    href="/dashboard"
                    className="flex min-w-0 items-center gap-3"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
                        <Zap
                            size={18}
                            className="text-primary-foreground"
                        />
                    </div>

                    {!collapsed && (
                        <span className="truncate text-lg font-bold text-sidebar-foreground">
                            ProjectFlow
                        </span>
                    )}
                </Link>
            </div>

            {/* Collapse */}

            <button
                onClick={onToggle}
                className="absolute -right-3 top-5 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-sidebar-border bg-sidebar shadow-sm"
            >
                {collapsed ? (
                    <ChevronRight size={15} />
                ) : (
                    <ChevronLeft size={15} />
                )}
            </button>

            {/* Navigation */}

            <nav className="flex-1 overflow-y-auto px-3 py-2">
                <div className="space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;

                        const active =
                            pathname === item.href ||
                            pathname.startsWith(item.href + "/");

                        const link = (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex h-10 items-center rounded-lg text-sm font-medium transition-colors ${active
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60"
                                    } ${collapsed
                                        ? "justify-center"
                                        : "gap-3 px-3"
                                    }`}
                            >
                                <Icon
                                    size={18}
                                    className={
                                        active ? "text-primary" : ""
                                    }
                                />

                                {!collapsed && (
                                    <span>{item.label}</span>
                                )}
                            </Link>
                        );

                        if (collapsed) {
                            return (
                                <Tooltip
                                    key={item.href}
                                    content={item.label}
                                >
                                    {link}
                                </Tooltip>
                            );
                        }

                        return link;
                    })}
                </div>

                {/* Workspace */}

                {!collapsed && (
                    <div className="mt-6">
                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                            Workspaces
                        </p>

                        <div className="space-y-1">
                            {WORKSPACES.map((workspace) => (
                                <Link
                                    key={workspace.id}
                                    href={`/workspaces/${workspace.slug}`}
                                    className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${pathname.startsWith(
                                        `/workspaces/${workspace.slug}`
                                    )
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60"
                                        }`}
                                >
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${workspace.color}`}
                                    />

                                    <span className="truncate">
                                        {workspace.name}
                                    </span>
                                </Link>
                            ))}

                            <button className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-sidebar-foreground/45 hover:bg-sidebar-accent/60">
                                <Plus size={16} />
                                <span>Add Workspace</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* User */}

            <div className="border-t border-sidebar-border p-3">
                <Link
                    href="/profile"
                    className={`flex min-h-12 items-center rounded-xl hover:bg-sidebar-accent/60 ${collapsed
                        ? "justify-center"
                        : "gap-3 px-2"
                        }`}
                >
                    <Avatar
                        name={currentUser.name}
                        size="md"
                    />

                    {!collapsed && (
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                                {currentUser.name}
                            </p>

                            <p className="truncate text-xs text-sidebar-foreground/50">
                                {currentUser.role}
                            </p>
                        </div>
                    )}
                </Link>
            </div>
        </aside>
    );
}