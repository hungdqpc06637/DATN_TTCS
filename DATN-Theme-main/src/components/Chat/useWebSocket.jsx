import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data); // Parse dữ liệu nhận được
      setMessages((prev) => [...prev, messageData]); // Thêm tin nhắn vào danh sách
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);

      // Kết nối lại sau 3 giây
      setTimeout(() => {
        setSocket(new WebSocket(url));
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (messageData) => {
    if (socket && isConnected) {
      socket.send(messageData);  // Gửi thông điệp dưới dạng JSON
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
};

export default useWebSocket;
