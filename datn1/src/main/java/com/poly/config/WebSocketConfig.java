package com.poly.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final CartWebSocketHandler cartWebSocketHandler;

    // Tiêm CartWebSocketHandler vào trong constructor
    public WebSocketConfig(CartWebSocketHandler cartWebSocketHandler) {
        this.cartWebSocketHandler = cartWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // Đăng ký WebSocket handler cho phần chat
        registry.addHandler(new ChatWebSocketHandler(), "/chat").setAllowedOrigins("*");

        // Đăng ký WebSocket handler cho phần giỏ hàng
        registry.addHandler(cartWebSocketHandler, "/cart").setAllowedOrigins("*");
    }
}
