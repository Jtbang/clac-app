"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LoadChartProps = {
  data: {
    date: string;
    load: number;
  }[];
};

export default function LoadChart({ data }: LoadChartProps) {
  return (
    <div className="h-72 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-semibold">Daily Load Chart</h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="load" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}