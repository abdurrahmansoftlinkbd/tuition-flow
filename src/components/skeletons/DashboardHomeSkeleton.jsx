import TableSkeleton from "./TableSkeleton";

const DashboardHomeSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="skeleton h-4 w-40" />
        <div className="skeleton h-8 w-64" />
        <div className="skeleton h-4 w-80" />
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="rounded-xl border border-base-200 bg-base-100 p-5"
          >
            <div className="flex justify-between">
              <div className="space-y-3">
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-8 w-24" />
              </div>

              <div className="skeleton h-11 w-11 rounded-xl" />
            </div>

            <div className="skeleton mt-5 h-3 w-36" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5">
        <div className="space-y-2">
          <div className="skeleton h-5 w-44" />
          <div className="skeleton h-3 w-64" />
        </div>

        <div className="skeleton mt-6 h-64 w-full rounded-lg" />
      </div>

      {/* Tables */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-base-200 bg-base-100 xl:col-span-2">
          <div className="border-b border-base-200 p-5">
            <div className="skeleton h-5 w-40" />
          </div>

          <TableSkeleton rows={4} columns={4} />
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100">
          <div className="border-b border-base-200 p-5">
            <div className="skeleton h-5 w-40" />
          </div>

          <div className="space-y-3 p-5">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="skeleton h-16 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeSkeleton;
