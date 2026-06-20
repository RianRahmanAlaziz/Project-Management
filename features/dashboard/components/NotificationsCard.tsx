"use client";

import { Avatar } from "@/components/ui";
import { NOTIFICATIONS } from "@/features/dashboard/data/data";

interface NotificationsCardProps {
    onNavigate: (page: string) => void;
}

export function NotificationsCard({ onNavigate }: NotificationsCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-semibold text-foreground">
                    Notifications
                </p>

                <button
                    type="button"
                    onClick={() => onNavigate("notifications")}
                    className="cursor-pointer text-sm text-primary hover:underline"
                >
                    View all
                </button>
            </div>

            <div className="space-y-3">
                {NOTIFICATIONS.slice(0, 4).map((notification) => (
                    <div
                        key={notification.id}
                        className={`flex items-start gap-3 rounded-xl px-3 py-2 ${!notification.read ? "bg-accent/50" : ""
                            }`}
                    >
                        <Avatar name={notification.user} size="sm" />

                        <div className="min-w-0 flex-1">
                            <p className="text-sm leading-relaxed text-foreground">
                                <span className="font-medium">{notification.user}</span>{" "}
                                {notification.action}{" "}
                                <span className="font-medium">{notification.target}</span>
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {notification.time}
                            </p>
                        </div>

                        {!notification.read && (
                            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}