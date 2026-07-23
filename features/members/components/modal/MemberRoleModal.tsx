"use client";

import { useEffect, useState } from "react";
import {
    Eye,
    UserCheck,
} from "lucide-react";

import {
    Button,
    Modal,
} from "@/components/ui";

import { Combobox } from "@/components/ui/combobox";

import type {
    WorkspaceMember,
    WorkspaceMemberAssignableRole,
} from "@/features/members/types/workspaceMember";

interface MemberRoleModalProps {
    open: boolean;
    member: WorkspaceMember | null;
    isSubmitting?: boolean;

    onClose: () => void;

    onConfirm: (
        member: WorkspaceMember,
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
        description:
            "Read-only access",
        icon: (
            <Eye
                size={16}
                className="text-slate-500"
            />
        ),
    },
];

export default function MemberRoleModal({
    open,
    member,
    isSubmitting = false,
    onClose,
    onConfirm,
}: MemberRoleModalProps) {
    const [role, setRole] =
        useState<WorkspaceMemberAssignableRole>(
            "member",
        );

    useEffect(() => {
        if (!open || !member) {
            return;
        }

        if (
            member.role === "member" ||
            member.role === "viewer"
        ) {
            setRole(member.role);
        }
    }, [open, member]);

    if (!member) {
        return null;
    }

    const hasRoleChanged =
        role !== member.role;

    const handleSubmit = async () => {
        if (
            !hasRoleChanged ||
            isSubmitting
        ) {
            return;
        }

        await onConfirm(
            member,
            role,
        );
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`Change Role ${member.user.name}`}
            size="md"
        >
            <div className="space-y-5">
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
                        disabled={isSubmitting}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        disabled={
                            !hasRoleChanged ||
                            isSubmitting
                        }
                        onClick={() =>
                            void handleSubmit()
                        }
                    >
                        {isSubmitting
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}