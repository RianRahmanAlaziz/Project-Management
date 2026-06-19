"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    width?: string;
}

export function Modal({ open, onClose, title, children, width = "max-w-lg" }: ModalProps) {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />

                <DialogPrimitive.Content
                    className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${width} w-full bg-card rounded-xl shadow-2xl border border-border p-6 focus:outline-none`}
                >
                    {title && (
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-foreground">{title}</h3>

                            <button
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    {children}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}