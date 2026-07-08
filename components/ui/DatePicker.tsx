"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    addMonths,
    format,
    getDaysInMonth,
    startOfMonth,
    getDay,
    subMonths,
} from "date-fns";

interface DatePickerProps {
    label?: React.ReactNode;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function DatePicker({
    label,
    value,
    onChange,
    placeholder = "Select date",
}: DatePickerProps) {
    const [open, setOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({
        top: 0,
        left: 0,
    });

    useEffect(() => {

        if (!open || !buttonRef.current) return;


        const rect =
            buttonRef.current.getBoundingClientRect();


        const popupHeight = 280;


        const spaceBottom =
            window.innerHeight - rect.bottom;


        const openTop =
            spaceBottom < popupHeight;


        setPosition({

            left: rect.left,

            top: openTop
                ? rect.top - popupHeight + 35
                : rect.bottom + 6,

        });


    }, [open]);

    const [month, setMonth] =
        useState(new Date());

    const days =
        getDaysInMonth(month);

    const firstDay =
        getDay(startOfMonth(month));

    const selected =
        value ? new Date(value) : null;


    const selectDate = (day: number) => {
        const date =
            new Date(
                month.getFullYear(),
                month.getMonth(),
                day
            );

        onChange(
            format(date, "yyyy-MM-dd")
        );

        setOpen(false);
    };


    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2.5"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex h-12 w-full items-center justify-between rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted/40 cursor-pointer">
                    <span>
                        {
                            selected
                                ? format(selected, "dd MMM yyyy")
                                : placeholder
                        }
                    </span>
                    <Calendar
                        size={15}
                        className="text-muted-foreground"
                    />
                </button>

                {open &&
                    createPortal(
                        <div
                            ref={calendarRef}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: "fixed",
                                top: position.top,
                                left: position.left,
                                zIndex: 99999,
                                pointerEvents: "auto",
                            }}
                            className="w-64 rounded-xl  border border-border bg-card p-3 shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95">
                            {/* HEADER */}
                            <div className="mb-3 flex items-center justify-between">
                                <button
                                    className="cursor-pointer"
                                    type="button"
                                    onClick={() =>
                                        setMonth(
                                            subMonths(month, 1)
                                        )
                                    }
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <p className="text-sm font-semibold">
                                    {format(
                                        month,
                                        "MMMM yyyy"
                                    )}
                                </p>

                                <button
                                    className="cursor-pointer"
                                    type="button"
                                    onClick={() =>
                                        setMonth(
                                            addMonths(month, 1)
                                        )
                                    }
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            {/* DAYS */}
                            <div
                                className="mb-2 grid grid-cols-7 text-center text-xs text-muted-foreground ">
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",].map(day => (
                                    <div key={day}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* DATE */}
                            <div className=" grid grid-cols-7 gap-1 text-center text-sm">
                                {Array.from({
                                    length: firstDay,
                                }).map((_, i) => (
                                    <div key={i} />
                                ))}

                                {Array.from({
                                    length: days,
                                }).map((_, i) => {
                                    const day = i + 1;
                                    const active = selected && selected.getDate() === day && selected.getMonth() === month.getMonth();
                                    return (
                                        <button
                                            type="button"
                                            key={day}
                                            onClick={() =>
                                                selectDate(day)
                                            }
                                            className={`cursor-pointer flex h-8 items-center justify-center rounded-lg transition hover:bg-muted ${active && "bg-primary text-white"} `}>
                                            {day}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>,
                        document.body
                    )
                }
            </div>
        </div>
    );
}