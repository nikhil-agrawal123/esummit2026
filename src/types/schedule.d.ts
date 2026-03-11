// src/types/schedule.d.ts
export interface ScheduleEvent {
  name: string;
  description: string;
  time: string;
  venue: string;
}

export interface ScheduleDay {
  day: number;
  events: ScheduleEvent[];
}

declare const value: ScheduleDay[];
export default value;
