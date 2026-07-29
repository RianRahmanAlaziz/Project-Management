import { useMemo, useState } from "react";

import type { Projects } from "@/features/projects/types/projects";

export function useProjectSearch(
    projects: Projects[]
) {
    const [search, setSearch] = useState("");
    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return projects;
        }

        return projects.filter(
            (projects) =>
                projects.name.toLowerCase().includes(query)
        );
    }, [projects, search]);


    return {
        search,
        setSearch,
        filtered,
    }
}
