"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";

import clsx from "clsx";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    className?: string;
}

const modalSizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-[95vw] h-[90vh]",
};

export function Modal({
    open,
    onClose,
    title,
    children,
    size = "md",
    className,
}: ModalProps) {
    return (
        <DialogPrimitive.Root
            open={open}
            onOpenChange={(value) => {
                if (!value) onClose();
            }}
        >
            <AnimatePresence>
                {open && (
                    <DialogPrimitive.Portal forceMount>
                        {/* Overlay */}
                        <DialogPrimitive.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                            />
                        </DialogPrimitive.Overlay>

                        {/* Content */}
                        <DialogPrimitive.Content
                            forceMount
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none"
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: 20,
                                }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeOut",
                                }}
                                className={clsx(
                                    "relative w-full rounded-xl border border-border bg-card shadow-2xl",
                                    modalSizes[size],
                                    className
                                )}
                            >
                                {title && (
                                    <div className="flex items-center justify-between border-b border-border px-6 py-5">
                                        <DialogPrimitive.Title className="text-xl font-semibold text-foreground">
                                            {title}
                                        </DialogPrimitive.Title>

                                    </div>
                                )}

                                <div className="max-h-[80vh] overflow-y-auto p-6">
                                    {children}
                                </div>
                            </motion.div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                )}
            </AnimatePresence>
        </DialogPrimitive.Root>
    );
}