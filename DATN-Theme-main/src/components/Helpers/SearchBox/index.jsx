import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SearchBox({ className, type }) {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);  // Trạng thái đang nghe
  const navigate = useNavigate();

  // Khởi tạo SpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'vi-VN';  // Ngôn ngữ tiếng Việt

  // Xử lý kết quả nhận dạng giọng nói
  const handleVoiceSearch = () => {
    if (isListening) {
      return; // Nếu đang nghe, không cho phép nhấn lại
    }
    
    setIsListening(true); // Đặt trạng thái "đang nghe"
  
    recognition.start(); // Bắt đầu nhận diện giọng nói
  
    recognition.onstart = () => {
      console.log("Đang nhận dạng giọng nói...");
    };
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript); // Cập nhật từ khóa tìm kiếm với văn bản chuyển từ giọng nói
      setIsListening(false); // Dừng trạng thái "đang nghe" khi có kết quả

      // Tự động gọi hàm tìm kiếm sau khi có kết quả nhận diện giọng nói
      handleRedirect(transcript);
    };
  
    recognition.onerror = (event) => {
      console.error('Lỗi nhận dạng giọng nói: ', event.error);
      if (event.error === 'no-speech') {
        alert('Không có âm thanh được nhận diện. Hãy chắc chắn rằng bạn đang nói vào microphone.');
      } else if (event.error === 'audio-capture') {
        alert('Không thể truy cập microphone. Kiểm tra quyền truy cập microphone.');
      } else if (event.error === 'not-allowed') {
        alert('Trình duyệt không cho phép sử dụng microphone.');
      } else {
        alert(`Lỗi nhận dạng giọng nói: ${event.error}`);
      }
      setIsListening(false); // Dừng trạng thái "đang nghe" khi có lỗi
    };
  
    recognition.onend = () => {
      console.log("Kết thúc nhận dạng giọng nói.");
      setIsListening(false); // Dừng trạng thái "đang nghe" khi nhận dạng kết thúc
    };
  };

  // Xử lý thay đổi nội dung ô tìm kiếm
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // Xử lý chuyển hướng và tìm kiếm
  const handleRedirect = (searchTerm) => {
    if (searchTerm.trim()) {
      const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
      navigate(`/all-products?s=${encodedSearchTerm}`);
      window.location.reload(); // Tự động tải lại trang với kết quả tìm kiếm
    }
  };

  
  return (
    <div className={`flex items-center w-full max-w-xl mx-auto ${className || ""}`}>
      {/* Vùng nhập tìm kiếm */}
      <div className="flex-1 flex items-center rounded-l-full p-3">
        <input
          value={searchText}
          onChange={handleInputChange}
          type="text"
          className="w-full text-sm px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
          placeholder="Tìm kiếm sản phẩm..."
        />
      </div>

      {/* Vùng nút tìm kiếm */}
      <button
        className="h-full px-6 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-r-full flex items-center justify-center hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-md"
        onClick={() => handleRedirect(searchText)}
        type="button"
      >
        <span className="text-sm font-medium">Tìm kiếm</span>
      </button>

      {/* Nút tìm kiếm bằng giọng nói */}
      <button
        className="ml-2 h-full px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md"
        onClick={handleVoiceSearch}
        type="button"
      >
        {isListening ? (
          // Nếu đang nghe, hiển thị biểu tượng sóng âm (hoặc một biểu tượng khác)
          <span className="text-sm font-medium">🔊</span>
        ) : (
          // Nếu không đang nghe, hiển thị biểu tượng mic
          <span className="text-sm font-medium">🎤</span>
        )}
      </button>
    </div>
  );
}
