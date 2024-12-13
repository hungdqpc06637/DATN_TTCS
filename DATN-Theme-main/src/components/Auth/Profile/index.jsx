import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadcrumbCom from "../../BreadcrumbCom";
import LayoutHomeFive from "../../Partials/LayoutHomeFive";
import IcoAdress from "./icons/IcoAdress";
import IcoCart from "./icons/IcoCart";
import IcoDashboard from "./icons/IcoDashboard";
import IcoLove from "./icons/IcoLove";
import IcoPassword from "./icons/IcoPassword";
import IcoPeople from "./icons/IcoPeople";
import AddressesTab from "./tabs/AddressesTab";
import Dashboard from "./tabs/Dashboard";
import OrderTab from "./tabs/OrderTab";
import PasswordTab from "./tabs/PasswordTab";
import ProfileTab from "./tabs/ProfileTab";
import WishlistTab from "./tabs/WishlistTab";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Profile() {
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");
  const [accountId, setAccountId] = useState(null); // State để lưu accountId

  useEffect(() => {
    const token = Cookies.get("token");
    let accountId;

    if (token) {
      try {
        const userInfo = jwtDecode(token); // Giải mã token
        accountId = userInfo.accountId; // Lấy accountId từ thông tin người dùng
        setAccountId(accountId); // Cập nhật state
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }

    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );
  }, [getHashContent]);

  return (
    <LayoutHomeFive childrenClasses="pt-0 pb-0">
      <div className="profile-page-wrapper w-full bg-gray-50">
        <div className="container-x mx-auto py-10">
          <BreadcrumbCom
            paths={[
              { name: "home", path: "/" },
              { name: "profile", path: "/profile" },
            ]}
          />
          <div className="w-full bg-white shadow-md rounded-lg p-8">
            {/* Header */}
            <div className="title-area flex justify-between items-center border-b pb-4">
              <h1 className="text-lg font-semibold text-gray-800">
                Trang tổng quan của bạn
              </h1>
            </div>

            {/* Main Content */}
            <div className="profile-wrapper w-full mt-6 flex space-x-8">
              {/* Sidebar */}
              <div className="w-[240px] min-h-[600px] bg-gray-100 shadow-inner rounded-lg p-6">
                <div className="flex flex-col space-y-6">
                  {/* Sidebar Links */}
                  {[
                    { to: "/profile#dashboard", icon: <IcoDashboard />, label: "Trang tổng quan" },
                    { to: "/profile#profile", icon: <IcoPeople />, label: "Thông tin cá nhân" },
                    { to: "/profile#order", icon: <IcoCart />, label: "Đặt hàng" },
                    { to: "/profile#wishlist", icon: <IcoLove />, label: "Danh sách yêu thích" },
                    { to: "/profile#address", icon: <IcoAdress />, label: "Địa chỉ" },
                    { to: "/profile#password", icon: <IcoPassword />, label: "Thay đổi mật khẩu" },
                  ].map((item, index) => (
                    <Link key={index} to={item.to}>
                      <div className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg transition">
                        <span className="text-gray-600">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                <div className="item-body dashboard-wrapper w-full bg-gray-50 p-6 rounded-lg shadow">
                  {active === "dashboard" ? (
                    <Dashboard />
                  ) : active === "profile" ? (
                    <ProfileTab />
                  ) : active === "order" ? (
                    <OrderTab accountId={accountId} />
                  ) : active === "wishlist" ? (
                    <WishlistTab accountId={accountId} />
                  ) : active === "address" ? (
                    <AddressesTab accountId={accountId} />
                  ) : active === "password" ? (
                    <PasswordTab />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHomeFive>

  );
}