import React from "react";

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                {icon}
            </div>

            <div>
                <p className="font-semibold text-foreground text-sm">{title}</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">{description}</p>
            </div>

            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}