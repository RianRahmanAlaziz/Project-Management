"use client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { TASKS } from "@/features/tasks/mocks/tasks";

import {
    MyTasksHeader,
    MyTasksTabs,
    MyTasksTable
} from "@/features/tasks/components";

import TaskDrawer from "@/features/tasks/views/TaskDrawer";


export default function MyTasksView() {
    const [filter, setFilter] = useState<"all" | "mine" | "overdue">("mine");

    const filtered = filter === "mine" ? TASKS.data.filter(task => task.assignee_id === 1) : filter === "overdue" ? TASKS.data.filter(task => task.due_date < "2026-06-17") : TASKS.data;

    const [openTaskId, setOpenTaskId] = useState<number | null>(null);

    return (
        <div className="px-6 py-8 xl:px-8">
            <MyTasksHeader
                filtered={filtered.length}
            />

            <MyTasksTabs
                activeTab={filter}
                onChange={setFilter}
            />

            <MyTasksTable
                tasks={filtered}
                onTaskClick={setOpenTaskId}
            />

            <AnimatePresence initial={false} mode="wait">
                {openTaskId && (
                    <TaskDrawer
                        key={openTaskId}
                        taskId={openTaskId}
                        onClose={() => setOpenTaskId(null)}
                    />
                )}
            </AnimatePresence>
        </div>

    )
}
