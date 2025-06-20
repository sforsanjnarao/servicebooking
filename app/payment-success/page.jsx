'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative max-w-md mx-auto">
        <strong className="font-bold">Payment Successful!</strong>
        <span className="block sm:inline"> Thank you for your order.</span>
        {paymentId && <p className="text-sm mt-2">Payment ID: {paymentId}</p>}
        <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-6 inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}