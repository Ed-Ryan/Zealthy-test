import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email: string = body.email;

    // Use `email` in the `where` clause
    const existingUser = await prisma.user.findUnique({
      where: { email }, // This works now because `email` is unique
    });

    return NextResponse.json({ emailExists: Boolean(existingUser) });
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json({ message: 'Error checking email' }, { status: 500 });
  }
}
