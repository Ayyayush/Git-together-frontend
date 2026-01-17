const ShimmerCard = () => {
  return (
    <div className="flex-1 flex items-center justify-center overflow-y-auto p-8">
      <div className="p-4 max-w-sm w-full mx-auto h-[550px] shadow-lg rounded-lg bg-base-100">
        
        {/* Image shimmer */}
        <div className="bg-gray-300 h-60 rounded-lg shimmer-animation"></div>

        {/* Text shimmer */}
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded shimmer-animation"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded shimmer-animation"></div>
        </div>

        {/* Action buttons shimmer */}
        <div className="mt-6 flex justify-center space-x-4">
          <div className="h-10 w-10 bg-gray-300 rounded-full shimmer-animation"></div>
          <div className="h-10 w-10 bg-gray-300 rounded-full shimmer-animation"></div>
        </div>

      </div>
    </div>
  );
};

export default ShimmerCard;
