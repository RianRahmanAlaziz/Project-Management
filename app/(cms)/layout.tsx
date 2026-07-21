import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/layouts/DashboardShell";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <DashboardShell>
                {children}
            </DashboardShell>
        </AuthGuard>
    );
}