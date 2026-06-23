"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

const PAGE_TITLES: Record<string, string> = {
    dashboard: "Dashboard",
    workspaces: "Workspaces",
    projects: "Projects",
    kanban: "Kanban Board",
    tasks: "My Tasks",
    analytics: "Analytics",
    members: "Members",
    notifications: "Notifications",
    profile: "Profile",
    settings: "Settings",
};

const PAGE_BREADCRUMBS: Record<string, string[]> = {
    dashboard: ["Home", "Dashboard"],
    workspaces: ["Home", "Workspaces"],
    projects: ["Home", "Projects"],
    kanban: ["Home", "Kanban Board"],
    tasks: ["Home", "My Tasks"],
    analytics: ["Home", "Analytics"],
    members: ["Home", "Members"],
    notifications: ["Home", "Notifications"],
    profile: ["Home", "Profile"],
    settings: ["Home", "Settings"],
};

function getCurrentPage(pathname: string) {
    const segments = pathname
        .split("/")
        .filter(Boolean);

    return segments[1] ?? "dashboard";
}

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({
    children,
}: DashboardShellProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [sidebarCollapsed, setSidebarCollapsed] =
        useState(false);

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        const html = document.documentElement;

        if (darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }

        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    const currentPage = getCurrentPage(pathname);

    const handleNavigate = (page: string) => {
        if (page === "dashboard") {
            router.push("/dashboard");
            return;
        }

        router.push(`/dashboard/${page}`);
    };

    return (
        <div
            className={`flex h-screen overflow-hidden bg-background`}
        >
            <div className="hidden h-full shrink-0 md:block">
                <Sidebar
                    collapsed={sidebarCollapsed}
                    currentPage={currentPage}
                    onToggle={() =>
                        setSidebarCollapsed((current) => !current)
                    }
                    onNavigate={handleNavigate}
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <TopNav
                    title={PAGE_TITLES[currentPage] ?? "Dashboard"}
                    breadcrumbs={
                        PAGE_BREADCRUMBS[currentPage] ?? [
                            "Home",
                            "Dashboard",
                        ]
                    }
                    darkMode={darkMode}
                    onToggleDark={() =>
                        setDarkMode((current) => !current)
                    }
                    onNavigate={handleNavigate}
                />

                <main className="min-h-0 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}