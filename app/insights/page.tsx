"use client";

import { useEffect, useState } from "react";
import type { ClacEvent } from "@/types/event";
import { generateInsights, type Insight } from "@/lib/insights";

function severityStyles(severity: Insight["severity"]) {
  if (severity === "high") {
    return "border-red-800 bg-red-950/40 text-red-100";
  }

  if (severity === "medium") {
    return "border-yellow-800 bg-yellow-950/40 text-yellow-100";
  }

  return "border-green-800 bg-green-950/40 text-green-100";
}

function severityLabel(severity: Insight["severity"]) {
  if (severity === "high") return "High";
  if (severity === "medium") return "Medium";
  return "Low";
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("clac-events");

    if (storedEvents) {
      const parsed: ClacEvent[] = JSON.parse(storedEvents);
      setInsights(generateInsights(parsed));
    } else {
      setInsights(generateInsights([]));
    }
  }, []);

  const groupedInsights = {
    high: insights.filter((insight) => insight.severity === "high"),
    medium: insights.filter((insight) => insight.severity === "medium"),
    low: insights.filter((insight) => insight.severity === "low"),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Insights</h1>
        <p className="mt-2 text-slate-400">
          Smart recommendations based on your cognitive load patterns.
        </p>

        <section className="mt-8 space-y-8">
          {Object.entries(groupedInsights).map(([severity, items]) =>
            items.length > 0 ? (
              <div key={severity}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {severityLabel(severity as Insight["severity"])} Severity
                </h2>

                <div className="space-y-4">
                  {items.map((insight, index) => (
                    <article
                      key={`${insight.title}-${index}`}
                      className={`rounded-2xl border p-5 ${severityStyles(
                        insight.severity
                      )}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold">
                          {insight.title}
                        </h3>
                        <span className="rounded-full border border-current px-3 py-1 text-xs font-semibold uppercase">
                          {severityLabel(insight.severity)}
                        </span>
                      </div>

                      <p className="mt-3 text-sm opacity-90">
                        {insight.message}
                      </p>

                      <div className="mt-4 rounded-xl border border-current/40 bg-black/20 p-3">
                        <p className="text-sm font-semibold">
                          Suggested action
                        </p>
                        <p className="mt-1 text-sm opacity-90">
                          {insight.action}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </section>
      </div>
    </main>
  );
}