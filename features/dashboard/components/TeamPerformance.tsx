import React from 'react'
import { TASKS, USERS } from "@/data/data";

export default function TeamPerformance() {
    return (
        <div className="bg-card border border-border rounded-xl p-4">
            <p className="font-semibold text-foreground text-base mb-3">Team Performance</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {USERS.map((user) => {
                    const userTasks = TASKS.filter((t) => t.assignee === user.id);
                    const completed = userTasks.filter((t) => t.column === "Done").length;
                    const rate = userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0;
                    return (
                        <div key={user.id} className="text-center p-3 rounded-lg bg-muted/40">
                            <div className="flex justify-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-base font-bold">
                                    {user.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                            </div>
                            <p className="text-base font-medium text-foreground truncate">{user.name.split(" ")[0]}</p>
                            <p className="text-lg font-bold text-primary">{rate}%</p>
                            <p className="text-xs text-muted-foreground">completion</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
