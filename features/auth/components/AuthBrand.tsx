import { Zap } from "lucide-react";

export function AuthBrand() {
    return (
        <div className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Zap size={20} className="text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight">
                ProjectFlow
            </span>
        </div>
    );
}