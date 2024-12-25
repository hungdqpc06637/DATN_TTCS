import { useState } from "react";
import InputCom from "../../Helpers/InputCom";
import Thumbnail from "./Thumbnail";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutHomeFive from "../../Partials/LayoutHomeFive";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường dữ liệu không được để trống
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        toast.error(`Trường ${key.charAt(0).toUpperCase() + key.slice(1)} không được để trống.`);
        return;
      }
    }

    // Kiểm tra username không chứa khoảng trắng
    if (/\s/.test(formData.username)) {
      toast.error('Tên người dùng không được chứa khoảng trắng.');
      return;
    }

    // Kiểm tra số điện thoại hợp lệ (10 chữ số)
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.');
      return;
    }

    // Kiểm tra email hợp lệ
    if (!/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(formData.email)) {
      toast.error('Email không hợp lệ. Vui lòng nhập email đúng định dạng.');
      return;
    }

    // Kiểm tra username không chứa ký tự đặc biệt
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      toast.error('Tên người dùng chỉ được chứa chữ cái không dấu và dấu gạch dưới (_).');
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    // Kiểm tra mật khẩu khớp với xác nhận mật khẩu
    if (formData.password !== formData.passwordConfirm) {
      toast.error('Mật khẩu không khớp.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/signup', formData);
      toast.success('Đăng ký thành công!');
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || error.response.data;
        if (errorMessage === "Email already exists") {
          toast.error("Email đã tồn tại. Vui lòng sử dụng email khác.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error('Đăng ký thất bại. Vui lòng thử lại sau.');
      }
    }
  };



  return (
<LayoutHomeFive childrenClasses="pt-0 pb-0">
  <div className="login-page-wrapper w-full py-10">
    <div className="container-x mx-auto flex items-center justify-center h-full">
      {/* Cột hình ảnh */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gray p-2">
        <img
          src="/assets/images/login.svg" // Đảm bảo đường dẫn hình ảnh đúng
          alt="Hình minh họa"
          className="w-full max-h-[500px] object-contain"
        />

        {/* Chữ dưới hình ảnh */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold text-red-500 mb-2">QUYỀN LỢI THÀNH VIÊN</h3>
          <ul className="text-sm text-gray-600">
            <li className="flex items-center space-x-2 mb-1">
              <span className="text-green-500">✔</span>
              <span>Mua hàng khắp thế giới cực dễ dàng, nhanh chóng</span>
            </li>
            <li className="flex items-center space-x-2 mb-1">
              <span className="text-green-500">✔</span>
              <span>Theo dõi chi tiết đơn hàng, địa chỉ thanh toán dễ dàng</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✔</span>
              <span>Nhận nhiều chương trình ưu đãi hấp dẫn từ chúng tôi</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Cột form đăng ký */}
      <div className="relative w-full lg:w-1/2 max-w-lg bg-white shadow-2xl rounded-lg p-10">
        {/* Hiệu ứng trang trí */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-300 rounded-full opacity-30 blur-2xl"></div>

        {/* Tiêu đề */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-wide">
            TẠO TÀI KHOẢN
          </h1>
          <p className="text-gray-600 text-sm">
            Điền thông tin để tạo tài khoản của bạn.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <InputCom
              placeholder="Nhập tên"
              label="FullName*"
              name="fullname"
              type="text"
              value={formData.fullname}
              inputHandler={handleChange}
            />
          </div>
          <div className="mb-6">
            <InputCom
              placeholder="Nhập email"
              label="Email*"
              name="email"
              type="email"
              value={formData.email}
              inputHandler={handleChange}
            />
          </div>
          <div className="mb-6">
            <InputCom
              placeholder="Nhập số điện thoại"
              label="Số điện thoại*"
              name="phone"
              type="text"
              value={formData.phone}
              inputHandler={handleChange}
            />
          </div>
          <div className="mb-6">
            <InputCom
              placeholder="Nhập tài khoản"
              label="Tài khoản*"
              name="username"
              type="text"
              value={formData.username}
              inputHandler={handleChange}
            />
          </div>
          <div className="mb-6">
            <InputCom
              placeholder="Nhập mật khẩu"
              label="Mật khẩu*"
              name="password"
              type="password"
              value={formData.password}
              inputHandler={handleChange}
            />
          </div>
          <div className="mb-6">
            <InputCom
              placeholder="Nhập lại mật khẩu"
              label="Xác nhận mật khẩu"
              name="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              inputHandler={handleChange}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition transform hover:scale-105"
            >
              TẠO TÀI KHOẢN
            </button>
          </div>
        </form>

        {/* Điều hướng */}
        <div className="flex justify-between text-sm text-gray-600">
          <a href="/login" className="hover:underline text-purple-600">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  </div>
</LayoutHomeFive>


  );
}
