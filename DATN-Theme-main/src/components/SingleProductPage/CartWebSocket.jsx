import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const CartWebSocket = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/cart'); // Thay đổi endpoint nếu cần

    socket.onopen = () => {
      console.log('Kết nối WebSocket thành công');
    };

    socket.onmessage = (event) => {
      // Khi nhận thông báo từ server
      toast.info(event.data); // Hiển thị thông báo nhận được
    };

    socket.onerror = (error) => {
      console.error('Lỗi WebSocket:', error);
    };

    // Đảm bảo đóng kết nối WebSocket khi component bị hủy
    return () => {
      socket.close();
    };
  }, []);

  return null;
};

export default CartWebSocket;
