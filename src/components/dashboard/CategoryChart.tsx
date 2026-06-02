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
      <div className="h-48 flex items-end gap-2">
        {data.map((d) => {
          const h = (d.value / max) * 100;
          return (
            <div key={d.label} className="flex-1 bg-zinc-800 relative group">
              <div
                className="absolute bottom-0 w-full bg-brand/40 group-hover:bg-brand/70 transition-colors"
                style={{ height: `${h}%` }}
              />
              <div className="absolute -top-6 left-0 right-0 text-center text-[9px] opacity-0 group-hover:opacity-100 transition-opacity text-brand">
                {d.value}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-2">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-[9px] text-zinc-500 uppercase truncate text-center">
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}