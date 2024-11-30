// /app/api/users/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // assuming you have a Prisma client set up
import bcrypt from 'bcrypt';

// GET - Fetch all users
export async function GET() {
  const users = await prisma.baseUser.findMany();
  return NextResponse.json(users);
}

// POST - Create a new user (sign up)
export async function POST(request: Request) {
  const { firstName, lastName, email, password, roles } = await request.json();
  
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.baseUser.create({
    data: {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword, // Include the hashed password
      roles,
    },
  });
  
  return NextResponse.json(newUser, { status: 201 });
}

// PUT - Update user information (e.g., changing role or details)
export async function PUT(request: Request) {
  const { id, firstName, lastName, email, roles } = await request.json();

  const updatedUser = await prisma.baseUser.update({
    where: { id },
    data: {
      firstName,
      lastName,
      email,
      roles,
    },
  });

  return NextResponse.json(updatedUser);
}

// DELETE - Delete a user
export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.baseUser.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'User deleted successfully' });
}
