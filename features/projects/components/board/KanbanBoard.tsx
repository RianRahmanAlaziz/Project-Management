import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { KANBAN_COLUMNS } from "@/data/data";
import {
    KanbanColumn,
}
    from "@/features/projects/components";
import type { Tasks } from "@/features/tasks/types/tasks";
import { TaskCard } from "@/features/tasks/components";

import {
    DndContext,
    DragOverlay,
    pointerWithin,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    rectIntersection,
    getFirstCollision,
    closestCorners,
} from "@dnd-kit/core";

import type {
    DragStartEvent,
    DragEndEvent,
} from "@dnd-kit/core";

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const collisionDetection = (args: any) => {

    const pointerIntersections =
        pointerWithin(args);

    const collisions =
        pointerIntersections.length
            ? pointerIntersections
            : rectIntersection(args);

    const overId =
        getFirstCollision(collisions, "id");

    if (!overId) {
        return [];
    }

    return collisions;
};

const colColors: Record<string, string> = {
    Backlog: "text-muted-foreground",
    Todo: "text-blue-500",
    "In Progress": "text-warning",
    Review: "text-purple-500",
    Done: "text-success",
};

const colBg: Record<string, string> = {
    Backlog: "bg-muted/40",
    Todo: "bg-blue-500/5",
    "In Progress": "bg-amber-500/5",
    Review: "bg-purple-500/5",
    Done: "bg-green-500/5",
};

const COLUMN_STYLES = {
    Backlog: {
        text: "text-muted-foreground",
        bg: "bg-muted/40",
        border: "border-border",
        ring: "",
        hoverBorder: "hover:border-muted-foreground",
    },
    Todo: {
        text: "text-blue-500",
        bg: "bg-blue-500/5",
        border: "border-blue-500",
        ring: "ring-blue-500",
        hoverBorder: "hover:border-blue-500",
    },
    "In Progress": {
        text: "text-amber-500",
        bg: "bg-amber-500/5",
        border: "border-amber-500",
        ring: "ring-amber-500",
        hoverBorder: "hover:border-amber-500",
    },
    Review: {
        text: "text-purple-500",
        bg: "bg-purple-500/5",
        border: "border-purple-500",
        ring: "ring-purple-500",
        hoverBorder: "hover:border-purple-500",
    },
    Done: {
        text: "text-emerald-500",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500",
        ring: "ring-emerald-500",
        hoverBorder: "hover:border-emerald-500",
    },
} as const;

interface KanbanBoardProps {
    tasks: Tasks[];
    setTasks: Dispatch<SetStateAction<Tasks[]>>;
    onCreateTask: (column: string) => void;
    onOpenTask: (taskId: number) => void;
}

export default function KanbanBoard({
    tasks,
    setTasks,
    onOpenTask,
    onCreateTask,
}: KanbanBoardProps) {


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const [activeTask, setActiveTask] =
        useState<Tasks | null>(null);

    const handleDragStart = (
        event: DragStartEvent
    ) => {

        const task = event.active.data.current?.task;

        if (task) {
            setActiveTask(task);
        }

    };

    const handleDragEnd = ({
        active,
        over,
    }: DragEndEvent) => {

        setActiveTask(null);

        if (!over) return;
        if (active.id === over.id) return;

        const draggedTask =
            active.data.current?.task as Tasks;

        if (!draggedTask) return;

        const overData = over.data.current;

        setTasks(prev => {

            const items = [...prev];

            const activeIndex = items.findIndex(
                item => item.id === draggedTask.id
            );

            if (activeIndex === -1) return prev;

            // ============================
            // DROP DI ATAS TASK
            // ============================

            if (overData?.type === "task") {

                const targetTask =
                    overData.task as Tasks;

                const overIndex = items.findIndex(
                    item => item.id === targetTask.id
                );

                if (overIndex === -1) return prev;

                items[activeIndex] = {
                    ...items[activeIndex],
                    status: targetTask.status,
                };

                return arrayMove(
                    items,
                    activeIndex,
                    overIndex
                );
            }

            // ============================
            // DROP KE COLUMN
            // ============================

            if (overData?.type === "column") {

                const targetColumn =
                    overData.column;

                items[activeIndex] = {
                    ...items[activeIndex],
                    status: targetColumn,
                };

                // cari task terakhir pada column tujuan
                const lastIndex =
                    [...items]
                        .map((task, index) => ({
                            task,
                            index,
                        }))
                        .filter(
                            item =>
                                item.task.status === targetColumn &&
                                item.task.id !== draggedTask.id
                        )
                        .at(-1)?.index;

                if (lastIndex === undefined) {
                    return items;
                }

                return arrayMove(
                    items,
                    activeIndex,
                    lastIndex + 1
                );
            }

            return prev;
        });
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetection}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="overflow-x-auto overflow-y-hidden">
                <div className="flex gap-3 p-4 ">
                    {
                        KANBAN_COLUMNS.map((column) => (
                            <KanbanColumn
                                key={column}
                                column={column}
                                color={colColors[column]}
                                background={colBg[column]}
                                tasks={tasks.filter(
                                    task => task.status === column
                                )}
                                style={COLUMN_STYLES[column]}
                                onCreateTask={onCreateTask}
                                onOpenTask={onOpenTask}
                            />
                        ))
                    }
                </div >
            </div >
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
                        style={COLUMN_STYLES[
                            activeTask.status as keyof typeof COLUMN_STYLES
                        ]}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}