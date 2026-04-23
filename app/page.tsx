export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          CLAC
        </h1>
        <p className="mt-3 text-lg text-slate-300">
          Cognitive Load-Aware Calendar
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <p className="mt-2 text-sm text-slate-400">
              View cognitive load summaries.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Calendar</h2>
            <p className="mt-2 text-sm text-slate-400">
              Manage events and load levels.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Insights</h2>
            <p className="mt-2 text-sm text-slate-400">
              Detect overload and rebalance.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}