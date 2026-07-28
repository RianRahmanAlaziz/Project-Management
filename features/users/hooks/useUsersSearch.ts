import { useMemo, useState } from 'react'
import { Users } from '../types/users';

export function useUsersSearch(
    users: Users[]
) {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return users.filter((user) => {
            const matchesSearch =
                !query ||
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query);

            const matchesRole =
                !role || user.role === role;

            return matchesSearch && matchesRole;
        });
    }, [users, search, role]);

    return {
        search,
        setSearch,
        role,
        setRole,
        filteredUsers,
    };
}
