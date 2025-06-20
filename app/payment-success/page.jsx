// src/app/payment-success/page.tsx (Updated)

import { Suspense } from 'react';
import PaymentStatus from './PaymentStatus'; // Import the new client component

function Loading() {
  return <div className="text-center"><h2>Loading payment status...</h2></div>;
}

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <Suspense fallback={<Loading />}>
        <PaymentStatus />
      </Suspense>
    </div>
  );
}