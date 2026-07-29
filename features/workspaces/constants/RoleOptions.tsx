import { Eye, Shield, UserCheck } from "lucide-react";

export const ROLE_OPTIONS = [
    {
        value: "admin",
        label: "Admin",
        icon:
            <Shield
                size={15}
                className="text-indigo-500"
            />,
    },
    {
        value: "member",
        label: "Member",
        icon:
            <UserCheck
                size={15}
                className="text-emerald-500"
            />
        ,
    },
    {
        value: "viewer",
        label: "Viewer",
        icon:
            <Eye
                size={15}
                className="text-slate-500"
            />
        ,
    },
];