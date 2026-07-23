"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export function AppToaster() {
    const [theme, setTheme] = useState<"light" | "dark">(
        "light",
    );

    useEffect(() => {
        const html = document.documentElement;

        const updateTheme = () => {
            setTheme(
                html.classList.contains("dark")
                    ? "dark"
                    : "light",
            );
        };

        updateTheme();

        const observer = new MutationObserver(
            updateTheme,
        );

        observer.observe(html, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <Toaster
            theme={theme}
            position="top-right"
            richColors
            closeButton
        />
    );
}