import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface AvatarProps {
    name: string;
    src?: string;
    size?: "xs" | "sm" | "md" | "lg";
    color?: string;
}

const avatarColors = [
    "bg-indigo-500",
    "bg-violet-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-pink-500",
    "bg-teal-500",
];

export function Avatar({ name, src, size = "sm", color }: AvatarProps) {
    const sizes = {
        xs: "w-5 h-5 text-xs",
        sm: "w-7 h-7 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-sm",
    };

    const bg = color || avatarColors[name.charCodeAt(0) % avatarColors.length];

    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <AvatarPrimitive.Root className={`${sizes[size]} rounded-full overflow-hidden shrink-0`}>
            {src && <AvatarPrimitive.Image src={src} alt={name} className="w-full h-full object-cover" />}
            <AvatarPrimitive.Fallback
                className={`w-full h-full ${bg} text-white flex items-center justify-center font-semibold`}
            >
                {initials}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
}