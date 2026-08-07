"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { isAfter, isBefore, isSameDay, } from "date-fns";
import {
    addMonths,
    format,
    getDaysInMonth,
    startOfMonth,
    getDay,
    subMonths,
} from "date-fns";
import { FieldWrapper } from "./FieldWrapper";

interface DateRangePickerProps {
    label?: React.ReactNode;
    startDate?: string;
    endDate?: string;
    onChange: (
        startDate: string,
        endDate: string
    ) => void;
    placeholder?: string;
    error?: string;
}

export function DateRangePicker({
    label,
    error,
    startDate,
    endDate,
    onChange,
    placeholder = "Select schedule",
}: DateRangePickerProps) {
    const [open, setOpen] = useState(false);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({
        top: 0,
        left: 0,
    });

    useEffect(() => {
        if (!open || !buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const popupHeight = 280;
        const spaceBottom = window.innerHeight - rect.bottom;
        const openTop = spaceBottom < popupHeight;
        setPosition({
            left: rect.left,
            top: openTop
                ? rect.top - popupHeight + 35
                : rect.bottom + 6,
        });
    }, [open]);

    const [month, setMonth] = useState(
        startDate ? new Date(startDate) : new Date()
    );

    const days = getDaysInMonth(month);

    const firstDay = getDay(startOfMonth(month));

    const start = startDate
        ? new Date(startDate)
        : null;

    const end = endDate
        ? new Date(endDate)
        : null;

    const isWithinRange = (
        date: Date,
        start: Date,
        end: Date
    ) =>
        (isAfter(date, start) || isSameDay(date, start)) &&
        (isBefore(date, end) || isSameDay(date, end));

    const isWithinPreview = (
        date: Date,
        start: Date,
        hover: Date
    ) => {
        if (isBefore(hover, start)) {
            return (
                (isAfter(date, hover) || isSameDay(date, hover)) &&
                (isBefore(date, start) || isSameDay(date, start))
            );
        }

        return (
            (isAfter(date, start) || isSameDay(date, start)) &&
            (isBefore(date, hover) || isSameDay(date, hover))
        );
    };

    const selectDate = (day: number) => {
        const date = new Date(
            month.getFullYear(),
            month.getMonth(),
            day
        );

        const formatted = format(date, "yyyy-MM-dd");

        // First click
        if (!start || end) {
            setHoverDate(null);
            onChange(formatted, "");
            return;
        }

        // Second click
        if (isBefore(date, start)) {
            onChange(formatted, startDate!);
        } else {
            onChange(startDate!, formatted);
        }

        setHoverDate(null);
    };

    useEffect(() => {
        if (startDate) {
            setMonth(new Date(startDate));
        } else {
            setMonth(new Date());
        }
    }, [startDate]);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                calendarRef.current?.contains(target) ||
                buttonRef.current?.contains(target)
            ) {
                return;
            }

            setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [open]);

    return (
        <FieldWrapper label={label}>
            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex h-12 w-full items-center justify-between rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted/40 cursor-pointer">
                    <span className="text-muted-foreground">
                        {
                            start && end
                                ? `${format(start, "dd MMM yyyy")} → ${format(end, "dd MMM yyyy")}`
                                : start
                                    ? `${format(start, "dd MMM yyyy")} →`
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
                            <div className=" grid grid-cols-7 gap-0 text-center text-sm">
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={i} />
                                ))}

                                {Array.from({ length: days }).map((_, i) => {
                                    const day = i + 1;
                                    const current = new Date(month.getFullYear(), month.getMonth(), day);
                                    const inRange = !!start && !!end && isWithinRange(current, start, end);
                                    const isStart = start && isSameDay(current, start);
                                    const isEnd = end && isSameDay(current, end);
                                    const isMiddle = inRange && !isStart && !isEnd;
                                    const previewRange = !!start && !end && !!hoverDate && isWithinPreview(current, start, hoverDate);
                                    const isPreviewMiddle = !!previewRange && !isStart;

                                    return (
                                        <div
                                            key={day}
                                            className={[
                                                "relative flex h-10 w-full items-center justify-center",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                        >
                                            {(isMiddle || isPreviewMiddle) && (
                                                <div className="absolute left-0 right-0 top-1/2 h-8 -translate-y-1/2 bg-primary/15" />
                                            )}
                                            {isStart && (
                                                <div className="absolute right-0 top-1/2 h-8 w-1/2 -translate-y-1/2 bg-primary/15" />
                                            )}
                                            {isEnd && (
                                                <div className="absolute left-0 top-1/2 h-8 w-1/2 -translate-y-1/2 bg-primary/15" />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => selectDate(day)}
                                                onMouseEnter={() => {
                                                    if (start && !end) {
                                                        setHoverDate(current);
                                                    }
                                                }}
                                                onMouseLeave={() => {
                                                    if (start && !end) {
                                                        setHoverDate(null);
                                                    }
                                                }}
                                                className={[
                                                    "relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm transition cursor-pointer",
                                                    "hover:bg-muted",
                                                    (isStart || isEnd) && "bg-primary text-primary-foreground",
                                                    !isStart && !isEnd && (isMiddle || isPreviewMiddle) && "text-primary"
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ")}
                                            >
                                                {day}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* FOOTER */}
                            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                                <button
                                    type="button"
                                    className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted cursor-pointer"
                                    onClick={() => setMonth(new Date())}>
                                    Today
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md px-2 py-1 text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
                                    onClick={() => {
                                        onChange("", "");
                                        setHoverDate(null);
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>,
                        document.body
                    )
                }
            </div>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </FieldWrapper>
    );
}