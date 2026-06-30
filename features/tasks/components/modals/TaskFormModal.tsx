"use client";

import { useEffect, useState } from "react";
import { Button, Input, Modal } from "@/components/ui";
import { Combobox } from "@/components/ui/combobox";

interface Task {
    id?: string;
    title: string;
    description?: string;
    projectId?: string;
    columnId?: string;
    priority?: string;
    assigneeId?: string;
    labels?: string[];
    startDate?: string;
    dueDate?: string;
    estimateHours?: number;
}

interface Option {
    id: string;
    name: string;
}

interface TaskFormModalProps {
    open: boolean;
    mode: "create" | "edit";

    task?: Task | null;

    projects: Option[];
    members: Option[];
    columns: Option[];
    labels: Option[];

    onClose: () => void;
    onSubmit: (task: Task) => void;
}

export default function TaskFormModal({
    open,
    mode,
    task,
    projects,
    members,
    columns,
    labels,
    onClose,
    onSubmit,
}: TaskFormModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [projectId, setProjectId] = useState("");
    const [columnId, setColumnId] = useState("");

    const [priority, setPriority] = useState("medium");
    const [assigneeId, setAssigneeId] = useState("");

    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [estimateHours, setEstimateHours] = useState("");

    useEffect(() => {
        if (mode === "edit" && task) {
            setTitle(task.title ?? "");
            setDescription(task.description ?? "");

            setProjectId(task.projectId ?? "");
            setColumnId(task.columnId ?? "");

            setPriority(task.priority ?? "medium");
            setAssigneeId(task.assigneeId ?? "");

            setStartDate(task.startDate ?? "");
            setDueDate(task.dueDate ?? "");

            setEstimateHours(
                task.estimateHours
                    ? String(task.estimateHours)
                    : ""
            );

            return;
        }

        setTitle("");
        setDescription("");

        setProjectId("");
        setColumnId("");

        setPriority("medium");
        setAssigneeId("");

        setStartDate("");
        setDueDate("");

        setEstimateHours("");
    }, [mode, task, open]);

    const handleSubmit = () => {
        onSubmit({
            ...task,
            title,
            description,
            projectId,
            columnId,
            priority,
            assigneeId,
            startDate,
            dueDate,
            estimateHours: estimateHours
                ? Number(estimateHours)
                : undefined,
        });

        onClose();
    };

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

                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                />

                <textarea
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    placeholder="Task description"
                    rows={5}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-background
                        p-3
                        text-sm
                        text-foreground
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary
                    "
                />

                <div className="grid grid-cols-2 gap-4">

                    <Input
                        value={projectId}
                        onChange={(e) =>
                            setProjectId(e.target.value)
                        }
                        placeholder="Project"
                    />

                    <Input
                        value={columnId}
                        onChange={(e) =>
                            setColumnId(e.target.value)
                        }
                        placeholder="Status"
                    />

                    <Combobox
                        value={priority}
                        onValueChange={setPriority}
                        searchable={false}
                        placeholder="Select priority"
                        options={[
                            {
                                value: "Low",
                                label: "Low",
                                description: "Low priority",
                                icon: (
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                ),
                            },
                            {
                                value: "Medium",
                                label: "Medium",
                                description: "Normal priority",
                                icon: (
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                ),
                            },
                            {
                                value: "High",
                                label: "High",
                                description: "High priority",
                                icon: (
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                ),
                            },
                        ]}
                    />

                    <Input
                        value={assigneeId}
                        onChange={(e) =>
                            setAssigneeId(e.target.value)
                        }
                        placeholder="Assignee"
                    />

                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(e.target.value)
                        }
                    />

                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)
                        }
                    />

                    <Input
                        type="number"
                        value={estimateHours}
                        onChange={(e) =>
                            setEstimateHours(e.target.value)
                        }
                        placeholder="Estimate Hours"
                    />

                </div>

                <div className="flex justify-end gap-2">

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                    >
                        {mode === "create"
                            ? "Create Task"
                            : "Save Changes"}
                    </Button>

                </div>
            </div>
        </Modal>
    );
}