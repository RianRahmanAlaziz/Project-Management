import { COLORS } from "@/components/constants";

export function getColorOption(color: string) {
    return COLORS.find(
        (item) => item.value === color,
    );
}