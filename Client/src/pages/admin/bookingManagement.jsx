import { useState, useEffect } from "react";
import axios from "axios";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost/PHP/server/public/api/bookings');
                console.log('Raw API Response:', response.data);

                if (response.data && Array.isArray(response.data.bookings)) {
                    const bookingsWithDetails = await Promise.all(
                        response.data.bookings.map(async (booking) => {
                            try {
                                // Corrected API endpoint URL
                                const userResponse = await axios.get(`http://localhost/PHP/server/public/api/users/${booking.user_id}`);
                                console.log('User Response:', userResponse.data);

                                // Fetch tour details
                                const tourResponse = await axios.get(`http://localhost/PHP/server/public/api/tour/${booking.tour_id}`);
                                console.log('Tour Response:', tourResponse.data);

                                // Trích xuất dữ liệu từ response
                                const userName = userResponse.data.user?.user_name;
                                const tourTitle = tourResponse.data.tours?.title;


                                if (!userName || !tourTitle) {
                                    throw new Error('Missing user or tour data');
                                }

                                return {
                                    ...booking,
                                    user_name: userName,
                                    tour_name: tourTitle
                                };
                            } catch (error) {
                                console.error(`Error fetching details for booking ${booking.booking_id}:`, error);
                                return {
                                    ...booking,
                                    user_name: `User ${booking.user_id}`,
                                    tour_name: `Tour ${booking.tour_id}`
                                };
                            }
                        })
                    );
                    setBookings(bookingsWithDetails);
                    setError(null);
                } else {
                    throw new Error('Invalid booking data format');
                }
            } catch (error) {
                console.error('Error in fetchBookings:', error);
                setError(error.message || 'Không thể tải dữ liệu bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const response = await axios.put(`http://localhost/PHP/server/public/api/bookings/${bookingId}/status`, {
                status: newStatus
            });

            if (response.data.success) {
                setBookings(bookings.map(booking =>
                    booking.booking_id === bookingId
                        ? { ...booking, status: newStatus }
                        : booking
                ));
                alert('Cập nhật trạng thái thành công');
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Không thể cập nhật trạng thái: " + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const columns = [
        { header: 'Booking ID', accessor: 'booking_id' },
        { header: 'Tên khách hàng', accessor: 'user_name' },
        { header: 'Tên Tour', accessor: 'tour_name' },
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
