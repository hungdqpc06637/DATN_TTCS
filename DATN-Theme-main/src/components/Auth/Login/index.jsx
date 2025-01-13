import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import InputCom from '../../Helpers/InputCom';
import LayoutHomeFive from '../../Partials/LayoutHomeFive';
import Thumbnail from './Thumbnail';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [dataGoogle, setDataGoogle] = useState(null);

  useEffect(() => {
    const takeData = async () => {
      if (dataGoogle) {
        try {
          const response = await axios.post("http://localhost:8080/api/guest/takeData", dataGoogle);
          console.log("Login successful", response.data);
          window.location.reload();
        } catch (error) {
          // console.error("Error:", error.response ? error.response.data : error.message);
          // toast.error(`Error: ${error.response ? error.response.data : 'Unknown error'}`);
        }

      }
    };
    takeData();

  }, [dataGoogle]);

  const rememberMe = () => setChecked(!checked);


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decodedToken = jwtDecode(token);

      const { name: username, email } = decodedToken;
      setDataGoogle({ username, email, fullname: username });

      // Gửi yêu cầu đến API để lấy thông tin đăng nhập
      const response = await axios.post('http://localhost:8080/api/guest/takeData', {
        fullname: username,
        username: username,
        email: email,
      });

      // Lấy token và role từ phản hồi của API
      const { token: userToken, role } = response.data;
      setUserInfo({ username, role });

      // Thiết lập cookie
      const cookieExpiry = 7; // Thời gian cookie tồn tại là 7 ngày
      Cookies.set('token', userToken, { expires: cookieExpiry, path: '/' });
      Cookies.set('role', role, { expires: cookieExpiry, path: '/' });

      // Chuyển hướng người dùng
      navigate('/');
    } catch (error) {
      console.error('Error saving account:', error);
      toast.error('Có lỗi xảy ra khi lưu tài khoản Google.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('cart')

    try {
      const loginResponse = await axios.post('http://localhost:8080/api/login', null, {
        params: { username, password },
        withCredentials: true,
      });

      const token = loginResponse.data.token;
      const decodedToken = jwtDecode(token);
      const cookieExpiry = checked ? 7 : 0.5;

      Cookies.set('token', token, { expires: cookieExpiry, path: '/' });

      const userInfo = JSON.stringify({
        username: decodedToken.sub,
        role: decodedToken.role,
        accountId: decodedToken.accountId,
      });

      Cookies.set('user', userInfo, { expires: cookieExpiry, path: '/' });

      toast.success('Đăng nhập thành công!', {
        position: 'top-right',
        autoClose: 500,
      });

      setUserInfo({
        username: decodedToken.sub,
        role: decodedToken.role,
        accountId: decodedToken.accountId,
      });
      window.location.reload();
      navigate('/');

    } catch (error) {
      const message = error.response?.data || 'Có lỗi xảy ra khi đăng nhập.';
      setError(message);
      toast.error(message, {
        position: 'top-right',
        autoClose: 500,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Ngừng hành động mặc định của Enter
      handleLogin(e); // Truyền đối số e vào hàm handleLogin
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

          {/* Cột form đăng nhập */}
          <div className="w-full lg:w-1/2 max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-300">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">ĐĂNG NHẬP</h1>
              <p className="text-sm text-gray-600">Vui lòng nhập thông tin đăng nhập</p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <InputCom
                  placeholder="Nhập tài khoản"
                  label="Tài khoản"
                  name="username"
                  type="text"
                  value={username}
                  inputHandler={(e) => setUsername(e.target.value)}
                  className="w-full p-4 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <InputCom
                  placeholder="Nhập mật khẩu"
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  value={password}
                  inputHandler={(e) => setPassword(e.target.value)}
                  className="w-full p-4 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    
                </div>
                <a href="/forgot-password" className="text-sm text-red-500 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition transform hover:scale-105"
              >
                {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-600">hoặc</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Đăng nhập Google */}
            <div className="login-google">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log('Đăng nhập không thành công');
                  toast.error('Đăng nhập không thành công', { position: 'top-right', autoClose: 3000 });
                }}
                render={(renderProps) => (
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img
                      src="/assets/images/google-icon.webp" // Đảm bảo đường dẫn đúng tới icon Google
                      alt="Google Icon"
                      className="w-6 h-6"
                    />
                    <span>Đăng nhập bằng Google</span>
                  </button>
                )}
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Bạn chưa có tài khoản?{" "}
                <a href="/signup" className="text-red-500 hover:underline">
                  Tạo tài khoản mới
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </LayoutHomeFive>

  );
}
