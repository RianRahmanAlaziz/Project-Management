"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { TASKS } from "@/features/tasks/mocks/tasks";

import TaskFormModal from "@/features/tasks/components/modals/TaskFormModal";
import TaskDrawer from "@/features/tasks/views/TaskDrawer";


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
    const [tasks, setTasks] = useState(TASKS.data);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const [dragOverCol, setDragOverCol] = useState<string | null>(null);
    const [openTaskId, setOpenTaskId] = useState<number | null>(null);

    const handleDrop = (status: string) => {
        if (draggingId === null) return;
        setTasks(prev =>
            prev.map(task =>
                task.id === draggingId
                    ? {
                        ...task,
                        status
                    }
                    :
                    task
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