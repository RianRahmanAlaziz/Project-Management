import {
    COLORS,
    type Color,
} from "@/components/constants";

export function getColorOption(
    value?: string | null,
): Color {
    return (
        COLORS.find(
            (color) => color.value === value,
        ) ?? COLORS[0]
    );
}