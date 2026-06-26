const ShimmerCard = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[#0B0E14] min-h-screen">
      <div
        className="w-full max-w-sm h-[520px]
                   rounded-2xl border border-white/10
                   bg-white/[0.03] backdrop-blur-xl
                   shadow-2xl shadow-black/40
                   p-4 animate-pulse"
      >
        {/* Image / Photo */}
        <div className="h-64 w-full rounded-xl bg-white/[0.08]"></div>

        {/* Name + About */}
        <div className="mt-5 space-y-3">
          <div className="h-4 w-3/4 bg-white/[0.08] rounded"></div>
          <div className="h-4 w-1/2 bg-white/[0.06] rounded"></div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="h-12 w-12 bg-white/[0.08] rounded-full"></div>
          <div className="h-12 w-12 bg-white/[0.08] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;