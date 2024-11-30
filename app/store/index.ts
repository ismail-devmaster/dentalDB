import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Patient, Appointment, QueueEntry } from '@/app/types';

interface StoreState {
  currentPatient: Patient | null;
  appointments: Appointment[];
  queueEntries: QueueEntry[];
  patients: Patient[];
  setCurrentPatient: (patient: Patient | null) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: number, updates: Partial<Appointment>) => void;
  removeAppointment: (id: number) => void;
  updateQueue: (entries: QueueEntry[]) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      currentPatient: null,
      appointments: [] as Appointment[],
      queueEntries: [] as QueueEntry[],
      patients: [] as Patient[],
      setCurrentPatient: (patient) => set({ currentPatient: patient }),
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment],
        })),
      updateAppointment: (id, updates) =>
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, ...updates } : apt
          ),
        })),
      removeAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((apt) => apt.id !== id),
        })),
      updateQueue: (entries) => set({ queueEntries: entries }),
    }),
    {
      name: 'dental-db-storage',
    }
  )
); 