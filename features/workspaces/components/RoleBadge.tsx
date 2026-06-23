import {
    DEFAULT_ROLE_STYLE,
    ROLE_STYLES,
} from "../constants/workspaceStyles";

interface RoleBadgeProps {
    role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[role] ?? DEFAULT_ROLE_STYLE
                }`}
        >
            {role}
        </span>
    );
}