"use client";

import { Tabs } from '@/components/ui'

import {
    TaskMeta,
    TaskComment,
    TaskActivity,
    TaskAttachments,
} from "@/features/tasks/components";

import type { Tasks } from '@/features/tasks/types/tasks'

interface Users {
    id: number | string;
    name: string;
    email: string;
    role: string;
}

interface TaskContentProps {
    task: Tasks;
    assignee?: Users;
    status: string;
    priority: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setPriority: React.Dispatch<React.SetStateAction<string>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}


export default function TaskContent({
    task,
    assignee,
    status,
    priority,
    setStatus,
    setPriority,
    activeTab,
    setActiveTab,
}: TaskContentProps) {
    return (
        <div className="flex-1 overflow-y-auto">
            {/* Title */}
            <div className="px-5 pt-4 pb-3">
                <h2 className="font-semibold text-foreground leading-snug">{task.title}</h2>
            </div>

            <TaskMeta
                task={task}
                assignee={assignee}
                status={status}
                priority={priority}
                setStatus={setStatus}
                setPriority={setPriority}
            />

            {/* Description */}
            <div className="px-5 py-3 border-t border-border">
                <p className="text-base font-medium text-foreground mb-2">Description</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    This task involves implementing the {task.title.toLowerCase()} feature. The implementation should follow
                    the design specifications and maintain consistency with our component library. Performance and accessibility
                    are key considerations.
                </p>
            </div>

            {/* Tabs */}
            <div className="border-t border-border">
                <Tabs
                    tabs={["Comments", "Attachments", "Activity"]}
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
    )
}
