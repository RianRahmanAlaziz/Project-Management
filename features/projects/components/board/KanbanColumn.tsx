"use client";

import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { TaskCard } from "@/features/projects/components";
import type { Tasks } from "@/features/tasks/types/tasks";
import type { WorkflowColumn } from "../../types/workflow";
import { getColorOption } from "@/lib/utils/getColorOption";

interface KanbanColumnProps {
    column: WorkflowColumn;
    tasks: Tasks[];
    overTaskId?: number | null;

    disabled?: boolean;

    onCreateTask: (columnId: number) => void;
    onOpenTask: (task: Tasks) => void;
}

export default function KanbanColumn({
    column,
    tasks,
    overTaskId,
    disabled = false,
    onCreateTask,
    onOpenTask,
}: KanbanColumnProps) {
    const {
        setNodeRef,
        isOver,
    } = useDroppable({
        id: `column-${column.id}`,
        disabled,
        data: {
            type: "column",
            column,
        },
    });

    const color = getColorOption(column.color);
    const background = color.softBg ?? "bg-muted/40";

    return (
        <div
            ref={setNodeRef}
            className={[
                "flex min-h-125 w-full flex-col rounded-xl border border-border",
                background,
                "transition-colors",
                isOver && !disabled ? `${color.border ?? "border-border"} ring-1 ${color.ring ?? ""}` : "",
            ].filter(Boolean).join(" ")}
        >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-xl border-b border-border bg-card px-3 py-3">
                <div className="flex items-center gap-2">
                    <span
                        className={["h-2 w-2 shrink-0 rounded-full", color.bg ?? "bg-slate-500",
                        ].join(" ")}
                        aria-hidden="true"
                    />

                    <span
                        className={["text-sm font-semibold", color.text ?? "text-foreground",
                        ].join(" ")}
                    >
                        {column.name}
                    </span>
                </div>

                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                        if (disabled) {
                            return;
                        }

                        onCreateTask(column.id);
                    }}
                    className={[
                        "text-muted-foreground transition-colors",
                        disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:text-foreground",
                    ].join(" ")}
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* Tasks */}
            <div className="flex-1 overflow-y-auto p-2">
                <SortableContext
                    items={tasks.map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {tasks.length === 0 ? (
                            <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground">
                                Drop task here
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    disabled={disabled}
                                    isDropTarget={
                                        !disabled &&
                                        overTaskId === task.id
                                    }
                                    onClick={() => onOpenTask(task)}
                                />
                            ),))}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
}