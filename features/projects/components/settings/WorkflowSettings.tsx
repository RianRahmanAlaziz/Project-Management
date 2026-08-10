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

    saved: boolean;
    onSave: () => void;
}

export default function WorkflowSettings({
    columns,
    setColumns,
    saved,
    onSave,
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

    const handleDragEnd = (
        event: DragEndEvent,
    ) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        setColumns((items) => {
            const oldIndex = items.findIndex(
                (item) =>
                    item.id === active.id,
            );

            const newIndex = items.findIndex(
                (item) =>
                    item.id === over.id,
            );

            if (
                oldIndex === -1 ||
                newIndex === -1
            ) {
                return items;
            }

            return arrayMove(
                items,
                oldIndex,
                newIndex,
            );
        });
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
                    items={columns.map(
                        (column) => column.id,
                    )}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="flex flex-col gap-3 w-full">
                        {columns.map((column, index) => (
                            <WorkflowItem
                                key={column.id}
                                column={column}
                                onRename={(value) =>
                                    updateColumn(
                                        index,
                                        value,
                                    )
                                }
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* <button
                type="button"
                onClick={addColumn}
                className="
                    mt-4
                    text-sm
                    font-medium
                    text-primary
                    hover:underline
                "
            >
                + Add Column
            </button> */}

            <SettingFooter
                saved={saved}
                onSave={onSave}
            />
        </SettingSection>
    );
}