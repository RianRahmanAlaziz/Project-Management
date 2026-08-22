"use client";

import { useState } from "react";
import type {
    Dispatch,
    SetStateAction,
} from "react";

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
    DragOverEvent,
} from "@dnd-kit/core";

import {
    arrayMove,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import {
    KanbanColumn,
    TaskCard,
} from "@/features/projects/components";

import type { Tasks } from "@/features/tasks/types/tasks";
import type { WorkflowColumn } from "../../types/workflow";

interface KanbanBoardProps {
    tasks: Tasks[];
    columns: WorkflowColumn[];
    setTasks: Dispatch<SetStateAction<Tasks[]>>;

    disabled?: boolean;

    onCreateTask: (columnId: number) => void;
    onOpenTask: (task: Tasks) => void;
    onReorderTask: (tasks: Tasks[]) => Promise<void>;
}

const collisionDetection = (args: any) => {
    const pointerIntersections = pointerWithin(args);
    const collisions = pointerIntersections.length ? pointerIntersections : rectIntersection(args);
    const overId = getFirstCollision(collisions, "id");

    if (!overId) {
        return [];
    }

    return collisions;
};

export default function KanbanBoard({
    tasks,
    columns,
    setTasks,
    disabled = false,
    onCreateTask,
    onOpenTask,
    onReorderTask,
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

    const [activeTask, setActiveTask] = useState<Tasks | null>(null);
    const [overTaskId, setOverTaskId] = useState<number | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        if (disabled) {
            return;
        }
        const task = event.active.data.current?.task;

        if (task) {
            setActiveTask(task);
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        if (disabled) {
            return;
        }
        const { active, over } = event;

        if (!over || over.data.current?.type !== "task") {
            setOverTaskId(null);
            return;
        }

        if (Number(active.id) === Number(over.id)) {
            setOverTaskId(null);
            return;
        }

        setOverTaskId(Number(over.id));
    };

    const handleDragCancel = () => {
        setActiveTask(null);
        setOverTaskId(null);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        if (disabled) {
            setActiveTask(null);
            setOverTaskId(null);
            return;
        }

        const { active, over } = event;

        setActiveTask(null);
        setOverTaskId(null);

        if (!over) {
            return;
        }

        const activeId = Number(active.id);

        const activeTask = tasks.find(
            (task) => task.id === activeId,
        );

        if (!activeTask) {
            return;
        }

        let targetColumnId: | number | null = null;

        /**
         * Drop langsung ke column.
         */
        if (
            over.data.current?.type === "column"
        ) {
            targetColumnId = Number(
                String(over.id).replace(
                    "column-",
                    "",
                ),
            );
        }

        /**
         * Drop ke task.
         */
        if (
            over.data.current?.type === "task"
        ) {
            const overTask = tasks.find(
                (task) => task.id === Number(over.id),
            );

            targetColumnId = overTask?.column?.id ?? null;
        }

        if (!targetColumnId) {
            return;
        }

        const targetColumn = columns.find(
            (column) => column.id === targetColumnId,
        );

        if (!targetColumn) {
            return;
        }

        /**
         * =====================================
         * MOVE TO ANOTHER COLUMN
         * =====================================
         */
        if (
            activeTask.column?.id !== targetColumnId
        ) {
            const previousTasks = tasks;

            const targetTasks = tasks
                .filter((task) => task.column?.id === targetColumnId)
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

            const overIndex = over.data.current?.type === "task" ? targetTasks.findIndex((task) => task.id === Number(over.id)) : targetTasks.length;
            const insertIndex = overIndex === -1 ? targetTasks.length : overIndex;

            const movedTask = {
                ...activeTask,
                column: targetColumn,
            };

            const newTargetTasks =
                [
                    ...targetTasks.slice(0, insertIndex),
                    movedTask,
                    ...targetTasks.slice(insertIndex),
                ].map(
                    (task, index) => ({
                        ...task,
                        position: index + 1,
                    }),
                );

            const sourceTasks = tasks
                .filter((task) => task.column?.id === activeTask.column?.id && task.id !== activeId)
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                .map((task, index) => ({ ...task, position: index + 1 }));

            const updatedTaskMap = new Map(
                [
                    ...sourceTasks,
                    ...newTargetTasks,
                ].map((task) => [
                    task.id,
                    task,
                ]),
            );

            const reorderedTasks = tasks.map(
                (task) => updatedTaskMap.get(task.id,) ?? task);
            setTasks(reorderedTasks);

            try {
                await onReorderTask(
                    [
                        ...sourceTasks,
                        ...newTargetTasks,
                    ],
                );
            } catch {
                setTasks(previousTasks);
            }

            return;
        }

        /**
         * =====================================
         * REORDER IN SAME COLUMN
         * =====================================
         */

        if (
            over.data.current?.type !== "task"
        ) {
            return;
        }

        const overId = Number(over.id);

        if (
            activeId === overId
        ) {
            return;
        }

        const columnTasks = tasks
            .filter((task) => task.column?.id === targetColumnId)
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

        const oldIndex = columnTasks.findIndex((task) => task.id === activeId);

        const newIndex = columnTasks.findIndex((task) => task.id === overId);

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        const reorderedColumnTasks = arrayMove(
            columnTasks,
            oldIndex,
            newIndex,
        ).map(
            (task, index) => ({
                ...task,
                position: index + 1,
            }),
        );

        const previousTasks = tasks;

        const reorderedTasks = tasks.map(
            (task) => {
                const updatedTask = reorderedColumnTasks.find(
                    (item) => item.id === task.id,
                );

                return (
                    updatedTask ?? task
                );
            },
        );

        setTasks(reorderedTasks);

        try {
            await onReorderTask(reorderedColumnTasks);
        } catch {
            setTasks(previousTasks);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <div className={[
                "overflow-x-auto overflow-y-hidden",
                disabled
                    ? "cursor-not-allowed"
                    : "",
            ].join(" ")}>
                <div className="flex gap-3 p-4">
                    {columns.filter((column) => column.enabled).map((column) => {
                        const columnTasks = tasks.filter((task) => task.column?.id === column.id).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
                        return (
                            <KanbanColumn
                                key={column.id}
                                column={column}
                                tasks={columnTasks}
                                overTaskId={overTaskId}
                                disabled={disabled}
                                onCreateTask={onCreateTask}
                                onOpenTask={onOpenTask}
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