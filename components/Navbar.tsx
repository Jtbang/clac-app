import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4 text-sm text-slate-300">
        <Link href="/" className="font-semibold text-white">
          CLAC
        </Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/calendar">Calendar</Link>
        <Link href="/add-event">Add Event</Link>
        <Link href="/insights">Insights</Link>
      </div>
    </nav>
  );
}