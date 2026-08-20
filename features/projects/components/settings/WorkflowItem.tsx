"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Grip, Pencil, Trash2 } from "lucide-react";

import type { WorkflowColumn } from "@/features/projects/types/workflow";
import Toggle from "@/components/ui/Toggle";
import { getColorOption } from "@/lib/utils/getColorOption";

interface WorkflowItemProps {
    column: WorkflowColumn;
    onEdit: () => void;
    onToggle: () => void;
    onDelete: () => void;
    disabled?: boolean;
}

export default function WorkflowItem({
    column,
    onEdit,
    onToggle,
    onDelete,
    disabled = false,
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

    const color = getColorOption(column.color);

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            className={[
                "flex items-center justify-between gap-4",
                "rounded-xl border border-dashed border-border",
                "px-4 py-3.5",
                "hover:border-border/80 hover:bg-muted/20",
                isDragging
                    ? "z-10 opacity-60 shadow-lg"
                    : "",
                disabled
                    ? "opacity-60"
                    : "",
            ].filter(Boolean)
                .join(" ")}
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
                    <Grip size={18} />
                </button>

                <span
                    className={[
                        "h-2.5 w-2.5 shrink-0 rounded-full",
                        color?.bg ?? "bg-gray-500",
                    ].join(" ")}
                    aria-hidden="true"
                />

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                        {column.name}
                    </p>

                    {column.description && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {column.description}
                        </p>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onEdit}
                    disabled={disabled}
                    aria-label={`Edit ${column.name}`}
                    className="
            cursor-pointer
            text-muted-foreground
            transition-colors
            hover:text-foreground
            disabled:cursor-not-allowed
            disabled:opacity-50
        "
                >
                    <Pencil size={15} />
                </button>

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
        </div >
    );
}