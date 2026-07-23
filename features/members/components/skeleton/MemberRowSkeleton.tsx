import { Skeleton } from "@/components/ui/Skeleton";

export default function MemberRowSkeleton() {
    return (
        <tr className="border-b border-border last:border-0">
            <td className="px-4 py-5">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-44" />
                    </div>
                </div>
            </td>

            <td className="px-4 py-5">
                <div className="flex justify-center">
                    <Skeleton className="h-7 w-24 rounded-full" />
                </div>
            </td>

            <td className="hidden px-4 py-5 lg:table-cell">
                <Skeleton className="h-4 w-20" />
            </td>

            <td className="px-4 py-5">
                <div className="flex justify-center">
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </td>
        </tr>
    );
}