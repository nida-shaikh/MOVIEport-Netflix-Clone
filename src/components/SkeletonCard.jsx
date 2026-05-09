function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Image Skeleton */}
      <div className="w-full h-[280px] md:h-[300px] bg-gray-800"></div>
      {/* Text Skeleton */}
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;