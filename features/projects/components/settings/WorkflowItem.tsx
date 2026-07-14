"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

import type { WorkflowColumn } from "@/features/projects/types/workflow";

interface WorkflowItemProps {
    column: WorkflowColumn;
    onRename: (value: string) => void;
    onToggle: () => void;
}

export default function WorkflowItem({
    column,
    onRename,
    onToggle,
}: WorkflowItemProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            className={`flex items-start justify-between gap-6 border-b border-border py-4 last:border-0 ${isDragging ? "opacity-70" : ""}`}
        >
            {/* LEFT */}
            <div className="flex flex-1 items-center gap-3 min-w-0">
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-muted-foreground"
                >
                    <GripVertical size={18} />
                </button>

                <input
                    value={column.name}
                    onChange={(e) => onRename(e.target.value)}
                    className=" w-full bg-transparent text-sm font-medium text-foreground outline-none border-0 "
                />

            </div>

            {/* RIGHT */}
            <button
                type="button"
                onClick={onToggle}
                aria-pressed={column.enabled}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 cursor-pointer ${column.enabled ? "bg-primary" : "bg-muted"} `}
            >
                <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${column.enabled ? "translate-x-5" : "translate-x-0"} `}
                />
            </button>
        </div>
    );
}