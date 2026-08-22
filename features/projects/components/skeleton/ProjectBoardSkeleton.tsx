import { Skeleton } from '@/components/ui'
import React from 'react'

export function ProjectBoardSkeleton() {
    return (
        <div className="w-full space-y-6">
            <div className="overflow-x-auto overflow-y-hidden">
                <div className="flex gap-3 p-4">
                    {[4, 1, 3, 2, 4].map((count, col) => (
                        <div key={col} className="flex flex-col min-h-125 w-full rounded-xl border border-border bg-muted/20">
                            {/* column header */}
                            <div className="flex items-center justify-between rounded-t-xl border-b border-border bg-card px-3 py-3">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-2 h-2 rounded-full" />
                                    <Skeleton className={`h-3 rounded-md ${["w-16", "w-10", "w-24", "w-16", "w-10"][col]}`} />
                                    <Skeleton className="w-5 h-5 rounded-full" />
                                </div>
                                <Skeleton className="w-4 h-4 rounded" />
                            </div>
                            {/* cards */}
                            <div className="flex-1 p-2.5 space-y-2">
                                {[...Array(count)].map((_, i) => (
                                    <div key={i} className="bg-card border border-border rounded-lg p-3 space-y-2.5">
                                        <div className="flex items-center gap-1.5">
                                            <Skeleton className="w-1.5 h-1.5 rounded-full" />
                                            <Skeleton className={`h-4 rounded-full ${["w-16", "w-12", "w-20", "w-14"][i % 4]}`} />
                                        </div>
                                        <Skeleton className={`h-3 rounded-md ${["w-4/5", "w-full", "w-3/4", "w-4/5"][i % 4]}`} />
                                        <Skeleton className="h-3 rounded-md w-3/5" />
                                        <div className="flex items-center justify-between mt-1">
                                            <Skeleton className="w-5 h-5 rounded-full" />
                                            <div className="flex gap-2">
                                                <Skeleton className="w-10 h-3 rounded-md" />
                                                <Skeleton className="w-8 h-3 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div>
    )
}
