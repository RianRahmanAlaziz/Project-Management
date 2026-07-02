"use client";

import { useEffect, useState } from "react";
import { Modal, Button } from "@/components/ui";
import { Shield, Eye, UserCheck, Crown } from "lucide-react";
import type { Members } from "@/features/members/types/members";
import { Combobox } from "@/components/ui/combobox";

interface MemberRoleModalProps {
    open: boolean;
    member?: Members | null;
    onClose: () => void;
    onConfirm: (
        member: Members,
        role: string
    ) => void;
}

export default function MemberRoleModal({
    open,
    member,
    onClose,
    onConfirm,
}: MemberRoleModalProps) {

    const [role, setRole] = useState("");

    useEffect(() => {
        if (!member) return;

        setRole(member.role);
    }, [member]);

    const handleSubmit = () => {
        if (!member) return;

        onConfirm(member, role);

        onClose();
    };

    if (!member) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`Change Role ${member?.name}`}
            size="md"
        >
            <div className="space-y-5">

                <div className="space-y-2">
                    <Combobox
                        label="Role"
                        value={role}
                        onValueChange={setRole}
                        placeholder="Select role"
                        searchable={false}
                        options={[
                            {
                                value: "Owner",
                                label: "Owner",
                                description: "Full access to workspace",
                                icon: <Crown size={16} className="text-amber-500" />,
                            },
                            {
                                value: "Admin",
                                label: "Admin",
                                description: "Manage projects and members",
                                icon: <Shield size={16} className="text-indigo-500" />,
                            },
                            {
                                value: "Member",
                                label: "Member",
                                description: "Can create and update tasks",
                                icon: <UserCheck size={16} className="text-emerald-500" />,
                            },
                            {
                                value: "Viewer",
                                label: "Viewer",
                                description: "Read-only access",
                                icon: <Eye size={16} className="text-slate-500" />,
                            },
                        ]}
                    />
                </div>

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
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
