import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

import { useTheme } from "@/hooks/use-theme";

import { Footer } from "../../components/dashboard/footer";

import { CreditCard, DollarSign, Package, Users } from "lucide-react";

const DashboardPage = () => {
    const { theme } = useTheme();
    const [stats, setStats] = useState({
        totalTours: 0,
        totalUsers: 0,
        totalBookings: 0,
        totalRevenue: 0
    });
    const [chartData, setChartData] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [topTours, setTopTours] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [toursRes, usersRes, bookingsRes] = await Promise.all([
                    axios.get('http://localhost/PHP/server/public/api/tours'),
                    axios.get('http://localhost/PHP/server/public/api/users'),
                    axios.get('http://localhost/PHP/server/public/api/bookings')
                ]);

                const totalRevenue = bookingsRes.data.bookings.reduce((sum, booking) =>
                    sum + Number(booking.total_price), 0);

                setStats({
                    totalTours: toursRes.data.tours.length,
                    totalUsers: usersRes.data.users.length,
                    totalBookings: bookingsRes.data.bookings.length,
                    totalRevenue: totalRevenue
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('http://localhost/PHP/server/public/api/bookings');
                if (response.data && Array.isArray(response.data.bookings)) {
                    const dailyStats = response.data.bookings.reduce((acc, booking) => {
                        const date = new Date(booking.booking_date).toLocaleDateString();

                        if (!acc[date]) {
                            acc[date] = {
                                name: date,
                                total: 0,
                                bookings: 0
                            };
                        }
                        acc[date].total += Number(booking.total_price);
                        acc[date].bookings += 1;
                        return acc;
                    }, {});

                    const sortedData = Object.values(dailyStats).sort((a, b) =>
                        new Date(a.name) - new Date(b.name)
                    );

                    setChartData(sortedData);
                }
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
    }, []);

    useEffect(() => {
        const fetchRecentBookings = async () => {
            try {
                const response = await axios.get('http://localhost/PHP/server/public/api/bookings');
                if (response.data && Array.isArray(response.data.bookings)) {
                    const bookingsWithDetails = await Promise.all(
                        response.data.bookings.map(async (booking) => {
                            try {
                                const [userResponse, tourResponse] = await Promise.all([
                                    axios.get(`http://localhost/PHP/server/public/api/users/${booking.user_id}`),
                                    axios.get(`http://localhost/PHP/server/public/api/tour/${booking.tour_id}`)
                                ]);

                                return {
                                    ...booking,
                                    user_name: userResponse.data.user?.user_name || 'Unknown User',
                                    tour_name: tourResponse.data.tours?.title || 'Unknown Tour',
                                    image: '/default-avatar.png'
                                };
                            } catch (error) {
                                console.error('Error fetching booking details:', error);
                                return null;
                            }
                        })
                    );

                    const validBookings = bookingsWithDetails
                        .filter(booking => booking !== null)
                        .sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date))
                        .slice(0, 5);

                    setRecentBookings(validBookings);
                }
            } catch (error) {
                console.error('Error fetching recent bookings:', error);
            }
        };

        fetchRecentBookings();
    }, []);

    useEffect(() => {
        const fetchTopTours = async () => {
            try {
                const [bookingsRes, toursRes] = await Promise.all([
                    axios.get('http://localhost/PHP/server/public/api/bookings'),
                    axios.get('http://localhost/PHP/server/public/api/tours')
                ]);

                const tourBookings = bookingsRes.data.bookings.reduce((acc, booking) => {
                    acc[booking.tour_id] = (acc[booking.tour_id] || 0) + 1;
                    return acc;
                }, {});

                const toursWithBookingCount = toursRes.data.tours
                    .map(tour => ({
                        ...tour,
                        bookingCount: tourBookings[tour.tour_id] || 0,
                        revenue: bookingsRes.data.bookings
                            .filter(b => b.tour_id === tour.tour_id)
                            .reduce((sum, b) => sum + Number(b.total_price), 0)
                    }))
                    .sort((a, b) => b.bookingCount - a.bookingCount)
                    .slice(0, 5);

                setTopTours(toursWithBookingCount);
            } catch (error) {
                console.error('Error fetching top tours:', error);
            }
        };

        fetchTopTours();
    }, []);

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Package size={26} />
                        </div>
                        <p className="card-title">Total Tours</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {stats.totalTours}
                        </p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Users size={26} />
                        </div>
                        <p className="card-title">Total Users</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {stats.totalUsers}
                        </p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <CreditCard size={26} />
                        </div>
                        <p className="card-title">Total Bookings</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {stats.totalBookings}
                        </p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <DollarSign size={26} />
                        </div>
                        <p className="card-title">Total Revenue</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(stats.totalRevenue)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">Doanh thu & Số lượng đặt tour theo ngày</p>
                    </div>
                    <div className="card-body p-0">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart
                                data={chartData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                />
                                <YAxis
                                    yAxisId="left"
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickFormatter={(value) => `${value.toLocaleString()} VND`}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickFormatter={(value) => `${value} đơn`}
                                />
                                <Tooltip
                                    formatter={(value, name) => {
                                        if (name === 'total') return [`${value.toLocaleString()} VND`, 'Doanh thu'];
                                        return [`${value} đơn`, 'Số đơn'];
                                    }}
                                />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    fill="url(#colorTotal)"
                                    name="total"
                                />
                                <Area
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="bookings"
                                    stroke="#10b981"
                                    fill="url(#colorBookings)"
                                    name="bookings"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="card-header">
                        <p className="card-title">Thông tin người đã đặt tour</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {recentBookings.map((booking) => (
                            <div
                                key={booking.booking_id}
                                className="flex items-center justify-between gap-x-4 py-2 pr-2"
                            >
                                <div className="flex items-center gap-x-4">
                                    <img
                                        src={booking.image}
                                        alt={booking.user_name}
                                        className="size-10 flex-shrink-0 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col gap-y-1">
                                        <p className="font-medium text-slate-900 dark:text-slate-50">
                                            {booking.user_name}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {booking.tour_name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(booking.booking_date).toLocaleDateString('vi-VN', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })} -
                                            {booking.number_of_people} người
                                        </p>
                                    </div>
                                </div>
                                <p className="font-medium text-slate-900 dark:text-slate-50">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(booking.total_price)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Top Tours Được Đặt Nhiều Nhất</p>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">#</th>
                                    <th className="table-head">Tour</th>
                                    <th className="table-head">Giá</th>
                                    <th className="table-head">Số lượt đặt</th>
                                    <th className="table-head">Doanh thu</th>
                                    <th className="table-head">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {topTours.map((tour, index) => (
                                    <tr key={tour.tour_id} className="table-row">
                                        <td className="table-cell">{index + 1}</td>
                                        <td className="table-cell">
                                            <div className="flex flex-col">
                                                <p className="font-medium">{tour.title}</p>
                                                <p className="text-sm text-gray-500">{tour.description}</p>
                                            </div>
                                        </td>
                                        <td className="table-cell">{new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(tour.price)}</td>
                                        <td className="table-cell">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                {tour.bookingCount} lượt
                                            </span>
                                        </td>
                                        <td className="table-cell">{new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(tour.revenue)}</td>
                                        <td className="table-cell">
                                            <span className={`px-2 py-1 rounded-full ${tour.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {tour.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;