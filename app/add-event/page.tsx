"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ClacEvent, LoadLevel } from "@/types/event";

export default function AddEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loadLevel, setLoadLevel] = useState<LoadLevel>("medium");
  const [category, setCategory] = useState("School");
  const [notes, setNotes] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newEvent: ClacEvent = {
      id: crypto.randomUUID(),
      title,
      date,
      startTime,
      endTime,
      loadLevel,
      category,
      notes,
    };

    const existingEvents = localStorage.getItem("clac-events");
    const events: ClacEvent[] = existingEvents ? JSON.parse(existingEvents) : [];

    localStorage.setItem("clac-events", JSON.stringify([...events, newEvent]));

    router.push("/calendar");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Add Event</h1>
        <p className="mt-2 text-slate-400">
          Add a task or event and assign a cognitive load level.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Project work, exam study, meeting..."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Start Time</label>
              <input
                type="time"
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">End Time</label>
              <input
                type="time"
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">
                Cognitive Load
              </label>
              <select
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                value={loadLevel}
                onChange={(e) => setLoadLevel(e.target.value as LoadLevel)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>School</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Recovery</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              className="mt-2 min-h-24 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-950 hover:bg-slate-200"
          >
            Save Event
          </button>
        </form>
      </div>
    </main>
  );
}