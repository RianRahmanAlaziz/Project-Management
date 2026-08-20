import { BADGE_COLORS, BadgeColor } from "../constants";

interface BadgeProps {
    label: string;
    icon?: React.ReactNode;
    color?: BadgeColor;
    size?: "sm" | "md";
}

export function Badge({
    label,
    icon,
    color = "gray",
    size = "sm",
}: BadgeProps) {
    const colorStyle = BADGE_COLORS[color];
    return (
        <span
            className={[
                "inline-flex items-center gap-2 rounded-sm font-medium",
                size === "sm"
                    ? "px-2.5 py-1 text-xs"
                    : "px-3 py-1.5 text-sm",
                colorStyle.bg,
                colorStyle.text,
            ].join(" ")}
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