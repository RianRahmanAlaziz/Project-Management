import { Bell, Building2, Shield, Trash2 } from "lucide-react";

const NAV_ITEMS = [
    { id: "general", label: "General", icon: Building2 },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
];

interface SettingsSidebarProps {
    active: string;
    onChange: (id: string) => void;
}
export default function SettingsSidebar({
    active,
    onChange,
}: SettingsSidebarProps) {
    return (
        <aside className="w-64 shrink-0 border-r border-border overflow-y-auto p-4 hidden md:block">
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Workspace</p>
            <nav className="space-y-0.5">
                {NAV_ITEMS.map(item => {
                    const Icon = item.icon;
                    const actives = active === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onChange(item.id)}
                            className={`cursor-pointer w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${actives ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"} ${item.id === "danger" && !actives ? "text-destructive/70 hover:text-destructive hover:bg-destructive/5" : ""}`}
                        >
                            <Icon size={13} className={item.id === "danger" && !actives ? "text-destructive/70" : ""} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            {/* Mobile select */}
        </aside>
    )
}
