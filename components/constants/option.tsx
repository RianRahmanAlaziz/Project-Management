export const COLORS = [
    {
        value: "gray",
        label: "Gray",
        bg: "bg-gray-500",
        ring: "ring-gray-500",
        hex: "#6B7280",
    },
    {
        value: "indigo",
        label: "Indigo",
        bg: "bg-indigo-500",
        ring: "ring-indigo-500",
        hex: "#4F46E5",
    },
    {
        value: "violet",
        label: "Violet",
        bg: "bg-violet-500",
        ring: "ring-violet-500",
        hex: "#7C3AED",
    },
    {
        value: "purple",
        label: "Purple",
        bg: "bg-purple-500",
        ring: "ring-purple-500",
        hex: "#A855F7",
    },
    {
        value: "fuchsia",
        label: "Fuchsia",
        bg: "bg-fuchsia-500",
        ring: "ring-fuchsia-500",
        hex: "#D946EF",
    },
    {
        value: "pink",
        label: "Pink",
        bg: "bg-pink-500",
        ring: "ring-pink-500",
        hex: "#EC4899",
    },
    {
        value: "rose",
        label: "Rose",
        bg: "bg-rose-500",
        ring: "ring-rose-500",
        hex: "#F43F5E",
    },
    {
        value: "red",
        label: "Red",
        bg: "bg-red-500",
        ring: "ring-red-500",
        hex: "#EF4444",
    },
    {
        value: "orange",
        label: "Orange",
        bg: "bg-orange-500",
        ring: "ring-orange-500",
        hex: "#F97316",
    },
    {
        value: "amber",
        label: "Amber",
        bg: "bg-amber-500",
        ring: "ring-amber-500",
        hex: "#F59E0B",
    },
    {
        value: "yellow",
        label: "Yellow",
        bg: "bg-yellow-500",
        ring: "ring-yellow-500",
        hex: "#EAB308",
    },
    {
        value: "lime",
        label: "Lime",
        bg: "bg-lime-500",
        ring: "ring-lime-500",
        hex: "#84CC16",
    },
    {
        value: "green",
        label: "Green",
        bg: "bg-green-500",
        ring: "ring-green-500",
        hex: "#22C55E",
    },
    {
        value: "emerald",
        label: "Emerald",
        bg: "bg-emerald-500",
        ring: "ring-emerald-500",
        hex: "#10B981",
    },
    {
        value: "teal",
        label: "Teal",
        bg: "bg-teal-500",
        ring: "ring-teal-500",
        hex: "#14B8A6",
    },
    {
        value: "cyan",
        label: "Cyan",
        bg: "bg-cyan-500",
        ring: "ring-cyan-500",
        hex: "#06B6D4",
    },
    {
        value: "sky",
        label: "Sky",
        bg: "bg-sky-500",
        ring: "ring-sky-500",
        hex: "#0EA5E9",
    },
    {
        value: "blue",
        label: "Blue",
        bg: "bg-blue-500",
        ring: "ring-blue-500",
        hex: "#3B82F6",
    },
    {
        value: "slate",
        label: "Slate",
        bg: "bg-slate-500",
        ring: "ring-slate-500",
        hex: "#64748B",
    },
] as const;
export type Color = (typeof COLORS)[number];

export const BADGE_COLORS = {
    gray: {
        bg: "bg-gray-500/15",
        text: "text-gray-400",
        dot: "bg-gray-400",
    },
    indigo: {
        bg: "bg-indigo-500/15",
        text: "text-indigo-400",
        dot: "bg-indigo-400",
    },
    violet: {
        bg: "bg-violet-500/15",
        text: "text-violet-400",
        dot: "bg-violet-400",
    },
    purple: {
        bg: "bg-purple-500/15",
        text: "text-purple-400",
        dot: "bg-purple-400",
    },
    fuchsia: {
        bg: "bg-fuchsia-500/15",
        text: "text-fuchsia-400",
        dot: "bg-fuchsia-400",
    },
    pink: {
        bg: "bg-pink-500/15",
        text: "text-pink-400",
        dot: "bg-pink-400",
    },
    rose: {
        bg: "bg-rose-500/15",
        text: "text-rose-400",
        dot: "bg-rose-400",
    },
    red: {
        bg: "bg-red-500/15",
        text: "text-red-400",
        dot: "bg-red-400",
    },
    orange: {
        bg: "bg-orange-500/15",
        text: "text-orange-400",
        dot: "bg-orange-400",
    },
    amber: {
        bg: "bg-amber-500/15",
        text: "text-amber-400",
        dot: "bg-amber-400",
    },
    yellow: {
        bg: "bg-yellow-500/15",
        text: "text-yellow-400",
        dot: "bg-yellow-400",
    },
    lime: {
        bg: "bg-lime-500/15",
        text: "text-lime-400",
        dot: "bg-lime-400",
    },
    green: {
        bg: "bg-green-500/15",
        text: "text-green-400",
        dot: "bg-green-400",
    },
    emerald: {
        bg: "bg-emerald-500/15",
        text: "text-emerald-400",
        dot: "bg-emerald-400",
    },
    teal: {
        bg: "bg-teal-500/15",
        text: "text-teal-400",
        dot: "bg-teal-400",
    },
    cyan: {
        bg: "bg-cyan-500/15",
        text: "text-cyan-400",
        dot: "bg-cyan-400",
    },
    sky: {
        bg: "bg-sky-500/15",
        text: "text-sky-400",
        dot: "bg-sky-400",
    },
    blue: {
        bg: "bg-blue-500/15",
        text: "text-blue-400",
        dot: "bg-blue-400",
    },
    slate: {
        bg: "bg-slate-500/15",
        text: "text-slate-400",
        dot: "bg-slate-400",
    },
} as const;

export type BadgeColor = keyof typeof BADGE_COLORS;

export const priorityOptions = [
    {
        value: "Low",
        label: "Low",
        description: "Low priority",
        icon: (
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
        ),
    },
    {
        value: "Medium",
        label: "Medium",
        description: "Normal priority",
        icon: (
            <span className="h-2 w-2 rounded-full bg-amber-500" />
        ),
    },
    {
        value: "High",
        label: "High",
        description: "High priority",
        icon: (
            <span className="h-2 w-2 rounded-full bg-red-500" />
        ),
    },
];

export const statusOptions = [
    {
        value: "planning",
        label: "Planning",
        description: "Ready to start",
        icon: (
            <span className="h-2 w-2 rounded-full bg-blue-500" />
        ),
    },
    {
        value: "in_progress",
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