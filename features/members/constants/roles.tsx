import React from "react";
import {
    Crown,
    Shield,
    UserCheck,
    Eye,
} from "lucide-react";

export const ROLES = [
    "Owner",
    "Admin",
    "Member",
    "Viewer",
] as const;

export const roleIcons = {
    Owner: <Crown size={18} />,
    Admin: <Shield size={18} />,
    Member: <UserCheck size={18} />,
    Viewer: <Eye size={18} />,
};

export const roleColors = {
    Owner: "indigo",
    Admin: "blue",
    Member: "green",
    Viewer: "gray",
} as const;