import { Avatar } from "@/components/ui";

import type { WorkspaceMember } from "../types/workspace";
import { RoleBadge } from "./RoleBadge";

interface TeamMembersCardProps {
    members: WorkspaceMember[];
}

export function TeamMembersCard({
    members,
}: TeamMembersCardProps) {
    return (
        <section className="rounded-2xl border border-border bg-card p-5 shadow-xl">
            <div className="mb-4">
                <h2 className="text-base font-semibold text-foreground">
                    Team Members
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    People who have access to your workspaces.
                </p>
            </div>

            <div className="divide-y divide-border">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                    >
                        <Avatar
                            name={member.name}
                            size="md"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">
                                {member.name}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                {member.email}
                            </p>
                        </div>

                        <RoleBadge role={member.role} />
                    </div>
                ))}
            </div>
        </section>
    );
}