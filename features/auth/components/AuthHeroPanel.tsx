import { Check, Zap } from "lucide-react";
import { AUTH_FEATURES } from "../constants/authFeatures";

export default function AuthHeroPanel() {
    return (
        <section className="relative hidden flex-1 items-center justify-center overflow-hidden bg-primary px-12 py-10 lg:flex">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5" />
                <div className="absolute left-1/4 top-1/2 h-48 w-48 rounded-full bg-white/5" />
            </div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="mb-6 text-white">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
                        Why ProjectFlow?
                    </div>

                    <h2 className="mb-4 text-4xl font-bold leading-tight">
                        Manage projects like a pro team
                    </h2>

                    <p className="text-sm leading-relaxed text-white/70">
                        Bring your team together with powerful tools for planning,
                        tracking, and shipping — built for modern teams.
                    </p>
                </div>

                <div className="space-y-2.5">
                    {AUTH_FEATURES.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                                <Check size={11} className="text-white" />
                            </div>

                            <span className="text-sm text-white/80">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
                            <Zap size={12} className="text-white" />
                        </div>

                        <span className="text-sm font-semibold text-white">
                            ProjectFlow v2.0
                        </span>

                        <span className="ml-auto text-xs text-white/60">68%</span>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                        <div className="h-full w-[68%] rounded-full bg-white" />
                    </div>

                    <div className="mt-3 flex items-center">
                        <div className="flex -space-x-1.5">
                            {["AR", "SC", "MJ"].map((initials) => (
                                <div
                                    key={initials}
                                    title={initials}
                                    className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-white/20 text-[10px] font-semibold text-white"
                                >
                                    {initials}
                                </div>
                            ))}
                        </div>

                        <span className="ml-2 text-xs text-white/60">+2 members</span>
                        <span className="ml-auto text-xs text-white/60">Due Jul 15</span>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-white/40">
                    Trusted by 10,000+ teams worldwide
                </p>
            </div>
        </section>
    );
}