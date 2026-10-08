const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="overflow-hidden">
      <div className="space-y-4 p-5">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid items-center gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }, (_, columnIndex) => (
              <div key={columnIndex} className="skeleton h-9 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
