import React, { useState } from 'react';
import useWebSocket from './useWebSocket';
import LayoutHomeFive from '../Partials/LayoutHomeFive';

const ChatApp = () => {
    const { messages, sendMessage, isConnected } = useWebSocket('ws://localhost:8080/chat');
    const [input, setInput] = useState('');
    const [role, setRole] = useState('user');  // Đặt role của người dùng là 'user' mặc định
    const [isChatVisible, setIsChatVisible] = useState(false);  // Trạng thái hiển thị chat

    const handleSend = () => {
        if (input.trim()) {
            const messageData = {
                role: role, // Gửi vai trò 'user' với mỗi tin nhắn
                content: input,
            };
            sendMessage(JSON.stringify(messageData)); // Gửi thông điệp dưới dạng JSON
            setInput('');
        }
    };

    const toggleChat = () => {
        setIsChatVisible(!isChatVisible); // Đảo trạng thái hiển thị của chat
    };

    return (
        <LayoutHomeFive>
            <div style={styles.chatContainer}>
                <button onClick={toggleChat} style={styles.toggleButton}>
                    {isChatVisible ? 'Tắt Chat' : 'Bật Chat'}
                </button>

                {isChatVisible && (
                    <div style={styles.chatBox}>
                        <h2>Chat box</h2>
                        <div style={styles.messagesContainer}>
                            {messages.map((msg, index) => {
                                const isUserMessage = msg.role === 'user';
                                return (
                                    <div key={index} style={styles.message}>
                                        {/* Hiển thị 'User' hoặc 'Admin' tuỳ theo vai trò */}
                                        <strong style={{ color: isUserMessage ? 'black' : 'blue' }}>
                                            {isUserMessage ? 'User: ' : 'Admin: '}
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
        </LayoutHomeFive>
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
