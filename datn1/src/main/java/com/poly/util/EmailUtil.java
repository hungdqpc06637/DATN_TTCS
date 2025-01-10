package com.poly.util;

import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import com.poly.dto.OrderRequestDTO; // Đường dẫn này phải khớp với package thực tế của lớp
import com.poly.dto.OrderStatisticsDTO;
import com.poly.entity.OrderDetails;
import com.poly.dto.CartDTO;
import com.poly.dto.ContactDTO;
import java.util.List;
import java.util.ArrayList;

import java.util.Random;

@Component
public class EmailUtil {

    private final JavaMailSender mailSender;

    public EmailUtil(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // Phương thức tạo mã OTP 6 chữ số
    public String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    // Phương thức để gửi mã OTP và trả về mã OTP đã tạo
    public String sendOtpEmail(String toEmail, String subject) {
        // Tạo mã OTP
        String otp = generateOtp();

        // Tạo nội dung email
        String content = "Xin chào bạn,"
                + "\r\n"
                + "Mã OTP của bạn để tạo mật khẩu mới là: " + otp + "\r\n"
                + "Vui lòng không chia sẻ mã này với ai và sử dụng nó trong vòng 5 phút.\r\n"
                + "\r\n"
                + "Trân trọng,\r\n"
                + " Thời trang công sở ";

        // Tạo và gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(content);

        mailSender.send(message);

        // Trả về mã OTP để lưu hoặc sử dụng sau
        return otp;
    }
    
 

    public void sendOrderConfirmationEmail(String toEmail, String subject, List<OrderDetails> orderDetailsList) {
        // Tạo nội dung email
        StringBuilder emailContent = new StringBuilder();
        emailContent.append("Xin chào bạn,\n\n")
                .append("Đơn hàng của bạn đã được xác nhận. Dưới đây là thông tin đơn hàng của bạn:\n\n")
                .append("Sản phẩm:\n")
                .append("----------------------------------\n");

        // Lặp qua danh sách các sản phẩm trong đơn hàng và tạo bảng thông tin
        for (OrderDetails orderDetail : orderDetailsList) {
            emailContent.append("Tên sản phẩm: ").append(orderDetail.getSize().getProduct().getName()).append("\n")
                    .append("Giá: ").append(orderDetail.getPrice()).append(" VND\n")
                    .append("Số lượng: ").append(orderDetail.getQuantity()).append("\n")
//                    .append("Tổng tiền: ").append(orderDetail.getTotal()).append(" VND\n")
                    .append("Ngày đặt hàng: ").append(orderDetail.getOrder().getDate()).append("\n")
                    .append("----------------------------------\n");
        }

        // Tính tổng giá trị đơn hàng
        double totalAmount = calculateTotalAmount(orderDetailsList);
        emailContent.append("Tổng giá trị đơn hàng: ").append(totalAmount).append(" VND\n")
                .append("\nTrân trọng,\nThời trang công sở");

        // Tạo và gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);  // Địa chỉ email người nhận
        message.setSubject(subject);  // Chủ đề email
        message.setText(emailContent.toString());  // Nội dung email

        // Gửi email qua mailSender
        mailSender.send(message);

        System.out.println("Email đơn hàng đã được gửi đến " + toEmail);
    }

    private Double calculateTotalAmount(List<OrderDetails> orderDetailsList) {
        double totalAmount = 0.0;
        for (OrderDetails orderDetail : orderDetailsList) {
            totalAmount += orderDetail.getPrice().intValue() * orderDetail.getQuantity();
        }
        return totalAmount;
    }



    public String sendOrderCancellationEmail(String toEmail, String subject, String customerName, int orderId) {
        // Tạo nội dung email
        String content = "Xin chào " + customerName + ","
                + "\r\n\r\n"
                + "Chúng tôi rất tiếc thông báo rằng đơn hàng của bạn với mã đơn hàng: " + orderId + " đã bị hủy."
                + "\r\n"
                + "\r\n\r\n"
                + "Nếu bạn cần hỗ trợ hoặc muốn đặt hàng lại, vui lòng liên hệ với chúng tôi qua email hoặc số hotline.\r\n"
                + "\r\n"
                + "Trân trọng,\r\n"
                + "Thời trang công sở";

        // Tạo và gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(content);

        mailSender.send(message);

        // Trả về thông báo xác nhận đã gửi email
        return "Email thông báo hủy đơn hàng đã được gửi tới " + toEmail;
    }
    
    

    public String sendAccountRegistrationEmail(String toEmail, String subject, String customerName) {
        // Tạo nội dung email
        String content = "Xin chào " + customerName + ","
                + "\r\n\r\n"
                + "Chào mừng bạn đến với Thời trang công sở!"
                + "\r\n"
                + "Tài khoản của bạn đã được đăng ký thành công. Bạn có thể đăng nhập để khám phá những sản phẩm và ưu đãi mới nhất từ chúng tôi."
                + "\r\n\r\n"
                + "Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email hoặc hotline."
                + "\r\n"
                + "Chúc bạn có những trải nghiệm mua sắm tuyệt vời!\r\n"
                + "\r\n"
                + "Trân trọng,\r\n"
                + "Thời trang công sở";

        // Tạo và gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(content);

        try {
            mailSender.send(message);
            return "Email chào mừng đã được gửi tới " + toEmail;
        } catch (Exception e) {
            // Log lỗi hoặc thông báo lỗi
            System.out.println("Gửi email thất bại: " + e.getMessage());
            return "Gửi email thất bại.";
        }
    }

    public void sendContactEmail(ContactDTO contact) {
        // Tạo nội dung email gửi đến người dùng
        String userContent = "Xin chào " + contact.getFullName() + ",\r\n\r\n"
                + "Chúng tôi đã nhận được tin nhắn từ bạn với các thông tin sau:\r\n"
                + "Chủ đề: " + contact.getSubject() + "\r\n"
                + "Nội dung: " + contact.getMessage() + "\r\n\r\n"
                + "Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.\r\n"
                + "Trân trọng,\r\n"
                + "Đội ngũ hỗ trợ Thời trang công sở";

        // Tạo và gửi email cho người dùng
        SimpleMailMessage userMessage = new SimpleMailMessage();
        userMessage.setTo(contact.getEmail()); // gửi đến email của người dùng
        userMessage.setSubject("Xác nhận nhận tin nhắn từ bạn: " + contact.getSubject());
        userMessage.setText(userContent);
        mailSender.send(userMessage);

        // Tạo nội dung email gửi đến admin
        String adminContent = "Bạn vừa nhận được tin nhắn mới từ người dùng:\r\n\r\n"
                + "Tên người dùng: " + contact.getFullName() + "\r\n"
                + "Email người dùng: " + contact.getEmail() + "\r\n"
                + "Chủ đề: " + contact.getSubject() + "\r\n"
                + "Nội dung: " + contact.getMessage() + "\r\n\r\n"
                + "Vui lòng kiểm tra và phản hồi trong thời gian sớm nhất.";

        // Tạo và gửi email cho admin
        SimpleMailMessage adminMessage = new SimpleMailMessage();
        adminMessage.setTo("le0963845867@gmail.com"); // thay "admin_email@gmail.com" bằng email của bạn
        adminMessage.setSubject("Tin nhắn mới từ người dùng: " + contact.getSubject());
        adminMessage.setText(adminContent);
        mailSender.send(adminMessage);
    }



}


    
    

