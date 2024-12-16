import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopSellingProducts = ({ products }) => {
  // Lấy top 3 sản phẩm bán chạy nhất
  const topSelling = [...products]
    .sort((a, b) => b.quantity - a.quantity) // Sắp xếp theo số lượng bán giảm dần
    .slice(0, 3); // Chỉ lấy 3 sản phẩm đầu tiên

  // Dữ liệu cho biểu đồ
  const data = {
    labels: topSelling.map((product) => product.productName), // Tên sản phẩm
    datasets: [
      {
        label: "Số lượng bán",
        data: topSelling.map((product) => product.quantity), // Số lượng bán
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Màu sắc cho từng cột
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  // Tùy chọn hiển thị biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Top Sản Phẩm Bán Chạy Nhất",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượng bán",
        },
      },
      x: {
        title: {
          display: true,
          text: "",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", padding: "0px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopSellingProducts;
