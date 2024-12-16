import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const storedCart = Cookies.get('cart');
  const initialCart = storedCart ? JSON.parse(storedCart) : [];
  
  const [cartItems, setCartItems] = useState(initialCart);
  const [cartCount, setCartCount] = useState(0);

  // Cập nhật lại khi cartItems thay đổi
  useEffect(() => {
    // Cập nhật cartCount mỗi khi cartItems thay đổi
    const newCartCount = cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    setCartCount(newCartCount);

    // Cập nhật cookie sau khi cartItems thay đổi
    Cookies.set('cart', JSON.stringify(cartItems), { expires: 7 });
    
    console.log("Giỏ hàng đã cập nhật trong cookie:", cartItems);
  }, [cartItems]);  // Chạy lại khi cartItems thay đổi

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
