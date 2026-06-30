"use client";

import { useState } from "react";

import { Modal, Button, Input } from "@/components/ui";

import {
    Shield,
    Eye,
    UserCheck,
    Crown,
} from "lucide-react";
import { Combobox } from "@/components/ui/combobox";

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