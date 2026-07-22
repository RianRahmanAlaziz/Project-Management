export const ROLE_STYLES: Record<string, string> = {
    Owner:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",

    Admin:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",

    Member:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",

    Viewer:
        "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

export const DEFAULT_ROLE_STYLE =
    "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";


export const WORKSPACE_COLORS = [
    {
        label: "Indigo",
        bg: "bg-indigo-500",
        ring: "ring-indigo-500",
        hex: "#4F46E5",
    },
    {
        label: "Violet",
        bg: "bg-violet-500",
        ring: "ring-violet-500",
        hex: "#7C3AED",
    },
    {
        label: "Blue",
        bg: "bg-blue-500",
        ring: "ring-blue-500",
        hex: "#3B82F6",
    },
    {
        label: "Emerald",
        bg: "bg-emerald-500",
        ring: "ring-emerald-500",
        hex: "#10B981",
    },
    {
        label: "Rose",
        bg: "bg-rose-500",
        ring: "ring-rose-500",
        hex: "#F43F5E",
    },
    {
        label: "Amber",
        bg: "bg-amber-500",
        ring: "ring-amber-500",
        hex: "#F59E0B",
    },
    {
        label: "Cyan",
        bg: "bg-cyan-500",
        ring: "ring-cyan-500",
        hex: "#06B6D4",
    },
    {
        label: "Fuchsia",
        bg: "bg-fuchsia-500",
        ring: "ring-fuchsia-500",
        hex: "#D946EF",
    },
] as const;

export type WorkspaceColor =
    (typeof WORKSPACE_COLORS)[number];