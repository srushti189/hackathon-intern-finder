interface Geo { label: string; value: number; }

export function GeoCard({ data }: { data: Geo[] }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <div className="col-span-4 border border-zinc-800/50 bg-panel/50 p-4 ring-1 ring-black/5 flex flex-col">
      <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest mb-6">
        Geo_Intensity
      </h2>
      <div className="space-y-3 flex-1">
        {data.slice(0, 6).map((d) => {
          const pct = (d.value / total) * 100;
          return (
            <div key={d.label} className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>{d.label}</span>
                <span className="text-brand">{pct.toFixed(1)}%</span>
              </div>
              <div className="h-1 bg-zinc-800 w-full">
                <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}