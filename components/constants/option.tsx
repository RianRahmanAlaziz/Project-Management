export const COLORS = [
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
        label: "Purple",
        bg: "bg-purple-500",
        ring: "ring-purple-500",
        hex: "#A855F7",
    },
    {
        label: "Fuchsia",
        bg: "bg-fuchsia-500",
        ring: "ring-fuchsia-500",
        hex: "#D946EF",
    },
    {
        label: "Pink",
        bg: "bg-pink-500",
        ring: "ring-pink-500",
        hex: "#EC4899",
    },
    {
        label: "Rose",
        bg: "bg-rose-500",
        ring: "ring-rose-500",
        hex: "#F43F5E",
    },
    {
        label: "Red",
        bg: "bg-red-500",
        ring: "ring-red-500",
        hex: "#EF4444",
    },
    {
        label: "Orange",
        bg: "bg-orange-500",
        ring: "ring-orange-500",
        hex: "#F97316",
    },
    {
        label: "Amber",
        bg: "bg-amber-500",
        ring: "ring-amber-500",
        hex: "#F59E0B",
    },
    {
        label: "Yellow",
        bg: "bg-yellow-500",
        ring: "ring-yellow-500",
        hex: "#EAB308",
    },
    {
        label: "Lime",
        bg: "bg-lime-500",
        ring: "ring-lime-500",
        hex: "#84CC16",
    },
    {
        label: "Green",
        bg: "bg-green-500",
        ring: "ring-green-500",
        hex: "#22C55E",
    },
    {
        label: "Emerald",
        bg: "bg-emerald-500",
        ring: "ring-emerald-500",
        hex: "#10B981",
    },
    {
        label: "Teal",
        bg: "bg-teal-500",
        ring: "ring-teal-500",
        hex: "#14B8A6",
    },
    {
        label: "Cyan",
        bg: "bg-cyan-500",
        ring: "ring-cyan-500",
        hex: "#06B6D4",
    },
    {
        label: "Sky",
        bg: "bg-sky-500",
        ring: "ring-sky-500",
        hex: "#0EA5E9",
    },
    {
        label: "Blue",
        bg: "bg-blue-500",
        ring: "ring-blue-500",
        hex: "#3B82F6",
    },
    {
        label: "Slate",
        bg: "bg-slate-500",
        ring: "ring-slate-500",
        hex: "#64748B",
    },
] as const;
export type Color = (typeof COLORS)[number];

export const priorityOptions = [
    {
        value: "low",
        label: "Low",
        description: "Low priority",
        icon: (
            <span className="h-2 w-2 rounded-full bg-green-500" />
        ),
    },
    {
        value: "medium",
        label: "Medium",
        description: "Normal priority",
        icon: (
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
        ),
    },
    {
        value: "high",
        label: "High",
        description: "High priority",
        icon: (
            <span className="h-2 w-2 rounded-full bg-red-500" />
        ),
    },
];

export const statusOptions = [
    {
        value: "backlog",
        label: "Backlog",
        description: "Not started yet",
        icon: (
            <span className="h-2 w-2 rounded-full bg-slate-400" />
        ),
    },
    {
        value: "todo",
        label: "Todo",
        description: "Ready to start",
        icon: (
            <span className="h-2 w-2 rounded-full bg-blue-500" />
        ),
    },
    {
        value: "in-progress",
        label: "In Progress",
        description: "Currently working",
        icon: (
            <span className="h-2 w-2 rounded-full bg-amber-500" />
        ),
    },
    {
        value: "review",
        label: "Review",
        description: "Waiting for review",
        icon: (
            <span className="h-2 w-2 rounded-full bg-purple-500" />
        ),
    },
    {
        value: "done",
        label: "Done",
        description: "Completed",
        icon: (
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
        ),
    },
];