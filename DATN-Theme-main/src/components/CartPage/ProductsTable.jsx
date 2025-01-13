import React, { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from "../Context/CartContext";

export default function ProductsTable({ onSelectedTotalChange, accountId }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  const token = Cookies.get('token');
  let userInfo;

  if (token) {
    try {
      userInfo = jwtDecode(token);
      //console.log("Decoded Token:", userInfo);
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  useEffect(() => {
    const savedCart = Cookies.get('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from cookie:", error);
      }
    }
  }, []);


  const handleRemoveItem = async (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });

    // Lấy thông tin người dùng từ cookie
    const userInfo = JSON.parse(Cookies.get('user') || '{}');
    const accountId = userInfo?.accountId;

    if (accountId) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/guest/carts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (response.status === 204) {
          setCartItems(updatedCartItems);
          Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });
        }
        else {
          console.error("Lỗi khi xóa sản phẩm:", response.status);
        }
      } catch (error) {
        console.error("Lỗi khi xóa mục khỏi cơ sở dữ liệu:", error.response?.data || error.message);
      }
    } else {
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartItems.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const productIds = Array.from(new Set(cartItems.map(item => item.size.productId)));
        const productRequests = productIds.map(id =>
          axios.get(`http://localhost:8080/api/guest/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        );
        const responses = await Promise.all(productRequests);
        const productDetails = responses.reduce((acc, response) => {
          const product = response.data;
          acc[product.id] = product;
          return acc;
        }, {});
        setProducts(productDetails);
      } catch (error) {
        console.error("Error fetching product information:", error);
        //setError("Could not fetch product information.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [cartItems, token]);

  useEffect(() => {
    if (!accountId) return;

    const fetchCartFromDatabase = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/guest/carts`, {
          params: { accountId: accountId },
          headers: { Authorization: `Bearer ${token}` }
        });
        const cartData = response.data || [];
        setCartItems(cartData);
        Cookies.set('cart', JSON.stringify(cartData), { expires: 7 });
      } catch (error) {
        console.error("Error fetching cart from database:", error);
        //setError("Could not fetch cart information.");
      }
    };

    fetchCartFromDatabase();
  }, [accountId, token]);


  const handleSelectionChange = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    setCartItems(updatedCartItems);
    Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });
  };

  const handleQuantityChange = async (sizeId, change) => {
    // Tìm sản phẩm trong giỏ hàng theo sizeId
    const itemToUpdate = cartItems.find(item => item.size?.id === sizeId);

    if (!itemToUpdate) {
      console.error('Không tìm thấy sản phẩm trong giỏ hàng với sizeId:', sizeId);
      return;
    }

    // Lấy thông tin tồn kho từ sản phẩm
    const selectedSizeInfo = itemToUpdate.size;
    if (!selectedSizeInfo) {
      console.error('Không tìm thấy thông tin kích cỡ sản phẩm.');
      return;
    }

    // Tính toán số lượng mới
    const newQuantity = Math.max(Number(itemToUpdate.quantity) + Number(change), 1);

    // Kiểm tra tồn kho
    if (newQuantity > selectedSizeInfo.quantityInStock) {
      toast.error(`Số lượng vượt quá tồn kho. Chỉ còn ${selectedSizeInfo.quantityInStock} sản phẩm.`);
      return;
    }

    // Cập nhật số lượng trong giỏ hàng
    const updatedCartItems = cartItems.map(item => {
      if (item.size?.id === sizeId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Cập nhật giỏ hàng trong state và cookie
    setCartItems(updatedCartItems);
    Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });

    // Nếu người dùng đã đăng nhập, gửi yêu cầu cập nhật lên server
    if (accountId) {
      try {
        await axios.put(
          `http://localhost:8080/api/guest/carts/quantity`,
          {
            sizeId: sizeId, // Cập nhật theo sizeId
            accountId: accountId,
            newQuantity: newQuantity
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Cập nhật số lượng giỏ hàng thành công.');
      } catch (error) {
        console.error("Lỗi khi cập nhật số lượng trong cơ sở dữ liệu:", error.response?.data || error.message);
        setError("Không thể cập nhật số lượng sản phẩm.");
      }
    }
  };


  // Tính tổng giá cho các mục đã chọn
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      if (item.isSelected) {
        const product = products[item.size.productId] || {};
        return sum + item.quantity * (product.price || 0);
      }
      return sum;
    }, 0);

    onSelectedTotalChange(total);
  }, [cartItems, products, onSelectedTotalChange]);
  // Định dạng tiền VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Chọn</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Sản phẩm</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Màu</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Kích cỡ</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Giá</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Tạm tính</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Số lượng</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const product = products[item.size.productId] || {};
                return (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={item.isSelected}
                        onChange={() => handleSelectionChange(item.id)}
                        className="cursor-pointer w-5 h-5 accent-black"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={`/assets/images/${product.firstImage}`}
                          alt="product"
                          className="w-auto h-full object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-sm text-gray-800 mt-2">{product.name || 'Tên sản phẩm'}</h3>
                    </td>
                    <td className="px-4 py-2">
                      <div
                        className="w-5 h-5 rounded-full border"
                        style={{ backgroundColor: item.size.color.name }}
                      ></div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">{item.size.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {formatCurrency(item.quantity * product.price)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.size.id, -1)} // Truyền cả id và sizeid
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.size.id, 1)} // Truyền cả id và sizeid
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                  Giỏ hàng của bạn đang trống
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer autoClose={1000} />
    </div>


  );
}
