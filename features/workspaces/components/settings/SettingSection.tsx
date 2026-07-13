import React from 'react'

interface SettingsSectionProps {
    title: string,
    desc: string,
    children: React.ReactNode
}
export default function SettingSection({
    title,
    desc,
    children,
}: SettingsSectionProps) {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-border">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
            <div className="px-5 py-4 space-y-4">{children}</div>
        </div>
    )
}
