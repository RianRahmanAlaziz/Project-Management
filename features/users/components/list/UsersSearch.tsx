import { Search } from "lucide-react";
import {
    Combobox,
} from "@/components/ui";

interface UsersSearchProps {
    search: string;
    role?: string;

    onSearchChange: (value: string) => void;
    onRoleChange?: (value: string) => void;
}

const ROLE_OPTIONS = [
    {
        value: "",
        label: "All Roles",
    },
    {
        value: "super_admin",
        label: "Super Admin",
    },
    {
        value: "user",
        label: "User",
    },
];

export function UsersSearch({
    search,
    role,
    onSearchChange,
    onRoleChange,
}: UsersSearchProps) {
    return (
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Search users..."
                    className="h-12 w-full rounded-lg border border-border bg-card pl-12 pr-3"
                />
            </div>

            <div className="w-full md:w-60">
                <Combobox
                    className="bg-card"
                    value={role}
                    options={ROLE_OPTIONS}
                    placeholder="All Roles"
                    searchable={false}
                    onValueChange={onRoleChange}
                />
            </div>
        </div>
    );
}