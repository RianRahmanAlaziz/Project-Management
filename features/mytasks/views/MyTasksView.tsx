"use client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import {
    USERS,
    TASKS,
    PROJECTS,
    CHART_DATA,
} from "@/data/data";

import TaskDrawerView from "@/features/tasks/views/TaskDrawerView";
import MyTasksHeader from "../components/MyTasksHeader";
import MyTasksTabs from "../components/MyTasksTabs";
import MyTasksTable from "../components/MyTasksTable";

export default function MyTasksView() {
    const [filter, setFilter] = useState<"all" | "mine" | "overdue">("mine");
    const filtered = filter === "mine" ? TASKS.filter(t => t.assignee === "u1") :
        filter === "overdue" ? TASKS.filter(t => t.dueDate < "2026-06-17") : TASKS;

    const priorityDot: Record<string, string> = { High: "bg-destructive", Medium: "bg-warning", Low: "bg-muted-foreground" };
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);

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

            <AnimatePresence mode="wait">
                {openTaskId && (
                    <TaskDrawerView
                        key={openTaskId}
                        taskId={openTaskId}
                        onClose={() => setOpenTaskId(null)}
                    />
                )}
            </AnimatePresence>
        </div>

    )
}
