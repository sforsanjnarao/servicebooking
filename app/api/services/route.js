// app/api/services/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/service';

export async function GET() {
  await connectDB();
  try {
    const services = await Service.find({});
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching services' }, { status: 500 });
  }
}