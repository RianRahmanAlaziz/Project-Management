"use client";

import {
    KeyRound,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import clsx from "clsx";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Users } from "../../types/users";

interface UsersActionMenuProps {
    user: Users;
    onEdit?: (users: Users) => void;
    onResetPassword?: (users: Users) => void;
    onDelete?: (users: Users) => void;
}

export default function UsersActionMenu({
    user,
    onEdit,
    onResetPassword,
    onDelete,
}: UsersActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className={clsx(
                        "cursor-pointer",
                        "text-muted-foreground",
                        "hover:text-foreground",
                        "transition-colors"
                    )}
                >
                    <MoreHorizontal size={18} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem
                    onClick={() => onEdit?.(user)}
                >
                    <Pencil size={16} />
                    Edit User
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onResetPassword?.(user)}
                >
                    <KeyRound
                        size={16}
                        className="mr-2"
                    />
                    Reset Password
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => onDelete?.(user)}
                    className=" text-destructive hover:bg-destructive/10 "
                >
                    <Trash2 size={16} />
                    Delete User
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
