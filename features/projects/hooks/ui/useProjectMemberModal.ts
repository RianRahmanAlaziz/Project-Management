"use client";

import { useState } from "react";

export function useProjectMemberModal() {
    const [
        isInviteMemberOpen,
        setIsInviteMemberOpen,
    ] = useState(false);

    const openInviteMember = () => {
        setIsInviteMemberOpen(true);
    };

    const closeInviteMember = () => {
        setIsInviteMemberOpen(false);
    };

    return {
        isInviteMemberOpen,
        openInviteMember,
        closeInviteMember,
    };
}