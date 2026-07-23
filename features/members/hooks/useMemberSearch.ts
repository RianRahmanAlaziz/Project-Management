"use client";

import { useMemo, useState } from "react";

import type {
    WorkspaceMember,
} from "../types/workspaceMember";

export function useMemberSearch(
    members: WorkspaceMember[],
) {
    const [search, setSearch] = useState("");

    const filteredMembers = useMemo(() => {
        const query =
            search.trim().toLowerCase();

        if (!query) {
            return members;
        }

        return members.filter(
            (member) =>
                member.user.name
                    .toLowerCase()
                    .includes(query) ||
                member.user.email
                    .toLowerCase()
                    .includes(query),
        );
    }, [members, search]);

    return {
        search,
        setSearch,
        filteredMembers,
    };
}