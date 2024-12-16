import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddressesTab() {
  const [addressData, setAddressData] = useState([]);
  const [newAddress, setNewAddress] = useState({
    id: null,
    fullname: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    note: '',
    isdefault: false
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);


  const token = Cookies.get('token');
  let userInfo = null;

  if (token) {
    try {
      userInfo = jwtDecode(token);
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userInfo) {
        setError("Không tìm thấy thông tin người dùng.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/user/addresses/account/${userInfo.accountId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });

        // Kiểm tra nếu không có địa chỉ
        if (!response.data || response.data.length === 0) {
          setError("Bạn chưa thêm địa chỉ nào.");
          setAddressData([]); // Đặt addressData là mảng trống nếu không có địa chỉ
        } else {
          setAddressData(response.data); // Cập nhật dữ liệu địa chỉ nếu có
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu địa chỉ:", error);
        if (error.response) {
          if (error.response.status === 403) {
            setError("Bạn không có quyền truy cập vào tài nguyên này.");
          } else {
            setError("Có lỗi xảy ra khi tải địa chỉ.");
          }
        } else {
          setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userInfo?.accountId, token]);

  const handleAddAddress = async () => {
    const { fullname, phone, province, district, ward, note } = newAddress;

    // Kiểm tra bỏ trống
    if (!fullname || !phone || !province || !district || !ward || !note) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/; // Định dạng phổ biến tại Việt Nam
    if (!phoneRegex.test(phone)) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/addresses/add?accountId=${userInfo.accountId}`,
        newAddress,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      toast.success("Thêm địa chỉ thành công!");

      // Cập nhật ngay danh sách địa chỉ với địa chỉ vừa thêm
      setAddressData(prevData => [...prevData, response.data]);

      // Đóng form và reset giá trị form
      setShowNewAddressForm(false);
      setNewAddress({ fullname: '', phone: '', province: '', district: '', ward: '', note: '', isdefault: false });
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
      toast.error("Có lỗi xảy ra khi thêm địa chỉ.");
    }
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Kiểm tra và cập nhật địa chỉ mặc định
  const handleSetDefaultAddress = async (addressId) => {
    if (!userInfo || !token) {
      toast.error("Bạn cần đăng nhập để thực hiện thao tác này.");
      return;
    }

    try {
      // Kiểm tra xem địa chỉ có đang là mặc định hay không
      const isCurrentlyDefault = addressData.find(address => address.id === addressId).isdefault;

      // Nếu địa chỉ đã là mặc định, thì bỏ mặc định
      const response = await axios.put(
        `http://localhost:8080/api/user/addresses/${userInfo.accountId}/set-default/${addressId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      // Chỉ thay đổi trạng thái nếu yêu cầu API thành công
      if (response.status === 200) {
        toast.success("Đặt địa chỉ mặc định thành công!");

        // Cập nhật lại địa chỉ trong state sau khi thay đổi
        setAddressData((prevData) =>
          prevData.map((address) => ({
            ...address,
            isdefault: address.id === addressId,
          }))
        );
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi địa chỉ mặc định:", error.message);
      toast.error("Có lỗi xảy ra khi thay đổi địa chỉ mặc định.");
    }
  };

  const handleEditAddress = (addressId) => {
    const addressToEdit = addressData.find((address) => address.id === addressId);
    if (addressToEdit) {
      setNewAddress({
        id: addressToEdit.id,
        fullname: addressToEdit.fullname,
        phone: addressToEdit.phone,
        province: addressToEdit.province,
        district: addressToEdit.district,
        ward: addressToEdit.ward,
        note: addressToEdit.note,
        isdefault: addressToEdit.isdefault,
      });
      setShowNewAddressForm(true);
    }
  };

  const handleUpdateAddress = async () => {
    if (!userInfo || newAddress.id === null) {
      toast.error("Bạn cần đăng nhập và chọn địa chỉ để cập nhật.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/addresses/update/${userInfo.accountId}/${newAddress.id}`,
        newAddress,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      toast.success("Cập nhật địa chỉ thành công!");
      setAddressData((prevData) =>
        prevData.map((address) =>
          address.id === newAddress.id ? response.data : address
        )
      );
      resetNewAddress();
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error);
      toast.error("Có lỗi xảy ra khi cập nhật địa chỉ.");
    }
  };

  const resetNewAddress = () => {
    setNewAddress({ id: null, fullname: '', phone: '', province: '', district: '', ward: '', note: '', isdefault: false });
    setShowNewAddressForm(false);
  };

  const handleDeleteAddress = async (addressId) => {
    if (!userInfo || !token) {
      toast.error("Bạn cần đăng nhập để thực hiện thao tác này.");
      return;
    }

    const accountId = userInfo.accountId;
    if (!accountId) {
      toast.error("Không tìm thấy thông tin tài khoản.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/user/addresses/delete/${accountId}/${addressId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.status === 204) {
        toast.success("Xóa địa chỉ thành công!");
        setAddressData((prevData) => prevData.filter((address) => address.id !== addressId));
      } else {
        toast.error("Có lỗi xảy ra khi xóa địa chỉ.");
      }

    } catch (error) {
      // Log toàn bộ đối tượng lỗi để kiểm tra chi tiết
      toast.error("Địa chỉ này đang liên kết với đơn hàng và không thể xóa ngay lúc này!!!");

    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="grid grid-cols-2 gap-8">
        <div className="w-full bg-primarygray p-6 border rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold">Danh sách địa chỉ</p>
            <button
              type="button"
              onClick={() => setShowNewAddressForm((prev) => !prev)}
              className="border border-qgray w-9 h-9 rounded-full flex justify-center items-center hover:bg-gray-200 transition duration-300"
            >
              <svg
                width="17"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2v20M2 12h20"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          {loading ? (
            <p className="text-center text-gray-500">Đang tải...</p>
          ) : (
            <>
              {error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : (
                <div>
                  {addressData.map((address) => (
                    <div
                      key={address.id}
                      className="relative my-4 p-5 border rounded-lg shadow-lg bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => handleEditAddress(address.id)}
                        className="absolute top-3 right-3 border border-yellow-500 text-yellow-500 px-3 py-1 rounded-md text-sm hover:bg-yellow-50 transition-colors"
                      >
                        Chỉnh sửa
                      </button>

                      <div className="mb-4">
                        <p className="font-semibold text-lg">{address.fullname}</p>
                        <p className="text-gray-700">{address.phone}</p>
                        <p className="text-gray-700">{`${address.province}, ${address.district}, ${address.ward}`}</p>
                        <p className="text-gray-500">{address.note}</p>
                      </div>
                      <div className="flex items-center mt-3">
                        <input
                          type="checkbox"
                          checked={address.isdefault}
                          onChange={() => handleSetDefaultAddress(address.id)}
                          className="hidden"
                        />
                        <label
                          className="relative flex items-center cursor-pointer"
                          onClick={() => handleSetDefaultAddress(address.id)}
                        >
                          <span
                            className={`block w-12 h-6 rounded-full transition-colors duration-300 ${address.isdefault ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                          ></span>
                          <span
                            className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${address.isdefault ? 'translate-x-6' : 'translate-x-0'
                              }`}
                          ></span>
                          <span className="text-gray-600 ml-3">Đặt làm địa chỉ mặc định</span>
                        </label>
                      </div>

                      {/* Nút Xóa */}
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {showNewAddressForm && (
          <div className="w-full mb-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Thêm/Chỉnh sửa địa chỉ</h3>
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="fullname"
                value={newAddress.fullname}
                onChange={handleInputChange}
                placeholder="Họ và tên"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="phone"
                value={newAddress.phone}
                onChange={handleInputChange}
                placeholder="Số điện thoại"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="province"
                value={newAddress.province}
                onChange={handleInputChange}
                placeholder="Tỉnh/Thành phố"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="district"
                value={newAddress.district}
                onChange={handleInputChange}
                placeholder="Quận/Huyện"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="ward"
                value={newAddress.ward}
                onChange={handleInputChange}
                placeholder="Phường/Xã"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <textarea
                name="note"
                value={newAddress.note}
                onChange={handleInputChange}
                placeholder="Ghi chú"
                className="p-3 border border-gray-300 rounded-md col-span-2"
              />
              <div className="col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isdefault"
                    checked={newAddress.isdefault}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={newAddress.id ? handleUpdateAddress : handleAddAddress}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
              >
                {newAddress.id ? "Cập nhật" : "Thêm"}
              </button>
              <button
                onClick={resetNewAddress}
                className="bg-red-500 text-white py-2 px-6 rounded-md ml-4 hover:bg-red-600 transition duration-300"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>

    </>
  );
}
