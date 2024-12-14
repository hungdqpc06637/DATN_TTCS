package com.poly.config;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;

@Component
public class CartWebSocketHandler implements WebSocketHandler {

	private final Set<WebSocketSession> sessions = new HashSet<>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		System.out.println("Kết nối WebSocket đã được thiết lập: " + session.getId());
		System.out.println("Danh sách kết nối hiện tại: " + sessions.size() + " kết nối");
	}

	@Override
	public void handleMessage(WebSocketSession session, org.springframework.web.socket.WebSocketMessage<?> message)
			throws Exception {
		String payload = (String) message.getPayload();
		System.out.println("Nhận tin nhắn từ client (session ID: " + session.getId() + "): " + payload);

		// Ví dụ phân tích dữ liệu JSON (nếu có)
		try {
			// Giả sử tin nhắn là JSON, bạn có thể parse ở đây và ghi log chi tiết
			// JSONObject json = new JSONObject(payload);
			// System.out.println("Dữ liệu JSON nhận được: " + json.toString());
		} catch (Exception e) {
			System.err.println("Lỗi khi phân tích dữ liệu JSON từ client: " + e.getMessage());
		}
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		exception.printStackTrace();
		System.err.println("Lỗi WebSocket (session ID: " + session.getId() + "): " + exception.getMessage());
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus closeStatus)
			throws Exception {
		sessions.remove(session);
		System.out.println("Kết nối WebSocket đã bị đóng (session ID: " + session.getId() + ")");
		System.out.println("Danh sách kết nối còn lại: " + sessions.size() + " kết nối");
	}

	@Override
	public boolean supportsPartialMessages() {
		return false;
	}

	public void broadcast(String message) throws Exception {
		for (WebSocketSession session : sessions) {
			if (session.isOpen()) {
				session.sendMessage(new TextMessage(message));
				System.out.println("Đã gửi tin nhắn tới client (session ID: " + session.getId() + "): " + message);
			}
		}
	}
	
	
}
