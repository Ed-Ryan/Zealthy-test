
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch users and their addresses
    const users = await prisma.user.findMany({
      include: {
        address: true, // Fetch related address data
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ message: 'Error fetching user data' }, { status: 500 });
  }
}
