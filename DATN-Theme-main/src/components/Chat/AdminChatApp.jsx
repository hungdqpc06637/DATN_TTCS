import React, { useState } from 'react';
import useWebSocket from './useWebSocket';
import LayoutHomeFive from '../Partials/LayoutHomeFive';

const AdminChatApp = () => {
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('admin'); // Mặc định là admin, có thể thay đổi sau
  const { messages, sendMessage } = useWebSocket('ws://localhost:8080/chat');  // WebSocket URL

  const handleSendMessage = () => {
    if (message) {
      const messageData = {
        role: role, // Thêm vai trò người dùng (admin hoặc user)
        content: message, // Nội dung tin nhắn
      };
      sendMessage(JSON.stringify(messageData));  // Gửi tin nhắn tới server dưới dạng JSON
      setMessage('');  // Reset input sau khi gửi
    }
  };

  return (
    <LayoutHomeFive>
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Chat</h2>
      <div style={styles.chatContainer}>
        {messages.map((msg, index) => {
          // Nếu là admin, hiển thị 'Admin' trước nội dung tin nhắn
          const isAdminMessage = msg.role === 'admin';
          return (
            <div key={index} style={isAdminMessage ? styles.adminMessage : styles.userMessage}>
              <strong style={isAdminMessage ? styles.adminLabel : styles.userLabel}>
                {isAdminMessage ? 'Admin: ' : 'User: '}
              </strong>
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
        <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
    </LayoutHomeFive>
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
  adminMessage: {
    marginBottom: '10px',
    backgroundColor: '#d1e7ff',
    padding: '10px',
    borderRadius: '5px',
    color: '#1a73e8',
  },
  userMessage: {
    marginBottom: '10px',
    backgroundColor: '#e7f3e7',
    padding: '10px',
    borderRadius: '5px',
    color: '#4caf50',
  },
  adminLabel: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  userLabel: {
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
