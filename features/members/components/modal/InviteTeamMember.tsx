"use client";

import { useEffect, useState } from "react";

import {
    Eye,
    UserCheck,
} from "lucide-react";

import {
    Modal,
    Button
} from "@/components/ui";
import { Combobox } from "@/components/ui/combobox";

import type {
    AvailableUser,
    WorkspaceMemberAssignableRole,
} from "@/features/members/types/workspaceMember";



interface InviteTeamMemberProps {
    open: boolean;
    users: AvailableUser[];
    isLoadingUsers?: boolean;
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (
        userId: number,
        role: WorkspaceMemberAssignableRole,
    ) => Promise<void> | void;
}

const ROLE_OPTIONS = [
    {
        value: "member",
        label: "Member",
        description:
            "Can create and update tasks",
        icon: (
            <UserCheck
                size={16}
                className="text-emerald-500"
            />
        ),
    },
    {
        value: "viewer",
        label: "Viewer",
        description: "Read-only access",
        icon: (
            <Eye
                size={16}
                className="text-slate-500"
            />
        ),
    },
];


export default function InviteTeamMember({
    open,
    users,
    isLoadingUsers = false,
    isSubmitting = false,
    onClose,
    onConfirm,
}: InviteTeamMemberProps) {

    const [selectedUserId, setSelectedUserId] = useState("");

    const [role, setRole] = useState<WorkspaceMemberAssignableRole>("member",);

    useEffect(() => {
        if (!open) {
            return;
        }
        setSelectedUserId("");
        setRole("member");
    }, [open]);

    const handleSubmit = async () => {
        if (!selectedUserId) {
            return;
        }

        await onConfirm(
            Number(selectedUserId),
            role,
        );
    };

    const userOptions = users.map((user) => ({
        value: String(user.id),
        label: user.email,
        description: user.name,
    }));

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Invite Team Member"
            size="md"
        >
            <div className="space-y-5">
                <Combobox
                    label="Email Address"
                    value={selectedUserId}
                    onValueChange={
                        setSelectedUserId
                    }
                    placeholder="Select user"
                    searchPlaceholder="Search name or email..."
                    searchable
                    options={userOptions}
                />

                <Combobox
                    label="Role"
                    value={role}
                    onValueChange={(value) =>
                        setRole(
                            value as WorkspaceMemberAssignableRole,
                        )
                    }
                    placeholder="Select role"
                    searchable={false}
                    options={ROLE_OPTIONS}
                />
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                    >
                        Send Invite
                    </Button>
                </div>
            </div>
        </Modal>
    );
}