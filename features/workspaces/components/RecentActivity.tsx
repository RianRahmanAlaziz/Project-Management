"use client";

import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    MessageSquare,
    MoveRight,
    PlusCircle,
    Upload,
    UserPlus
} from "lucide-react";

import { ACTIVITIES } from "@/data/data";

const icons = {
    plus: PlusCircle,
    move: MoveRight,
    comment: MessageSquare,
    upload: Upload,
    check: CheckCircle2,
    user: UserPlus,
} as const;

export default function RecentActivity() {
    return (
        <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Recent Activity
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Latest updates from your workspace
                    </p>
                </div>
                <Link
                    href="#"
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                    View all
                    <ArrowRight size={15} />
                </Link>
            </div>
            <div className="divide-y divide-border">
                {ACTIVITIES.slice(0, 5).map((activity) => {
                    const Icon =
                        icons[
                        activity.icon as keyof typeof icons
                        ];
                    return (
                        <div
                            key={activity.id}
                            className="flex gap-4 p-5"
                        >
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm">
                                    <span className="font-semibold">
                                        {activity.user}
                                    </span>{" "}
                                    {activity.action}{" "}
                                    <span className="font-medium">
                                        {activity.target}
                                    </span>
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}