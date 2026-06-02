import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { OPPORTUNITIES, type Source } from "@/data/opportunities";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { KPIStrip } from "@/components/dashboard/KPIStrip";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { GeoCard } from "@/components/dashboard/GeoCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { TickerRail } from "@/components/dashboard/TickerRail";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Opportunity Kernel // Internships + Hackathons Terminal" },
      { name: "description", content: "Tech-savvy dark terminal dashboard for scraped Internshala internships and Unstop/Devfolio hackathons." },
      { property: "og:title", content: "Opportunity Kernel" },
      { property: "og:description", content: "Terminal-style analytics dashboard for internships and hackathons." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  const ALL_SOURCES: Source[] = ["INTERNSHALA", "UNSTOP", "DEVFOLIO"];
  const [activeSources, setActiveSources] = useState<Set<Source>>(new Set(ALL_SOURCES));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("ALL");
  const [page, setPage] = useState(0);

  const allCategories = useMemo(
    () => Array.from(new Set(OPPORTUNITIES.map((o) => o.category))).sort(),
    [],
  );
  const allLocations = useMemo(
    () => Array.from(new Set(OPPORTUNITIES.map((o) => o.location))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    return OPPORTUNITIES.filter((o) => {
      if (!activeSources.has(o.source)) return false;
      if (activeCategory && o.category !== activeCategory) return false;
      if (location !== "ALL" && o.location !== location) return false;
      return true;
    });
  }, [activeSources, activeCategory, location]);

  const internCount = filtered.filter((o) => o.type === "internship").length;
  const hackCount = filtered.filter((o) => o.type === "hackathon").length;
  const internStipends = filtered.filter((o) => o.type === "internship").map((o) => o.stipend);
  const avgStipend = internStipends.length
    ? Math.round(internStipends.reduce((s, n) => s + n, 0) / internStipends.length)
    : 0;
  const closing24h = filtered.filter((o) => o.deadlineDays <= 1).length;

  const kpis = [
    { label: "Total_Opps", value: filtered.length.toLocaleString() },
    { label: "Internships", value: internCount.toLocaleString() },
    { label: "Active_Hack", value: hackCount.toLocaleString(), tone: "brand" as const },
    { label: "Avg_Stipend", value: avgStipend ? `₹${(avgStipend / 1000).toFixed(1)}K` : "—" },
    { label: "Closing_24h", value: closing24h.toString().padStart(2, "0"), tone: closing24h > 0 ? ("danger" as const) : ("default" as const) },
  ];

  const categoryData = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((o) => m.set(o.category, (m.get(o.category) ?? 0) + 1));
    return Array.from(m.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [filtered]);

  const geoData = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((o) => m.set(o.location, (m.get(o.location) ?? 0) + 1));
    return Array.from(m.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [filtered]);

  const sortedRows = useMemo(
    () => [...filtered].sort((a, b) => a.deadlineDays - b.deadlineDays),
    [filtered],
  );

  const toggleSource = (s: Source) => {
    setActiveSources((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
    setPage(0);
  };

  const tickerItems = [
    "// SYSTEM_NORMAL",
    `INDEXED: ${OPPORTUNITIES.length} ENTRIES`,
    `MATCHING_FILTERS: ${filtered.length}`,
    "LATENCY: 42ms",
    "// CLOUD_CONNECTED",
    "LAST_SCRAPE: 4m ago",
    "SRC: INTERNSHALA + UNSTOP + DEVFOLIO",
  ];

  return (
    <div className="flex h-screen overflow-hidden terminal-grid selection:bg-brand/30 selection:text-brand">
      <div className="fixed inset-0 scanline z-50" />

      <Sidebar
        sources={ALL_SOURCES}
        activeSources={activeSources}
        toggleSource={toggleSource}
        categories={allCategories}
        activeCategory={activeCategory}
        setCategory={(c) => { setActiveCategory(c); setPage(0); }}
        locations={allLocations}
        location={location}
        setLocation={(l) => { setLocation(l); setPage(0); }}
        onExecute={() => setPage(0)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <KPIStrip kpis={kpis} />

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <CategoryChart data={categoryData} />
            <GeoCard data={geoData} />
          </div>

          <DataTable rows={sortedRows} page={page} setPage={setPage} perPage={12} />
        </div>

        <TickerRail items={tickerItems} />
      </main>
    </div>
  );
}
