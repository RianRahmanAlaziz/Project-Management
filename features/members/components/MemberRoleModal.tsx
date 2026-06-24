"use client";

import { useEffect, useState } from "react";
import { Modal, Button, Select } from "@/components/ui";
import { Shield, Eye, UserCheck, Crown } from "lucide-react";
import type { Members } from "@/features/members/types/members";

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
                    <Select
                        label="Role"
                        value={role}
                        onValueChange={setRole}
                        options={[
                            {
                                value: "Owner",
                                label: "Owner",
                                icon: <Crown size={16} />,
                            },
                            {
                                value: "Admin",
                                label: "Admin",
                                icon: <Shield size={16} />,
                            },
                            {
                                value: "Member",
                                label: "Member",
                                icon: <UserCheck size={16} />,
                            },
                            {
                                value: "Viewer",
                                label: "Viewer",
                                icon: <Eye size={16} />,
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
