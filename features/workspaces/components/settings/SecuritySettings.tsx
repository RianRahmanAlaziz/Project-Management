import React from 'react'

import {
    SettingSection,
    SettingFooter,
    ToggleRow,
} from "@/components/layouts/settings";

type Toggle = {
    taskAssigned: boolean; taskUpdated: boolean; newComment: boolean;
    weeklyDigest: boolean; memberJoined: boolean; projectCreated: boolean;
};

interface SecuritySettingsProps {
    toggles: Toggle;
    toggle: (key: keyof Toggle) => void;
    saved: boolean;
    onSave: () => void;
}

export default function SecuritySettings({
    toggles,
    toggle,
    saved,
    onSave,
}: SecuritySettingsProps) {
    return (
        <>
            <SettingSection title="Authentication" desc="Control how members sign in to this workspace.">
                <div className="space-y-3">
                    {[
                        { label: "Require 2FA for all members", desc: "Members must use two-factor authentication.", key: "taskAssigned" },
                        { label: "Allow Google SSO", desc: "Members can sign in with Google.", key: "taskUpdated" },
                        { label: "Allow GitHub SSO", desc: "Members can sign in with GitHub.", key: "newComment" },
                    ].map(row => (
                        <ToggleRow
                            key={row.key}
                            label={row.label}
                            desc={row.desc}
                            value={toggles[row.key as keyof Toggle]}
                            onChange={() => toggle(row.key as keyof Toggle)}
                        />
                    ))}
                </div>
                <SettingFooter onSave={onSave} saved={saved} />
            </SettingSection>

            <SettingSection title="Session" desc="Manage session security settings.">
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Session timeout</label>
                    <select className="h-8 bg-input-background border border-border rounded-lg px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                        {["30 minutes", "1 hour", "4 hours", "8 hours", "24 hours", "Never"].map(o => <option key={o}>{o}</option>)}
                    </select>
                </div>
                <SettingFooter onSave={onSave} saved={saved} />
            </SettingSection>
        </>
    )
}
