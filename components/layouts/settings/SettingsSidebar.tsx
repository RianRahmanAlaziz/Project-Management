import { LucideIcon } from "lucide-react";

export interface SidebarItem {
    id: string;
    label: string;
    icon: LucideIcon;
    danger?: boolean;
}

interface SettingsSidebarProps {
    title?: string;
    items: SidebarItem[];
    activeItem: string;
    onChange: (id: string) => void;
}
export default function SettingsSidebar({
    title = "Settings",
    items,
    activeItem,
    onChange,
}: SettingsSidebarProps) {
    return (
        <aside className="w-64 shrink-0 border-r border-border overflow-y-auto p-4 hidden md:block">
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                {title}
            </p>
            <nav className="space-y-0.5">
                {items.map(item => {
                    const Icon = item.icon;
                    const active = activeItem === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onChange(item.id)}
                            className={`cursor-pointer w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"} ${item.id === "danger" && !active ? "text-destructive/70 hover:text-destructive hover:bg-destructive/5" : ""}`}
                        >
                            <Icon size={13} className={item.id === "danger" && !active ? "text-destructive/70" : ""} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            {/* Mobile select */}
        </aside>
    )
}
