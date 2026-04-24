import type { ClacEvent } from "@/types/event";
import { getLoadScore } from "@/lib/loadScore";

export type InsightSeverity = "low" | "medium" | "high";

export type Insight = {
  severity: InsightSeverity;
  title: string;
  message: string;
  action: string;
};

export type RescheduleSuggestion = {
  eventTitle: string;
  fromDate: string;
  suggestedDate: string;
  reason: string;
};

export function generateInsights(events: ClacEvent[]): Insight[] {
  const insights: Insight[] = [];

  if (events.length === 0) {
    return [
      {
        severity: "low",
        title: "No data yet",
        message: "Add events to generate cognitive load insights.",
        action: "Start by adding 3–5 events with different load levels.",
      },
    ];
  }

  const eventsByDate: Record<string, ClacEvent[]> = {};

  for (const event of events) {
    if (!eventsByDate[event.date]) eventsByDate[event.date] = [];
    eventsByDate[event.date].push(event);
  }

  for (const [date, dayEvents] of Object.entries(eventsByDate)) {
    const totalLoad = dayEvents.reduce(
      (sum, event) => sum + getLoadScore(event.loadLevel),
      0
    );

    if (totalLoad >= 8) {
      insights.push({
        severity: "high",
        title: "High overload risk",
        message: `${date} has a cognitive load score of ${totalLoad}.`,
        action:
          "Move one high-load task, shorten a work block, or add recovery time.",
      });
    } else if (totalLoad >= 5) {
      insights.push({
        severity: "medium",
        title: "Moderate load day",
        message: `${date} has a cognitive load score of ${totalLoad}.`,
        action: "Avoid stacking additional high-load work on this day.",
      });
    }
  }

  const sorted = [...events].sort((a, b) =>
    `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`)
  );

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];

    if (
      current.date === next.date &&
      current.loadLevel === "high" &&
      next.loadLevel === "high"
    ) {
      insights.push({
        severity: "high",
        title: "Back-to-back high-load events",
        message: `${current.date} has consecutive high-intensity work blocks.`,
        action:
          "Add a low-load buffer between them or move one event to another day.",
      });
      break;
    }
  }

  const hasRecovery = events.some((event) => event.category === "Recovery");

  if (!hasRecovery) {
    insights.push({
      severity: "medium",
      title: "No recovery time scheduled",
      message: "Your schedule does not include any recovery-category events.",
      action:
        "Add at least one recovery block such as a break, walk, meal, or low-effort task.",
    });
  }

  const highCount = events.filter((event) => event.loadLevel === "high").length;

  if (highCount >= 4) {
    insights.push({
      severity: "high",
      title: "Heavy high-load concentration",
      message: `${highCount} high-load events are currently scheduled.`,
      action: "Redistribute high-load work across multiple days where possible.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      severity: "low",
      title: "Balanced schedule",
      message: "No major overload patterns were detected.",
      action: "Maintain current spacing and continue tracking cognitive load.",
    });
  }

  return insights;
}

export function generateRescheduleSuggestions(
  events: ClacEvent[]
): RescheduleSuggestion[] {
  const suggestions: RescheduleSuggestion[] = [];

  const eventsByDate: Record<string, ClacEvent[]> = {};

  for (const event of events) {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = [];
    }

    eventsByDate[event.date].push(event);
  }

  const dailyLoads = Object.entries(eventsByDate).map(([date, dayEvents]) => {
    const totalLoad = dayEvents.reduce(
      (sum, event) => sum + getLoadScore(event.loadLevel),
      0
    );

    return { date, totalLoad, events: dayEvents };
  });

  const overloadedDays = dailyLoads.filter((day) => day.totalLoad >= 8);
  const lighterDays = dailyLoads.filter((day) => day.totalLoad <= 4);

  for (const overloadedDay of overloadedDays) {
    const movableEvent = overloadedDay.events.find(
      (event) => event.loadLevel === "high"
    );

    const targetDay = lighterDays.find(
      (day) => day.date !== overloadedDay.date
    );

    if (movableEvent && targetDay) {
      suggestions.push({
        eventTitle: movableEvent.title,
        fromDate: overloadedDay.date,
        suggestedDate: targetDay.date,
        reason: `${overloadedDay.date} has a load score of ${overloadedDay.totalLoad}, while ${targetDay.date} has a lighter load score of ${targetDay.totalLoad}.`,
      });
    }
  }

  return suggestions;
}