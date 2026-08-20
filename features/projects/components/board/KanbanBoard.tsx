"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
    DndContext,
    DragOverlay,
    PointerSensor,
    KeyboardSensor,
    pointerWithin,
    rectIntersection,
    getFirstCollision,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import type {
    DragStartEvent,
    DragEndEvent,
} from "@dnd-kit/core";

import {
    arrayMove,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import {
    KanbanColumn,
} from "@/features/projects/components";

import {
    TaskCard,
} from "@/features/tasks/components";

import type { Tasks } from "@/features/tasks/types/tasks";
import { WorkflowColumn } from "../../types/workflow";

interface KanbanBoardProps {
    tasks: Tasks[];
    columns: WorkflowColumn[];
    setTasks?: Dispatch<SetStateAction<Tasks[]>>;
    onCreateTask: (columnId: number) => void;
    onOpenTask: (task: Tasks) => void;
}

const collisionDetection = (args: any) => {
    const pointerIntersections =
        pointerWithin(args);

    const collisions =
        pointerIntersections.length
            ? pointerIntersections
            : rectIntersection(args);

    const overId =
        getFirstCollision(
            collisions,
            "id",
        );

    if (!overId) {
        return [];
    }

    return collisions;
};

export default function KanbanBoard({
    tasks,
    columns,
    setTasks,
    onCreateTask,
    onOpenTask,
}: KanbanBoardProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),

        useSensor(KeyboardSensor, {
            coordinateGetter:
                sortableKeyboardCoordinates,
        }),
    );

    const [
        activeTask,
        setActiveTask,
    ] = useState<Tasks | null>(null);

    const handleDragStart = (
        event: DragStartEvent,
    ) => {
        const task =
            event.active.data.current?.task;

        if (task) {
            setActiveTask(task);
        }
    };

    const handleDragEnd = ({
        active,
        over,
    }: DragEndEvent) => {
        setActiveTask(null);

        if (!over || !setTasks) {
            return;
        }

        const draggedTask =
            active.data.current?.task as Tasks;

        if (!draggedTask) {
            return;
        }

        const overData =
            over.data.current;

        setTasks((prev) => {
            const items = [...prev];

            const activeIndex =
                items.findIndex(
                    (item) =>
                        item.id ===
                        draggedTask.id,
                );

            if (activeIndex === -1) {
                return prev;
            }

            /**
             * Drop di atas task
             */
            if (
                overData?.type === "task"
            ) {
                const targetTask =
                    overData.task as Tasks;

                const overIndex =
                    items.findIndex(
                        (item) =>
                            item.id ===
                            targetTask.id,
                    );

                if (overIndex === -1) {
                    return prev;
                }

                return arrayMove(
                    items,
                    activeIndex,
                    overIndex,
                );
            }

            /**
             * Drop ke column
             */
            if (
                overData?.type === "column"
            ) {
                const targetColumn =
                    overData.column as WorkflowColumn;

                items[activeIndex] = {
                    ...items[activeIndex],

                    column: {
                        ...items[activeIndex].column,
                        id: targetColumn.id,
                        name: targetColumn.name,
                        description:
                            targetColumn.description,
                        color: targetColumn.color,
                        position:
                            targetColumn.position,
                    },
                };

                return items;
            }

            return prev;
        });
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={
                collisionDetection
            }
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="overflow-x-auto overflow-y-hidden">
                <div className="flex gap-3 p-4">
                    {columns.map((column) => {
                        const columnTasks =
                            tasks.filter(
                                (task) =>
                                    task.column?.id ===
                                    column.id,
                            );

                        return (
                            <KanbanColumn
                                key={column.id}
                                column={column}
                                tasks={columnTasks}
                                onCreateTask={
                                    onCreateTask
                                }
                                onOpenTask={
                                    onOpenTask
                                }
                            />
                        );
                    })}
                </div>
            </div>

            <DragOverlay
                dropAnimation={{
                    duration: 180,
                    easing: "ease",
                }}
            >
                {activeTask ? (
                    <TaskCard
                        task={activeTask}
                        preview
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}