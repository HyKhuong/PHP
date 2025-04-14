import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PaymentConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state || {};

    const [user, setUser] = useState({
        user_id: "",
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        paymentMethod: "", // Ensure this state captures the selected method
    });

    const [bookingDetail, setBookingDetail] = useState({
        number_of_people: 0,
        total_price: 0,
        tour_id: "",
    });

    const [loading, setLoading] = useState(false);

    // Handle payment method selection
    const handlePaymentMethodChange = (method) => {
        setUser((prev) => ({ ...prev, paymentMethod: method }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) return;

            try {
                const parsedUser = JSON.parse(storedUser);
                const storedEmail = parsedUser.email;

                const response = await axios.get("http://localhost/server/public/auth/current-user");

                if (Array.isArray(response.data.data)) {
                    const foundUser = response.data.data.find((u) => u.email === storedEmail);
                    if (foundUser) {
                        setUser((prev) => ({
                            ...prev,
                            user_id: foundUser.user_id || prev.user_id,
                            customerName: foundUser.user_name || prev.customerName,
                            customerPhone: foundUser.phone_number || prev.customerPhone,
                            customerEmail: foundUser.email || prev.customerEmail,
                        }));
                    } else {
                        console.log("User not found");
                    }
                } else {
                    console.error("Expected an array but got:", response.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchBooking = async () => {
            if (!bookingData?.booking_id) {
                console.error("Booking ID is missing");
                return;
            }

            try {
                const response = await axios.get(`http://localhost/server/public/booking/${bookingData.booking_id}`);

                console.log("booking:", response.data);

                if (response.data && response.data.data) {
                    setBookingDetail(response.data.data);
                } else {
                    console.warn("No booking data found:", response.data);
                }
            } catch (error) {
                console.error("Error fetching booking:", error);
            }
        };

        fetchUser();
        fetchBooking();
    }, [bookingData]);

    const handleConfirmPayment = async () => {
        if (!user.paymentMethod) {
            alert("Vui lòng chọn phương thức thanh toán");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post("http://localhost/server/public/payment", {
                booking_id: bookingData.booking_id,
                amount: bookingDetail.total_price,
                payment_method: user.paymentMethod, 
                payment_date: new Date().toISOString().split('T')[0]
            });

            if (response.data) {
                const success = await axios.put(`http://localhost/server/public/tours/${bookingData.tour_id}`, {
                    number_people: bookingData.number_of_people
                });
            
                if (success.data?.status === "success") {
                    navigate("/payment_completed");
                } else {
                    alert("Cập nhật tour thất bại.");
                }
            } else {
                alert("Không thể tạo thanh toán. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error creating payment:", error);
            alert("Lỗi khi xử lý thanh toán.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-5xl p-6">
            {/* Payment Steps */}
            <div className="mb-8 flex items-center justify-between text-gray-400">
                <span>NHẬP THÔNG TIN</span>
                <span>➝</span>
                <span className="font-semibold text-blue-600">THANH TOÁN</span>
                <span>➝</span>
                <span>HOÀN TẤT</span>
            </div>

            {/* Customer Info */}
            <div className="mb-4 rounded-lg border p-4 shadow-md">
                <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
                <p>👤 Họ tên: {user.customerName}</p>
                <p>📞 Số điện thoại: {user.customerPhone}</p>
                <p>📧 Email: {user.customerEmail}</p>
            </div>

            {/* Booking Details */}
            <div className="mb-6 rounded-lg border p-4 shadow-md">
                <h2 className="text-xl font-semibold">Thông tin đặt chỗ</h2>
                <p>👥 Số người: {bookingDetail.number_of_people}</p>
                <p className="font-bold">💰 Tổng tiền: {Number(bookingDetail.total_price).toLocaleString("vi-VN")}VNĐ</p>
            </div>

            {/* Payment Method Selection */}
            <div className="rounded-lg border p-4 shadow-md">
                <h2 className="mb-2 text-xl font-semibold">PHƯƠNG THỨC THANH TOÁN</h2>
                <div className="grid grid-cols-2 gap-4">
                    {["momo", "vnpay"].map((method) => (
                        <div
                            key={method}
                            className={`cursor-pointer rounded-lg border p-3 text-center transition duration-200 ${
                                user.paymentMethod === method
                                    ? "border-blue-500 bg-blue-100"
                                    : "border-gray-300 bg-white"
                            }`}
                            onClick={() => handlePaymentMethodChange(method)}
                        >
                            {method.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>

            {/* Confirmation Button */}
            <button
                onClick={handleConfirmPayment}
                className="mt-6 w-full rounded px-4 py-2 font-semibold text-white shadow-md transition hover:opacity-90"
                style={{ background: "linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)" }}
                disabled={loading}
            >
                {loading ? "Đang xử lý..." : "Xác nhận & Thanh toán"}
            </button>
        </div>
    );
};

export default PaymentConfirmation;
