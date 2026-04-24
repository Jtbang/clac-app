import type { ClacEvent } from "@/types/event";

export function getLoadScore(loadLevel: ClacEvent["loadLevel"]) {
  if (loadLevel === "high") return 3;
  if (loadLevel === "medium") return 2;
  return 1;
}

export function getTotalLoad(events: ClacEvent[]) {
  return events.reduce((total, event) => total + getLoadScore(event.loadLevel), 0);
}

export function getLoadStatus(totalLoad: number) {
  if (totalLoad >= 8) {
    return {
      label: "High overload risk",
      message: "This day may be cognitively overloaded. Consider moving or reducing high-load tasks.",
    };
  }

  if (totalLoad >= 5) {
    return {
      label: "Moderate load",
      message: "This day is manageable, but watch for back-to-back high-effort work.",
    };
  }

  return {
    label: "Balanced load",
    message: "This day appears cognitively manageable.",
  };
}