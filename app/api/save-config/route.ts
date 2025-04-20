import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { step2Config } = await request.json();

    // Save or update the configuration in the database
    const config = await prisma.configuration.upsert({
      where: { id: 1 }, // Assuming a single admin configuration row
      update: { step2Config },
      create: { id: 1, step2Config },
    });

    return NextResponse.json({ message: 'Configuration saved successfully!', config });
  } catch (error) {
    console.error('Error saving configuration:', error);
    return NextResponse.json({ message: 'Error saving configuration' }, { status: 500 });
  }
}
