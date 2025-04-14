import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({
        user_id: null,
        name: '',
        phone: '',
        email: '',
        birthdate: '',
        address: '',
        avatar: 'https://www.w3schools.com/w3images/avatar2.png',
    });

    const [activeTab, setActiveTab] = useState('edit');
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [data, setData] = useState({ bookings: [], tours: [] });

    const fetchUserData = async () => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const storedEmail = parsedUser.email;

                const response = await axios.get('http://localhost/server/public/auth/current-user');
                console.log('user:', response.data);

                if (Array.isArray(response.data.data)) {
                    const foundUser = response.data.data.find((u) => u.email === storedEmail);

                    if (foundUser) {
                        setUser({
                            user_id: foundUser.user_id,
                            name: foundUser.user_name,
                            email: foundUser.email,
                            address: foundUser.address,
                            phone: foundUser.phone_number,
                            birthdate: foundUser.dob ? new Date(foundUser.dob).toISOString().split('T')[0] : '',
                            avatar: foundUser.avatar || user.avatar,
                        });

                        setPasswords((prev) => ({
                            ...prev,
                            currentPassword: foundUser.password,
                        }));
                    } else {
                        console.log('User not found');
                    }
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    const fetchBooking = async () => {
        try {
            if (!user.user_id) {
                console.error('User ID is null, cannot fetch bookings.');
                return;
            }

            const response = await axios.get(`http://localhost/server/public/booking/users/${user.user_id}`);
            console.log('bookings:', response.data);

            if (Array.isArray(response.data.data)) {
                setData((prev) => ({ ...prev, bookings: response.data.data }));
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const fetchTours = async () => {
        try {
            if (!data.bookings.length) {
                console.error('No bookings available to fetch tours.');
                return;
            }

            const tourIds = data.bookings.map((booking) => booking.tour_id);

            const responses = await Promise.all(tourIds.map((id) => axios.get(`http://localhost/server/public/tours/${id}`)));
            console.log(
                'tour:',
                responses.map((res) => res.data)
            );

            const allTours = responses.flatMap((response) => response.data.data);
            console.log('alltour:', allTours);

            setData((prev) => ({ ...prev, tours: allTours }));
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (user.user_id) {
            fetchBooking();
        }
    }, [user]);

    useEffect(() => {
        if (data.bookings.length > 0) {
            fetchTours();
        }
    }, [data.bookings]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        if (tab === 'edit') {
            fetchUserData(); // Refresh user data when switching to edit tab
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dob = new Date(formData.get('birthdate')).toISOString().split('T')[0];
        const updatedUser = {
            name: formData.get('name'),
            phone_number: formData.get('phone'),
            dob: dob,
            address: formData.get('address'),
            email: formData.get('email'),
            avatar: user.avatar,
        };

        console.log('Sending updated user data:', updatedUser);

        try {
            const response = await axios.put(`http://localhost/server/public/auth/${user.user_id}`, 
                updatedUser);

            if (response.data && response.data.data) {
                setUser(response.data.data);
                alert('Thông tin đã được cập nhật thành công!');
                window.location.reload();
            } else {
                alert('Lỗi: Không thể cập nhật thông tin.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
        }
    };

    const SaveChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert('Mật khẩu mới không trùng khớp!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/users/change-password', {
                user_id: user.user_id,
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });
            if (response.data.success) {
                alert('Mật khẩu đã được cập nhật thành công!');
                setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                alert('Lỗi: ' + response.data.message);
            }
        } catch (error) {
            console.error('Lỗi khi đổi mật khẩu:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser((prevUser) => ({
                    ...prevUser,
                    avatar: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="mx-auto max-w-5xl rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-center text-3xl font-bold">Thông tin cá nhân</h2>

            <div className="flex">
                {/* Cột bên trái */}
                <div className="w-1/3 border-r pr-6">
                    {/* Avatar */}
                    <label
                        htmlFor="avatarInput"
                        className="block cursor-pointer text-center"
                    >
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-gray-200 object-cover transition-opacity hover:opacity-80"
                        />
                        <input
                            type="file"
                            id="avatarInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </label>

                    {/* Tên user */}
                    <h3 className="mb-4 text-center text-xl font-semibold">{user.name}</h3>

                    {/* Tabs */}
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => handleTabChange('edit')}
                            className={`py-2 text-center ${activeTab === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Chỉnh sửa thông tin
                        </button>
                        <button
                            onClick={() => handleTabChange('history')}
                            className={`py-2 text-center ${activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Lịch sử đặt tour
                        </button>
                    </div>
                </div>

                {/* Cột bên phải */}
                <div className="w-2/3 pl-6">
                    {/* Mục chỉnh sửa thông tin */}
                    {activeTab === 'edit' && (
                        <div className="space-y-4">
                            {/* Thông tin cá nhân */}
                            <form
                                onSubmit={handleSaveProfile}
                                className="space-y-4"
                            >
                                {['name', 'phone', 'email', 'birthdate', 'address'].map((field, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <label
                                            htmlFor={field}
                                            className="w-1/3 font-semibold capitalize"
                                        >
                                            {field === 'birthdate' ? 'Ngày sinh' : field.charAt(0).toUpperCase() + field.slice(1)}:
                                        </label>
                                        <input
                                            type={field === 'birthdate' ? 'date' : 'text'}
                                            id={field}
                                            name={field}
                                            defaultValue={user[field]}
                                            className="w-2/3 border border-gray-300 p-2"
                                        />
                                    </div>
                                ))}

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                                    >
                                        Lưu thông tin
                                    </button>
                                </div>
                            </form>

                            {/* Đổi mật khẩu */}
                            <div className="mt-6">
                                <h3 className="mb-4 text-xl font-semibold">Đổi mật khẩu</h3>
                                <form
                                    onSubmit={SaveChangePassword}
                                    className="space-y-3"
                                >
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        placeholder="Mật khẩu hiện tại"
                                        value={passwords.currentPassword}
                                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                        className="w-full border border-gray-300 p-2"
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="Mật khẩu mới"
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                        className="w-full border border-gray-300 p-2"
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Xác nhận mật khẩu"
                                        value={passwords.confirmPassword}
                                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                        className="w-full border border-gray-300 p-2"
                                        required
                                    />

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                                        >
                                            Đổi mật khẩu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Mục lịch sử đặt tour */}
                    {activeTab === 'history' && (
                        <div className="mt-6">
                            <h3 className="mb-4 text-xl font-semibold">Lịch sử đặt tour</h3>
                            <div className="space-y-4">
                                {data.bookings.length > 0 ? (
                                    (() => {
                                        const tourMap = new Map(data.tours.map((tour) => [tour.tour_id, tour])); // Convert to Map for fast lookup

                                        return (
                                            <table className="min-w-full border border-gray-200 bg-white">
                                                <thead>
                                                    <tr className="border-b bg-gray-100">
                                                        <th className="p-2 text-left">Id</th>
                                                        <th className="p-2 text-left">Tour</th>
                                                        <th className="p-2 text-left">Booking Date</th>
                                                        <th className="p-2 text-left">People</th>
                                                        <th className="p-2 text-left">Total Price</th>
                                                        <th className="p-2 text-left">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.bookings.map((booking, index) => {
                                                        const tour = tourMap.get(booking.tour_id);
                                                        const statusColors = {
                                                            Pending: 'bg-yellow-400 text-black',
                                                            Cancelled: 'bg-red-500 text-white',
                                                            Confirmed: 'bg-blue-500 text-white',
                                                        };

                                                        const statusColor = statusColors[booking.status] || 'bg-neutral-400 text-green-600';
                                                        const handleRowClick = () => {
                                                            if (booking.status !== "Confirmed") {
                                                                navigate(`/payment_confirmation/`, { state: booking });
                                                              }
                                                        };
                                                        return (
                                                            <tr
                                                                key={index}
                                                                className="border-b"
                                                                onClick={handleRowClick}
                                                            >
                                                                <td className="p-2 font-semibold">{booking.booking_id}</td>
                                                                <td className="p-2">{tour ? tour.title : 'Tour không xác định'}</td>
                                                                <td className="p-2 text-center text-gray-600">
                                                                    {new Date(booking.booking_date).toLocaleDateString()}
                                                                </td>
                                                                <td className="p-2 text-center text-gray-600">{booking.number_of_people}</td>
                                                                <td className="p-2 text-red-500">
                                                                    {Number(booking.total_price).toLocaleString('vi-VN')}VNĐ
                                                                </td>
                                                                <td className="p-2">
                                                                    <span
                                                                        className={`rounded-lg px-3 py-1 font-semibold ${statusColor} ${
                                                                            booking.status === 'Confirmed'
                                                                                ? 'cursor-not-allowed opacity-70 select-none'
                                                                                : 'cursor-pointer'
                                                                        }`}
                                                                    >
                                                                        {booking.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        );
                                    })()
                                ) : (
                                    <p className="text-gray-500">Không có lịch sử đặt tour nào.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
