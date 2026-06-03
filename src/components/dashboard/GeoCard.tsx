interface Geo { label: string; value: number; }

export function GeoCard({ data }: { data: Geo[] }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <div className="col-span-4 border border-zinc-800/50 bg-panel/50 p-4 ring-1 ring-black/5 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest">
          Geo_Intensity
        </h2>
        <span className="text-[10px] text-zinc-500">TOP_{Math.min(8, data.length)}</span>
      </div>
      {data.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-xs text-zinc-600">
          NO_LOCATIONS
        </div>
      )}
      <div className="space-y-3 flex-1">
        {data.slice(0, 8).map((d) => {
          const pct = (d.value / total) * 100;
          return (
            <div key={d.label} className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-300">
                <span className="truncate pr-2" title={d.label}>{d.label}</span>
                <span className="text-brand whitespace-nowrap">{d.value} · {pct.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 bg-zinc-800/80 w-full">
                <div className="h-full bg-gradient-to-r from-brand/40 to-brand" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}