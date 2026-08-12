"use client";

import { TaskFormModal } from "@/features/tasks/components";

import type {
    Tasks,
    Task,
} from "@/features/tasks/types/tasks";

interface ProjectTaskModalProps {
    open: boolean;
    mode: "create" | "edit";
    task?: Tasks | null;

    projects: any[];
    members: any[];
    column?: any[];
    labels: any[];

    onClose: () => void;
    onSubmit: (task: Task) => void;
}

export function ProjectTaskModal({
    open,
    mode,
    task = null,
    projects,
    members,
    column,
    labels,
    onClose,
    onSubmit,
}: ProjectTaskModalProps) {

    const formTask: Task | null = task
        ? {
            id: task.id,
            title: task.title,
            description: task.description,
            projectId: String(task.project_id),
            columnId: task.status,
            priority: task.priority,
            assigneeId: String(task.assignee.id),
            startDate: task.start_date,
            dueDate: task.due_date,
        }
        : null;

    return (
        <TaskFormModal
            open={open}
            mode={mode}
            task={formTask}
            projects={projects}
            members={members}
            labels={labels}
            onClose={onClose}
            onSubmit={onSubmit}
        />
    );
}