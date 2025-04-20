/*
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, birthdate, aboutMe, address } = await request.json(); // Parse "aboutMe" in the request body

    // Save the user data
    const newUser = await prisma.user.create({
      data: {
        email,
        birthdate,
        aboutMe, // Include "aboutMe" in the data
        address: {
          create: {
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
          },
        },
      },
    });

    return NextResponse.json({ message: 'User data saved successfully!', user: newUser });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ message: 'Error saving user data' }, { status: 500 });
  }
}
*/
/*
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, birthdate, aboutMe, address } = await request.json(); // Parse request body

    // First, create the address
    const newAddress = await prisma.address.create({
      data: {
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    });

    // Then, create the user and link it to the address
    const newUser = await prisma.user.create({
      data: {
        email,
        birthdate,
        aboutMe,
        addressId: newAddress.id, // Link the created address
      },
    });

    return NextResponse.json({ message: 'User data saved successfully!', user: newUser });
  } catch (error) {
    console.error('Error saving user data:', error); // Log full error
    return NextResponse.json({ message: 'Error saving user data', error: error.message }, { status: 500 });
  }
}
*/
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, birthdate, aboutMe } = await request.json(); // Parse user data from request body

    // Save user data to the database
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        birthdate,
        aboutMe,
      },
    });

    return NextResponse.json({ message: 'User data saved successfully!', user: newUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error saving user data:', error.message); // Log error message
      return NextResponse.json({ message: 'Error saving user data', error: error.message }, { status: 500 });
    }

    console.error('Unexpected error:', error); // Handle unexpected errors
    return NextResponse.json({ message: 'Unexpected error saving user data' }, { status: 500 });
  }
}

