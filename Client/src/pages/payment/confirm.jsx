import { useLocation, useNavigate } from 'react-router-dom';

const PaymentConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerName, customerPhone, customerEmail, adultCount, childCount, babyCount, singleRoom, totalPrice, paymentMethod } =
        location.state || {};

    return (
        <div className="mx-auto max-w-5xl p-6">
            <div className="mb-8 flex items-center justify-between">
                <div className="text-gray-400">NHẬP THÔNG TIN</div>
                <div className="text-gray-400">➝</div>
                <div className="font-semibold text-blue-600">THANH TOÁN</div>
                <div className="text-gray-400">➝</div>
                <div className="text-gray-400">HOÀN TẤT</div>
            </div>

            {/* Thông tin khách hàng */}
            <div className="rounded-lg border p-4 shadow-md">
                <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
                <p>👤 Họ tên: {customerName}</p>
                <p>📞 Số điện thoại: {customerPhone}</p>
                <p>📧 Email: {customerEmail}</p>
            </div>

            <div className="rounded-lg border p-4 shadow-md">
                <h2 className="text-xl font-semibold">Thông tin đặt chỗ</h2>
                <p>Người lớn: {adultCount}</p>
                <p>Trẻ em: {childCount}</p>
                <p>Em bé: {babyCount}</p>
                <p>Phòng đơn: {singleRoom ? 'Có' : 'Không'}</p>
                <p className="font-bold">Tổng tiền: {totalPrice.toLocaleString()} đ</p>
                <p>Phương thức thanh toán: {paymentMethod}</p>
            </div>
            <button
                onClick={() => navigate('/thanh-toan-thanh-cong')}
                className="w-full rounded px-4 py-2 font-semibold text-white shadow-md"
                style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
            >
                Xác nhận & Thanh toán
            </button>
        </div>
    );
};

export default PaymentConfirmation;
