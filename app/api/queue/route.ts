// /app/api/queue/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

// GET - Fetch all queue entries
export async function GET() {
  const queues = await prisma.queue.findMany();
  return NextResponse.json(queues);
}

// POST - Add a patient to the queue
export async function POST(request: Request) {
  const { patientId, status, estimatedWaitTime, arrivalTime, priority, notes } = await request.json();
  
  const newQueue = await prisma.queue.create({
    data: {
      patientId,
      status,
      estimatedWaitTime,
      arrivalTime,
      priority,
      notes,
    },
  });
  
  return NextResponse.json(newQueue, { status: 201 });
}

// PUT - Update queue status
export async function PUT(request: Request) {
  const { id, status, startTime, endTime } = await request.json();

  const updatedQueue = await prisma.queue.update({
    where: { id },
    data: {
      status,
      startTime,
      endTime,
    },
  });

  return NextResponse.json(updatedQueue);
}

// DELETE - Remove a patient from the queue
export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.queue.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Patient removed from queue' });
}
