import {
    SettingSection,
    SettingFooter,
    ToggleRow,
} from "@/components/layouts/settings";

interface NotificationSettingsProps {
    toggles: Toggle;
    toggle: (key: keyof Toggle) => void;
    saved: boolean;
    onSave: () => void;
}

export default function NotificationsSettings({
    toggles,
    toggle,
    saved,
    onSave,
}: NotificationSettingsProps) {
    return (
        <SettingSection title="Project Notifications" desc="Choose what events trigger notifications.">
            <div className="space-y-3">
                {([
                    { key: "taskAssigned", label: "Task assigned", desc: "When a task is assigned to any member." },
                    { key: "taskUpdated", label: "Status changed", desc: "When a task moves between columns." },
                    { key: "newComment", label: "New comment", desc: "When someone comments on a task." },
                    { key: "dailyDigest", label: "Daily digest", desc: "A summary of activity sent at 9 AM." },
                ] as { key: keyof Toggle; label: string; desc: string }[]).map(row => (
                    <ToggleRow key={row.key} label={row.label} desc={row.desc} value={toggles[row.key]} onChange={() => toggle(row.key)} />
                ))}
            </div>
            <SettingFooter onSave={onSave} saved={saved} />
        </SettingSection>
    )
}
