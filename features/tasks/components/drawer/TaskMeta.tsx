"use client";

import { Calendar } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { priorityOptions } from "@/components/constants";

import type { TaskDrawer } from "@/features/tasks/types/tasks";
import type { WorkflowColumn } from "@/features/projects/types/workflow";
import { formatDate } from "@/lib/utils/formatDate";

interface TaskMetaProps {
    task: TaskDrawer;
    columns: WorkflowColumn[];
    priority: string;
    columnId: string;
    isUpdating: boolean;
    setColumnId: (value: string) => void | Promise<void>;
    setPriority: (value: string) => void | Promise<void>;
}

export default function TaskMeta({
    task,
    columns,
    priority,
    columnId,
    isUpdating,
    setColumnId,
    setPriority,
}: TaskMetaProps) {
    const enabledColumns = columns.filter((column) => column.enabled);

    const columnOptions = enabledColumns.map(
        (column) => ({
            value: String(column.id),
            label: column.name,
            description: column.description,
            icon: (
                <span className={`h-2.5 w-2.5 rounded-full ${column.color}`} />
            ),
        }),
    );

    const currentColumnOption = {
        value: String(task.column.id),
        label: task.column.name,
        description: task.column.description,
        icon: (
            <span className={`h-2.5 w-2.5 rounded-full ${task.column.color}`} />
        ),
    };

    const hasCurrentColumn = columnOptions.some(
        (option) => option.value === String(task.column.id),
    );

    const statusOptions = hasCurrentColumn
        ? columnOptions
        : [currentColumnOption, ...columnOptions];

    return (
        <div className="space-y-2.5 px-5 pb-4">
            {/* Status */}
            <Combobox
                label="Status"
                value={columnId}
                onValueChange={setColumnId}
                placeholder="Select status"
                searchable={false}
                options={statusOptions}
                disabled={isUpdating}

            />

            {/* Priority */}
            <Combobox
                label="Priority"
                value={priority}
                onValueChange={setPriority}
                placeholder="Select priority"
                searchable={false}
                options={priorityOptions}
                disabled={isUpdating}

            />

            {/* Due Date */}
            <div className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-base text-muted-foreground">
                    Due date :
                </span>

                <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                    <Calendar
                        size={12}
                        className="text-muted-foreground"
                    />

                    {formatDate(task.due_date) ?? "-"}
                </div>
            </div>
        </div>
    );
}