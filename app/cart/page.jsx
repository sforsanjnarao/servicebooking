'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function CartPage() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    if (totalAmount <= 0) return;

    // 1. Create Order on your server
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalAmount }),
    });

    if (!res.ok) {
      alert('Failed to create order.');
      return;
    }

    const order = await res.json();

    // 2. Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Service Booking',
      description: 'Payment for services',
      order_id: order.id,
      handler: function (response) {
        // On successful payment, clear the cart and redirect
        clearCart();
        router.push(`/payment-success?paymentId=${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Test User',
        email: 'test.user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b py-4">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-white">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-1 bg-gray-900 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold">₹{totalAmount }</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}