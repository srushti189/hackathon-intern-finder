interface Bar { label: string; value: number; }

export function CategoryChart({ data }: { data: Bar[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="col-span-8 border border-zinc-800/50 bg-panel/50 p-4 ring-1 ring-black/5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest">
          Frequency_Distribution // Categories
        </h2>
        <span className="text-[10px] text-zinc-500">LIVE_DATA</span>
      </div>
      {data.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-xs text-zinc-600">
          NO_DATA_IN_SELECTION
        </div>
      ) : (
        <>
          <div className="h-56 flex items-end gap-3 border-b border-zinc-800/40 pb-1">
            {data.map((d) => {
              const h = (d.value / max) * 100;
              return (
                <div key={d.label} className="flex-1 relative group flex flex-col justify-end h-full">
                  <span className="text-[10px] text-brand text-center mb-1 font-medium">
                    {d.value}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-brand/60 to-brand/20 border-t border-brand group-hover:from-brand/80 group-hover:to-brand/40 transition-colors"
                    style={{ height: `${h}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 mt-2">
            {data.map((d) => (
              <div
                key={d.label}
                className="flex-1 text-[9px] text-zinc-400 uppercase truncate text-center"
                title={d.label}
              >
                {d.label.replace(/_/g, " ")}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}