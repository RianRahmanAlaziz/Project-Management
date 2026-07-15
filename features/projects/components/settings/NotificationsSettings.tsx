import {
    SettingSection,
    SettingFooter,
    ToggleRow,
} from "@/components/layouts/settings";

import type {
    NotificationToggle,
} from "@/features/projects/types/notifications";

const NOTIFICATION_OPTIONS: {
    key: keyof NotificationToggle;
    label: string;
    desc: string;
}[] = [
        {
            key: "taskAssigned",
            label: "Task assigned",
            desc: "When a task is assigned to any member.",
        },
        {
            key: "taskUpdated",
            label: "Status changed",
            desc: "When a task moves between columns.",
        },
        {
            key: "newComment",
            label: "New comment",
            desc: "When someone comments on a task.",
        },
        {
            key: "dailyDigest",
            label: "Daily digest",
            desc: "A summary of activity sent at 9 AM.",
        },
    ];

interface NotificationsSettingsProps {
    toggles: NotificationToggle;
    toggle: (
        key: keyof NotificationToggle
    ) => void;

    saved: boolean;
    onSave: () => void;
}

export default function NotificationsSettings({
    toggles,
    toggle,
    saved,
    onSave,
}: NotificationsSettingsProps) {
    return (
        <SettingSection title="Project Notifications" desc="Choose what events trigger notifications.">
            <div className="space-y-3">
                {NOTIFICATION_OPTIONS.map((item) => (
                    <ToggleRow
                        key={item.key}
                        label={item.label}
                        desc={item.desc}
                        value={toggles[item.key]}
                        onChange={() => toggle(item.key)}
                    />
                ))}
            </div>
            <SettingFooter onSave={onSave} saved={saved} />
        </SettingSection>
    )
}
