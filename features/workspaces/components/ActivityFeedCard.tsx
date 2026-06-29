import { Activity } from "lucide-react";

import { Avatar } from "@/components/ui";

import type { WorkspaceActivity } from "../types/workspace";

interface ActivityFeedCardProps {
    activities: WorkspaceActivity[];
}

export function ActivityFeedCard({
    activities,
}: ActivityFeedCardProps) {
    return (
        <section className="rounded-2xl border border-border bg-card shadow-xl p-5">
            <div className="mb-4 flex items-center gap-2">
                <Activity
                    size={17}
                    className="text-muted-foreground"
                />

                <div>
                    <h2 className="text-base font-semibold text-foreground">
                        Activity Feed
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Recent workspace and project activities.
                    </p>
                </div>
            </div>

            <div className="space-y-1">
                {activities.map((activity, index) => {
                    const isLast = index === activities.length - 1;

                    return (
                        <div
                            key={activity.id}
                            className="flex items-stretch gap-3"
                        >
                            <div className="flex flex-col items-center">
                                <Avatar
                                    name={activity.user}
                                    size="sm"
                                />

                                {!isLast && (
                                    <div className="my-1 min-h-6 w-px flex-1 bg-border" />
                                )}
                            </div>

                            <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-4"}`}>
                                <p className="text-sm leading-relaxed text-foreground">
                                    <span className="font-medium">
                                        {activity.user}
                                    </span>{" "}
                                    {activity.action}{" "}
                                    <span className="font-medium text-primary">
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
        </section>
    );
}