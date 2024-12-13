import { useRef, useState, useEffect } from "react";
import InputCom from "../../../Helpers/InputCom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import { FaEdit } from 'react-icons/fa'; // Import icon chỉnh sửa
import { FaUserCircle } from 'react-icons/fa'; // Import icon người dùng

export default function ProfileTab() {
  const [profileImg, setProfileImg] = useState(null);
  const [accountInfo, setAccountInfo] = useState({});
  const profileImgInput = useRef(null);

  const browseProfileImg = () => {
    profileImgInput.current.click();
  };

  const profileImgChangHandler = (e) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setProfileImg(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      let accountId;

      try {
        const userInfo = jwtDecode(token);
        accountId = userInfo.accountId;

        if (!accountId) {
          console.error("accountId không có trong token");
          return;
        }
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        return;
      }

      axios.get('http://localhost:8080/api/account/info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setAccountInfo(response.data);
          const imagePath = `/assets/images/${response.data.image}`;
          setProfileImg(imagePath || '/assets/images/edit-profileimg.jpg');
        })
        .catch(error => {
          console.error("Có lỗi xảy ra khi lấy thông tin tài khoản:", error);
        });
    }
  }, []);

  const handleUpdateProfile = () => {
    const token = Cookies.get("token");
    const accountId = accountInfo.id;

    const formData = new FormData();
    const imageFile = profileImgInput.current.files[0];

    if (imageFile) {
      formData.append('image', imageFile);
    }

    formData.append('fullname', accountInfo.fullname);
    formData.append('email', accountInfo.email);
    formData.append('phone', accountInfo.phone);

    axios.put(`http://localhost:8080/api/user/${accountId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log("Cập nhật thành công:", response.data);
        toast.success("Cập nhật thông tin thành công!"); // Thông báo thành công
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi cập nhật thông tin:", error);

        // Kiểm tra lỗi từ API (giả sử API trả về message "Email đã tồn tại")
        if (error.response && error.response.data && error.response.data.includes("Email đã tồn tại")) {
          toast.error("Email đã tồn tại, vui lòng sử dụng email khác!");
        } else {
          toast.error("Email đã tồn tại, vui lòng sử dụng email khác!"); // Thông báo lỗi chung
        }
      });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex flex-wrap space-x-8">
        {/* Phần hình ảnh hồ sơ bên trái */}
        <div className="w-full sm:w-[300px] mb-8 sm:mb-0 border-r-2 border-qgraytwo pr-8">
          <div className="update-logo w-full mb-9 flex flex-col items-center">
            <h1 className="text-xl font-bold text-qblack mb-2 flex items-center">
              Cập nhật hồ sơ <FaUserCircle size={20} className="ml-1" />
            </h1>
            <p className="text-sm text-qgraytwo mb-5 text-center">
              Hồ sơ có kích thước tối thiểu <span className="text-qblack">300x300</span>.
              Gif cũng có tác dụng. <span className="text-qblack">Tối đa 5mb</span>.
            </p>

            <div className="relative w-[198px] h-[198px] overflow-hidden flex items-center justify-center">
              <img
                src={profileImg || '/assets/images/edit-profileimg.jpg'}
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <input
                ref={profileImgInput}
                onChange={profileImgChangHandler}
                type="file"
                className="hidden"
              />
              <div
                onClick={browseProfileImg}
                className="absolute bottom-2 right-2 w-[36px] h-[36px] bg-qblack  cursor-pointer flex items-center justify-center z-20"
              >
                <FaEdit size={20} color="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Phần thông tin cá nhân bên phải */}
        <div className="w-full sm:flex-1 pl-8">
          <div className="input-item flex flex-col sm:flex-row space-x-2.5 mb-8">
            <label className="text-sm font-semibold text-qblack mb-2 sm:mb-0 sm:w-1/3">
              Họ và tên
            </label>
            <InputCom
              name="fullname"
              placeholder="Demo Name"
              type="text"
              inputClasses="h-[50px] w-full sm:w-[70%] mb-4 sm:mb-0"
              value={accountInfo.fullname || ''}
              inputHandler={handleInputChange}
            />
          </div>

          <div className="input-item flex flex-col sm:flex-row space-x-2.5 mb-8">
            <label className="text-sm font-semibold text-qblack mb-2 sm:mb-0 sm:w-1/3">
              Email
            </label>
            <InputCom
              name="email"
              placeholder="demoemail@gmail.com"
              type="email"
              inputClasses="h-[50px] w-full sm:w-[70%] mb-4 sm:mb-0"
              value={accountInfo.email || ''}
              inputHandler={handleInputChange}
            />
          </div>

          <div className="input-item flex flex-col sm:flex-row space-x-2.5 mb-8">
            <label className="text-sm font-semibold text-qblack mb-2 sm:mb-0 sm:w-1/3">
              Số điện thoại
            </label>
            <InputCom
              name="phone"
              placeholder="012 3 *******"
              type="text"
              inputClasses="h-[50px] w-full sm:w-[70%]"
              value={accountInfo.phone || ''}
              inputHandler={handleInputChange}
            />
          </div>

          <div className="flex justify-end mt-10">
            <button
              onClick={handleUpdateProfile}
              className="bg-qblack hover:bg-qgray text-white py-2 px-5"
            >
              Cập nhật
            </button>
          </div>
        </div>


        <ToastContainer />
      </div>


    </>
  );
}
