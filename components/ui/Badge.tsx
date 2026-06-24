interface BadgeProps {
    label: string;
    icon?: React.ReactNode;
    color?: "indigo" | "green" | "yellow" | "red" | "gray" | "blue" | "purple";
    size?: "sm" | "md";
}

export function Badge({
    label,
    icon,
    color = "gray",
    size = "sm",
}: BadgeProps) {
    const colors = {
        indigo: {
            bg: "bg-indigo-500/15",
            text: "text-indigo-400",
            dot: "bg-indigo-400",
        },
        blue: {
            bg: "bg-blue-500/15",
            text: "text-blue-400",
            dot: "bg-blue-400",
        },
        green: {
            bg: "bg-emerald-500/15",
            text: "text-emerald-400",
            dot: "bg-emerald-400",
        },
        yellow: {
            bg: "bg-amber-500/15",
            text: "text-amber-400",
            dot: "bg-amber-400",
        },
        red: {
            bg: "bg-red-500/15",
            text: "text-red-400",
            dot: "bg-red-400",
        },
        gray: {
            bg: "bg-slate-500/15",
            text: "text-slate-400",
            dot: "bg-slate-400",
        },
        purple: {
            bg: "bg-purple-500/15",
            text: "text-purple-400",
            dot: "bg-purple-400",
        },
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                gap-2

                rounded-sm

                ${size === "sm"
                    ? "px-2.5 py-1 text-xs"
                    : "px-3 py-1.5 text-sm"
                }

                font-medium

                ${colors[color].bg}
                ${colors[color].text}
            `}
        >
            {icon && (
                <span className="flex items-center">
                    {icon}
                </span>
            )}

            <span>{label}</span>
        </span>
    );
}