"use client";
import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";

import {
    MyTasksHeader,
    MyTasksTabs,
    MyTasksTable,
    MyTasksSkeleton
} from "@/features/tasks/components";

import type {
    MyTasks,
    TaskDrawer as TaskDrawerData,
} from "../types/tasks";
import { useProjectColumns } from "@/features/projects/hooks";
import TaskDrawer from "@/features/tasks/views/TaskDrawer";
import { useMyTasks } from "../hooks";
import { CheckSquare } from "lucide-react";




export default function MyTasksView() {
    const [filter, setFilter] = useState<"all" | "overdue">("all");
    const [selectedTask, setSelectedTask] = useState<MyTasks | null>(null);

    const {
        myTasks,
        isLoading,
        error,
    } = useMyTasks();
    const isOverdue = filter === "overdue";
    const filteredTasks = useMemo(() => {
        if (filter === "all") {
            return myTasks;
        }

        const now = new Date();

        return myTasks.filter((task) => {
            if (task.column.name === "Done") {
                return false;
            }

            if (!task.due_date) {
                return false;
            }

            return new Date(task.due_date) < now;
        });
    }, [myTasks, filter]);

    const drawerTask: TaskDrawerData | null = selectedTask
        ? {
            id: selectedTask.id,
            title: selectedTask.title,
            description: selectedTask.description,
            priority: selectedTask.priority,
            due_date: selectedTask.due_date,

            column: {
                id: selectedTask.column.id,
                name: selectedTask.column.name,
                description: selectedTask.column.description,
                color: selectedTask.column.color,
                position: selectedTask.column.position,
            },
        }
        : null;

    const {
        columns,
    } = useProjectColumns({
        workspaceSlug: selectedTask?.workspace.slug ?? "",
        projectSlug: selectedTask?.project.slug ?? "",
    });

    if (isLoading) {
        return <MyTasksSkeleton />;
    }

    if (error) {
        return (
            <div className="px-6 py-8 xl:px-8">
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-10 text-center">
                    <h3 className="text-sm font-semibold text-destructive">
                        Failed to load tasks
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 py-8 xl:px-8">
            <MyTasksHeader
                filtered={filteredTasks.length}
            />

            <MyTasksTabs
                activeTab={filter}
                onChange={setFilter}
            />

            {filteredTasks.length === 0 ? (
                <div className="rounded-xl border border-border bg-card px-6 py-14 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <CheckSquare
                            size={22}
                            className="text-primary"
                        />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-foreground">
                        {isOverdue ? "No overdue tasks" : "No tasks yet"}
                    </h3>

                    <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                        {isOverdue ? "You don't have any overdue tasks." : "You don't have any tasks assigned to you yet."}
                    </p>
                </div>
            ) : (
                <MyTasksTable
                    tasks={filteredTasks}
                    onTaskClick={setSelectedTask}
                />
            )}

            <AnimatePresence initial={false} mode="wait">
                {selectedTask && drawerTask && (
                    <TaskDrawer
                        key={drawerTask.id}
                        task={drawerTask}
                        workspaceSlug={selectedTask.workspace.slug}
                        projectSlug={selectedTask.project.slug}
                        projectName={selectedTask.project.name}
                        onClose={() => setSelectedTask(null)}
                        columns={columns}
                        onTaskUpdated={(changes) => {
                            setSelectedTask((currentTask) => {
                                if (!currentTask) {
                                    return null;
                                }

                                return {
                                    ...currentTask,
                                    priority: changes.priority,
                                    column: {
                                        ...currentTask.column,
                                        ...changes.column,
                                    },
                                };
                            });
                        }}
                    />
                )}
            </AnimatePresence>
        </div>

    )
}
