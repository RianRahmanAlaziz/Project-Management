import {
    FolderOpen, Users, Bell, Trash2, Link2, Tag, Workflow,
} from "lucide-react";

export const NAV_Projets = [
    { id: "general", label: "General", icon: FolderOpen },
    { id: "workflow", label: "Workflow", icon: Workflow },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
];

import type { ProjectColor } from "../types/settings";

export const PROJECT_COLORS: ProjectColor[] = [
    {
        label: "Indigo",
        bg: "bg-indigo-500",
        ring: "ring-indigo-500",
    },
    {
        label: "Violet",
        bg: "bg-violet-500",
        ring: "ring-violet-500",
    },
    {
        label: "Blue",
        bg: "bg-blue-500",
        ring: "ring-blue-500",
    },
    {
        label: "Emerald",
        bg: "bg-emerald-500",
        ring: "ring-emerald-500",
    },
    {
        label: "Rose",
        bg: "bg-rose-500",
        ring: "ring-rose-500",
    },
    {
        label: "Amber",
        bg: "bg-amber-500",
        ring: "ring-amber-500",
    },
    {
        label: "Sky",
        bg: "bg-sky-500",
        ring: "ring-sky-500",
    },
];