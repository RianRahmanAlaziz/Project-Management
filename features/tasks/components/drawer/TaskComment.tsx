"use client";

import { Avatar } from "@/components/ui";
import { COMMENTS } from "@/features/tasks/constants/comments";

export default function TaskComment() {
    return (
        <div className="space-y-4">
            {COMMENTS.map(c => (
                <div key={c.id} className="flex gap-2.5">
                    <Avatar name={c.user} size="sm" />
                    <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-s font-semibold text-foreground">{c.user}</span>
                            <span className="text-xs text-muted-foreground">{c.time}</span>
                        </div>
                        <div className="bg-muted rounded-lg px-3 py-2 text-sm text-foreground leading-relaxed">{c.text}</div>
                        {c.reactions.length > 0 && (
                            <div className="flex gap-1 mt-1.5">
                                {c.reactions.map(r => (
                                    <span key={r} className="text-xs bg-muted border border-border rounded-full px-1.5 py-0.5 cursor-pointer hover:bg-accent transition-colors">{r}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
