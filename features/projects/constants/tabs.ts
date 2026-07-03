import {
    Activity,
    CalendarDays,
    LayoutDashboard,
    ListTodo,
    Users,
} from "lucide-react";

export const PROJECT_TABS = [
    {
        key: "overview",
        label: "Overview",
        icon: LayoutDashboard,
    },
    {
        key: "tasks",
        label: "Tasks",
        icon: ListTodo,
    },
    {
        key: "timeline",
        label: "Timeline",
        icon: CalendarDays,
    },
    {
        key: "members",
        label: "Members",
        icon: Users,
    },
    {
        key: "activity",
        label: "Activity",
        icon: Activity,
    },
] as const;

export type ProjectTab = typeof PROJECT_TABS[number]["key"];