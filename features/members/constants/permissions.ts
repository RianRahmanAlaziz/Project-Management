export const PERMISSIONS = [
    { name: "Create projects", owner: true, admin: true, member: true, viewer: false },
    { name: "Delete projects", owner: true, admin: true, member: false, viewer: false },
    { name: "Invite members", owner: true, admin: true, member: false, viewer: false },
    { name: "Manage billing", owner: true, admin: false, member: false, viewer: false },
    { name: "Create tasks", owner: true, admin: true, member: true, viewer: false },
    { name: "Comment on tasks", owner: true, admin: true, member: true, viewer: true },
    { name: "View all projects", owner: true, admin: true, member: true, viewer: true },
    { name: "Export data", owner: true, admin: true, member: false, viewer: false },
];