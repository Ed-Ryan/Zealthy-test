// app/api/get-users/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma'; // double check the path

export async function GET() {
  return NextResponse.json({
    users: [{ firstName: 'Test', lastName: 'User' }],
    totalUsers: 1,
  });
}
