export const USERS = [
    { id: "u1", name: "Alex Rivera", email: "alex@projectflow.io", role: "Owner", avatar: "" },
    { id: "u2", name: "Sarah Chen", email: "sarah@projectflow.io", role: "Admin", avatar: "" },
    { id: "u3", name: "Marcus Johnson", email: "marcus@projectflow.io", role: "Member", avatar: "" },
    { id: "u4", name: "Priya Patel", email: "priya@projectflow.io", role: "Member", avatar: "" },
    { id: "u5", name: "Tom Williams", email: "tom@projectflow.io", role: "Viewer", avatar: "" },
];

export const WORKSPACES = [
    {
        id: "ws1",
        slug: "acme-corp",
        name: "Acme Corp",
        description: "Main product workspace",
        members: 12,
        projects: 8,
        color: "bg-indigo-500",
        initials: "AC",
    },
    {
        id: "ws2",
        slug: "design-hub",
        name: "Design Hub",
        description: "UI/UX and brand projects",
        members: 5,
        projects: 4,
        color: "bg-violet-500",
        initials: "DH",
    },
    {
        id: "ws3",
        slug: "growth-team",
        name: "Growth Team",
        description: "Marketing and analytics",
        members: 7,
        projects: 6,
        color: "bg-emerald-500",
        initials: "GT",
    },
];

export const PROJECTS = [
    {
        id: "p1",
        slug: "projectflow-v2",
        name: "ProjectFlow v2.0",
        workspace: "ws1",
        status: "In Progress",
        progress: 68,
        color: "bg-indigo-500",
        members: ["u1", "u2", "u3"],
        dueDate: "2026-07-15",
        priority: "High",
        tasks: 42,
    },
    {
        id: "p2",
        slug: "mobile-app-redesign",
        name: "Mobile App Redesign",
        workspace: "ws1",
        status: "In Progress",
        progress: 34,
        color: "bg-violet-500",
        members: ["u2", "u4"],
        dueDate: "2026-08-01",
        priority: "Medium",
        tasks: 28,
    },
    {
        id: "p3",
        slug: "api-gateway-migration",
        name: "API Gateway Migration",
        workspace: "ws1",
        status: "Review",
        progress: 85,
        color: "bg-blue-500",
        members: ["u1", "u3", "u5"],
        dueDate: "2026-06-30",
        priority: "High",
        tasks: 19,
    },
    {
        id: "p4",
        slug: "brand-refresh-2026",
        name: "Brand Refresh 2026",
        workspace: "ws2",
        status: "Todo",
        progress: 10,
        color: "bg-pink-500",
        members: ["u2"],
        dueDate: "2026-09-01",
        priority: "Low",
        tasks: 15,
    },
    {
        id: "p5",
        slug: "q3-marketing-campaign",
        name: "Q3 Marketing Campaign",
        workspace: "ws3",
        status: "In Progress",
        progress: 55,
        color: "bg-emerald-500",
        members: ["u1", "u4", "u5"],
        dueDate: "2026-07-30",
        priority: "Medium",
        tasks: 33,
    },
];

export const KANBAN_COLUMNS = ["Backlog", "Todo", "In Progress", "Review", "Done"];

