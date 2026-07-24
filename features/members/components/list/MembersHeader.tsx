import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { WorkspaceMember } from "../../types/workspaceMember";

interface MembersHeaderProps {
    members: WorkspaceMember[];
    onInviteMembers: () => void;
}


export default function MembersHeader({
    members,
    onInviteMembers,
}: MembersHeaderProps) {
    const memberCount = members.length;
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Members
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {memberCount}{" "}
                    {memberCount === 1
                        ? "member"
                        : "members"}{" "}
                    in this workspace
                </p>
            </div>

            <Button
                type="button"
                onClick={onInviteMembers}
                size="lg"
                variant="primary"
                className="w-full sm:w-auto"
            >
                <Plus size={16} />
                New Members
            </Button>
        </div>
    )
}
