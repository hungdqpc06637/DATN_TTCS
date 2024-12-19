package com.poly.config;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

public class AdminNotificationHandler extends TextWebSocketHandler {

    // Danh sách các kết nối WebSocket từ admin
    private static final List<WebSocketSession> adminSessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Thêm session vào danh sách khi kết nối thành công
        adminSessions.add(session);
        System.out.println("Admin WebSocket connected: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        // Xóa session khỏi danh sách khi kết nối bị đóng
        adminSessions.remove(session);
        System.out.println("Admin WebSocket disconnected: " + session.getId());
    }

    // Gửi thông báo tới tất cả admin đang kết nối
    public void notifyAdmins(String message) {
        for (WebSocketSession session : adminSessions) {
            try {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            } catch (Exception e) {
                System.out.println("Failed to send message to session " + session.getId() + ": " + e.getMessage());
            }
        }
    }
}
