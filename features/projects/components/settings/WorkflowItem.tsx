"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Trash2 } from "lucide-react";

import type { WorkflowColumn } from "@/features/projects/types/workflow";
import Toggle from "@/components/ui/Toggle";

interface WorkflowItemProps {
    column: WorkflowColumn;
    onRename: (value: string) => void;
    onToggle: () => void;
    onDelete: () => void;
    disabled?: boolean;
}

export default function WorkflowItem({
    column,
    onRename,
    onToggle,
    onDelete,
    disabled,
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
                    disabled={disabled}
                    aria-label={`Move ${column.name}`}
                    className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing disabled:cursor-not-allowed  disabled:opacity-50 "
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
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onDelete}
                    disabled={disabled}
                    className="cursor-pointer text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                    aria-label={`Delete ${column.name}`}
                >
                    <Trash2 size={16} />
                </button>
                <Toggle
                    value={column.enabled}
                    onChange={onToggle}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}