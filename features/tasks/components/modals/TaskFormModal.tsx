"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Button,
    Combobox,
    DateRangePicker,
    Modal,
} from "@/components/ui";
import {
    Calendar,
    CheckSquare,
    Flag,
    Users,
} from "lucide-react";

import { priorityOptions } from "@/components/constants";
import type { WorkspaceMember } from "@/features/members/types/workspaceMember";
import type { WorkflowColumn } from "@/features/projects/types/workflow";
import type { Task } from "@/features/tasks/types/tasks";

interface TaskFormModalProps {
    open: boolean;
    mode: "create" | "edit";
    task?: Task | null;

    users: WorkspaceMember[];
    columns: WorkflowColumn[];

    isSubmitting?: boolean;

    onClose: () => void;
    onSubmit: (task: Task) => Promise<void>;
}

export default function TaskFormModal({
    open,
    mode,
    task,
    users = [],
    columns = [],
    isSubmitting = false,
    onClose,
    onSubmit,
}: TaskFormModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectId, setProjectId] = useState("");
    const [columnId, setColumnId] = useState("");
    const [priority, setPriority] = useState("");
    const [assigneeId, setAssigneeId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const columnOptions = useMemo(
        () =>
            columns
                .filter((column) => column.enabled)
                .map((column) => ({
                    value: String(column.id),
                    label: column.name,
                    description: column.description,
                    icon: (
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${column.color}`}
                        />
                    ),
                })),
        [columns],
    );

    const memberOptions = useMemo(
        () =>
            users.map((user) => ({
                value: String(user.user.id),
                label: user.user.name,
                description: user.user.email,
            })),
        [users],
    );

    useEffect(() => {
        if (mode === "edit" && task) {
            setTitle(task.title ?? "");
            setDescription(task.description ?? "");

            setProjectId(task.projectId ?? "");
            setColumnId(task.columnId ?? "");

            setPriority(task.priority ?? "");
            setAssigneeId(task.assigneeId ?? "");

            setStartDate(task.startDate ?? "");
            setDueDate(task.dueDate ?? "");

            return;
        }

        setTitle("");
        setDescription("");

        setProjectId("");
        setColumnId("");

        setPriority("");
        setAssigneeId("");

        setStartDate("");
        setDueDate("");
    }, [mode, task, open]);

    const handleSubmit = async () => {
        if (isSubmitting) {
            return;
        }

        await onSubmit({
            ...task,
            title: title.trim(),
            description: description.trim(),
            projectId,
            columnId,
            priority,
            assigneeId,
            startDate,
            dueDate,
        });

        onClose();
    };

    const submitLabel = isSubmitting
        ? mode === "create"
            ? "Creating..."
            : "Saving..."
        : mode === "create"
            ? "Create Task"
            : "Save Changes";

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={
                mode === "create"
                    ? "Create Task"
                    : "Edit Task"
            }
            size="xl"
        >
            <div className="space-y-5">
                {/* Title */}
                <textarea
                    autoFocus
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="Task title…"
                    rows={2}
                    disabled={isSubmitting}
                    className="mb-1 w-full resize-none bg-transparent text-base font-semibold leading-snug text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />

                {/* Description */}
                <textarea
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    placeholder="Add a description, notes, or acceptance criteria…"
                    rows={3}
                    disabled={isSubmitting}
                    className="mb-4 w-full resize-none border-b border-border bg-transparent pb-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* Status */}
                    <Combobox
                        label={
                            <>
                                <CheckSquare size={12} />
                                Status
                            </>
                        }
                        value={columnId}
                        onValueChange={setColumnId}
                        placeholder="Select status"
                        searchable={false}
                        options={columnOptions}
                        disabled={isSubmitting}
                    />

                    {/* Priority */}
                    <Combobox
                        label={
                            <>
                                <Flag size={12} />
                                Priority
                            </>
                        }
                        value={priority}
                        onValueChange={setPriority}
                        placeholder="Select priority"
                        searchable={false}
                        options={priorityOptions}
                        disabled={isSubmitting}
                    />

                    {/* Assignee */}
                    <Combobox
                        label={
                            <>
                                <Users size={12} />
                                Assignee
                            </>
                        }
                        value={assigneeId}
                        onValueChange={setAssigneeId}
                        placeholder="Select member"
                        options={memberOptions}
                        disabled={isSubmitting}
                    />

                    {/* Schedule */}
                    <DateRangePicker
                        label={
                            <>
                                <Calendar size={12} />
                                Schedule
                            </>
                        }
                        startDate={startDate}
                        endDate={dueDate}
                        onChange={(start, end) => {
                            setStartDate(start);
                            setDueDate(end);
                        }}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {submitLabel}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}