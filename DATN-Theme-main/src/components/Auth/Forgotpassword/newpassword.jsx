import { useState } from "react";
import axios from "axios";
import LayoutHomeFive from '../../Partials/LayoutHomeFive';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export default function Newpassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPass, setNewPass] = useState("hide-password");
  const [confirmPass, setConfirmPass] = useState("hide-password");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/update-password", null, {
        params: {
          email,
          newPassword
        }
      });

      toast.success(response.data);
      setNewPassword("");
      setConfirmPassword("");
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "Có lỗi xảy ra!";
      toast.error(errorMessage);
    }
  };

  const togglePasswordVisibility = (field) => {
    const passwordField = document.getElementById(field);
    const isPassword = passwordField.type === "password";
    passwordField.type = isPassword ? "text" : "password";

    if (field === "new_password") {
      setNewPass(isPassword ? "show-password" : "hide-password");
    } else if (field === "confirm_password") {
      setConfirmPass(isPassword ? "show-password" : "hide-password");
    }
  };

  return (
    <LayoutHomeFive childrenClasses="pt-0 pb-0">
      <ToastContainer autoClose={1000} />
      <div className="changePasswordTab w-full py-10">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-300 rounded-full opacity-30 blur-2xl"></div>

        <div className="container-x mx-auto">
          <div className="lg:flex items-center justify-center relative">
            <div className="lg:w-[572px] w-full h-auto bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0] shadow-md rounded-xl">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">ĐẶT LẠI MẬT KHẨU </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="172"
                      height="29"
                      viewBox="0 0 172 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                        stroke="#FFBB38"
                      />
                    </svg>
                  </div>
                </div>

                {/* Mật khẩu */}
                <div className="input-field mb-6">
                  <label
                    className="input-label text-qgray text-sm block mb-2.5"
                    htmlFor="new_password"
                  >
                    Mật khẩu*
                  </label>
                  <div className="input-wrapper border border-[#E8E8E8] w-full h-[58px] overflow-hidden relative rounded-md">
                    <input
                      placeholder="● ● ● ● ● ●"
                      className="input-field placeholder:text-base text-base px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none rounded-md"
                      id="new_password"
                      type={newPass === "show-password" ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div
                      className="absolute right-4 top-[50%] transform -translate-y-1/2 z-10 cursor-pointer"
                      onClick={() => togglePasswordVisibility("new_password")}
                    >
                      {newPass === "show-password" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="25"
                          height="21"
                          viewBox="0 0 25 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.5483 16.3524C20.156 15.9557 19.7696 15.5605 19.3802 15.1683C18.7802 14.5653 18.1787 13.9638 17.5728 13.3667C17.4972 13.2911 17.4871 13.2388 17.5379 13.1415C19.3482 9.66037 17.2125 5.46008 13.3332 4.87747C12.1143 4.69441 10.9534 4.89636 9.85791 5.46299C9.78672 5.49931 9.73587 5.53563 9.65596 5.45572C8.88157 4.67262 8.10136 3.89678 7.32261 3.11803C7.30082 3.09624 7.28338 3.07154 7.24561 3.0265C7.5667 2.90591 7.8689 2.78387 8.17837 2.67926C10.0758 2.03563 12.0242 1.83513 14.0132 2.05161C18.879 2.58337 23.1752 5.85381 24.9768 10.3926C25 10.4522 25.0073 10.5379 24.9826 10.596C24.0484 12.8916 22.5955 14.792 20.6282 16.2986C20.6137 16.3117 20.5963 16.3219 20.5483 16.3524Z"
                            fill="#797979"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nhập lại mật khẩu */}
                <div className="input-field mb-6">
                  <label
                    className="input-label text-qgray text-sm block mb-2.5"
                    htmlFor="confirm_password"
                  >
                    Nhập lại mật khẩu*
                  </label>
                  <div className="input-wrapper border border-[#E8E8E8] w-full h-[58px] overflow-hidden relative rounded-md">
                    <input
                      placeholder="● ● ● ● ● ●"
                      className="input-field placeholder:text-base text-base px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none rounded-md"
                      id="confirm_password"
                      type={confirmPass === "show-password" ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div
                      className="absolute right-4 top-[50%] transform -translate-y-1/2 z-10 cursor-pointer"
                      onClick={() => togglePasswordVisibility("confirm_password")}
                    >
                      {confirmPass === "show-password" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="25"
                          height="21"
                          viewBox="0 0 25 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.5483 16.3524C20.156 15.9557 19.7696 15.5605 19.3802 15.1683C18.7802 14.5653 18.1787 13.9638 17.5728 13.3667C17.4972 13.2911 17.4871 13.2388 17.5379 13.1415C19.3482 9.66037 17.2125 5.46008 13.3332 4.87747C12.1143 4.69441 10.9534 4.89636 9.85791 5.46299C9.78672 5.49931 9.73587 5.53563 9.65596 5.45572C8.88157 4.67262 8.10136 3.89678 7.32261 3.11803C7.30082 3.09624 7.28338 3.07154 7.24561 3.0265C7.5667 2.90591 7.8689 2.78387 8.17837 2.67926C10.0758 2.03563 12.0242 1.83513 14.0132 2.05161C18.879 2.58337 23.1752 5.85381 24.9768 10.3926C25 10.4522 25.0073 10.5379 24.9826 10.596C24.0484 12.8916 22.5955 14.792 20.6282 16.2986C20.6137 16.3117 20.5963 16.3219 20.5483 16.3524Z"
                            fill="#797979"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nút Đặt lại mật khẩu */}
                <button
                  onClick={handlePasswordUpdate}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition transform hover:scale-105"
                  >
                  Đặt lại mật khẩu
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHomeFive>
  );

}
