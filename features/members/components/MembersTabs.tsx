import React from 'react'

interface MembersTabsProps {
    activeTab:
    | "members"
    | "permissions";

    onChange: (
        tab:
            | "members"
            | "permissions"
    ) => void;
}

export default function MembersTabs({ activeTab, onChange }: MembersTabsProps) {
    return (
        <div className="flex border-b border-border mb-4">
            {(["members", "permissions"] as const).map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`cursor-pointer px-4 py-2 text-base font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}
