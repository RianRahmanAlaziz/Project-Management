"use client";

import {
    USERS,
    TASKS,
    PROJECTS,
    CHART_DATA,
} from "@/data/data";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar,
} from "recharts";

export default function AnalyticsView() {
    const barData = PROJECTS.map((p: typeof PROJECTS[0]) => ({ name: p.name.split(" ")[0], tasks: p.tasks, progress: p.progress }));
    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full  space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Analytics
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Track your team performance and project health
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-card border border-border rounded-xl p-4">
                        <p className="font-semibold text-foreground text-base mb-3">Task Completion Trend</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={CHART_DATA}>
                                <defs>
                                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                                <Area type="monotone" dataKey="created" stroke="#94A3B8" strokeWidth={1.5} fill="none" dot={false} />
                                <Area type="monotone" dataKey="completed" stroke="#4F46E5" strokeWidth={2} fill="url(#g1)" dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-4">
                        <p className="font-semibold text-foreground text-base mb-3">Project Task Counts</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={barData} barSize={20}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                                <Bar dataKey="tasks" fill="#4F46E5" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="progress" fill="#22C55E" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                {/* Team stats */}
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

            </div>
        </div>
    )
}
