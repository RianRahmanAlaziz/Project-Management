import { useMemo, useState } from "react";

export function useWorkspaceSearch<T extends { name: string }>(
    workspaces: T[],
) {
    const [search, setSearch] = useState("");

    const filteredWorkspaces = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return workspaces;
        }

        return workspaces.filter((workspace) =>
            workspace.name.toLowerCase().includes(keyword),
        );
    }, [search, workspaces]);

    return {
        search,
        setSearch,
        filteredWorkspaces,
    };
}