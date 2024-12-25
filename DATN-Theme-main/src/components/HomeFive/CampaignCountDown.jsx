import { Link } from "react-router-dom";
import CountDown from "../Helpers/CountDown";
import { useState, useEffect } from "react";

export default function CampaignCountDown({ className, lastDate }) {
  const [products, setProducts] = useState([]);
  const [flashSaleInfo, setFlashSaleInfo] = useState({
    name: "",
    startDate: null,
    endDate: null,
  });
  const [isExpired, setIsExpired] = useState(false); // Trạng thái kiểm tra hết hạn

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/guest/product-flashsale");
        const data = await response.json();
  
        if (Array.isArray(data) && data.length > 0 && data[0].flashsale) {
          const { name, startdate, enddate } = data[0].flashsale;
  
          const startDateStr = `${startdate[0]}-${startdate[1].toString().padStart(2, "0")}-${startdate[2].toString().padStart(2, "0")}T${startdate[3].toString().padStart(2, "0")}:${startdate[4].toString().padStart(2, "0")}:00`;
          const endDateStr = `${enddate[0]}-${enddate[1].toString().padStart(2, "0")}-${enddate[2].toString().padStart(2, "0")}T${enddate[3].toString().padStart(2, "0")}:${enddate[4].toString().padStart(2, "0")}:00`;
  
          const startDate = new Date(startDateStr);
          const endDate = new Date(endDateStr);
          setFlashSaleInfo({ name, startDate, endDate });
  
          if (new Date() > endDate) setIsExpired(true);
        } else {
          console.warn("Không có sản phẩm flash sale hợp lệ.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  
  const flashSaleActive = flashSaleInfo.endDate && !isExpired;
  
  // Gọi hàm CountDown với endDate
  const { showDate, showHour, showMinute, showSecound } = CountDown(flashSaleInfo.endDate);

  return (
    <div className={`w-full lg:h-[460px] ${className || ""}`}>
      <div className="container-x mx-auto h-full">
        <div className="items-center h-full">
          <div
            data-aos="fade-right"
            className="campaign-countdown h-full w-full mb-5 lg:mb-0"
            style={{
              background: `url(/assets/images/flashsale.png) no-repeat`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {flashSaleActive ? (
              <Link to="/flash-sale">
                <div className="w-full xl:p-12 p-5">
                  <div className="countdown-wrapper w-full flex space-x-[23px] mb-10">
                    {/* Countdown Items */}
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[120px] sm:h-[120px] w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center shadow-lg transition-all hover:bg-red-600 hover:text-white">
                        <span className="font-700 sm:text-[36px] text-[16px] text-[#EB5757]">
                          {showDate}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[14px] font-500 text-center leading-8 text-white">
                        Ngày
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[120px] sm:h-[120px] w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center shadow-lg transition-all hover:bg-blue-600 hover:text-white">
                        <span className="font-700 sm:text-[36px] text-[16px] text-[#2F80ED]">
                          {showHour}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[14px] font-500 text-center leading-8 text-white">
                        Giờ
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[120px] sm:h-[120px] w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center shadow-lg transition-all hover:bg-green-600 hover:text-white">
                        <span className="font-700 sm:text-[36px] text-[16px] text-[#219653]">
                          {showMinute}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[14px] font-500 text-center leading-8 text-white">
                        Phút
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[120px] sm:h-[120px] w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center shadow-lg transition-all hover:bg-pink-600 hover:text-white">
                        <span className="font-700 sm:text-[36px] text-[16px] text-[#EF5DA8]">
                          {showSecound}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[14px] font-500 text-center leading-8 text-white">
                        Giây
                      </p>
                    </div>
                  </div>
                  <div className="w-[120px] h-10 border-b-4 border-white">
                    <div className="h-full inline-flex space-x-2 items-center justify-center">
                      <span className="text-lg font-semibold tracking-wide leading-7 text-white">
                        Mua ngay
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : ( 
              <div className="text-center">
                <p className="text-xl text-red-600 font-bold">Hiện tại không có chương trình giảm giá chớp nhoáng!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
