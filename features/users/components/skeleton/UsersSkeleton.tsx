"use client";

import { Skeleton } from "@/components/ui";

const ROWS = 6;

export function UsersSkeleton() {
    return (
        <div className="space-y-5">
            {/* Search */}
            <div className="flex flex-col gap-3 md:flex-row">
                <Skeleton className="h-12 flex-1 rounded-xl" />

                <Skeleton className="h-12 w-full rounded-xl md:w-64" />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {/* Header */}
                <div className="grid grid-cols-[3fr_2fr_2fr_80px] items-center border-b border-border px-6 py-5">
                    <Skeleton className="h-5 w-16" />

                    <div className="flex justify-center">
                        <Skeleton className="h-5 w-14" />
                    </div>

                    <div className="flex justify-center">
                        <Skeleton className="h-5 w-16" />
                    </div>

                    <div className="flex justify-end">
                        <Skeleton className="h-5 w-14" />
                    </div>
                </div>

                {/* Body */}
                {Array.from({ length: ROWS }).map((_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[3fr_2fr_2fr_80px] items-center border-b border-border px-6 py-6 last:border-b-0"
                    >
                        {/* User */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-11 w-11 rounded-full" />

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-3 w-56" />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="flex justify-center">
                            <Skeleton className="h-9 w-36 rounded-lg" />
                        </div>

                        {/* Status */}
                        <div className="flex justify-center">
                            <Skeleton className="h-9 w-24 rounded-lg" />
                        </div>

                        {/* Action */}
                        <div className="flex justify-end">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}