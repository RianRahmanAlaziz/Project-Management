import { ReactNode } from "react";
import {
    ShieldCheck,
} from "lucide-react";

import { Avatar, Badge } from "@/components/ui";

import type { Users } from "../../types/users";
import { FaUserShield } from "react-icons/fa";
import UsersActionMenu from "./UsersActionMenu";


const roleIcons: Record<string, ReactNode> = {
    super_admin: <ShieldCheck size={18} />,
    user: <FaUserShield size={18} />,
};

const roleColors: Record<string, "blue" | "green"> = {
    super_admin: "blue",
    user: "green",
};

function formatRole(role: string) {
    return role
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1),
        )
        .join(" ");
}

function formatJoinedDate(date: string | null) {
    if (!date) {
        return "-";
    }

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            year: "numeric",
        },
    ).format(new Date(date));
}

interface UsersTableProps {
    users: Users[];
    onEdit: (user: Users) => void;
    onResetPassword: (user: Users) => void;
    onDelete: (user: Users) => void;
}

export function UsersTable({
    users,
    onEdit,
    onResetPassword,
    onDelete
}: UsersTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-6 py-4 text-left text-lg font-medium text-muted-foreground">
                            User
                        </th>

                        <th className="px-6 py-4 text-center text-lg font-medium text-muted-foreground">
                            Role
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-medium text-muted-foreground">
                            Status
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-medium text-muted-foreground">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                        >
                            <td className="px-4 py-5">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        name={user.name}
                                        size="lg"
                                    />

                                    <div className="flex flex-col">
                                        <span className="text-base font-medium text-foreground">
                                            {user.name}
                                        </span>

                                        <span className="text-sm text-muted-foreground">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-5">
                                <div className="flex justify-center">
                                    <Badge
                                        size="md"
                                        label={formatRole(user.role)}
                                        icon={roleIcons[user.role]}
                                        color={roleColors[user.role]}
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-5">
                                <span className="flex justify-center">
                                    {user.email_verified_at ? (
                                        <Badge
                                            size="md"
                                            label="Verified"
                                            color="green"
                                        />
                                    ) : (
                                        <Badge
                                            size="md"
                                            label="Unverified"
                                            color="yellow"
                                        />
                                    )}
                                </span>
                            </td>

                            <td className="px-4 py-5">
                                <div className="flex justify-center">
                                    <UsersActionMenu
                                        user={user}
                                        onEdit={onEdit}
                                        onResetPassword={onResetPassword}
                                        onDelete={onDelete}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}