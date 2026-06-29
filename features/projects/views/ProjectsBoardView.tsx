"use client";

import { useState } from "react";

import { TASKS } from "@/data/data";
import KanbanBoard from "../components/KanbanBoard";

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

    return (
        <div className="w-full space-y-6">
            <KanbanBoard
                tasks={tasks}
                draggingId={draggingId}
                dragOverCol={dragOverCol}
                setDraggingId={setDraggingId}
                setDragOverCol={setDragOverCol}
                onDrop={handleDrop}
            />
        </div>
    );
}