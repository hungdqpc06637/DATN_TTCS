import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Tự động đăng ký biểu đồ
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
const ProductReviewPieChart = () => {
    const [reviewData, setReviewData] = useState({
        labels: [],
        datasets: [
            {
                label: "Số lượng đánh giá",
                data: [],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                ],
                hoverOffset: 4,
            },
        ],
    });

    const token = Cookies.get('token');
    let userInfo = null;
    let role = null;

    if (token) {
        try {
            userInfo = jwtDecode(token);
            role = userInfo.roles;
        } catch (error) {
            console.error("Token decoding error:", error);
        }
    }

    useEffect(() => {
        // Call API với Bearer Token
        axios
            .get("http://localhost:8080/api/staff/statistical/star-votes", {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm Authorization header
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                const data = response.data;

                // Xử lý dữ liệu từ API
                const stars = data.map((item) => `${item.stars} Sao`);
                const votes = data.map((item) => item.votes);

                // Cập nhật dữ liệu cho biểu đồ
                setReviewData({
                    labels: stars,
                    datasets: [
                        {
                            label: "Số lượng đánh giá",
                            data: votes,
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                            ],
                            hoverOffset: 4,
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, [token]); // Thêm dependency để đảm bảo token cập nhật

    return (
        <div style={{ width: "300px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center" }}>Thống kê đánh giá sản phẩm</h2>
            <Pie data={reviewData} />
        </div>
    );
};

export default ProductReviewPieChart;
