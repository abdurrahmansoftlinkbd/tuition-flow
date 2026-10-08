const ReportsSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-3">
          <div className="skeleton h-8 w-64" />
          <div className="skeleton h-4 w-80" />
        </div>

        <div className="skeleton h-12 w-44" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="rounded-xl border border-base-200 bg-base-100 p-5"
          >
            <div className="flex justify-between">
              <div className="space-y-3">
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-8 w-32" />
              </div>

              <div className="skeleton h-11 w-11 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-6">
        <div className="skeleton h-5 w-48" />

        <div className="skeleton mt-6 h-80 w-full rounded-lg" />
      </div>

      {/* Two Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-base-200 bg-base-100 p-6">
          <div className="skeleton h-5 w-40" />
          <div className="skeleton mt-6 h-72 w-full rounded-lg" />
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-6">
          <div className="skeleton h-5 w-40" />
          <div className="skeleton mt-6 h-72 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ReportsSkeleton;
