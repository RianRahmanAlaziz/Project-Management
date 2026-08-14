import { Paperclip } from 'lucide-react'
import React from 'react'

export default function TaskAttachments() {
    return (
        <div className="space-y-2">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Paperclip size={20} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Drop files here or click to upload</p>
            </div>
            {[
                { name: "design-specs.figma", size: "2.4 MB", type: "figma" },
                { name: "component-flow.png", size: "890 KB", type: "image" },
            ].map(f => (
                <div key={f.name} className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border hover:bg-muted transition-colors">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                        <Paperclip size={12} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{f.size}</p>
                    </div>
                    <button className="text-xs text-primary hover:underline cursor-pointer">Download</button>
                </div>
            ))}
        </div>
    )
}
