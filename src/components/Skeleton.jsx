const Skeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row my-14 gap-6">

                {/* LEFT SIDEBAR SKELETON */}
                <div className="hidden md:block md:w-[30%]">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="skeleton h-16 w-16 rounded-full"></div>
                            <div className="flex flex-col gap-2">
                                <div className="skeleton h-4 w-40"></div>
                                <div className="skeleton h-3 w-28"></div>
                            </div>
                        </div>

                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-10 w-full"></div>
                    </div>
                </div>

                {/* CENTER FEED CARD SKELETON */}
                <div className="w-full md:w-[40%]">
                    <div className="bg-base-100 rounded-2xl shadow p-6">
                        <div className="flex justify-center -mt-12 mb-4">
                            <div className="skeleton h-24 w-24 rounded-full"></div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="skeleton h-4 w-1/2 mx-auto"></div>
                            <div className="skeleton h-3 w-1/3 mx-auto"></div>

                            <div className="flex justify-center gap-2 mt-2">
                                <div className="skeleton h-6 w-16 rounded-full"></div>
                                <div className="skeleton h-6 w-16 rounded-full"></div>
                            </div>

                            <div className="skeleton h-4 w-full mt-3"></div>
                            <div className="skeleton h-4 w-full"></div>

                            <div className="flex justify-center gap-4 mt-6">
                                <div className="skeleton h-10 w-24 rounded-full"></div>
                                <div className="skeleton h-10 w-24 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR SKELETON */}
                <div className="hidden lg:block lg:w-[30%]">
                    <div className="flex flex-col gap-3">
                        <div className="skeleton h-8 w-full"></div>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="skeleton h-14 w-full"></div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Skeleton
