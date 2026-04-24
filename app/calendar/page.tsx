"use client";

import { useEffect, useState } from "react";
import type { ClacEvent } from "@/types/event";

function loadBadgeClass(loadLevel: ClacEvent["loadLevel"]) {
  if (loadLevel === "high") {
    return "bg-red-950 text-red-200 border-red-800";
  }

  if (loadLevel === "medium") {
    return "bg-yellow-950 text-yellow-200 border-yellow-800";
  }

  return "bg-green-950 text-green-200 border-green-800";
}

export default function CalendarPage() {
  const [events, setEvents] = useState<ClacEvent[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("clac-events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  function clearEvents() {
    localStorage.removeItem("clac-events");
    setEvents([]);
  }

  const sortedEvents = [...events].sort((a, b) => {
    return `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`);
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="mt-2 text-slate-400">
              Your scheduled events with cognitive load levels.
            </p>
          </div>

          {events.length > 0 && (
            <button
              onClick={clearEvents}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-900"
            >
              Clear Events
            </button>
          )}
        </div>

        <section className="mt-8 space-y-4">
          {sortedEvents.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-slate-300">No events yet.</p>
              <p className="mt-2 text-sm text-slate-500">
                Add your first event from the Add Event page.
              </p>
            </div>
          ) : (
            sortedEvents.map((event) => (
              <article
                key={event.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      {event.date} • {event.startTime}–{event.endTime} •{" "}
                      {event.category}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${loadBadgeClass(
                      event.loadLevel
                    )}`}
                  >
                    {event.loadLevel}
                  </span>
                </div>

                {event.notes && (
                  <p className="mt-4 text-sm text-slate-300">{event.notes}</p>
                )}
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}