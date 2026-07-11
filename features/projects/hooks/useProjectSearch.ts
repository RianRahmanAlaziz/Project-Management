import { useMemo, useState } from "react";

import type { Projects } from "@/features/projects/types/projects";

export function useProjectSearch(
    projects: Projects[]
) {
    const [search, setSearch] = useState("");
    const filtered = useMemo(() => {
        return projects.filter(project =>
            project.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);


    return {
        search,
        setSearch,
        filtered,
    }
}
