const ShimmerCard = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div
        className="w-full max-w-sm h-[520px]
                   rounded-xl bg-base-100 shadow-lg
                   p-4 animate-pulse"
      >
        {/* Image / Photo */}
        <div className="h-64 w-full rounded-lg bg-gray-300"></div>

        {/* Name + About */}
        <div className="mt-5 space-y-3">
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
          <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
