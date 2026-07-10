import { useMemo, useState } from "react";
import type { Workspace } from "../types/workspace";

export function useWorkspaceSearch(
    workspaces: Workspace[]
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