import BreadcrumbCom from "../BreadcrumbCom";
import LayoutHomeFive from "../Partials/LayoutHomeFive";
import { FaTimesCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

export default function Failer() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const orderID = query.get('orderID');
  const amount = query.get('amount');
  const paymentMethod = query.get('paymentMethod');

  return (
    <LayoutHomeFive>
      <div className="cart-page-wrapper w-full bg-gray-50 py-12">
        <div className="container-x mx-auto">
          {/* Breadcrumb */}
          <BreadcrumbCom paths={[{ name: "Trang chủ", path: "/" }]} />

          {/* Main content */}
          <div className="flex justify-center items-center mt-10">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
              <div className="text-center">
                {/* Animated Icon */}
                <FaTimesCircle 
                  className="text-red-600 mx-auto mb-4 animate-bounce" 
                  size={60} 
                />

                {/* Error Message */}
                <h1 className="text-2xl font-bold text-red-600 mb-3">
                  Thanh toán thất bại!
                </h1>

                {/* Order Details */}
                <div className="mb-6 border-t border-gray-200 pt-4 text-left">
                  <h2 className="text-lg font-semibold mb-2">Chi tiết đơn hàng</h2>
                  <p className="text-gray-700">
                    <strong>Mã đơn hàng:</strong> #{orderID || "Không có thông tin"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Tổng tiền:</strong> {amount ? `${amount} VND` : "Không có thông tin"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phương thức thanh toán:</strong> {paymentMethod || "Không có thông tin"}
                  </p>
                </div>

                {/* Retry Button */}
                <a href="/profile#order">
                  <button 
                    className="w-[200px] py-2 px-4 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
                  >
                    Thử lại thanh toán
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHomeFive>
  );
}
