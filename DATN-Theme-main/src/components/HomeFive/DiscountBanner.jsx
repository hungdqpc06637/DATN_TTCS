import { useNavigate } from "react-router-dom";

export default function DiscountBanner({ className }) {
  const navigate = useNavigate(); // Hook để điều hướng

  return (
    <div
      className={`discount-banner w-full h-[350px] bg-cover relative flex items-center justify-center ${
        className || ""
      }`}
      style={{
        background: "linear-gradient(to right, #ff7e5f, #feb47b)",
      }}
    >
      <div className="container-x mx-auto text-center text-white px-6">
        {/* Tiêu đề chính */}
        <h1
          className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
          data-aos="fade-up"
        >
          "Nâng tầm sự nghiệp, khẳng định <span className="text-yellow-300">phong cách riêng</span>."
        </h1>

        {/* Mô tả */}
        <p
          className="text-lg sm:text-xl font-light mb-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Công sở sang trọng, phong cách tinh tế – Bạn xứng đáng với điều tốt nhất.
        </p>

        {/* Nút kêu gọi hành động */}
        <div data-aos="fade-up" data-aos-delay="400">
          <button
            className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition-all"
            onClick={() => navigate("/all-products")} // Chuyển hướng khi nhấn nút
          >
            Khám phá ngay
          </button>
        </div>
      </div>

      {/* Hình ảnh bên góc */}
      <div
        className="absolute right-[-50px] top-[-50px] sm:right-[-100px] sm:top-[-100px] w-[250px] sm:w-[350px] opacity-75"
        data-aos="zoom-in"
        data-aos-delay="600"
      >
        <img
          src="/assets/images/banner-4.png"
          alt="Banner decoration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
