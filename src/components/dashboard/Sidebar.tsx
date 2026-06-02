import type { Source } from "@/data/opportunities";

interface Props {
  sources: Source[];
  activeSources: Set<Source>;
  toggleSource: (s: Source) => void;
  categories: string[];
  activeCategory: string | null;
  setCategory: (c: string | null) => void;
  locations: string[];
  location: string;
  setLocation: (l: string) => void;
  onExecute: () => void;
}

export function Sidebar(props: Props) {
  const {
    sources, activeSources, toggleSource,
    categories, activeCategory, setCategory,
    locations, location, setLocation, onExecute,
  } = props;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-zinc-800/50 bg-surface/80 backdrop-blur-md z-10 flex flex-col">
      <div className="p-4 border-b border-zinc-800/50 flex items-center gap-3">
        <div className="size-3 rounded-full bg-brand animate-pulse" />
        <span className="text-xs font-semibold tracking-tighter text-zinc-100 uppercase">
          Opportunity_Kernel v2.4
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        <section>
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Filters_Source</h3>
          <div className="space-y-2">
            {sources.map((s) => {
              const on = activeSources.has(s);
              return (
                <label
                  key={s}
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={(e) => { e.preventDefault(); toggleSource(s); }}
                >
                  <div className={`size-4 border ${on ? "border-brand/60" : "border-zinc-700"} bg-zinc-900 group-hover:border-brand/50 flex items-center justify-center`}>
                    {on && <div className="size-2 bg-brand" />}
                  </div>
                  <span className={`text-sm ${on ? "text-zinc-200" : "text-zinc-500"} group-hover:text-brand`}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Category_Lvl</h3>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            <div
              className={`py-1 px-2 text-sm cursor-pointer ${activeCategory === null ? "bg-brand/10 text-brand border-l-2 border-brand" : "text-zinc-500 hover:bg-zinc-800/50"}`}
              onClick={() => setCategory(null)}
            >
              All_Categories
            </div>
            {categories.map((c) => (
              <div
                key={c}
                className={`py-1 px-2 text-sm cursor-pointer ${activeCategory === c ? "bg-brand/10 text-brand border-l-2 border-brand" : "text-zinc-500 hover:bg-zinc-800/50"}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Location_Node</h3>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 py-2 px-3 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-brand/50 rounded-none"
          >
            <option value="ALL">All_Locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </section>
      </div>

      <div className="p-4 border-t border-zinc-800/50">
        <button
          onClick={onExecute}
          className="w-full py-2 pr-3 pl-2 bg-brand text-zinc-950 text-sm font-semibold flex items-center justify-between ring-1 ring-brand hover:bg-brand/90 transition-colors"
        >
          <span>EXECUTE_SCAN</span>
          <div className="size-4 bg-zinc-950/20" />
        </button>
      </div>
    </aside>
  );
}