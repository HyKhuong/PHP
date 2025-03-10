import { useState } from "react";

const Profile = () => {
    const [user, setUser] = useState({
        name: "Nguyễn Văn A",
        phone: "0123456789",
        email: "nguyenvana@example.com",
        birthdate: "1990-01-01",
        address: "Hà Nội, Việt Nam",
        avatar: "https://www.w3schools.com/w3images/avatar2.png",
    });

    const [activeTab, setActiveTab] = useState("edit");
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const history = [
        { date: "01/02/2023", tour: "Tour Đà Nẵng" },
        { date: "20/06/2022", tour: "Tour Hà Nội" },
        { date: "15/12/2021", tour: "Tour Sapa" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const handleSaveProfile = () => {
        alert("Thông tin đã được lưu!");
    };

    const handleChangePassword = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("Mật khẩu mới không trùng khớp!");
            return;
        }
        alert("Mật khẩu đã được cập nhật!");
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

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg border border-gray-300 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Thông tin cá nhân</h2>

            <div className="flex">
                {/* Cột bên trái */}
                <div className="w-1/3 border-r pr-6">
                    {/* Avatar */}
                    <label htmlFor="avatarInput" className="cursor-pointer block text-center">
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200 hover:opacity-80 transition-opacity"
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
                    <h3 className="text-center text-xl font-semibold mb-4">{user.name}</h3>

                    {/* Tabs */}
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => setActiveTab("edit")}
                            className={`py-2 text-center ${activeTab === "edit" ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                        >
                            Chỉnh sửa thông tin
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`py-2 text-center ${activeTab === "history" ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                        >
                            Lịch sử đặt tour
                        </button>
                    </div>

                </div>

                {/* Cột bên phải */}
                <div className="w-2/3 pl-6">
                    {/* Mục chỉnh sửa thông tin */}
                    {activeTab === "edit" && (
                        <div className="space-y-4">
                            {/* Thông tin cá nhân */}
                            {["name", "phone", "email", "birthdate", "address"].map((field, index) => (
                                <div key={index} className="flex items-center">
                                    <label htmlFor={field} className="w-1/3 font-semibold capitalize">
                                        {field === "birthdate" ? "Ngày sinh" : field.charAt(0).toUpperCase() + field.slice(1)}:
                                    </label>
                                    <input
                                        type={field === "birthdate" ? "date" : "text"}
                                        id={field}
                                        name={field}
                                        value={user[field]}
                                        onChange={handleChange}
                                        className="w-2/3 p-2 border border-gray-300"
                                    />
                                </div>
                            ))}

                            {/* Nút Lưu */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveProfile}
                                    className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition"
                                >
                                    Lưu thông tin
                                </button>
                            </div>

                            {/* Đổi mật khẩu */}
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-4">Đổi mật khẩu</h3>
                                <div className="space-y-3">
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        placeholder="Mật khẩu hiện tại"
                                        value={passwords.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border border-gray-300"
                                    />
                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="Mật khẩu mới"
                                        value={passwords.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border border-gray-300"
                                    />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Xác nhận mật khẩu mới"
                                        value={passwords.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border border-gray-300"
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleChangePassword}
                                            className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition"
                                        >
                                            Đổi mật khẩu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mục lịch sử đặt tour */}
                    {activeTab === "history" && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4">Lịch sử đặt tour</h3>
                            <div className="space-y-4">
                                {history.map((item, index) => (
                                    <div key={index} className="flex justify-between border-b py-2">
                                        <span className="font-semibold">{item.tour}</span>
                                        <span className="text-gray-600">{item.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
