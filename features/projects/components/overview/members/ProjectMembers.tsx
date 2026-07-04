
import { Plus } from "lucide-react";
import { Avatar, Button, ProgressBar } from "@/components/ui";

import {
    ProjectMemberActionsMenu,
}
    from "@/features/projects/components";
import type { Tasks } from "@/features/tasks/types/tasks";
import type { Users } from "@/features/users/types/users";

interface ProjectMembersProps {
    members: Users[];
    tasks: Tasks[];
    onRole?: (member: Users) => void;
    onRemove?: (member: Users) => void;
}

export default function ProjectMembers({
    members,
    tasks,
    onRole,
    onRemove,
}: ProjectMembersProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {members.length} Members
                </p>
                <Button
                    size="md"
                    variant="primary"
                >
                    <Plus size={14} />
                    Add Member
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {members.map((member) => {
                    const memberTasks = tasks.filter(
                        (task) =>
                            task.assignee_id === member.id
                    );
                    const completed =
                        memberTasks.filter(
                            (task) =>
                                task.status === "Done"
                        ).length;
                    const completionRate =
                        memberTasks.length === 0
                            ? 0
                            : Math.round(
                                (completed / memberTasks.length) * 100
                            );
                    return (
                        <div
                            key={member.id}
                            className="rounded-xl border border-border bg-card p-5 shadow-sm"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        name={member.name}
                                        size="md"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-foreground">
                                            {member.name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                                <ProjectMemberActionsMenu
                                    member={member}
                                    onRole={onRole}
                                    onRemove={onRemove}
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Assigned
                                    </span>
                                    <span className="font-medium">
                                        {memberTasks.length}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Completed
                                    </span>
                                    <span className="font-medium text-success">
                                        {completed}
                                    </span>
                                </div>
                                <ProgressBar
                                    value={completionRate}
                                    color={
                                        completionRate >= 70
                                            ? "green"
                                            : completionRate >= 40
                                                ? "indigo"
                                                : "yellow"
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    {completionRate}% completion rate
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}