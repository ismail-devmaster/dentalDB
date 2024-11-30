export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  medicalHistory: string;
  allergies: string[];
  insurance: Insurance;
}

export interface Insurance {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  coveragePeriod: {
    start: string;
    end: string;
  };
}

export interface Appointment {
  id: number;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  reason?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
}

export interface QueueEntry {
  id: string;
  patientId: string;
  appointmentId: string;
  estimatedWaitTime: number;
  status: 'waiting' | 'in-progress' | 'completed';
  arrivalTime: string;
} 