import type { LucideIcon } from "lucide-react";

import {
    BarChart2,
    Bell,
    Briefcase,
    LayoutDashboard,
    ListTodo,
} from "lucide-react";

export interface NavigationItem {
    label: string;
    mobileLabel?: string;
    href: string;
    icon: LucideIcon;
}

export const NAV_ITEMS: NavigationItem[] = [
    {
        label: "Dashboard",
        mobileLabel: "Home",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Workspaces",
        mobileLabel: "Workspace",
        href: "/workspaces",
        icon: Briefcase,
    },
    {
        label: "My Tasks",
        mobileLabel: "Tasks",
        href: "/tasks",
        icon: ListTodo,
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart2,
    },
    {
        label: "Notifications",
        mobileLabel: "Alerts",
        href: "/notifications",
        icon: Bell,
    },
];