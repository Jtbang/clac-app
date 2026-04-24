export type LoadLevel = "low" | "medium" | "high";

export type ClacEvent = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  loadLevel: LoadLevel;
  category: string;
  notes: string;
};