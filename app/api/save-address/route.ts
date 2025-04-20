import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { street, city, state, zip } = await request.json();

    // Save address data to the database
    const newAddress = await prisma.address.create({
      data: {
        street,
        city,
        state,
        zip,
      },
    });

    return NextResponse.json({ message: 'Address saved successfully!', address: newAddress });
  } catch (error) {
    console.error('Error saving address:', error);
    return NextResponse.json({ message: 'Error saving address' }, { status: 500 });
  }
}
