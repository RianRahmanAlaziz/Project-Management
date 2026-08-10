"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { TASKS } from "@/features/tasks/mocks/tasks";

import TaskFormModal from "@/features/tasks/components/modals/TaskFormModal";
import TaskDrawer from "@/features/tasks/views/TaskDrawer";


import {
    KanbanBoard,
    ProjectTaskModal,
}
    from "@/features/projects/components";
import { useProjectTaskModal } from "../hooks";

type ProjectsBoardViewProps = {
    workspaceSlug: string;
    projectSlug: string;
};

export default function ProjectsBoardView({
    workspaceSlug,
    projectSlug,
}: ProjectsBoardViewProps) {
    const [tasks, setTasks] = useState(TASKS.data);
    const [openTaskId, setOpenTaskId] = useState<number | null>(null);

    const {
        taskModal,
        openCreateTask,
        closeTaskModal,
    } = useProjectTaskModal();

    const handleCreateTask = (
        column: string,
    ) => {
        openCreateTask(column);
    };

    return (
        <div className="w-full space-y-6">
            <KanbanBoard
                tasks={tasks}
                setTasks={setTasks}
                onCreateTask={handleCreateTask}
                onOpenTask={(id) => {
                    console.log("OPEN DRAWER ID:", id);
                    setOpenTaskId(id);
                }}
            />

            <AnimatePresence initial={false} mode="wait">
                {openTaskId !== null && (
                    <TaskDrawer
                        key={openTaskId}
                        taskId={openTaskId}
                        onClose={() => setOpenTaskId(null)}
                    />
                )}
            </AnimatePresence>

            <ProjectTaskModal
                open={taskModal.open}
                mode={taskModal.mode}
                task={taskModal.task}
                column={taskModal.column}
                onClose={closeTaskModal}
                onSubmit={(data) => {
                    if (taskModal.mode === "create") {
                        console.log("Create Tasks", data);
                    } else {
                        console.log("Update Tasks", data);
                    }
                }}
            />
        </div>
    );
}