'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await  axios.get('/api/services')
        setServices(res.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <Link href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Cart ({cartItems.length})
        </Link>
      </header>

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="border rounded-lg p-6 shadow-lg bg-white">
              <h2 className="text-2xl text-gray-600 font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-xl  text-gray-600 font-bold">₹{service.price }</p>
                <button
                  onClick={() => addToCart(service)}
                  disabled={cartItems.some(item => item._id === service._id)}
                  className={cartItems.some(item => item._id === service._id)?"bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-green-600"  : "bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" }

                >
                 {cartItems.some(item => item._id === service._id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}