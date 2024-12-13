import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import useWebSocket from '../../components/Chat/useWebSocket';

const AdminChatApp = () => {
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('admin'); // Mặc định là 'user'
  const [username, setUsername] = useState('Guest'); // Mặc định là 'Guest'
  const { messages, sendMessage } = useWebSocket('ws://localhost:8080/chat'); // WebSocket URL

  // Lấy token từ cookie và giải mã để lấy role và username
  useEffect(() => {
    const token = Cookies.get('token'); // Lấy token từ cookie
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Giải mã token
        setRole(decodedToken.roles || 'Admin'); // Thiết lập vai trò
        setUsername(decodedToken.sub || 'Guest'); // Thiết lập tên người dùng
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
  }, []);

  const handleSendMessage = () => {
    if (message) {
      const messageData = {
        role: username, // Dùng tên người dùng thay vì vai trò
        content: message, // Nội dung tin nhắn
      };
      sendMessage(JSON.stringify(messageData)); // Gửi tin nhắn tới server dưới dạng JSON
      setMessage(''); // Reset input sau khi gửi
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div style={styles.container}>
        <h2 style={styles.header}>Admin Chat</h2>
        <div style={styles.chatContainer}>
          {messages.map((msg, index) => {
            const isCurrentUser = msg.role === username; // Kiểm tra xem tin nhắn có phải của người dùng hiện tại không
            return (
              <div
                key={index}
                style={isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage}
              >
                <strong
                  style={isCurrentUser ? styles.currentUserLabel : styles.otherUserLabel}
                >
                  {msg.role}:
                </strong>{' '}
                {msg.content}
              </div>
            );
          })}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            style={styles.input}
          />
          <button onClick={handleSendMessage} style={styles.sendButton}>
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  chatContainer: {
    height: '300px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
  currentUserMessage: {
    marginBottom: '10px',
    backgroundColor: '#d1e7ff',
    padding: '10px',
    borderRadius: '5px',
    color: '#1a73e8',
  },
  otherUserMessage: {
    marginBottom: '10px',
    backgroundColor: '#e7f3e7',
    padding: '10px',
    borderRadius: '5px',
    color: '#4caf50',
  },
  currentUserLabel: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  otherUserLabel: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  sendButton: {
    padding: '10px 15px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default AdminChatApp;
