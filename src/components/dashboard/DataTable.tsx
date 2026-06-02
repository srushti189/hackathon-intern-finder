import type { Opportunity } from "@/data/opportunities";

function fmtStipend(n: number, type: Opportunity["type"]) {
  if (type === "hackathon") return `₹${(n / 1000).toFixed(0)}K Pool`;
  return `₹${n.toLocaleString("en-IN")}/mo`;
}

function fmtDeadline(days: number) {
  if (days <= 0) return "CLOSED";
  if (days < 1) return "<1d";
  return `${days.toString().padStart(2, "0")}d ${(Math.floor(Math.random() * 23)).toString().padStart(2, "0")}h`;
}

function providerBadge(src: Opportunity["source"]) {
  const styles: Record<Opportunity["source"], string> = {
    UNSTOP: "border-brand/30 bg-brand/5 text-brand",
    INTERNSHALA: "border-zinc-700 bg-zinc-800 text-zinc-300",
    DEVFOLIO: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  };
  return styles[src];
}

export function DataTable({ rows, page, setPage, perPage }: {
  rows: Opportunity[];
  page: number;
  setPage: (n: number) => void;
  perPage: number;
}) {
  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const slice = rows.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="border border-zinc-800/50 bg-panel/50 overflow-hidden ring-1 ring-black/5">
      <div className="px-4 py-3 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/50">
        <span className="text-[10px] uppercase font-semibold text-zinc-100">
          Stream_Dump // Primary_Listings
        </span>
        <span className="text-[10px] text-brand/60">{rows.length} RECORDS</span>
      </div>
      <table className="w-full text-left">
        <thead className="text-[10px] text-zinc-500 uppercase border-b border-zinc-800/50">
          <tr>
            <th className="px-4 py-3 font-medium">Opp_ID</th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Provider</th>
            <th className="px-4 py-3 font-medium">Comp_Value</th>
            <th className="px-4 py-3 font-medium">T_Minus</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {slice.length === 0 && (
            <tr><td colSpan={5} className="px-4 py-8 text-center text-xs text-zinc-600">NO_MATCHING_RECORDS</td></tr>
          )}
          {slice.map((r) => (
            <tr key={r.id} className="hover:bg-brand/5 group cursor-pointer">
              <td className="px-4 py-3 text-xs text-zinc-500">#{r.id}</td>
              <td className="px-4 py-3 text-xs text-zinc-100 font-medium">
                {r.title}
                <span className="text-zinc-600 ml-2">@ {r.company}</span>
              </td>
              <td className="px-4 py-3 text-xs">
                <span className={`px-1.5 py-0.5 border text-[9px] ${providerBadge(r.source)}`}>
                  {r.source}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-zinc-400">{fmtStipend(r.stipend, r.type)}</td>
              <td className={`px-4 py-3 text-xs ${r.deadlineDays <= 2 ? "text-red-400" : r.deadlineDays <= 7 ? "text-orange-400" : "text-emerald-400"}`}>
                {fmtDeadline(r.deadlineDays)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2 border-t border-zinc-800/50 bg-zinc-950 flex items-center justify-between">
        <p className="text-[9px] text-zinc-600">
          PAGE_INDEX: {String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
        </p>
        <div className="flex gap-4">
          <button
            disabled={page === 0}
            onClick={() => setPage(Math.max(0, page - 1))}
            className="text-[9px] text-zinc-500 hover:text-brand disabled:opacity-30"
          >PREV</button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            className="text-[9px] text-zinc-500 hover:text-brand disabled:opacity-30"
          >NEXT</button>
        </div>
      </div>
    </div>
  );
}