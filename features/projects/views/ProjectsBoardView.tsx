"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";

import {
    KanbanBoard,
    ProjectBoardSkeleton,
    ProjectTaskModal,
} from "@/features/projects/components";

import {
    useOverviewProject,
    useProjectColumns,
    useProjectMembers,
    useProjectModals,
} from "../hooks";

import TaskDrawer from "@/features/tasks/views/TaskDrawer";

import {
    useCreateTask,
    useReorderTasks,
    useTasks,
} from "@/features/tasks/hooks";

import type {
    Task,
    TaskDrawer as TaskDrawerData,
    Tasks,
} from "@/features/tasks/types/tasks";
import { useWorkspaceMembers } from "@/features/members/hooks";

type ProjectsBoardViewProps = {
    workspaceSlug: string;
    projectSlug: string;
};

export default function ProjectsBoardView({
    workspaceSlug,
    projectSlug,
}: ProjectsBoardViewProps) {
    const [selectedTask, setSelectedTask] = useState<TaskDrawerData | null>(null);
    const { members: workspaceMembers } = useWorkspaceMembers(workspaceSlug);
    const { members: projectMembers } = useProjectMembers({
        workspaceSlug,
        projectSlug,
    });

    const availableMembers = workspaceMembers.filter((member) =>
        projectMembers.some(({ user_id }) => user_id === member.user.id),
    );

    const {
        project,
        isLoading: isProjectLoading,
    } = useOverviewProject(
        workspaceSlug,
        projectSlug,
    );

    const {
        tasks,
        setTasks,
        refetch: refetchTasks,
    } = useTasks(
        workspaceSlug,
        projectSlug,
    );

    const {
        columns,
        isLoading: isColumnsLoading,
    } = useProjectColumns({
        workspaceSlug,
        projectSlug,
    });

    const { task } = useProjectModals();
    const {
        handleCreateTask: createTask,
        isCreating,
    } = useCreateTask({
        workspaceSlug,
        projectSlug,

        onSuccess: async () => {
            await refetchTasks();
            task.close();
        },
    });

    const handleCreateTask = (columnId: number) => {
        task.openCreate(String(columnId));
    };

    const handleTaskSubmit = async (form: Task) => {
        if (task.modal.mode !== "create") {
            return;
        }

        await createTask({
            title: form.title,
            description: form.description ?? "",
            columnId: form.columnId ?? task.modal.column ?? "",
            priority: form.priority ?? "",
            assigneeId: form.assigneeId ?? "",
            startDate: form.startDate ?? "",
            dueDate: form.dueDate ?? "",
        });
    };

    const handleTaskClick = (task: Tasks) => {
        setSelectedTask({
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            due_date: task.due_date,

            column: {
                id: task.column.id,
                name: task.column.name,
                description: task.column.description,
                color: task.column.color,
                position: task.column.position,
            },

            assignee: task.assignee,
        });
    };

    const {
        handleReorderTasks,
        isReordering,
    } = useReorderTasks({
        workspaceSlug,
        projectSlug,
    });

    const handleReorderTask = async (reorderedTasks: Tasks[]) => {
        await handleReorderTasks({
            tasks: reorderedTasks.map((task) => {
                if (!task.column?.id) {
                    throw new Error(`Task ${task.id} does not have a column.`);
                }
                return {
                    id: task.id,
                    position: task.position,
                    column_id: task.column.id,
                };
            },
            ),
        });
    };

    if (isColumnsLoading || isProjectLoading) {
        return (
            <ProjectBoardSkeleton />
        );
    }

    if (!project) {
        return (
            <div className="p-6 text-sm text-muted-foreground">
                Project not found.
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <KanbanBoard
                tasks={tasks}
                setTasks={setTasks}
                columns={columns}
                disabled={isReordering}
                onCreateTask={handleCreateTask}
                onOpenTask={handleTaskClick}
                onReorderTask={handleReorderTask}
            />

            <AnimatePresence
                initial={false}
                mode="wait"
            >
                {selectedTask && (
                    <TaskDrawer
                        key={selectedTask.id}
                        task={selectedTask}
                        workspaceSlug={workspaceSlug}
                        projectSlug={projectSlug}
                        projectName={project.name}
                        columns={columns}
                        onClose={() => setSelectedTask(null)}
                        onTaskUpdated={async (changes) => {
                            setSelectedTask(
                                (currentTask) => {
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
                                },
                            );
                            await refetchTasks();
                        }}
                    />
                )}
            </AnimatePresence>

            <ProjectTaskModal
                open={task.modal.open}
                mode={task.modal.mode}
                task={task.modal.task}
                columnId={task.modal.column}
                users={availableMembers}
                columns={columns}
                isSubmitting={isCreating}
                onClose={task.close}
                onSubmit={handleTaskSubmit}
            />
        </div>
    );
}