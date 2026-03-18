const SkeletonProduct = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Top section with breadcrumb */}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Image gallery */}
        <div className="md:w-1/2">
          {/* Main image */}
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse mb-4"></div>

          {/* Thumbnail row */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="w-16 h-16 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="md:w-1/2">
          {/* Brand */}
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-4"></div>

          {/* Product name */}
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse mb-6"></div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mt-2"></div>
          </div>

          {/* Promotion codes */}
          <div className="flex gap-4 mb-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-12 bg-gray-200 rounded w-48 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Benefits box */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-4"></div>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-3"></div>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "2XL"].map((size) => (
                <div
                  key={size}
                  className="w-12 h-12 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
