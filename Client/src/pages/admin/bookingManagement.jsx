import { useState, useEffect } from "react";
import axios from "axios";


const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost/server/public/booking"); // Updated endpoint
                if (response.data.status) {
                    setBookings(response.data.data);
                } else {
                    setError("Không lấy được dữ liệu booking");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/bookings/updateStatus/${bookingId}`, {
                status: newStatus
            });

            if (response.data.success) {
                setBookings(bookings.map(booking =>
                    booking.booking_id === bookingId
                        ? { ...booking, status: newStatus }
                        : booking
                ));
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Không thể cập nhật trạng thái");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const columns = [
        { header: 'Booking ID', accessor: 'booking_id' },
        { header: 'User ID', accessor: 'user_id' },
        { header: 'Tour ID', accessor: 'tour_id' },
        { header: 'Booking Date', accessor: 'booking_date' },
        { header: 'Number of People', accessor: 'number_of_people' },
        { header: 'Total Price', accessor: 'total_price' },
        { header: 'Status', accessor: 'status' },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: ({ booking }) => (
                <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.booking_id, e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            )
        }
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý Booking</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor} className="p-2 border-b">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.booking_id}>
                            {columns.map((column) => (
                                <td key={`${booking.booking_id}-${column.accessor}`} className="p-2 border-b">
                                    {column.cell
                                        ? column.cell({ booking })
                                        : column.accessor === 'booking_date'
                                            ? new Date(booking[column.accessor]).toLocaleDateString()
                                            : column.accessor === 'total_price'
                                                ? `${booking[column.accessor].toLocaleString()}đ`
                                                : booking[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingManagement;
