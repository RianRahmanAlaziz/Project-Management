"use client";

import { WorkspaceMember } from "@/features/members/types/workspaceMember";
import { TaskFormModal } from "@/features/tasks/components";

import type {
    Tasks,
    Task,
} from "@/features/tasks/types/tasks";

import { WorkflowColumn } from "../../types/workflow";

interface ProjectTaskModalProps {
    open: boolean;
    mode: "create" | "edit";
    task?: Tasks | null;
    columnId?: string;
    isSubmitting?: boolean;
    users: WorkspaceMember[];
    columns: WorkflowColumn[];

    onClose: () => void;
    onSubmit: (task: Task) => Promise<void>;
}

export function ProjectTaskModal({
    open,
    mode,
    task = null,
    users,
    columnId,
    columns,
    isSubmitting = false,
    onClose,
    onSubmit,
}: ProjectTaskModalProps) {
    const formTask: Task | null = task
        ? {
            id: task.id,
            title: task.title,
            description: task.description ?? "",
            projectId: String(task.project?.id ?? ""),
            columnId: String(task.column?.id ?? ""),
            priority: task.priority,
            assigneeId: task.assignee ? String(task.assignee.id) : "",
            startDate: task.start_date ?? "",
            dueDate: task.due_date ?? "",
        }
        : null;

    return (
        <TaskFormModal
            open={open}
            mode={mode}
            task={formTask}
            users={users}
            isSubmitting={isSubmitting}
            defaultColumnId={columnId}
            columns={columns}
            onClose={onClose}
            onSubmit={onSubmit}
        />
    );
}