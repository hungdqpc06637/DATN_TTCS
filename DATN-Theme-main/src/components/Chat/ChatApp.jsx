import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Import chính xác jwt-decode
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
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={toggleChat}
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition">
                {isChatVisible ? 'Tắt Chat' : 'Bật Chat'}
            </button>

            {isChatVisible && (
                <div className="mt-4 bg-white border border-gray-300 rounded-md shadow-lg w-80 p-4">
                    <h2 className="text-lg font-semibold mb-2">Chat Box</h2>
                    <div className="h-48 overflow-y-auto border border-gray-200 rounded-md p-2 mb-4">
                        {messages.map((msg, index) => {
                            const isUserMessage = msg.role === 'user';
                            return (
                                <div key={index} className="mb-2">
                                    <strong
                                        className={`text-sm ${
                                            isUserMessage ? 'text-black' : 'text-blue-500'
                                        }`}>
                                        {msg.sender || (isUserMessage ? 'User' : 'Admin')}:
                                    </strong>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                            placeholder="Type a message"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!isConnected}
                            className={`ml-2 px-4 py-1 rounded-md text-white ${
                                isConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
                            } transition`}>
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatApp;
