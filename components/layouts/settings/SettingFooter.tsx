import {
    Check,
    Loader2,
} from "lucide-react";

import {
    Button,
} from "@/components/ui";

interface SettingFooterProps {
    onSave: () => Promise<void> | void;
    saved?: boolean;
    isSubmitting?: boolean;
    disabled?: boolean;
}

export default function SettingFooter({
    onSave,
    saved = false,
    isSubmitting = false,
    disabled = false,
}: SettingFooterProps) {
    return (
        <div className="mt-4 flex justify-end border-t border-border pt-4">
            <Button
                size="sm"
                variant="primary"
                disabled={disabled || isSubmitting}
                onClick={() =>
                    void onSave()
                }
                className="gap-1.5"
            >
                {isSubmitting ? (
                    <>
                        <Loader2
                            size={12}
                            className="animate-spin"
                        />
                        Saving...
                    </>
                ) : saved ? (
                    <>
                        <Check size={12} />
                        Saved!
                    </>
                ) : (
                    "Save changes"
                )}
            </Button>
        </div>
    );
}