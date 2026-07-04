import { Avatar } from "@/components/ui";

import { ACTIVITIES } from "@/features/activities/mocks/activities";
import { USERS } from "@/features/users/mocks/users";

import type { Projects } from "@/features/projects/types/projects";

import {
    Clock,
} from "lucide-react";


interface ProjectActivityProps {
    project: Projects;
}


export default function ProjectActivity({
    project,
}: ProjectActivityProps) {


    const activities = ACTIVITIES.data.filter(
        (activity) =>
            activity.project_id === project.id
    );


    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-5">
                    <h3 className="font-semibold text-foreground">
                        Project Activity Feed
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Latest project updates and changes
                    </p>
                </div>
                <div className="space-y-5">
                    {activities.map((activity, index) => {
                        const user = USERS.data.find(
                            item =>
                                item.id === activity.user_id
                        );
                        return (
                            <div
                                key={activity.id}
                                className="flex gap-3"
                            >
                                <div className="flex flex-col items-center">
                                    <Avatar
                                        name={user?.name ?? "Unknown"}
                                        size="sm"
                                    />
                                    {index < activities.length - 1 && (
                                        <div className="mt-2 h-6 w-px bg-border" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-foreground">
                                        <span className="font-semibold">
                                            {user?.name}
                                        </span>
                                        {" "}
                                        {activity.action}
                                        {" "}
                                        <span className="font-medium text-primary">
                                            {activity.target}
                                        </span>
                                    </p>
                                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock size={12} />
                                        {activity.created_at}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}