import { Dispatch, SetStateAction } from "react";

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

interface WorkflowSettingsProps {
    columns: WorkflowColumn[];
    setColumns: Dispatch<
        SetStateAction<WorkflowColumn[]>
    >;
    hasUnsavedChanges: boolean;
    saved: boolean;
    isSaving?: boolean;

    onSave: () => void;
    onAddColumn: () => void;
    onReorder: (columns: WorkflowColumn[]) => Promise<void>;
    onToggle: (column: WorkflowColumn) => Promise<void>;
    onDelete: (column: WorkflowColumn) => Promise<void>;
}

export default function WorkflowSettings({
    columns,
    setColumns,
    hasUnsavedChanges,
    saved,
    isSaving = false,
    onSave,
    onAddColumn,
    onReorder,
    onToggle,
    onDelete
}: WorkflowSettingsProps) {

    const updateColumn = (
        index: number,
        value: string,
    ) => {
        setColumns((prev) =>
            prev.map((column, i) =>
                i === index
                    ? {
                        ...column,
                        name: value,
                    }
                    : column,
            ),
        );
    };

    const handleDragEnd = async (
        event: DragEndEvent,
    ) => {
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
                        {columns.map((column, index) => (
                            <WorkflowItem
                                key={column.id}
                                column={column}
                                disabled={isSaving}
                                onRename={(value) =>
                                    updateColumn(
                                        index,
                                        value,
                                    )
                                }
                                onToggle={() => onToggle(column)}
                                onDelete={() => onDelete(column)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <button
                onClick={onAddColumn}
                disabled={isSaving}
                type="button"
                className="cursor-pointer mt-4 text-sm font-medium text-primary hover:underline "
            >
                + Add Column
            </button>

            {hasUnsavedChanges && (
                <SettingFooter
                    saved={saved}
                    onSave={onSave}
                />
            )}
        </SettingSection>
    );
}