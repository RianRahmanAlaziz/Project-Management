"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import {
    TaskHeader,
    TaskContent,
    TaskCommentInput,
} from "@/features/tasks/components";

import type { TaskDrawer } from "@/features/tasks/types/tasks";

import { useProjectColumns } from "@/features/projects/hooks";
import { useUpdateTask } from "../hooks";

interface TaskUpdatedChanges {
    column: {
        id: number;
        name: string;
        color?: string;
        position?: number;
    };
    priority: string;
}

interface TaskDrawerProps {
    task: TaskDrawer;
    onClose: () => void;
    onTaskUpdated?: (changes: TaskUpdatedChanges) => void;
}

export default function TaskDrawer({
    task,
    onClose,
    onTaskUpdated,
}: TaskDrawerProps) {
    const [activeTab, setActiveTab] = useState("Comments");
    const [comment, setComment] = useState("");
    const [columnId, setColumnId] = useState(String(task.column?.id ?? ""));
    const [priority, setPriority] = useState(task.priority ?? "");

    const {
        columns,
    } = useProjectColumns({
        workspaceSlug: task.workspace.slug,
        projectSlug: task.project.slug,
    });

    useEffect(() => {
        if (!task.column) {
            return;
        }
        let nextColumnId = String(task.column.id);

        if (columns.length > 0) {
            const matchedColumn =
                columns.find(
                    (column) =>
                        column.id === task.column.id,
                ) ??
                columns.find(
                    (column) =>
                        column.name.toLowerCase() ===
                        task.column.name.toLowerCase(),
                );

            if (matchedColumn) {
                nextColumnId = String(
                    matchedColumn.id,
                );
            }
        }
        setColumnId(nextColumnId);
        setPriority(task.priority ?? "");
    }, [task]);

    const currentColumn = columns.find(
        (column) => String(column.id) === columnId,
    ) ?? task.column;

    const {
        handleUpdateTask,
        isUpdating,
    } = useUpdateTask({
        workspaceSlug: task.workspace.slug,
        projectSlug: task.project.slug,
        onSuccess: async (updatedTask) => {
            onTaskUpdated?.({
                column: updatedTask.column,
                priority: updatedTask.priority,
            });
        },
    });

    const handleColumnChange = async (nextColumnId: string) => {
        if (nextColumnId === columnId || isUpdating) {
            return;
        }

        const previousColumnId = columnId;
        setColumnId(nextColumnId);

        try {
            await handleUpdateTask(
                task.id,
                {
                    column_id: Number(nextColumnId),
                },
            );
        } catch {
            setColumnId(previousColumnId);
        }
    };

    const handlePriorityChange = async (nextPriority: string) => {
        if (nextPriority === priority || isUpdating) {
            return;
        }

        const previousPriority = priority;
        setPriority(nextPriority);

        try {
            await handleUpdateTask(
                task.id,
                {
                    priority: nextPriority,
                },
            );
        } catch {
            setPriority(previousPriority);
        }
    };

    const handleSendComment = (message: string) => {
        console.log(
            "Send Comment:",
            message,
        );
    };

    return (
        <div className="fixed inset-0 z-50">
            <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.2,
                    ease: "easeOut",
                }}
            />

            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                }}
                className="absolute top-0 right-0 h-dvh w-full max-w-130 flex flex-col overflow-hidden border-l border-border bg-card shadow-2xl"
            >
                <TaskHeader
                    task={task}
                    status={currentColumn?.name ?? task.column.name}
                    onClose={onClose}
                />

                <TaskContent
                    task={task}
                    columns={columns}
                    columnId={columnId}
                    priority={priority}
                    setColumnId={handleColumnChange}
                    setPriority={handlePriorityChange}
                    isUpdating={isUpdating}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {activeTab === "Comments" && (
                    <TaskCommentInput
                        comment={comment}
                        setComment={setComment}
                        onSend={handleSendComment}
                    />
                )}
            </motion.div>
        </div>
    );
}