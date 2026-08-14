"use client";

import { Tabs } from "@/components/ui";
import { WorkflowColumn } from "@/features/projects/types/workflow";

import {
    TaskMeta,
    TaskComment,
    TaskActivity,
    TaskAttachments,
} from "@/features/tasks/components";

import type { TaskDrawer } from "@/features/tasks/types/tasks";

interface TaskContentProps {
    task: TaskDrawer;
    columns: WorkflowColumn[];
    columnId: string;
    priority: string;
    setColumnId: (value: string) => void | Promise<void>;
    setPriority: (value: string) => void | Promise<void>;
    isUpdating: boolean;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function TaskContent({
    task,
    columns,
    columnId,
    priority,
    setColumnId,
    setPriority,
    isUpdating,
    activeTab,
    setActiveTab,
}: TaskContentProps) {
    return (
        <div className="flex-1 overflow-y-auto">
            {/* Title */}
            <div className="px-5 pb-3 pt-4">
                <h2 className="font-semibold leading-snug text-foreground">
                    {task.title}
                </h2>
            </div>

            <TaskMeta
                task={task}
                columns={columns}
                columnId={columnId}
                priority={priority}
                isUpdating={isUpdating}
                setColumnId={setColumnId}
                setPriority={setPriority}
            />

            {/* Description */}
            <div className="border-t border-border px-5 py-3">
                <p className="mb-2 text-base font-medium text-foreground">
                    Description
                </p>

                <p className="text-sm leading-relaxed text-muted-foreground">
                    {task.description || "No description provided."}
                </p>
            </div>

            {/* Tabs */}
            <div className="border-t border-border">
                <Tabs
                    tabs={[
                        "Comments",
                        "Attachments",
                        "Activity",
                    ]}
                    active={activeTab}
                    onChange={setActiveTab}
                />
            </div>

            <div className="px-5 py-4">
                {activeTab === "Comments" && (
                    <TaskComment />
                )}

                {activeTab === "Attachments" && (
                    <TaskAttachments />
                )}

                {activeTab === "Activity" && (
                    <TaskActivity />
                )}
            </div>
        </div>
    );
}