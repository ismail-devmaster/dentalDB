
import { NextResponse } from 'next/server';
import prisma  from '@/lib/prisma'; 

// GET - Fetch all patients
export async function GET() {
  const patients = await prisma.patient.findMany();
  return NextResponse.json(patients);
}

// POST - Create a new patient
export async function POST(request: Request) {
  const { firstName, lastName, email, dateOfBirth, age, sexId, medicalHistory } = await request.json();
  
  const newPatient = await prisma.patient.create({
    data: {
      firstName,
      lastName,
      email,
      dateOfBirth,
      age,
      sexId,
      medicalHistory,
    },
  });
  
  return NextResponse.json(newPatient, { status: 201 });
}

// PUT - Update patient information
export async function PUT(request: Request) {
  const { id, firstName, lastName, email, dateOfBirth, age, sexId, medicalHistory } = await request.json();

  const updatedPatient = await prisma.patient.update({
    where: { id },
    data: {
      firstName,
      lastName,
      email,
      dateOfBirth,
      age,
      sexId,
      medicalHistory,
    },
  });

  return NextResponse.json(updatedPatient);
}

// DELETE - Delete a patient
export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.patient.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Patient deleted successfully' });
}
