import {
    Crown,
    Eye,
    Shield,
    UserCheck,
} from "lucide-react";

type WorkspaceRole =
    | "admin"
    | "owner"
    | "member"
    | "viewer";

interface Permission {
    name: string;
    roles: WorkspaceRole[];
}

const ROLES = [
    {
        id: "admin",
        label: "Admin",
        icon: Shield,
    },
    {
        id: "owner",
        label: "Owner",
        icon: Crown,
    },
    {
        id: "member",
        label: "Member",
        icon: UserCheck,
    },
    {
        id: "viewer",
        label: "Viewer",
        icon: Eye,
    },
] as const;

const PERMISSIONS: Permission[] = [
    {
        name: "View workspace",
        roles: [
            "owner",
            "admin",
            "member",
            "viewer",
        ],
    },
    {
        name: "Update workspace",
        roles: [
            "owner",
            "admin",
        ],
    },
    {
        name: "Delete workspace",
        roles: [
            "owner",
        ],
    },
    {
        name: "View members",
        roles: [
            "owner",
            "admin",
            "member",
            "viewer",
        ],
    },
    {
        name: "Add members",
        roles: [
            "owner",
            "admin",
        ],
    },
    {
        name: "Change member roles",
        roles: [
            "owner",
            "admin",
        ],
    },
    {
        name: "Remove members",
        roles: [
            "owner",
            "admin",
        ],
    },
];

export default function PermissionsTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="overflow-x-auto">
                <table className="w-full min-w-125">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="px-4 py-4 text-left text-base font-medium text-muted-foreground">
                                Permission
                            </th>

                            {ROLES.map((role) => {
                                const Icon = role.icon;

                                return (
                                    <th
                                        key={role.id}
                                        className="px-4 py-4 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <Icon
                                                size={18}
                                                className="text-muted-foreground"
                                            />

                                            <span className="text-base font-medium text-foreground">
                                                {role.label}
                                            </span>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {PERMISSIONS.map((permission) => (
                            <tr
                                key={permission.name}
                                className="border-b border-border transition-colors last:border-0 hover:bg-muted/20"
                            >
                                <td className="px-4 py-4 text-base text-foreground">
                                    {permission.name}
                                </td>

                                {ROLES.map((role) => {
                                    const hasPermission =
                                        permission.roles.includes(
                                            role.id,
                                        );

                                    return (
                                        <td
                                            key={role.id}
                                            className="px-4 py-4 text-center"
                                        >
                                            {hasPermission ? (
                                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-success/15 text-success">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-base text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}