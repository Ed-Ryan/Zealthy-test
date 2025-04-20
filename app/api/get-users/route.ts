// app/api/get-users/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma'; // double check the path

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
        addressId: true, 
      }, 
    }); 
    const totalUsers = users.length; 
    const monthlyUsers = users.filter((user) => { 
      const userDate = new Date(user.createdAt); 
      const currentMonth = new Date().getMonth(); 
      const currentYear = new Date().getFullYear(); 
      return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear; 
    }).length; 
    
    return NextResponse.json({ users, totalUsers, monthlyUsers }); } catch (error) { 
    console.error('Error fetching users:', error); 
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 }); 
  } 
}
