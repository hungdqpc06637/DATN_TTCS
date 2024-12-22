import { useState } from 'react'; // Import useState để quản lý state
import { toast } from 'react-toastify';
import axios from 'axios';
import InputCom from '../../Helpers/InputCom'; // Đường dẫn tới InputCom
import LayoutHomeFive from '../../Partials/LayoutHomeFive';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Otp() {
  const location = useLocation(); // Lấy thông tin từ location
  const navigate = useNavigate(); // Khởi tạo hàm điều hướng
  const email = location.state?.email || ''; // Lấy email từ state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Khởi tạo state cho OTP (6 chữ số)

  // Hàm xử lý khi người dùng thay đổi giá trị ô OTP
  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1); // Giới hạn chỉ một ký tự cho mỗi ô
    setOtp(newOtp);

    // Chuyển sang ô tiếp theo khi nhập xong
    if (e.target.value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpCode = otp.join(""); // Ghép các giá trị trong mảng thành một chuỗi
    if (otpCode.length !== 6) {
      toast.error("Vui lòng nhập đầy đủ 6 chữ số OTP.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/verify-otp?email=${email}&otp=${otpCode}`);
      toast.success(response.data); // Hiển thị thông báo thành công
      navigate('/new-password', { state: { email } }); // Truyền email qua state
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi xác thực mã OTP."; // Lấy thông báo lỗi cụ thể từ server
      toast.error(errorMessage);
    }
  };

  return (
    <LayoutHomeFive childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="flex justify-center items-center">
            <div className="w-full lg:w-[572px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">XÁC THỰC MÃ OTP</h1>
                  <div className="shape -mt-6">
                    <svg width="172" height="29" viewBox="0 0 172 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727" stroke="#FFBB38" />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <div className="input-item mb-10 flex justify-between">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        maxLength="1"
                        className="w-[50px] h-[50px] text-center border border-gray-400 rounded-md"
                      />
                    ))}
                  </div>
                  <div className="signin-area mb-3.5">
                    <button
                      type="button"
                      className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition transform hover:scale-105"
                      onClick={handleOtpSubmit} // Gọi hàm xác thực OTP
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHomeFive>
  );
}
