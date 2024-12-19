package com.poly.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
	@Bean
	public AdminNotificationHandler adminNotificationHandler() {
		return new AdminNotificationHandler();
	}

	@Bean
	public ChatWebSocketHandler chatWebSocketHandler() {
		return new ChatWebSocketHandler();
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		// Đăng ký WebSocket handler cho thông báo admin
		registry.addHandler(adminNotificationHandler(), "/admin/notifications").setAllowedOrigins("*");

		// Đăng ký WebSocket handler cho phần chat
		registry.addHandler(chatWebSocketHandler(), "/chat").setAllowedOrigins("*");
	}
}
