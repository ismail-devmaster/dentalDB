// /app/api/doctors/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
// GET - Fetch all doctors
export async function GET() {
  const doctors = await prisma.doctor.findMany();
  return NextResponse.json(doctors);
}

// POST - Create a new doctor
export async function POST(request: Request) {
  const { firstName, lastName, specialtyId, licenseNumber } = await request.json();
  
  const newDoctor = await prisma.doctor.create({
    data: {
      firstName,
      lastName,
      specialtyId,
      licenseNumber,
    },
  });
  
  return NextResponse.json(newDoctor, { status: 201 });
}

// PUT - Update doctor information
export async function PUT(request: Request) {
  const { id, firstName, lastName, specialtyId, licenseNumber } = await request.json();

  const updatedDoctor = await prisma.doctor.update({
    where: { id },
    data: {
      firstName,
      lastName,
      specialtyId,
      licenseNumber,
    },
  });

  return NextResponse.json(updatedDoctor);
}

// DELETE - Delete a doctor
export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.doctor.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Doctor deleted successfully' });
}
