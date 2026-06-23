"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
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

export function Modal({ open, onClose, title, children, size = "md", className, }: ModalProps) {
    return (
        <DialogPrimitive.Root
            open={open}
            onOpenChange={(value) => !value && onClose()}
        >
            <DialogPrimitive.Portal>
                <AnimatePresence>
                    {open && (
                        <>
                            <DialogPrimitive.Overlay asChild>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                                />
                            </DialogPrimitive.Overlay>

                            <DialogPrimitive.Content asChild>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={clsx(
                                        "fixed left-1/2 top-1/2 z-50",
                                        "-translate-x-1/2 -translate-y-1/2",
                                        "w-[95vw]",
                                        modalSizes[size],
                                        "bg-card border border-border",
                                        "rounded-xl shadow-2xl",
                                        "p-6 focus:outline-none",
                                        "overflow-y-auto",
                                        className
                                    )}
                                >
                                    {title && (
                                        <div className="mb-10 flex items-center justify-between">
                                            <h3 className="font-semibold text-2xl text-foreground">
                                                {title}
                                            </h3>
                                        </div>
                                    )}

                                    {children}
                                </motion.div>

                            </DialogPrimitive.Content>
                        </>
                    )}
                </AnimatePresence>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}