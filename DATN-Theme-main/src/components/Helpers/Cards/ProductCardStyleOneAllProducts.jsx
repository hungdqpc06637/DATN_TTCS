import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCardStyleOne({ data = {}, type = 1 }) {
  const navigate = useNavigate();
  const imageUrl = data.firstImage ? `/assets/images/${data.firstImage}` : '/assets/images/sanpham1.jpg';

  const handleTitleClick = () => {
    if (data.id) {
      navigate(`/products/${data.id}`);
    } else {
      console.error('Data or data.id is missing');
    }
  };

  const formatPrice = (price) => {
    if (price) {
      const priceInt = Math.floor(price);
      return priceInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫';
    }
    return '0 ₫';
  };

  console.log(data)
  return (
    <div className="product-card w-full max-w-xs mx-auto bg-white shadow-lg overflow-hidden transform transition duration-300 ">
      {/* Product Image */}
      <div
        className="relative w-full h-64 bg-center bg-cover group"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
      </div>

      {/* Product Details */}
      <div className="product-card-details p-5">
        {/* Title */}
        <h4
          className="text-sm font-semibold text-gray-900 cursor-pointer group-hover:text-blue-600 transition-all truncate"
          onClick={handleTitleClick}
        >
          {data.name || 'Tên sản phẩm'}
        </h4>
        {/* Price */}
        <div className="product-card-price mt-4">
          <span className="text-lg font-bold text-gray-900">{formatPrice(data.price)}</span>
        </div>
        {/* Button "View Detail" */}
        <div className="mt-6">
          <button
            type="button"
            className={`w-full py-3 text-white font-semibold text-lg uppercase shadow-md transition-all ${type === 3 ? 'bg-gray-600' : 'bg-gray-400'
              } hover:bg-gray-500 hover:shadow-lg`}
            onClick={handleTitleClick}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-sm tracking-wide">Xem chi tiết</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
