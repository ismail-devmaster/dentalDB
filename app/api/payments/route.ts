// /app/api/payments/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all payments
export async function GET() {
  const payments = await prisma.payment.findMany();
  return NextResponse.json(payments);
}

// POST - Create a new payment record
export async function POST(request: Request) {
  const { patientId, doctorId, amount, paymentDate, paymentMethod, status } = await request.json();
  
  const newPayment = await prisma.payment.create({
    data: {
      patientId,
      doctorId,
      amount,
      paymentDate,
      paymentMethod,
      status,
      invoiceNumber: "INV-" + Date.now(),
    },
  });
  
  return NextResponse.json(newPayment, { status: 201 });
}

// PUT - Update payment details
export async function PUT(request: Request) {
  const { id, amount, paymentDate, paymentMethod, status } = await request.json();

  const updatedPayment = await prisma.payment.update({
    where: { id },
    data: {
      amount,
      paymentDate,
      paymentMethod,
      status,
    },
  });

  return NextResponse.json(updatedPayment);
}

// DELETE - Delete a payment record
export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.payment.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Payment deleted successfully' });
}
