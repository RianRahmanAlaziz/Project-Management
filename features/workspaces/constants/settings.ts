import {
    Building2,
    Bell,
    Shield,
    Trash2,
} from "lucide-react";

export const WORKSPACE_SETTINGS = [
    {
        id: "general",
        label: "General",
        icon: Building2,
    },
    {
        id: "security",
        label: "Security",
        icon: Shield,
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
    },
    {
        id: "danger",
        label: "Danger Zone",
        icon: Trash2,
        danger: true,
    },
];