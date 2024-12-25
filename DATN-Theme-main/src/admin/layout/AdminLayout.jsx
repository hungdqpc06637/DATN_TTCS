import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaBox, FaShoppingCart, FaUsers,
  FaTags, FaRuler, FaSignOutAlt, FaBars, FaTimes, FaHome, FaBolt,
  FaBell, FaUserCircle
} from 'react-icons/fa';
import Cookies from 'js-cookie';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newOrderCount, setNewOrderCount] = useState(0); // Số lượng đơn hàng mới
  const [newOrderDetails, setNewOrderDetails] = useState(null); // Chi tiết đơn hàng mới
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [notifications, setNotifications] = useState([]);

  const links = [
    { to: '/admin', label: 'Thống kê', icon: <FaTachometerAlt /> },
    { to: '/admin/products', label: 'Sản phẩm', icon: <FaBox /> },
    { to: '/admin/orders', label: 'Đơn hàng', icon: <FaShoppingCart /> },
    { to: '/admin/users', label: 'Người dùng', icon: <FaUsers /> },
    { to: '/admin/category', label: 'Loại sản phẩm', icon: <FaTags /> },
    { to: '/admin/size', label: 'Kích thước', icon: <FaRuler /> },
    { to: '/admin/flash-sales', label: 'Flash sales', icon: <FaBolt /> },
    { to: '/admin/chatAdmin', label: 'Chat box', icon: <FaBolt /> },
    { label: 'Đăng xuất', icon: <FaSignOutAlt />, action: 'logout' }
  ];

  useEffect(() => {
    // Kiểm tra nếu có dữ liệu trong localStorage
    const savedNotifications = localStorage.getItem('notifications');
    const savedOrderCount = localStorage.getItem('newOrderCount');

    // console.log("Restored from localStorage - notifications:", savedNotifications);
    // console.log("Restored from localStorage - newOrderCount:", savedOrderCount);

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications)); // Lấy dữ liệu thông báo từ localStorage
    }

    if (savedOrderCount) {
      setNewOrderCount(Number(savedOrderCount)); // Lấy số lượng thông báo từ localStorage
    }
  }, []); // Chạy 1 lần khi component được mount


  useEffect(() => {
    if (notifications.length > 0) {
      //console.log("Saving notifications to localStorage:", notifications);
      localStorage.setItem('notifications', JSON.stringify(notifications)); // Lưu danh sách thông báo
    }
    if (newOrderCount >= 0) {
      //console.log("Saving newOrderCount to localStorage:", newOrderCount);
      localStorage.setItem('newOrderCount', newOrderCount); // Lưu số lượng thông báo
    }
  }, [newOrderCount, notifications]); // Lưu khi có sự thay đổi trong state

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/admin/notifications'); // URL WebSocket của bạn

    socket.onopen = () => {
      //console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      try {
        let orderData = event.data;

       // console.log("Received WebSocket message:", orderData);

        // Kiểm tra nếu là thông báo đơn hàng mới
        if (orderData.startsWith("Đơn hàng mới")) {
          const newNotification = { id: Date.now(), message: orderData, seen: false };

          setNotifications(prevNotifications => {
            const updatedNotifications = [...prevNotifications, newNotification];
            console.log("Updated notifications:", updatedNotifications);

            // Lưu vào localStorage
            localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

            return updatedNotifications;
          });

          setNewOrderCount(prevCount => {
            const updatedCount = prevCount + 1;
            //console.log("Updated newOrderCount:", updatedCount);

            // Lưu vào localStorage
            localStorage.setItem('newOrderCount', updatedCount);

            return updatedCount;
          });

          setIsModalOpen(true);
        } else {
          // Kiểm tra nếu dữ liệu là JSON hợp lệ
          try {
            orderData = JSON.parse(orderData);
            const newNotification = { id: orderData.id, message: orderData.message, seen: false };

            setNotifications(prevNotifications => {
              const updatedNotifications = [...prevNotifications, newNotification];

              // Lưu vào localStorage
              localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

              return updatedNotifications;
            });

            setNewOrderCount(prevCount => {
              const updatedCount = prevCount + 1;

              // Lưu vào localStorage
              localStorage.setItem('newOrderCount', updatedCount);

              return updatedCount;
            });

            setIsModalOpen(true);
          } catch (parseError) {
            //console.log('Received data is not valid JSON:', orderData);
          }
        }
      } catch (error) {
        //console.log('Error parsing WebSocket message:', error);
      }
    };

    socket.onerror = (error) => {
      //console.log('WebSocket error:', error);
    };

    socket.onclose = () => {
      //console.log('Disconnected from WebSocket');
    };

    return () => {
      socket.close();
    };
  }, []);



  const handleNotificationClick = (id) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, seen: true } // Đánh dấu thông báo là đã xem
          : notification
      );

      // Lưu lại vào localStorage
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

      return updatedNotifications;
    });

    // Cập nhật lại newOrderCount khi có thông báo được đánh dấu là đã xem
    setNewOrderCount(prevCount => {
      const updatedCount = prevCount > 0 ? prevCount - 1 : 0; // Giảm đi 1 khi có thông báo đã xem
    //  console.log("Updated newOrderCount:", updatedCount);

      // Lưu vào localStorage
      localStorage.setItem('newOrderCount', updatedCount);

      return updatedCount;
    });
  };




  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
    window.location.reload();
  };

  // Toggle modal
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64 px-6 py-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin</h1>
          <button className="text-gray-300" onClick={toggleSidebar}>
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {links.map((link, index) => (
            link.action === 'logout' ? (
              <button
                key={index}
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-blue-100 rounded-lg"
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ) : (
              <Link
                key={index}
                to={link.to}
                onClick={() => setActiveLink(link.to)}
                className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-colors ${activeLink === link.to
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            )
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 shadow-lg py-4 px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-white" onClick={toggleSidebar}>
              <FaBars size={24} />
            </button>
            <h1 className="text-xl font-semibold text-white">Trang Quản Trị</h1>
          </div>
          <div className="flex justify-center items-center gap-6">
            <div className="relative z-10">
              <img
                src="../assets/images/logo-8.png"
                alt="Logo"
                className="w-48 h-10 object-contain"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6 relative">
            {/* Home Button */}
            <button className="text-white hover:text-gray-300 transition-colors duration-200" onClick={() => navigate('/')}>
              <FaHome size={20} />
            </button>

            {/* Notification Button */}
            <button
              className="relative text-white hover:text-gray-300 transition-colors duration-200"
              onClick={handleModalOpen}
            >
              <FaBell size={20} />
              {newOrderCount > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1 transform translate-x-2 -translate-y-2">
                  {newOrderCount}
                </span>
              )}

              {/* Dropdown List for Notifications */}
              {isModalOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg z-30 max-h-96 overflow-y-auto">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Thông báo mới</h3>

                    {notifications.filter(notification => !notification.seen).length === 0 ? (
                      <p className="text-gray-600">Không có thông báo mới.</p>
                    ) : (
                      notifications
                        .filter(notification => !notification.seen)
                        .slice(0, 5) // Hiển thị chỉ 5 thông báo mới nhất
                        .map(notification => (
                          <div
                            key={notification.id}
                            className="bg-yellow-100 p-3 mb-2 cursor-pointer rounded-lg hover:bg-yellow-200 transition-colors duration-200"
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <p className="text-gray-800">{notification.message}</p>
                          </div>
                        ))
                    )}

                    {notifications.filter(notification => !notification.seen).length > 5 && (
                      <button
                        className="w-full text-blue-500 mt-2"
                        onClick={() => {
                          setIsModalOpen(false);
                          navigate('/admin/notifications'); // Đưa người dùng đến trang xem tất cả thông báo
                        }}
                      >
                        Xem tất cả
                      </button>
                    )}

                    <h3 className="font-semibold text-gray-800 mt-4">Thông báo đã xem</h3>

                    {notifications.filter(notification => notification.seen).length === 0 ? (
                      <p className="text-gray-600">Không có thông báo đã xem.</p>
                    ) : (
                      notifications
                        .filter(notification => notification.seen)
                        .map(notification => (
                          <div
                            key={notification.id}
                            className="bg-gray-200 p-3 mb-2 cursor-pointer rounded-lg hover:bg-gray-300 transition-colors duration-200"
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <p className="text-gray-800">{notification.message}</p>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </button>
<<<<<<< HEAD

=======
>>>>>>> 68e5b7db72cf750c51f244ba753b48d82b306b74
          </div>

        </div>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>




    </div>
  );
};

export default AdminLayout;
