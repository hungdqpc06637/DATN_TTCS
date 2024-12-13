import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import useWebSocket from './useWebSocket';

const ChatApp = () => {
    const { messages, sendMessage, isConnected } = useWebSocket('ws://localhost:8080/chat');
    const [input, setInput] = useState('');
    const [role, setRole] = useState('user'); // Vai trò mặc định
    const [username, setUsername] = useState('Guest'); // Tên người dùng mặc định
    const [isChatVisible, setIsChatVisible] = useState(false);

    // Lấy token từ cookie và giải mã
    useEffect(() => {
        const token = Cookies.get('token'); // Lấy token từ cookie
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Giải mã token
                setRole(decodedToken.roles || 'user'); // Thiết lập vai trò
                setUsername(decodedToken.sub || 'Guest'); // Thiết lập tên người dùng
            } catch (error) {
                console.error("Token decoding error:", error);
            }
        }
    }, []);

    const handleSend = () => {
        if (input.trim()) {
            const messageData = {
                sender: username, // Gửi tên người dùng
                role: role, // Gửi vai trò
                content: input,
            };
            sendMessage(JSON.stringify(messageData)); // Gửi thông điệp dưới dạng JSON
            setInput('');
        }
    };

    const toggleChat = () => {
        setIsChatVisible(!isChatVisible);
    };

    return (
        <div style={styles.chatContainer}>
            <button onClick={toggleChat} style={styles.toggleButton}>
                {isChatVisible ? 'Tắt Chat' : 'Bật Chat'}
            </button>

            {isChatVisible && (
                <div style={styles.chatBox}>
                    <h2>Chat Box</h2>
                    <div style={styles.messagesContainer}>
                        {messages.map((msg, index) => {
                            const isUserMessage = msg.role === 'user';
                            return (
                                <div key={index} style={styles.message}>
                                    {/* Hiển thị tên người chat thay vì vai trò */}
                                    <strong style={{ color: isUserMessage ? 'black' : 'blue' }}>
                                        {msg.sender || (isUserMessage ? 'User' : 'Admin')}:
                                    </strong>
                                    {msg.content}
                                </div>
                            );
                        })}
                    </div>
                    <div style={styles.inputContainer}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={styles.input}
                            placeholder="Type a message"
                        />
                        <button onClick={handleSend} disabled={!isConnected} style={styles.sendButton}>
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    chatContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
    },
    toggleButton: {
        padding: '10px 15px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    chatBox: {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '20px',
        width: '300px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    messagesContainer: {
        height: '200px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
    },
    message: {
        marginBottom: '10px',
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
    },
};

export default ChatApp;
