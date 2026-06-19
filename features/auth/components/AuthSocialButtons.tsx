import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export function AuthSocialButtons() {
    return (
        <div className="mb-5 grid grid-cols-2 gap-2">
            <button
                type="button"
                className="cursor-pointer flex h-12 items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
                <FcGoogle size={20} />
                Google
            </button>

            <button
                type="button"
                className="cursor-pointer flex h-12 items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
                <FaGithub size={18} />
                GitHub
            </button>
        </div>
    );
}