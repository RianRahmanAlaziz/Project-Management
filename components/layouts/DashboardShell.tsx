"use client";

import { useEffect, useState } from "react";

import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({
    children,
}: DashboardShellProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme =
            localStorage.getItem("theme");

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

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <div className="hidden md:block shrink-0">
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggle={() =>
                        setSidebarCollapsed((prev) => !prev)
                    }
                />
            </div>
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <TopNav
                    darkMode={darkMode}
                    onToggleDark={() =>
                        setDarkMode((prev) => !prev)
                    }
                />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}