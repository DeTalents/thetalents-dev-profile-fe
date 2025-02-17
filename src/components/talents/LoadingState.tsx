// components/LoadingState.tsx
export const LoadingState = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse"
        >
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
};
