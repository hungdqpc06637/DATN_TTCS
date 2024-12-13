package com.poly.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/admin.sendMessage")  // Nhận tin nhắn từ client
    @SendTo("/topic/admin")  // Gửi tin nhắn tới tất cả người dùng đã subscribe
    public String sendMessage(String message) {
        return message;  // Trả lại tin nhắn cho tất cả người dùng subscribe vào /topic/admin
    }
}
