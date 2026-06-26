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
    currentPage: string;
    onToggle: () => void;
    onNavigate: (page: string) => void;
}

interface NavigationItem {
    id: string;
    label: string;
    icon: LucideIcon;
}

interface WorkspaceItem {
    id: string;
    name: string;
    color: string;
}

const NAV_ITEMS: NavigationItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        id: "workspaces",
        label: "Workspaces",
        icon: Briefcase,
    },
    {
        id: "projects",
        label: "Projects",
        icon: FolderOpen,
    },
    {
        id: "kanban",
        label: "Kanban Board",
        icon: SquareDashedKanban,
    },
    {
        id: "tasks",
        label: "My Tasks",
        icon: CheckSquare,
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: BarChart2,
    },
    {
        id: "members",
        label: "Members",
        icon: Users,
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
    },
];

const WORKSPACES: WorkspaceItem[] = [
    {
        id: "ws1",
        name: "Acme Corp",
        color: "bg-indigo-500",
    },
    {
        id: "ws2",
        name: "Design Hub",
        color: "bg-violet-500",
    },
    {
        id: "ws3",
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
    currentPage,
    onToggle,
    onNavigate,
}: SidebarProps) {
    return (
        <aside
            className={`relative flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-in-out ${collapsed ? "w-20" : "w-72"
                }`}
        >
            {/* Logo */}
            <div
                className={`flex h-16 shrink-0 items-center border-b border-sidebar-border px-4 ${collapsed ? "justify-center" : "gap-3"
                    }`}
            >
                <button
                    type="button"
                    onClick={() => onNavigate("dashboard")}
                    aria-label="Go to dashboard"
                    className="flex min-w-0 items-center gap-3"
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
                        <Zap size={18} className="text-primary-foreground" />
                    </div>

                    {!collapsed && (
                        <span className="truncate text-lg font-bold tracking-tight text-sidebar-foreground">
                            ProjectFlow
                        </span>
                    )}
                </button>
            </div>

            {/* Collapse button */}
            <button
                type="button"
                onClick={onToggle}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="cursor-pointer absolute -right-3 top-5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground/60 shadow-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
                {collapsed ? (
                    <ChevronRight size={15} />
                ) : (
                    <ChevronLeft size={15} />
                )}
            </button>

            {/* Main navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-2">
                <div className="space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = currentPage === item.id;

                        const navigationButton = (
                            <button
                                type="button"
                                onClick={() => onNavigate(item.id)}
                                aria-current={active ? "page" : undefined}
                                className={`cursor-pointer flex h-10 w-full items-center rounded-lg text-m font-medium transition-colors ${active
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                                    } ${collapsed
                                        ? "justify-center px-0"
                                        : "gap-3 px-3"
                                    }`}
                            >
                                <Icon
                                    size={18}
                                    className={`shrink-0 ${active ? "text-primary" : ""
                                        }`}
                                />

                                {!collapsed && (
                                    <span className="truncate">{item.label}</span>
                                )}
                            </button>
                        );

                        if (collapsed) {
                            return (
                                <Tooltip key={item.id} content={item.label}>
                                    {navigationButton}
                                </Tooltip>
                            );
                        }

                        return (
                            <div key={item.id}>
                                {navigationButton}
                            </div>
                        );
                    })}
                </div>

                {!collapsed && (
                    <div className="mt-6">
                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                            Workspaces
                        </p>

                        <div className="space-y-1">
                            {WORKSPACES.map((workspace) => (
                                <button
                                    key={workspace.id}
                                    type="button"
                                    onClick={() => onNavigate("workspaces")}
                                    className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                                >
                                    <span
                                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${workspace.color}`}
                                    />

                                    <span className="truncate">
                                        {workspace.name}
                                    </span>
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => onNavigate("workspaces")}
                                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-sidebar-foreground/45 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                            >
                                <Plus size={16} />
                                <span>Add workspace</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Current user */}
            <div className="shrink-0 border-t border-sidebar-border p-3">
                <button
                    type="button"
                    onClick={() => onNavigate("profile")}
                    className={`flex min-h-12 w-full items-center rounded-xl transition-colors hover:bg-sidebar-accent/60 ${collapsed
                        ? "justify-center px-0"
                        : "gap-3 px-2"
                        }`}
                >
                    <Avatar name={currentUser.name} size="md" />

                    {!collapsed && (
                        <div className="min-w-0 flex-1 text-left">
                            <p className="truncate text-sm font-semibold text-sidebar-foreground">
                                {currentUser.name}
                            </p>

                            <p className="truncate text-xs text-sidebar-foreground/50">
                                {currentUser.role}
                            </p>
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}