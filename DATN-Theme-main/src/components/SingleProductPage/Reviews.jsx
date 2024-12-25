import Star from "../Helpers/icons/Star";

export default function Reviews({
  comments

}) {
  function formatDate(dateString) {
    if (!dateString) return ""; // Xử lý nếu dateString không tồn tại

    const [year, month, day, hour, minute, second] = dateString.split("-");
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        <div className="w-full comments mb-[60px]">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              comment && comment.id ? (  // Kiểm tra nếu comment và comment.id tồn tại
                <div
                  key={comment.id || index}  // Sử dụng index như key dự phòng
                  className="comment-item bg-white px-10 py-[32px] mb-2.5"
                >
                  <div className="comment-author flex justify-between items-center mb-3">
                    <div className="flex space-x-3 items-center">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                          src={`/assets/images/${comment.images}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />

                      </div>
                      <div>
                        <p className="text-[18px] font-medium text-qblack">
                          {comment.fullname}
                        </p>
                        <p className="text-[13px] font-normal text-qgray">
                          {formatDate(comment.date)}
                        </p>

                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Hiển thị ngôi sao */}
                      <div className="flex space-x-1">
                        {Array.from(Array(Number(comment.stars) || 0), (_, index) => (
                          <span key={`${comment.id}-${index}`}>
                            <Star className="text-yellow-500 w-4 h-4" /> {/* Đổi màu ngôi sao */}
                          </span>
                        ))}
                      </div>
                      {/* Hiển thị số sao */}
                      <span className="text-[13px] font-medium text-qblack mt-1 inline-block">
                        {comment.stars && !isNaN(comment.stars) ? (Number(comment.stars).toFixed(1)) : '0.0'}
                      </span>
                    </div>

                  </div>
                  <div className="comment mb-[30px]">
                    <p className="text-[15px] text-qgray leading-7 text-normal">
                      {comment.review}
                    </p>
                  </div>
                </div>
              ) : null  // Bỏ qua comment không có id
            ))
          ) : (
            <p>Chưa có đánh giá nào! hãy mua và đánh giá nó nhé.</p>  // Hiển thị thông báo nếu không có comments
          )}
        </div>
      </div>
    </div>
  );
}
