export function TickerRail({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="h-8 bg-zinc-950 border-t border-zinc-800/50 flex items-center overflow-hidden">
      <div className="flex gap-8 animate-ticker whitespace-nowrap pl-4">
        {doubled.map((t, i) => (
          <span
            key={i}
            className={`text-[10px] ${t.startsWith("//") ? "text-brand" : "text-zinc-500"}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}