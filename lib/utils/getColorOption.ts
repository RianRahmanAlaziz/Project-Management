import { COLORS } from "@/components/constants";

export function getColorOption(color?: string) {
    return COLORS.find(
        (item) => item.label.toLowerCase() === color?.toLowerCase() || item.bg === color,
    );
}