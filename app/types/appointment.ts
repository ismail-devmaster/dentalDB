export interface Appointment {
  status: string;
  patientId: any;
  id: number;
  date: string;
  time: string | null;
  doctor: string | null;
  reason: string | null;
  outcome?: string;
  notes?: string;
} 