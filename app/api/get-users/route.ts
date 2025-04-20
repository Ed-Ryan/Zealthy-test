// app/api/get-users/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // double check the path

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json({
      users,
      totalUsers: users.length,
    });
  } catch (err: any) {
    console.error('🔥 API ERROR:', err.message);
    return NextResponse.json(
      { message: 'Something went wrong', error: err.message },
      { status: 500 }
    );
  }
}
