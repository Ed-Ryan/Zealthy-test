import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch the configuration from the database
    const config = await prisma.configuration.findUnique({
      where: { id: 1 }, // Assuming you use a single row for configuration
    });

    // Return a default configuration if none exists
    return NextResponse.json(config || { step2Config: { fullName: false, aboutMe: false } });
  } catch (error) {
    console.error('Error fetching configuration:', error);
    return NextResponse.json({ message: 'Error fetching configuration' }, { status: 500 });
  }
}
