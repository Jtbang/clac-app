"use client";

import { useEffect, useState } from "react";
import type { ClacEvent } from "@/types/event";
import { getTotalLoad, getLoadStatus } from "@/lib/loadScore";
import LoadChart from "@/components/LoadChart";

export default function DashboardPage() {
  const [events, setEvents] = useState<ClacEvent[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("clac-events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const eventsByDate = events.reduce<Record<string, ClacEvent[]>>(
    (groups, event) => {
      if (!groups[event.date]) {
        groups[event.date] = [];
      }

      groups[event.date].push(event);
      return groups;
    },
    {}
  );

  const dailySummaries = Object.entries(eventsByDate)
    .map(([date, dayEvents]) => {
      const totalLoad = getTotalLoad(dayEvents);
      const status = getLoadStatus(totalLoad);

      return {
        date,
        totalLoad,
        status,
        eventCount: dayEvents.length,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const chartData = dailySummaries.map((summary) => ({
    date: summary.date,
    load: summary.totalLoad,
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Daily cognitive load summaries based on your scheduled events.
        </p>

        {chartData.length > 0 && (
          <section className="mt-8">
            <LoadChart data={chartData} />
          </section>
        )}

        <section className="mt-8 grid gap-4">
          {dailySummaries.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-slate-300">No event data yet.</p>
              <p className="mt-2 text-sm text-slate-500">
                Add events to generate cognitive load summaries.
              </p>
            </div>
          ) : (
            dailySummaries.map((summary) => (
              <article
                key={summary.date}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{summary.date}</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      {summary.eventCount} event(s) scheduled
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold">{summary.totalLoad}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Load score
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
                  <p className="font-semibold">{summary.status.label}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {summary.status.message}
                  </p>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}