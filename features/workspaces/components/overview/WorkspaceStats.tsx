"use client";

import { ReactNode } from "react";

type WorkspaceStatsProps = {
    icon: ReactNode;
    label: string;
    value: number | string;
    color: string;
};

export default function WorkspaceStats({
    icon,
    label,
    value,
    color,
}: WorkspaceStatsProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                </p>
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${color}`}
                >
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-3xl font-bold text-foreground">{value}</p>
                {/* {change && (
                    <p className="mt-1 text-xs text-success">
                        {change}
                    </p>
                )} */}
            </div>
        </div>
    );
}