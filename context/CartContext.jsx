'use client';

import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (service) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item._id === service._id);
      if (isItemInCart) {
        return prevItems;
      }
      return [...prevItems, { ...service, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, totalAmount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};