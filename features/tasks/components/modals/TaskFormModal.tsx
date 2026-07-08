"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Modal,
    Combobox,
    DatePicker,
} from "@/components/ui";

import {
    Calendar,
    CheckSquare,
    Clock,
    Flag,
    Hash,
    Users,
} from "lucide-react";

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

const PRIORITY_OPTIONS = [
    {
        value: "Low",
        label: "Low",
        icon: (
            <span className="h-2 w-2 rounded-full bg-green-500" />
        ),
    },
    {
        value: "Medium",
        label: "Medium",
        icon: (
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
        ),
    },
    {
        value: "High",
        label: "High",
        icon: (
            <span className="h-2 w-2 rounded-full bg-red-500" />
        ),
    },
];


const ESTIMATE_OPTIONS = [
    "30m",
    "1h",
    "2h",
    "4h",
    "1d",
    "2d",
    "3d",
    "1w",
].map(item => ({
    value: item,
    label: item,
}));


export default function TaskFormModal({
    open,
    mode,
    task,
    projects = [],
    members = [],
    columns = [],
    labels = [],

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
                <textarea
                    autoFocus
                    placeholder="Task title…"
                    rows={2}
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base font-semibold focus:outline-none resize-none mb-1 leading-snug"
                />

                <textarea
                    placeholder="Add a description, notes, or acceptance criteria…"
                    rows={3}
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none border-b border-border pb-4 mb-4"
                />

                <div className="grid grid-cols-2 gap-4">

                    <Combobox
                        label={
                            <>
                                <Hash size={12} />
                                Project
                            </>
                        }
                        value={projectId}
                        onValueChange={setProjectId}
                        placeholder="Select project"
                        options={
                            projects.map(item => ({
                                value: String(item.id),
                                label: item.name,
                            }))
                        }
                    />

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
                        options={
                            columns.map(item => ({
                                value: String(item.id),
                                label: item.name,
                            }))
                        }
                    />

                    <Combobox
                        label={
                            <>
                                <Flag size={12} />
                                Priority
                            </>
                        }
                        value={priority}
                        onValueChange={setPriority}
                        searchable={false}
                        options={PRIORITY_OPTIONS}
                    />

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
                        options={
                            members.map(user => ({
                                value: String(user.id),
                                label: user.name,
                            }))
                        }
                    />

                    <DatePicker
                        label={
                            <>
                                <Calendar size={11} />
                                Due date
                            </>
                        }
                        value={dueDate}
                        onChange={setDueDate}

                    />

                    <Combobox
                        label={
                            <>
                                <Clock size={12} />
                                Estimate
                            </>
                        }
                        value={estimateHours}
                        onValueChange={setEstimateHours}
                        placeholder="Estimate"
                        searchable={false}
                        options={ESTIMATE_OPTIONS}
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