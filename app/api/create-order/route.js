 
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { nanoid } from 'nanoid';

if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay environment variables are missing');
  }

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
   try {
    const { amount } = await req.json();

    const amountInPaise = parseInt(amount, 10);
    if (isNaN(amountInPaise)) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }
    const options = {
        amount: amountInPaise * 100,
        currency: 'INR',
        receipt: `receipt_order_${nanoid()}`,
    };

        const order = await razorpay.orders.create(options);
        return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
  }
}