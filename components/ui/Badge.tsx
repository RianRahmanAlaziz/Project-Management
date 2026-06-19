interface BadgeProps {
    label: string;
    color?: "indigo" | "green" | "yellow" | "red" | "gray" | "blue" | "purple";
    size?: "sm" | "md";
}

export function Badge({ label, color = "gray", size = "sm" }: BadgeProps) {
    const colors = {
        indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
        blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        yellow: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
        gray: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
        purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full font-medium ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
                } ${colors[color]}`}
        >
            {label}
        </span>
    );
}