import { Skeleton } from "@/components/ui";

const COLOR_COUNT = 8;

export default function WorkspaceSettingsSkeleton() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                {/* Settings Sidebar */}
                <div className="w-56 shrink-0 border-r border-border p-4">
                    <Skeleton className="mb-5 h-5 w-24 rounded-md" />

                    <div className="space-y-2">
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-2xl space-y-6">
                        <div className="rounded-xl border border-border bg-card">
                            {/* Section Header */}
                            <div className="border-b border-border p-5">
                                <Skeleton className="h-5 w-40 rounded-md" />
                                <Skeleton className="mt-2 h-3 w-64 rounded-md" />
                            </div>

                            {/* Form */}
                            <div className="p-5">
                                <div className="space-y-4">
                                    {/* Workspace Icon + Colors */}
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-14 w-14 shrink-0 rounded-2xl" />

                                        <div className="flex-1">
                                            <Skeleton className="mb-2 h-3 w-24 rounded-md" />

                                            <div className="flex gap-1.5">
                                                {Array.from({
                                                    length: COLOR_COUNT,
                                                }).map((_, index) => (
                                                    <Skeleton
                                                        key={index}
                                                        className="h-6 w-6 rounded-md"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Workspace Name */}
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-3 w-28 rounded-md" />
                                        <Skeleton className="h-9 w-full rounded-lg" />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                        <Skeleton className="h-20 w-full rounded-lg" />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-4 flex justify-end border-t border-border pt-4">
                                    <Skeleton className="h-8 w-28 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarItemSkeleton() {
    return (
        <div className="flex items-center gap-1 rounded-lg px-1 py-0.5">
            <Skeleton className="h-9 w-full rounded-lg" />
        </div>
    );
}

