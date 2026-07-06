import {
    Activity,
    Star,
} from "lucide-react";

import { Avatar } from "@/components/ui";

import { ACTIVITIES } from "@/features/activities/mocks/activities";
import { PROJECTS } from "@/features/projects/mocks/projects";
import { TASKS } from "@/features/tasks/mocks/tasks";
import { USERS } from "@/features/users/mocks/users";

import type { Workspace } from "@/features/workspaces/types/workspace";

interface WorkspaceActivityProps {
    workspace: Workspace;
}

export default function WorkspaceActivity({
    workspace,
}: WorkspaceActivityProps) {

    const workspaceProjects =
        PROJECTS.data.filter(
            project =>
                project.workspace_id === workspace.id
        );

    const projectIds =
        workspaceProjects.map(
            project => project.id
        );

    const workspaceTasks =
        TASKS.data.filter(
            task =>
                projectIds.includes(task.project_id)
        );

    const workspaceMembers =
        USERS.data.filter(
            user =>
                workspace.member_id.includes(user.id)
        );

    const workspaceActivities =
        ACTIVITIES.data.filter(
            activity =>
                activity.workspace_id === workspace.id
        );

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <Activity
                        size={18}
                        className="text-muted-foreground"
                    />
                    <p className="font-semibold">
                        Recent Activity
                    </p>
                </div>
                <div className="space-y-4">
                    {workspaceActivities.slice(0, 4).map(
                        (activity, index) => {
                            const user =
                                USERS.data.find(
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
                                            name={
                                                user?.name ??
                                                "Unknown"
                                            }
                                            size="sm"
                                        />
                                        {
                                            index <
                                            workspaceActivities.length - 1
                                            &&
                                            (
                                                <div className="mt-2 h-4 w-px bg-border" />
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className="text-sm">
                                            <span className="font-medium">
                                                {user?.name}
                                            </span>
                                            {" "}
                                            {activity.action}
                                            {" "}
                                            <span className="text-primary font-medium">
                                                {activity.target}
                                            </span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {activity.created_at}
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <Star
                        size={16}
                        className="text-muted-foreground"
                    />
                    <p className="font-semibold">
                        Top Contributors
                    </p>
                </div>
                <div className="space-y-4">
                    {workspaceMembers.slice(0, 5).map(
                        (member, index) => {
                            const memberTasks =
                                workspaceTasks.filter(
                                    task =>
                                        task.assignee_id === member.id
                                );
                            const completed =
                                memberTasks.filter(
                                    task =>
                                        task.status === "Done"
                                ).length;
                            return (
                                <div
                                    key={member.id}
                                    className="flex items-center gap-3"
                                >
                                    <span className="w-5 text-sm text-muted-foreground">
                                        #{index + 1}
                                    </span>
                                    <Avatar
                                        name={member.name}
                                        size="sm"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            {member.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {memberTasks.length} tasks assigned
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-success">
                                            {completed}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            done
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
}