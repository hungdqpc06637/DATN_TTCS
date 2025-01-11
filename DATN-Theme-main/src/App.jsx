import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Routers from "./Routers";  // Không bọc trong <Router> ở đây nữa
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from "./components/Context/CartContext";
import ChatApp from "./components/Chat/ChatApp";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi đường dẫn thay đổi
    window.scrollTo(0, 0);

    // Thêm lớp CSS phù hợp dựa trên đường dẫn hiện tại
    if (location.pathname === "/home-five") {
      document.body.classList.add("home-five");
    } else {
      document.body.classList.add("home-one");
    }

    return () => {
      // Xoá lớp CSS được thêm vào khi component bị gỡ bỏ
      document.body.classList.remove("home-five");
      document.body.classList.add("home-one");
    };
  }, [location.pathname]);


  // Kiểm tra nếu đường dẫn bắt đầu bằng "/admin", không hiển thị ChatApp
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <CartProvider> {/* Bọc ứng dụng trong CartProvider */}
      <Routers />
      <ToastContainer />
    </CartProvider>
  );
}

export default App;
