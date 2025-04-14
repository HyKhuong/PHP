import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editUser, setEditUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost/server/public/auth/current-user"); // API endpoint for users
            if (response.data.status) {
                const data = response.data.data;
                // Ensure data is an array
                setUsers(Array.isArray(data) ? data : [data]);
            } else {
                setError("Không lấy được dữ liệu user");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            if (window.confirm("Bạn có chắc chắn muốn xóa user này?")) {
                const response = await axios.delete(`http://localhost/server/public/auth/${userId}`);
                if (response.data.status) {
                    setUsers(prev => prev.filter(user => user.user_id !== userId));
                    alert("Xóa user thành công");
                }
            }
        } catch (err) {
            alert("Xóa không thành công: " + err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditUser(user);
    };

    const handleCancelEdit = () => {
        setEditUser(null);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`http://localhost/server/public/auth/${editUser.user_id}`, {
                user_name: editUser.user_name,
                email: editUser.email,
            });
            if (response.data.status && response.data.data) {
                alert("Cập nhật thành công!");
                const updatedUser = response.data.data;
                setUsers(users.map(u =>
                    u.user_id === updatedUser.user_id ? updatedUser : u
                ));
                setEditUser(null);
            }
            
        } catch (err) {
            alert("Cập nhật không thành công: " + err.message);
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;

    const ActionCell = ({ user }) => (
        <div className="flex space-x-2">
            <button
                onClick={() => handleEditClick(user)}
                className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded"
            >
                Sửa
            </button>
            <button
                onClick={() => handleDelete(user.user_id)}
                className="px-3 py-1 text-red-600 hover:bg-red-100 rounded"
            >
                Xóa
            </button>
        </div>
    );

    ActionCell.propTypes = {
        user: PropTypes.shape({
            user_id: PropTypes.number.isRequired
        }).isRequired
    };

    const columns = [
        {
            Header: "ID",
            accessor: "user_id"
        },
        {
            Header: "Tên",
            accessor: "user_name"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Hành động",
            accessor: "user_id",
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => <ActionCell user={row.original} />
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-6">Quản Lý User</h1>

            {editUser && (
                <div className="mb-4 p-4 border rounded bg-gray-100">
                    <h3 className="mb-2 font-semibold">Chỉnh sửa thông tin người dùng</h3>
                    <div className="mb-2">
                        <label className="block">Họ và Tên:</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={editUser.user_name}
                            onChange={(e) =>
                                setEditUser({ ...editUser, user_name: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block">Email:</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={editUser.email}
                            onChange={(e) =>
                                setEditUser({ ...editUser, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Lưu
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}

            <table className="min-w-full border-collapse table-auto">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.Header} className="border p-2 text-left bg-gray-100">
                                {column.Header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_id}>
                            {columns.map((column) => (
                                <td key={column.Header} className="border p-2">
                                    {column.Cell ? column.Cell({ value: user[column.accessor], row: { original: user } }) : user[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
