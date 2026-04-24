"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type LoadChartProps = {
  data: {
    date: string;
    load: number;
  }[];
};

export default function LoadChart({ data }: LoadChartProps) {
  return (
    <div className="h-80 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-1 text-xl font-semibold">Daily Load Chart</h2>
      <p className="mb-4 text-sm text-slate-400">
        Higher scores indicate greater cognitive load risk.
      </p>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="load" name="Load Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}