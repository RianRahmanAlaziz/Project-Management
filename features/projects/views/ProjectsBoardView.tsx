"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";

import {
    KanbanBoard,
    ProjectTaskModal,
} from "@/features/projects/components";
import {
    useOverviewProject,
    useProjectColumns,
    useProjectModals
} from "../hooks";
import TaskDrawer from "@/features/tasks/views/TaskDrawer";
import { useTasks } from "@/features/tasks/hooks";
import { TaskDrawer as TaskDrawerData, Tasks, } from "@/features/tasks/types/tasks";


type ProjectsBoardViewProps = {
    workspaceSlug: string;
    projectSlug: string;
};

export default function ProjectsBoardView({
    workspaceSlug,
    projectSlug,
}: ProjectsBoardViewProps) {
    const [selectedTask, setSelectedTask] = useState<TaskDrawerData | null>(null);

    const {
        project,
        isLoading: isProjectLoading,
    } = useOverviewProject(
        workspaceSlug,
        projectSlug,
    );

    const {
        tasks,
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

    const handleCreateTask = (columnId: number) => {
        task.openCreate(String(columnId));
    };

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
                columns={columns}
                onCreateTask={handleCreateTask}
                onOpenTask={handleTaskClick}
            />

            <AnimatePresence initial={false} mode="wait">
                {selectedTask && (
                    <TaskDrawer
                        key={selectedTask.id}
                        task={selectedTask}
                        workspaceSlug={workspaceSlug}
                        projectSlug={projectSlug}
                        projectName={project.name}
                        columns={columns}
                        onClose={() =>
                            setSelectedTask(null)
                        }
                        onTaskUpdated={async (
                            changes,
                        ) => {
                            setSelectedTask(
                                (currentTask) => {
                                    if (!currentTask) {
                                        return null;
                                    }

                                    return {
                                        ...currentTask,
                                        priority:
                                            changes.priority,
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
                users={[]}
                columns={columns}
                isSubmitting={false}
                onClose={task.close}
                onSubmit={async () => {
                    // Akan kita sambungkan ke useCreateTask
                    // pada tahap berikutnya.
                }}
            />
        </div>
    );
}