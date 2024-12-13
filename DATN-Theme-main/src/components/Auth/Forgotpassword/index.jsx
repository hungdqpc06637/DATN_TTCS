import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import LayoutHomeFive from '../../Partials/LayoutHomeFive';
import { useNavigate } from 'react-router-dom';

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái đang gửi
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error("Email không được để trống.");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Địa chỉ email không hợp lệ.");
      return;
    }

    setIsSubmitting(true); // Bắt đầu gửi OTP
    try {
      const response = await axios.post(`http://localhost:8080/api/forgot-password?email=${email}`);
      toast.success(response.data);
      
      // Nếu email hợp lệ, chuyển hướng sang trang xác minh OTP
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      console.error(error);
      
      // Kiểm tra nếu lỗi từ backend là "Email chưa đăng ký tài khoản"
      if (error.response && error.response.data === "Email chưa đăng ký tài khoản.") {
        toast.error("Email chưa đăng ký tài khoản.");
      } else {
        const errorMessage = error.response?.data || "Có lỗi xảy ra khi gửi mã OTP.";
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false); // Kết thúc quá trình gửi
    }
  };

  return (
    <LayoutHomeFive childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
        <div className="relative w-full max-w-md bg-white shadow-2xl rounded-lg p-10">
          {/* Hiệu ứng trang trí */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-300 rounded-full opacity-30 blur-2xl"></div>

          {/* Tiêu đề */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-wide">
              QUÊN MẬT KHẨU
            </h1>
            <p className="text-gray-600 text-sm">
              Nhập email hoặc số điện thoại của bạn để khôi phục mật khẩu.
            </p>
          </div>

          {/* Form */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email / SĐT của bạn
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email hoặc số điện thoại"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Nút kiểm tra */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition transform hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "KIỂM TRA"}
            </button>
          </div>

          {/* Điều hướng */}
          <div className="flex justify-between text-sm text-gray-600">
            <a href="/signup" className="hover:underline text-purple-600">
              Đăng ký mới
            </a>
            <a href="/login" className="hover:underline text-purple-600">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </LayoutHomeFive>
  );
}
