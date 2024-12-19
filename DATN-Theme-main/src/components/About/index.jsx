import { useRef } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../Helpers/Cards/BlogCard";
import Star from "../Helpers/icons/Star";
import PageTitle from "../Helpers/PageTitle";
import SimpleSlider from "../Helpers/SliderCom";
import LayoutHomeFive from "../Partials/LayoutHomeFive";

import blog from "../../data/blogs.json";
import DataIteration from "../Helpers/DataIteration";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function About() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Cấu hình slider
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: false,
  };
  const slider = useRef(null);
  const prev = () => slider.current.slickPrev();
  const next = () => slider.current.slickNext();

  // Lấy token và giải mã
  const token = Cookies.get("token");
  let accountId;

  if (token) {
    try {
      const userInfo = jwtDecode(token);
      accountId = userInfo.accountId;
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
    }
  }

  // Hàm gọi API lấy đánh giá 5 sao
  const fetchFiveStarRatings = async () => {
    try {
      if (!token) {
        //toast.error("Không tìm thấy token.");
        return;
      }

      const response = await axios.get('http://localhost:8080/api/user/ratings/five-star', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data && response.data.length > 0) {
        setRatings(response.data);
        console.log(response.data);
        //toast.success('Lấy đánh giá 5 sao thành công!');
      } else {
        setRatings([]);
        toast.info('Không có đánh giá 5 sao nào.');
      }
    } catch (error) {
      //console.error('Lỗi khi lấy dữ liệu đánh giá:', error);
      // setError('Có lỗi xảy ra khi tải đánh giá.');
      // toast.error('Có lỗi xảy ra khi tải đánh giá.');
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchFiveStarRatings();
  }, []);


  return (
    <LayoutHomeFive childrenClasses="pt-0 pb-0">
      <ToastContainer autoClose={1000} />
      <div className="about-page-wrapper w-full">

        <div className="title-area w-full h-48 flex flex-col items-center justify-center rounded-b-lg relative overflow-hidden" style={{ background: "linear-gradient(135deg, #81d4fa, #2196f3)" }}>
          {/* Keyframes CSS */}
          <style>
            {`
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
          </style>

          {/* Tiêu đề */}
          <h1
            className="text-4xl font-bold text-black mb-2"
            style={{
              animation: "fadeInUp 1.5s ease-in-out",
              opacity: 1,
              transform: "translateY(0)",
            }}
          >
            Về Chúng Tôi
          </h1>

          {/* Breadcrumb */}
          <div
            className="text-white text-sm"
            style={{
              animation: "fadeInUp 1.5s ease-in-out",
              opacity: 1,
              transform: "translateY(0)",
            }}
          >
            <Link to="/" className="hover:text-yellow-300 transition-colors duration-300">
              Home
            </Link>
            <span> / </span>
            <Link to="/about" className="hover:text-yellow-300 transition-colors duration-300">
              About Us
            </Link>
          </div>
        </div>



        <div className="aboutus-wrapper w-full bg-gray-10 py-10">
          <div className="container-x mx-auto">
            <div className="w-full lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
              {/* Phần nội dung chính */}
              <div className="content flex-1 px-4">
                <p className="text-gray-800 mb-6  lg:text-l font-semibold leading-relaxed">
                  Chúng tôi cam kết mang lại giá trị tốt nhất cho khách hàng thông qua các sản phẩm và dịch vụ chất lượng cao.
                  Với đội ngũ chuyên nghiệp và tận tâm, chúng tôi luôn không ngừng nỗ lực để phát triển và phục vụ cộng đồng.
                </p>
                <Link to="/contact" className="inline-block">
                  <div className="w-[121px] h-10 bg-yellow-500 rounded flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-medium">Liên hệ</span>
                  </div>
                </Link>
              </div>


              {/* Phần hình động minh họa */}
              <div className="animation flex-1 px-4 flex justify-center items-center">
                <div className="relative w-40 h-72 flex items-center justify-center overflow-hidden">
                  {/* Hình tên lửa đang bay */}
                  <div className="relative w-32 h-32 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center animate-fly">
                    <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center">
                      <div className="text-gray-800 text-3xl">🚀</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần CSS trực tiếp trong JSX */}
          <style>
            {`
          @keyframes fly {
            0% { transform: translateY(0); }
            50% { transform: translateY(-50px); }
            100% { transform: translateY(0); }
          }

          .animate-fly {
            animation: fly 2s ease-in-out infinite;
          }
        `}
          </style>
        </div>








        <div className="customer-feedback w-full bg-white py-10">
          <div className="title flex justify-center mb-8">
            <h1 className="text-[28px] font-semibold text-qblack">Phản hồi của khách hàng</h1>
          </div>
          <div className="feedback-slider-wrapper w-full relative overflow-hidden">
            <SimpleSlider selector={slider} settings={settings}>
            {ratings.length > 0 ? (
  ratings
    .filter(
      (value, index, self) => self.findIndex((r) => r.id === value.id) === index
    ) // Lọc phần tử trùng lặp
    .map((rating, index) => (
      <div
        key={`${rating.id}-${index}`} // Key đảm bảo là duy nhất
        className="item bg-primarygray p-6 rounded-lg shadow-md mb-6"
      >
        <div className="flex flex-col justify-between h-full">
          {/* Rating Section */}
          <div className="rating flex items-center space-x-2">
            <div className="flex">
              {[...Array(parseInt(rating.stars))].map((_, idx) => (
                <Star key={idx} w="20" h="20" />
              ))}
            </div>
            <span className="text-[13px] text-qblack">({rating.stars}.0)</span>
          </div>

          {/* Review Content */}
          <div className="text-[15px] text-qgraytwo leading-6 mt-4 line-clamp-4">
            {rating.review || "Không có nội dung đánh giá."}
          </div>

          {/* User Info */}
          <div className="flex items-center mt-6 space-x-4">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
              <img
                src={
                  rating.orders.account.image
                    ? `/assets/images/${rating.orders.account.image}`
                    : "/assets/images/comment-user-1.png"
                }
                alt={rating.orders.account.username || "Người dùng"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[18px] text-qblack font-medium">
                {rating.orders.account.username || "Ẩn danh"}
              </p>
              <p className="text-qgraytwo text-[13px]">
                {rating.orders.account.location || "Địa điểm không xác định"}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))
) : (
  <p className="text-center text-qgraytwo">Không có đánh giá 5 sao nào.</p>
)}

            </SimpleSlider>

            {/* Navigation buttons for the slider */}
            <div className="slider-btns flex justify-center mt-8">
              <div className="flex space-x-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-qyellow flex items-center justify-center text-qyellow hover:bg-qyellow hover:text-white transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-qyellow flex items-center justify-center text-qyellow hover:bg-qyellow hover:text-white transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="container-x mx-auto my-[60px]">
          <div
            data-aos="fade-down"
            className="best-services w-full bg-qyellow flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10"
          >
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1H5.63636V24.1818H35"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                      <path
                        d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                      <path
                        d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                      <path
                        d="M34.9982 1H11.8164V18H34.9982V1Z"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                      <path
                        d="M11.8164 7.18164H34.9982"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Miễn phí vận chuyển
                  </p>
                  <p className="text-sm text-qblack">Khi đặt hàng trên 500k</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span>
                    <svg
                      width="32"
                      height="34"
                      viewBox="0 0 32 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M30.7 2L29.5 10.85L20.5 9.65"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Trả lại miễn phí
                  </p>
                  <p className="text-sm text-qblack">
                    Nhận lại trong vòng 3 ngày
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span>
                    <svg
                      width="32"
                      height="38"
                      viewBox="0 0 32 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                      <path
                        d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                      <path
                        d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Thanh toán an toàn
                  </p>
                  <p className="text-sm text-qblack">
                    Thanh toán trực tuyến an toàn 100%
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span>
                    <svg
                      width="32"
                      height="35"
                      viewBox="0 0 32 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M16 28V22"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                      <path
                        d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Chất lượng tốt nhất
                  </p>
                  <p className="text-sm text-qblack">
                    Sản phẩm chính hãng được đảm bảo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHomeFive>
  );
}
