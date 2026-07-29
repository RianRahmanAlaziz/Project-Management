"use client";

import { Skeleton } from "@/components/ui";

const PROJECT_SKELETON_COUNT = 6;

export function ProjectsSkeleton() {
    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-44" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                    <Skeleton className="h-10 w-40 rounded-lg" />
                </div>
                {/* Search */}
                <Skeleton className="h-10 w-full rounded-lg" />

                {/* Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {Array.from({
                        length: PROJECT_SKELETON_COUNT,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-border bg-card p-4"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start  gap-2.5">
                                    <Skeleton className="h-12 w-12 rounded-xl" />
                                    <Skeleton className="h-4 w-32 mt-4" />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton className="h-5 w-15 rounded-sm" />
                                <Skeleton className="h-5 w-15 rounded-sm" />
                            </div>

                            {/* Progress */}
                            <div className="mb-3 space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-10" />
                                </div>

                                <Skeleton className="h-2 w-full rounded-full" />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-20" />
                                </div>

                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}