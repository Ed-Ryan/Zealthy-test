

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        birthdate: true,
        aboutMe: true,
        createdAt: true,
        addressId: true, // Only include fields that exist in the schema
      },
    });
    

    const totalUsers = users.length;

    // Calculate monthly users based on `createdAt`
    const monthlyUsers = users.filter((user) => {
      const userDate = new Date(user.createdAt); // Ensure `createdAt` exists
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
    }).length;    

    return NextResponse.json({ users, totalUsers, monthlyUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}
