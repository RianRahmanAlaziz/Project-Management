"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { CHART_DATA } from "@/data/data";

export function TaskCompletionChart() {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-base font-semibold text-foreground">
                        Task Completion Trend
                    </p>
                    <p className="text-sm text-muted-foreground">Last 9 days</p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                        Completed
                    </span>

                    <span className="flex items-center gap-1.5">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-muted-foreground" />
                        Created
                    </span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={CHART_DATA}>
                    <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            fontSize: "12px",
                        }}
                        labelStyle={{ color: "var(--foreground)" }}
                    />

                    <Area
                        type="monotone"
                        dataKey="created"
                        stroke="var(--muted-foreground)"
                        strokeWidth={1.5}
                        fill="none"
                        strokeDasharray="4 2"
                        dot={false}
                    />

                    <Area
                        type="monotone"
                        dataKey="completed"
                        stroke="#4F46E5"
                        strokeWidth={2.5}
                        fill="url(#colorCompleted)"
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}