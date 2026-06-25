"use client";


import { useRef, useState } from "react";
import { AtSign, Paperclip, Send, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { Avatar, Button } from "@/components/ui";
import * as Popover from "@radix-ui/react-popover";

interface TaskCommentInputProps {
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    onSend: (comment: string) => void;
}

export default function TaskCommentInput({
    comment,
    setComment,
    onSend,
}: TaskCommentInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setComment((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handleMention = () => {
        setComment((prev) => prev + "@");
    };

    const handleAttachment = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        console.log(file);

        // nanti upload ke API
    };
    const handleSend = () => {
        const value = comment.trim();

        if (!value) return;

        onSend(value);

        setComment("");
    };

    return (
        <div className="shrink-0 border-t border-border p-4">
            <div className="flex gap-2.5">
                <Avatar name="Alex Rivera" size="sm" />
                <div className="flex-1 border border-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                    <textarea
                        rows={2}
                        value={comment}
                        placeholder="Write a comment... @mention someone"
                        className="w-full resize-none bg-transparent px-3 pt-2.5 pb-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <div className="flex items-center justify-between px-2 py-1.5 border-t border-border bg-muted/30">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Popover.Root>
                                <Popover.Trigger asChild>
                                    <button
                                        type="button"
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[state=open]:bg-primary/10 data-[state=open]:text-primary"
                                    >
                                        <Smile size={16} />
                                    </button>
                                </Popover.Trigger>

                                <Popover.Portal>
                                    <Popover.Content
                                        side="top"
                                        align="start"
                                        sideOffset={10}
                                        className=" z-50 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl animate-in fade-in-0 zoom-in-95 data-[side=top]:slide-in-from-bottom-2"
                                    >
                                        <EmojiPicker
                                            onEmojiClick={handleEmojiClick}
                                            width={340}
                                            height={420}
                                            theme={Theme.AUTO}
                                            lazyLoadEmojis
                                            skinTonesDisabled
                                            previewConfig={{
                                                showPreview: false,
                                            }}
                                        />

                                        <Popover.Arrow className="fill-card" />
                                    </Popover.Content>
                                </Popover.Portal>
                            </Popover.Root>

                            <button
                                onClick={handleMention}
                                className="p-0.5 hover:text-foreground transition-colors">
                                <AtSign size={13} />
                            </button>
                            <button
                                onClick={handleAttachment}
                                className="p-0.5 hover:text-foreground transition-colors">
                                <Paperclip size={13} />
                            </button>
                        </div>
                        <Button
                            size="xs"
                            variant="primary"
                            disabled={!comment.trim()}
                            onClick={handleSend}
                        >
                            <Send size={11} />
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
