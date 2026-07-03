"use client";

import { cn } from "@/lib/utils";

import type { ProjectTab } from "@/features/projects/constants/tabs";

interface ProjectTabItem {
    key: ProjectTab;
    label: string;
    icon: React.ElementType;
}

interface ProjectTabsProps {
    tabs: readonly ProjectTabItem[];
    activeTab: ProjectTab;
    onChange: (tab: ProjectTab) => void;
}

export default function ProjectTabs({
    tabs,
    activeTab,
    onChange,
}: ProjectTabsProps) {
    return (
        <div className="mt-8 border-b border-border pb-2">
            <nav className="flex items-center gap-1">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const active =
                        activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => onChange(tab.key)}
                            className={cn(
                                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all cursor-pointer",
                                active
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    )
}
