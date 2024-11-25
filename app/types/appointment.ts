export interface Appointment {
  id: number;
  date: string;
  time: string | null;
  doctor: string | null;
  reason: string | null;
  outcome?: string;
  notes?: string;
} 