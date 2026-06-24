"use client";

import { useState } from "react";

import { Modal, Button, Input, Select } from "@/components/ui";

import {
    Shield,
    Eye,
    UserCheck,
    Crown,
} from "lucide-react";

interface InviteTeamMemberProps {
    open: boolean;
    onClose: () => void;

    onConfirm: (
        email: string,
        role: string
    ) => void;
}

export default function InviteTeamMember({
    open,
    onClose,
    onConfirm,
}: InviteTeamMemberProps) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = () => {
        if (!email.trim()) return;

        onConfirm(email, role);

        setEmail("");
        setRole("Member");

        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Invite Team Member"
            size="md"
        >
            <div className="space-y-5">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <Select
                    label="Role"
                    value={role}
                    onValueChange={setRole}
                    placeholder="Select role"
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