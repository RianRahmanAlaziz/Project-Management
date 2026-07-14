import React from 'react'

interface DangerCardProps {
    title: string,
    desc: string,
    action: React.ReactNode,
    danger?: boolean
}

export default function DangerCard({ title, desc, action, danger }: DangerCardProps) {
    return (
        <div className={`bg-card rounded-xl border p-4 ${danger ? "border-destructive/30" : "border-border"}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <p className={`text-sm font-semibold ${danger ? "text-destructive" : "text-foreground"}`}>{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                {!danger && <div className="shrink-0">{action}</div>}
            </div>
            {danger && <div className="mt-3">{action}</div>}
        </div>
    )
}
