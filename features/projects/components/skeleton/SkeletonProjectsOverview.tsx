"use client";

import { Skeleton } from "@/components/ui";

export function SkeletonProjectsOverview() {
    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="space-y-6">

                {/* Hero */}
                <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                    <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                        <div className="flex gap-5">

                            <Skeleton className="h-18 w-18 rounded-2xl" />

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-56" />

                                    <Skeleton className="h-6 w-24 rounded-full" />

                                    <Skeleton className="h-6 w-28 rounded-full" />
                                </div>

                                <Skeleton className="h-4 w-105" />
                                <Skeleton className="h-4 w-[320px]" />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Skeleton className="h-8 w-32 rounded-lg" />
                            <Skeleton className="h-8 w-32 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-border pb-3">
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-10 w-28 rounded-lg"
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* Progress */}
                    <div className="rounded-2xl border border-border bg-card p-5">
                        <Skeleton className="mx-auto h-6 w-40" />

                        <div className="my-6 flex justify-center">
                            <div className="size-32 rounded-full bg-muted animate-pulse" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-16 rounded-xl"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-52" />
                        </div>

                        <div className="mt-6 space-y-5">
                            {[...Array(2)].map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <Skeleton className="h-10 w-10 rounded-lg" />

                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Skeleton className="h-20 rounded-xl" />
                            <Skeleton className="h-20 rounded-xl" />
                        </div>

                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-10" />
                            </div>

                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>
                    </div>

                    {/* Health */}
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <div className="flex justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-30" />
                            </div>

                            <Skeleton className="h-8 w-24 rounded-full" />
                        </div>

                        <div className="mt-6 space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-30" />
                        </div>

                        <div className="mt-6 space-y-4">
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>

                                    <Skeleton className="h-4 w-10" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}