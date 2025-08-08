const Loading = () => {
  return (
    // Wrapper with padding and pulse animation
    <div className="p-8 animate-pulse">
      {/* Outer container with rounded corners and shadow */}
      <div className="rounded-lg overflow-hidden shadow-md">
        
        {/* Simulated table header row */}
        <div className="p-8 bg-gray-200 flex space-x-32">
          <div className="h-6 bg-gray-300 rounded w-1/6"></div>
          <div className="h-6 bg-gray-300 rounded w-2/6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/6"></div>
        </div>

        {/* Simulated table rows */}
        <div className="p-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 py-2 mt-4"
            >
              {/* Placeholder cells for each column in the row */}
              <div className="h-8 bg-gray-200 rounded w-1/6 mr-2"></div>
              <div className="h-8 bg-gray-200 rounded w-2/6 mr-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/6 mr-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
