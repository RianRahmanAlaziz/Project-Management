import { Shield, Eye, UserCheck, Crown } from "lucide-react";


const ROLES = ["Owner", "Admin", "Member", "Viewer"];

const PERMISSIONS = [
    { name: "Create projects", owner: true, admin: true, member: true, viewer: false },
    { name: "Delete projects", owner: true, admin: true, member: false, viewer: false },
    { name: "Invite members", owner: true, admin: true, member: false, viewer: false },
    { name: "Manage billing", owner: true, admin: false, member: false, viewer: false },
    { name: "Create tasks", owner: true, admin: true, member: true, viewer: false },
    { name: "Comment on tasks", owner: true, admin: true, member: true, viewer: true },
    { name: "View all projects", owner: true, admin: true, member: true, viewer: true },
    { name: "Export data", owner: true, admin: true, member: false, viewer: false },
];

const roleIcons: Record<string, React.ReactNode> = {
    owner: <Crown size={18} />,
    admin: <Shield size={18} />,
    member: <UserCheck size={18} />,
    viewer: <Eye size={18} />,
};


export default function PermissionsTable() {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-125">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left px-4 py-4 text-base font-medium text-muted-foreground">Permission</th>
                            {ROLES.map(role => (
                                <th key={role} className="px-4 py-4 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-muted-foreground">{roleIcons[role]}</span>
                                        <span className="text-base font-medium text-foreground">{role}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {PERMISSIONS.map(perm => (
                            <tr key={perm.name} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                <td className="px-4 py-4 text-base text-foreground">{perm.name}</td>
                                {[perm.owner, perm.admin, perm.member, perm.viewer].map((has, i) => (
                                    <td key={i} className="px-4 py-4 text-center">
                                        {has
                                            ? <span className="inline-flex w-7 h-7 rounded-full bg-success/15 items-center justify-center text-success">✓</span>
                                            : <span className="inline-flex w-7 h-7 rounded-full bg-muted items-center justify-center text-muted-foreground text-base">—</span>
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
