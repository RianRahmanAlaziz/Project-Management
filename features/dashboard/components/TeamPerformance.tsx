import React from 'react'
import { TASKS, USERS } from "@/data/data";
import { Avatar, ProgressBar } from '@/components/ui';

export default function TeamPerformance() {
    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-xl">
            <p className="font-semibold text-foreground text-base mb-3">Team Performance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                {USERS.map((user) => {
                    const userTasks = TASKS.filter((t) => t.assignee === user.id);
                    const completed = userTasks.filter((t) => t.column === "Done").length;
                    const rate = userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0;
                    const performance = USERS.map((user) => {
                        const userTasks = TASKS.filter(
                            task => task.assignee === user.id
                        );
                        const completed =
                            userTasks.filter(
                                task => task.column === "Done"
                            ).length;
                        const rate =
                            userTasks.length > 0
                                ? Math.round(
                                    completed /
                                    userTasks.length *
                                    100
                                )
                                : 0;
                        return {
                            user,
                            completed,
                            total: userTasks.length,
                            rate,
                        };

                    }).sort((a, b) => b.rate - a.rate);
                    return (
                        <div key={user.id}
                            className="group rounded-2xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <Avatar
                                    name={user.name}
                                    size="lg"
                                />
                                <span className="text-2xl font-bold text-primary">
                                    {rate}%
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold">
                                    {user.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {user.role}
                                </p>
                            </div>
                            <div className="mt-4">
                                <ProgressBar
                                    value={rate}
                                />
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {completed}/{userTasks.length}
                                    Tasks
                                </span>
                                <span className="font-medium">
                                    {rate}% Done
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
