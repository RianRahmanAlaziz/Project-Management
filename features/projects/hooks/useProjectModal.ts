import { useState } from "react";

export function useProjectModal() {
    const [createOpen, setCreateOpen] = useState(false);

    const create = {
        open: createOpen,

        openModal: () => setCreateOpen(true),

        closeModal: () => setCreateOpen(false),
    };

    return {
        create,
    };
}
