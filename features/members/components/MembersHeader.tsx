import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import {
    USERS,
} from "@/data/data";

interface MembersHeaderProps {
    onInviteMembers: () => void;
}


export default function MembersHeader({
    onInviteMembers,
}: MembersHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Members
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {USERS.length} members in this workspace
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
