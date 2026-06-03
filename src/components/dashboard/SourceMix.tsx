import type { Source } from "@/data/opportunities";

interface Slice { source: Source; value: number; }

const COLORS: Record<Source, string> = {
  INTERNSHALA: "bg-brand",
  UNSTOP: "bg-blue-400",
  DEVFOLIO: "bg-fuchsia-400",
};

export function SourceMix({
  data,
  internshipAvg,
  hackathonPool,
}: {
  data: Slice[];
  internshipAvg: number;
  hackathonPool: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <div className="col-span-12 grid grid-cols-12 gap-6">
      <div className="col-span-7 border border-zinc-800/50 bg-panel/50 p-4 ring-1 ring-black/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest">
            Source_Mix // Provider_Share
          </h2>
          <span className="text-[10px] text-zinc-500">{total} TOTAL</span>
        </div>
        <div className="flex h-3 w-full overflow-hidden border border-zinc-800/60">
          {data.map((d) => {
            const pct = (d.value / total) * 100;
            return (
              <div
                key={d.source}
                className={`${COLORS[d.source]} opacity-80 hover:opacity-100 transition-opacity`}
                style={{ width: `${pct}%` }}
                title={`${d.source}: ${d.value}`}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {data.map((d) => {
            const pct = (d.value / total) * 100;
            return (
              <div key={d.source} className="flex items-center gap-2 text-[10px]">
                <span className={`w-2 h-2 ${COLORS[d.source]}`} />
                <span className="text-zinc-300 uppercase">{d.source}</span>
                <span className="text-zinc-500 ml-auto">
                  {d.value} · {pct.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-span-5 border border-zinc-800/50 bg-panel/50 p-4 ring-1 ring-black/5 grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-between">
          <span className="text-[10px] text-zinc-500 uppercase">Avg_Intern_Stipend</span>
          <span className="text-2xl text-brand font-medium tracking-tight">
            {internshipAvg ? `₹${(internshipAvg / 1000).toFixed(1)}K` : "—"}
          </span>
          <span className="text-[9px] text-zinc-600">/month · normalized</span>
        </div>
        <div className="flex flex-col justify-between border-l border-zinc-800/60 pl-4">
          <span className="text-[10px] text-zinc-500 uppercase">Hack_Prize_Pool</span>
          <span className="text-2xl text-fuchsia-400 font-medium tracking-tight">
            {hackathonPool ? `₹${(hackathonPool / 100000).toFixed(1)}L` : "—"}
          </span>
          <span className="text-[9px] text-zinc-600">cumulative · indexed</span>
        </div>
      </div>
    </div>
  );
}