interface KPI {
  label: string;
  value: string;
  tone?: "brand" | "danger" | "warn" | "default";
}

export function KPIStrip({ kpis }: { kpis: KPI[] }) {
  return (
    <div className="grid grid-cols-5 divide-x divide-zinc-800/50 border-b border-zinc-800/50 bg-zinc-900/40">
      {kpis.map((k) => {
        const tone =
          k.tone === "brand" ? "text-brand"
          : k.tone === "danger" ? "text-red-400"
          : k.tone === "warn" ? "text-orange-400"
          : "text-zinc-100";
        const label =
          k.tone === "brand" ? "text-brand/70" : "text-zinc-500";
        return (
          <div key={k.label} className="p-4 flex flex-col gap-1">
            <span className={`text-[10px] uppercase ${label}`}>{k.label}</span>
            <span className={`text-xl font-medium tracking-tight ${tone}`}>{k.value}</span>
          </div>
        );
      })}
    </div>
  );
}