import { Dispatch, SetStateAction } from "react";
import { Plus } from "lucide-react";
import {
    SettingFooter,
    SettingSection,
} from "@/components/layouts/settings";

import type { WorkflowColumn } from "@/features/projects/types/workflow";

import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

import type {
    DragEndEvent,
} from "@dnd-kit/core";

import WorkflowItem from "./WorkflowItem";
import { Tasks } from "@/features/tasks/types/tasks";


interface WorkflowSettingsProps {
    columns: WorkflowColumn[];
    tasks: Tasks[];
    setColumns: Dispatch<SetStateAction<WorkflowColumn[]>>;
    isSaving?: boolean;
    onOpenCreateColumn: () => void;
    onEdit: (column: WorkflowColumn) => void;
    onReorder: (columns: WorkflowColumn[]) => Promise<void>;
    onToggle: (column: WorkflowColumn) => Promise<void>;
    onDelete: (column: WorkflowColumn) => Promise<void>;
}

export default function WorkflowSettings({
    columns,
    tasks,
    setColumns,
    isSaving = false,
    onOpenCreateColumn,
    onEdit,
    onReorder,
    onToggle,
    onDelete
}: WorkflowSettingsProps) {

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = columns.findIndex(
            (column) => column.id === active.id,
        );

        const newIndex = columns.findIndex(
            (column) => column.id === over.id,
        );

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        const previousColumns = columns;
        const reorderedColumns = arrayMove(
            columns,
            oldIndex,
            newIndex,
        );

        setColumns(reorderedColumns);

        try {
            await onReorder(reorderedColumns);
        } catch {
            setColumns(previousColumns);
        }
    };

    return (
        <SettingSection
            title="Kanban Workflow"
            desc="Customize the workflow stages used on this project's board."
        >
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={columns.map((column) => column.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="flex flex-col gap-3 w-full">
                        {columns.map((column) => (
                            <WorkflowItem
                                key={column.id}
                                column={column}
                                disabled={isSaving}
                                hasTasks={tasks.some(
                                    (task) =>
                                        task.column?.id === column.id,
                                )}
                                onEdit={() => onEdit(column)}
                                onToggle={() => onToggle(column)}
                                onDelete={() => onDelete(column)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <button
                onClick={onOpenCreateColumn}
                disabled={isSaving}
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5  hover:text-primary  disabled:cursor-not-allowed  disabled:opacity-50 cursor-pointer"
            >
                <Plus size={12} /> Add Column
            </button>
        </SettingSection>
    );
}