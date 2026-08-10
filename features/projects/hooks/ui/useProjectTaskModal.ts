import { useState } from "react";
import type { Tasks } from "@/features/tasks/types/tasks";

type ProjectTaskModalState = {
    open: boolean;
    mode: "create" | "edit";
    task: Tasks | null;
    column: string;
};

const INITIAL_STATE: ProjectTaskModalState = {
    open: false,
    mode: "create",
    task: null,
    column: "",
};

export function useProjectTaskModal() {
    const [taskModal, setTaskModal] =
        useState<ProjectTaskModalState>(
            INITIAL_STATE,
        );

    const openCreateTask = (
        column = "",
    ) => {
        setTaskModal({
            open: true,
            mode: "create",
            task: null,
            column,
        });
    };

    const openEditTask = (
        task: Tasks,
        column = "",
    ) => {
        setTaskModal({
            open: true,
            mode: "edit",
            task,
            column,
        });
    };

    const closeTaskModal = () => {
        setTaskModal(INITIAL_STATE);
    };

    return {
        taskModal,
        openCreateTask,
        openEditTask,
        closeTaskModal,
    };
}