interface AuthModeSwitchProps {
    isLogin: boolean;
    onSwitchMode: () => void;
}

export function AuthModeSwitch({ isLogin, onSwitchMode }: AuthModeSwitchProps) {
    return (
        <p className="mt-5 text-center text-xs text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}

            <button
                type="button"
                onClick={onSwitchMode}
                className="font-medium text-primary hover:underline"
            >
                {isLogin ? "Sign up free" : "Sign in"}
            </button>
        </p>
    );
}