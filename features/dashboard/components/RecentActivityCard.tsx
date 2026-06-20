import { Avatar } from "@/components/ui";
import { ACTIVITIES } from "@/features/dashboard/data/data";

export function RecentActivityCard() {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-semibold text-foreground">
                    Recent Activity
                </p>
            </div>

            <div className="space-y-4">
                {ACTIVITIES.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                        <Avatar name={activity.user} size="sm" />

                        <div className="min-w-0 flex-1">
                            <p className="text-sm text-foreground">
                                <span className="font-medium">{activity.user}</span>{" "}
                                {activity.action}{" "}
                                <span className="font-medium">{activity.target}</span>
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {activity.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}