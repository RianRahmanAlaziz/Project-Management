import {
    SettingSection,
    SettingFooter,
    ToggleRow,
} from "@/components/layouts/settings";


type Toggle = {
    taskAssigned: boolean; taskUpdated: boolean; newComment: boolean;
    weeklyDigest: boolean; memberJoined: boolean; projectCreated: boolean;
};

interface NotificationSettingsProps {
    toggles: Toggle;
    toggle: (key: keyof Toggle) => void;
    saved: boolean;
    onSave: () => void;
}

export default function NotificationSettings({
    toggles,
    toggle,
    saved,
    onSave,
}: NotificationSettingsProps) {
    return (
        <SettingSection title="Workspace Notifications" desc="Choose what events send notifications.">
            <div className="space-y-3">
                {([
                    { key: "taskAssigned", label: "Task assigned", desc: "When a task is assigned to a member." },
                    { key: "taskUpdated", label: "Task status changed", desc: "When task status or priority changes." },
                    { key: "newComment", label: "New comment", desc: "When someone comments on a task." },
                    { key: "weeklyDigest", label: "Weekly digest", desc: "Summary email every Monday morning." },
                    { key: "memberJoined", label: "Member joined", desc: "When a new member joins the workspace." },
                    { key: "projectCreated", label: "Project created", desc: "When a new project is created." },
                ] as { key: keyof Toggle; label: string; desc: string }[]).map(row => (
                    <ToggleRow key={row.key} label={row.label} desc={row.desc} value={toggles[row.key]} onChange={() => toggle(row.key)} />
                ))}
            </div>
            <SettingFooter onSave={onSave} saved={saved} />
        </SettingSection>
    )
}
