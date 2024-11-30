// /app/api/appointments/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // assuming you have a Prisma client set up

// GET - Fetch all appointments
export async function GET() {
  const appointments = await prisma.appointment.findMany();
  return NextResponse.json(appointments);
}

// POST - Create a new appointment
export async function POST(request: Request) {
  const { patientId, doctorId, typeId, date, startTime, endTime, duration, notes, statusId, reason } = await request.json();
  
  const newAppointment = await prisma.appointment.create({
    data: {
      patientId,
      doctorId,
      typeId,
      date,
      startTime,
      endTime,
      duration,
      notes,
      statusId,
      reason,
    },
  });
  
  return NextResponse.json(newAppointment, { status: 201 });
}

// PUT - Update appointment details
export async function PUT(request: Request) {
  const { id, patientId, doctorId, typeId, date, startTime, endTime, duration, notes, statusId, reason } = await request.json();

  const updatedAppointment = await prisma.appointment.update({
    where: { id },
    data: {
      patientId,
      doctorId,
      typeId,
      date,
      startTime,
      endTime,
      duration,
      notes,
      statusId,
      reason,
    },
  });

  return NextResponse.json(updatedAppointment);
}

// DELETE - Delete an appointment
export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.appointment.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Appointment deleted successfully' });
}
