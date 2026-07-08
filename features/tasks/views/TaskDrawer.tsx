import { useState } from "react";
import { motion } from "motion/react";

import { USERS } from "@/features/users/mocks/users";
import { TASKS } from "@/features/tasks/mocks/tasks";

import {
    TaskHeader,
    TaskContent,
    TaskCommentInput,
} from "@/features/tasks/components";

interface TaskDrawerProps {
    taskId: number | string;
    onClose: () => void;
}

export default function TaskDrawer({
    taskId,
    onClose,
}: TaskDrawerProps) {

    const task = TASKS.data.find(
        (item) => item.id === Number(taskId)
    );
    const [activeTab, setActiveTab] = useState("Comments");
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState(task?.status ?? "Todo");
    const [priority, setPriority] = useState(task?.priority ?? "Medium");


    if (!task) return null;

    const assignee =
        USERS.data.find(
            user =>
                user.id === task.assignee_id
        );

    const handleSendComment = (message: string) => {
        console.log("Send Comment:", message);

        // nanti diganti API Laravel
    };

    return (
        <div className="fixed inset-0 z-40 flex">
            <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.2,
                    ease: "easeOut",
                }}
            />

            <motion.div
                initial={{
                    x: "100%",
                    opacity: 0.9,
                    scale: 0.98,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                }}
                exit={{
                    x: "100%",
                    opacity: 0.9,
                    scale: 0.98,
                }}
                transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                    mass: 0.9,
                }}
                className="relative ml-auto flex h-full w-full max-w-130 flex-col overflow-hidden border-l border-border bg-card shadow-2xl"
            >
                <TaskHeader
                    task={task}
                    status={status}
                    onClose={onClose}
                />

                <TaskContent
                    task={task}
                    assignee={assignee}
                    status={status}
                    priority={priority}
                    setStatus={setStatus}
                    setPriority={setPriority}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {activeTab === "Comments" && (
                    <TaskCommentInput
                        comment={comment}
                        setComment={setComment}
                        onSend={handleSendComment}
                    />
                )}
            </motion.div>
        </div>
    );
}
