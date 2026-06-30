"use client";

import { Avatar } from "@/components/ui";

const TASK_ACTIVITIES = [
    { id: "la1", user: "Alex Rivera", action: "created this task", time: "3 days ago" },
    { id: "la2", user: "Sarah Chen", action: "changed priority from Low → High", time: "2 days ago" },
    { id: "la3", user: "Alex Rivera", action: "assigned to Marcus Johnson", time: "1 day ago" },
    { id: "la4", user: "Marcus Johnson", action: "moved from Todo → In Progress", time: "5h ago" },
    { id: "la5", user: "Sarah Chen", action: "added label: Frontend", time: "2h ago" },
];

export default function TaskActivity() {
    return (
        <div className="space-y-3">
            {TASK_ACTIVITIES.map((activity, i) => (
                <div key={activity.id} className="flex items-start gap-2.5">
                    <div className="relative flex flex-col items-center">
                        <Avatar name={activity.user} size="sm" />
                        {i < TASK_ACTIVITIES.length - 1 && <div className="w-px h-full bg-border mt-1 absolute top-5" />}
                    </div>
                    <div className="flex-1 pb-2">
                        <p className="text-base text-foreground">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