export const TASKS = [
    { id: "t1", title: "Set up CI/CD pipeline", column: "Done", priority: "High", assignee: "u1", dueDate: "2026-06-10", labels: ["DevOps"], attachments: 2, comments: 5, project: "p1" },
    { id: "t2", title: "Design authentication flow", column: "Done", priority: "Medium", assignee: "u2", dueDate: "2026-06-12", labels: ["Design"], attachments: 3, comments: 8, project: "p1" },
    { id: "t3", title: "Implement dark mode toggle", column: "In Progress", priority: "Medium", assignee: "u3", dueDate: "2026-06-20", labels: ["Frontend"], attachments: 0, comments: 3, project: "p1" },
    { id: "t4", title: "Database schema optimization", column: "In Progress", priority: "High", assignee: "u1", dueDate: "2026-06-22", labels: ["Backend", "Database"], attachments: 1, comments: 7, project: "p1" },
    { id: "t5", title: "Write API documentation", column: "Review", priority: "Low", assignee: "u4", dueDate: "2026-06-25", labels: ["Docs"], attachments: 4, comments: 2, project: "p1" },
    { id: "t6", title: "Kanban board drag-and-drop", column: "In Progress", priority: "High", assignee: "u2", dueDate: "2026-06-28", labels: ["Frontend"], attachments: 0, comments: 4, project: "p1" },
    { id: "t7", title: "User onboarding flow", column: "Todo", priority: "Medium", assignee: "u3", dueDate: "2026-07-01", labels: ["UX", "Frontend"], attachments: 2, comments: 6, project: "p1" },
    { id: "t8", title: "Notification system", column: "Todo", priority: "High", assignee: "u1", dueDate: "2026-07-05", labels: ["Backend", "Frontend"], attachments: 0, comments: 1, project: "p1" },
    { id: "t9", title: "Mobile responsive fixes", column: "Backlog", priority: "Low", assignee: "u5", dueDate: "2026-07-10", labels: ["Frontend"], attachments: 0, comments: 0, project: "p1" },
    { id: "t10", title: "Analytics dashboard", column: "Backlog", priority: "Medium", assignee: "u4", dueDate: "2026-07-15", labels: ["Data", "Frontend"], attachments: 1, comments: 3, project: "p1" },
    { id: "t11", title: "Performance audit", column: "Backlog", priority: "High", assignee: "u2", dueDate: "2026-07-20", labels: ["Performance"], attachments: 0, comments: 2, project: "p1" },
    { id: "t12", title: "Export to CSV/PDF", column: "Todo", priority: "Low", assignee: "u3", dueDate: "2026-07-08", labels: ["Feature"], attachments: 0, comments: 1, project: "p1" },
];

export const NOTIFICATIONS = [
    { id: "n1", type: "task_assigned", user: "Sarah Chen", action: "assigned you to", target: "Kanban board drag-and-drop", time: "2m ago", read: false },
    { id: "n2", type: "new_comment", user: "Marcus Johnson", action: "commented on", target: "Database schema optimization", time: "15m ago", read: false },
    { id: "n3", type: "task_updated", user: "Alex Rivera", action: "moved", target: "Write API documentation to Review", time: "1h ago", read: false },
    { id: "n4", type: "workspace_invite", user: "Priya Patel", action: "invited you to", target: "Design Hub workspace", time: "3h ago", read: true },
    { id: "n5", type: "task_updated", user: "Tom Williams", action: "updated", target: "Mobile responsive fixes", time: "5h ago", read: true },
];

export const ACTIVITIES = [
    { id: "a1", user: "Alex Rivera", action: "created task", target: "Analytics dashboard", time: "Just now", icon: "plus" },
    { id: "a2", user: "Sarah Chen", action: "moved", target: "Write API documentation → Review", time: "1h ago", icon: "move" },
    { id: "a3", user: "Marcus Johnson", action: "commented on", target: "Database schema optimization", time: "2h ago", icon: "comment" },
    { id: "a4", user: "Priya Patel", action: "uploaded file to", target: "Design authentication flow", time: "3h ago", icon: "upload" },
    { id: "a5", user: "Alex Rivera", action: "completed", target: "Set up CI/CD pipeline", time: "5h ago", icon: "check" },
    { id: "a6", user: "Tom Williams", action: "joined project", target: "ProjectFlow v2.0", time: "1d ago", icon: "user" },
];

export const CHART_DATA = [
    { date: "Jun 1", completed: 4, created: 6 },
    { date: "Jun 3", completed: 6, created: 8 },
    { date: "Jun 5", completed: 5, created: 7 },
    { date: "Jun 7", completed: 9, created: 10 },
    { date: "Jun 9", completed: 7, created: 9 },
    { date: "Jun 11", completed: 11, created: 12 },
    { date: "Jun 13", completed: 8, created: 11 },
    { date: "Jun 15", completed: 13, created: 14 },
    { date: "Jun 17", completed: 10, created: 13 },
];

export const PROJECT_PROGRESS_DATA = [
    { name: "ProjectFlow v2.0", value: 68, color: "#4F46E5" },
    { name: "Mobile App Redesign", value: 34, color: "#7C3AED" },
    { name: "API Gateway", value: 85, color: "#2563EB" },
    { name: "Brand Refresh", value: 10, color: "#EC4899" },
    { name: "Q3 Campaign", value: 55, color: "#10B981" },
];
