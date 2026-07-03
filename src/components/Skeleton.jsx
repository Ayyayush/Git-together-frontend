const Skeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 bg-[#0B0E14] min-h-screen">
            <div className="flex flex-col md:flex-row my-14 gap-6">

                {/* LEFT SIDEBAR SKELETON */}
                <div className="hidden md:block md:w-[30%]">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-white/[0.06] animate-pulse shrink-0" />
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="h-4 w-40 rounded bg-white/[0.06] animate-pulse" />
                                <div className="h-3 w-28 rounded bg-white/[0.04] animate-pulse" />
                            </div>
                        </div>

                        <div className="h-10 w-full rounded-xl bg-white/[0.05] animate-pulse" />
                        <div className="h-10 w-full rounded-xl bg-white/[0.05] animate-pulse" />
                        <div className="h-10 w-full rounded-xl bg-white/[0.04] animate-pulse" />
                    </div>
                </div>

                {/* CENTER FEED CARD SKELETON */}
                <div className="w-full md:w-[40%]">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40 p-6">
                        <div className="flex justify-center -mt-12 mb-4">
                            <div className="w-24 h-24 rounded-full bg-white/[0.08] animate-pulse ring-2 ring-white/10" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="h-4 w-1/2 mx-auto rounded bg-white/[0.07] animate-pulse" />
                            <div className="h-3 w-1/3 mx-auto rounded bg-white/[0.05] animate-pulse" />

                            <div className="flex justify-center gap-2 mt-2">
                                <div className="h-6 w-16 rounded-full bg-white/[0.06] animate-pulse" />
                                <div className="h-6 w-16 rounded-full bg-white/[0.06] animate-pulse" />
                            </div>

                            <div className="h-3 w-full rounded bg-white/[0.05] animate-pulse mt-3" />
                            <div className="h-3 w-full rounded bg-white/[0.04] animate-pulse" />

                            <div className="flex justify-center gap-4 mt-6">
                                <div className="h-10 w-24 rounded-full bg-white/[0.06] animate-pulse" />
                                <div className="h-10 w-24 rounded-full bg-indigo-500/10 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR SKELETON */}
                <div className="hidden lg:block lg:w-[30%]">
                    <div className="flex flex-col gap-3">
                        <div className="h-8 w-full rounded-xl bg-white/[0.06] animate-pulse" />
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-14 w-full rounded-xl bg-white/[0.04] animate-pulse" style={{ opacity: 1 - i * 0.07 }} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Skeleton