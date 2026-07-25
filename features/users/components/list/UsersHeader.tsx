import { Plus } from "lucide-react";

import { Button } from "@/components/ui";
import type { Users } from "@/features/users/types/users";

interface UsersHeaderProps {
    user: Users[];
    onCreate: () => void;
}

export function UsersHeader({
    user,
    onCreate,
}: UsersHeaderProps) {
    const userCount = user.length;
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    User Management
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {userCount}{" "}
                    {userCount === 1
                        ? "User"
                        : "Users"}{" "}
                    Manage all registered users
                </p>
            </div>

            <Button
                type="button"
                size="lg"
                variant="primary"
                className="w-full sm:w-auto"
                onClick={onCreate}
            >
                <Plus size={16} />
                Add User
            </Button>
        </div>
    );
}