import { Button } from '@/components/ui'
import { Check } from 'lucide-react'

interface SettingFooterProps {
    onSave: () => void,
    saved: boolean
}
export default function SettingFooter({ onSave, saved }: SettingFooterProps) {
    return (
        <div className="flex justify-end pt-2 border-t border-border mt-4">
            <Button
                size="sm"
                variant="primary"
                onClick={onSave}
                className="gap-1.5"
            >
                {saved ? <><Check size={12} />Saved!</> : "Save changes"}
            </Button>
        </div>
    )
}
