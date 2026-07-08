"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { TASKS } from "@/data/data";

import TaskFormModal from "@/features/tasks/components/modals/TaskFormModal";
import TaskDrawer from "@/features/tasks/views/TaskDrawer";

import { PROJECTS } from "@/features/projects/mocks/projects";
import { USERS } from "@/features/users/mocks/users";

import {
    KanbanBoard,
}
    from "@/features/projects/components";

type ProjectsBoardViewProps = {
    workspaceSlug: string;
    projectSlug: string;
};

export default function ProjectsBoardView({
    workspaceSlug,
    projectSlug,
}: ProjectsBoardViewProps) {
    const [tasks, setTasks] = useState(TASKS);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverCol, setDragOverCol] = useState<string | null>(null);
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);

    const handleDrop = (column: string) => {
        if (!draggingId) return;

        setTasks((prev) =>
            prev.map((task) =>
                task.id === draggingId
                    ? { ...task, column }
                    : task
            )
        );

        setDraggingId(null);
        setDragOverCol(null);
    };

    const [taskModal, setTaskModal] = useState<{
        open: boolean;
        mode: "create" | "edit";
        task: null,
        column: "",
    }>({
        open: false,
        mode: "create",
        task: null,
        column: "",
    });

    const handleCreateTask = (column: string) => {
        setTaskModal({
            open: true,
            mode: "create",
            task: null,
            column: "",
        });
    };

    return (
        <div className="w-full space-y-6">
            <KanbanBoard
                tasks={tasks}
                draggingId={draggingId}
                dragOverCol={dragOverCol}
                setDraggingId={setDraggingId}
                setDragOverCol={setDragOverCol}
                onDrop={handleDrop}
                onCreateTask={handleCreateTask}
                onOpenTask={setOpenTaskId}
            />

            <AnimatePresence initial={false} mode="wait">
                {openTaskId && (
                    <TaskDrawer
                        key={openTaskId}
                        taskId={openTaskId}
                        onClose={() => setOpenTaskId(null)}
                    />
                )}
            </AnimatePresence>

            <TaskFormModal
                open={taskModal.open}
                mode={taskModal.mode}
                task={taskModal.task}
                onClose={() =>
                    setTaskModal((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
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