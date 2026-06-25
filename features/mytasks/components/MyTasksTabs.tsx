import React from "react";

export type TaskFilter = "all" | "mine" | "overdue";

interface MyTasksTabsProps {
    activeTab: TaskFilter;
    onChange: (tab: TaskFilter) => void;
}

export default function MyTasksTabs({
    activeTab,
    onChange,
}: MyTasksTabsProps) {
    const tabs: TaskFilter[] = ["all", "mine", "overdue"];

    return (
        <div className="mb-4 flex border-b border-border">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => onChange(tab)}
                    className={`cursor-pointer border-b-2 px-4 py-3 text-m font-medium capitalize transition-colors ${activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    {tab === "mine" ? "Assigned to me" : tab}
                </button>
            ))}
        </div>
    );
}