"use client";

interface TabsProps {
    tabs: string[];
    active: string;
    onChange: (tab: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
    return (
        <div className="flex border-b border-border">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium border-b-2 transition-colors ${active === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}