export default function FormSkeleton() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 p-8 text-center">
      {/* Header Skeleton */}
      <div className="w-96 h-10 bg-gray-200 rounded-lg animate-pulse mb-4" />
      <div className="w-[500px] h-6 bg-gray-200 rounded-lg animate-pulse mb-8" />

      {/* Form Skeleton */}
      <div className="max-w-[698px] w-full">
        <div className="shadow-sm border-zinc-200 border-[1px] rounded-[34px] p-8">
          {/* Steps Skeleton */}
          <div className="flex items-center gap-[18px] px-8 pb-8 border-b-[1px] border-zinc-200">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-16 h-2 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="mt-8">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="w-96 h-4 bg-gray-200 rounded animate-pulse mb-8" />

            {/* Form Fields Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((field) => (
                <div
                  key={field}
                  className="w-full h-12 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex justify-between mt-6">
          <div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
