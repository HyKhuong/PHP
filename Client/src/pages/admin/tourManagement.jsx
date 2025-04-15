import TourTable from '../../components/Table/DataTable.jsx';
import FilterPanel from '../../components/Filter/FilterPanel';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import EditTourModal from '../../components/Modal/EditTourModal';
import TourFormModal from '../../components/Modal/TourFormModal';

const TourManagementPage = () => {
    // ===== STATE MANAGEMENT =====
    // Lưu trữ danh sách locations từ API để liên kết khóa ngoại
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    // Lưu trữ toàn bộ dữ liệu tours
    const [tours, setTours] = useState([]);
    // Lọc dữ liệu tour theo trang thái hay tiêu chí tìm kiếm
    const [filteredData, setFilteredData] = useState([]);

    // State để quản lý loading (đang tải dữ liệu) và error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State để quản lý modal chỉnh sửa và dữ liệu tour được chọn
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        category_id: '',
        location_id: '',
        available: 0,
        start_date: '',
        end_date: '',
        status: 'Active',
    });

    // State báo cho người dùng khi đang cập nhật dữ liệu (ví dụ khi gửi form)
    const [isUpdating, setIsUpdating] = useState(false);

    // State để điều khiển modal thêm mới tour
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Dữ liệu mặc định cho form thêm tour mới
    const defaultFormData = {
        title: '',
        description: '',
        price: 0,
        category_id: '',
        location_id: '',
        available: 0,
        start_date: '',
        end_date: '',
        status: 'Active',
    };

    // Định nghĩa base URL cho API
    const API_URL = 'http://localhost/PHP/server/public';

    // ===== COMPONENT DEFINITIONS =====
    // ActionCell: hiển thị nút Edit và Delete cho mỗi hàng trong bảng
    const ActionCell = ({ row }) => (
        <div className="flex space-x-2">
            <button
                onClick={() => handleEdit(row.original.tour_id)}
                className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded"
            >
                Sửa
            </button>
            <button
                onClick={() => handleDelete(row.original.tour_id)}
                className="px-3 py-1 text-red-600 hover:bg-red-100 rounded"
            >
                Xóa
            </button>
        </div>
    );

    ActionCell.propTypes = {
        row: PropTypes.shape({
            original: PropTypes.shape({
                tour_id: PropTypes.number.isRequired
            }).isRequired
        }).isRequired
    };

    // ===== TABLE COLUMN CONFIGURATION =====
    const columns = [
        {
            Header: 'Tên Tour',
            accessor: 'title', // Lấy giá trị tên tour
        },
        {
            Header: 'Mô tả',
            accessor: 'description', // Hiển thị mô tả tour
        },
        {
            Header: 'Giá',
            accessor: 'price',
            Cell: ({ value }) => {
                // Format giá tiền theo định dạng VND
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(value)
            }
        },
        {
            Header: 'Loại tour',
            accessor: 'category_id',
            Cell: ({ value }) => {
                console.log('Row category_id:', value);
                const category = categories.find(cate => String(cate.category_id) === String(value));
                console.log('Matching category:', category);
                return category ? category.title : 'Unknown Category';
            }
        },
        {
            Header: 'Địa điểm',
            accessor: 'location_id', // Sử dụng khóa ngoại location_id
            Cell: ({ value }) => {
                console.log('Row location_id:', value);
                const location = locations.find(loc => String(loc.location_id) === String(value));
                console.log('Matching location:', location);
                return location ? location.title : 'Unknown Location';
            }
        },
        {
            Header: 'Sô chỗ trống',
            accessor: 'available', // Số chỗ trống của tour
        },
        {
            Header: 'Ngày bắt đầu',
            accessor: 'start_date',
            Cell: ({ value }) => {
                const date = new Date(value);
                return date.toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
        },
        {
            Header: 'Ngày kết thúc',
            accessor: 'end_date',
            Cell: ({ value }) => {
                const date = new Date(value);
                return date.toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
        },
        {
            Header: 'Trạng thái',
            accessor: 'status',
            // eslint-disable-next-line react/prop-types
            Cell: ({ value }) => (
                <span className={`px-2 py-1 rounded-full text-sm ${value === 'Active' ? 'bg-green-100 text-green-800' :
                    value === 'Inactive' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {value}
                </span>
            )
        },
        {
            Header: 'Hành động',
            accessor: 'tour_id',
            Cell: ActionCell // Hiển thị các nút hành động cho mỗi row
        },
    ];

    // ===== HANDLER FUNCTIONS =====
    // Xử lý xóa tour dựa theo tour_id
    const handleDelete = async (tourId) => {
        try {
            const confirmDelete = window.confirm('Bạn chắc chắn muốn xóa?');
            if (!confirmDelete) return;

            console.log('Client: Attempting to delete tour:', tourId);
            const response = await axios.delete(`${API_URL}/api/tours/${tourId}`);
            console.log('Client: Server response:', response.data);

            if (response.data.success) {
                console.log('Client: Delete successful');
                // Cập nhật state bằng cách loại bỏ tour đã xóa
                setTours(prev => prev.filter(tour => tour.tour_id !== tourId));
                setFilteredData(prev => prev.filter(tour => tour.tour_id !== tourId));
                alert('Xóa tour thành công');
            }
        } catch (error) {
            console.error('Client Error:', error.response || error);
            if (error.response?.status === 404) {
                alert("Tour không tồn tại");
            } else {
                alert("Lỗi server: " + (error.response?.data?.message || error.message));
            }
        }
    };

    // Lấy thông tin tour theo tour_id và hiển thị modal chỉnh sửa
    const handleEdit = async (tourId) => {
        try {
            const response = await axios.get(`${API_URL}/api/tour/${tourId}`);
            console.log('Tour data:', response.data);

            if (response.data && response.data.tours) {
                const tourData = response.data.tours;
                setSelectedTour(tourData);

                // Đảm bảo dữ liệu được format đúng
                setFormData({
                    ...tourData,
                    category_id: tourData.category_id.toString(),
                    location_id: tourData.location_id.toString(),
                    start_date: tourData.start_date.split('T')[0],
                    end_date: tourData.end_date.split('T')[0],
                    price: Number(tourData.price),
                    available: Number(tourData.available)
                });

                setIsEditModalOpen(true);
            } else {
                throw new Error('Invalid tour data format');
            }
        } catch (error) {
            console.error('Error fetching tour details:', error);
            alert('Không thể tải thông tin tour');
        }
    };

    // Xử lý submit form khi chỉnh sửa tour
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);
            const response = await axios.put(
                `${API_URL}/api/tours/${selectedTour?.tour_id}`,
                formData
            );

            if (response.data.success) {
                // Cập nhật state tours và filteredData trực tiếp
                const updatedTour = {
                    ...selectedTour,
                    ...formData,
                    tour_id: selectedTour.tour_id
                };

                setTours(prevTours =>
                    prevTours.map(tour =>
                        tour.tour_id === selectedTour.tour_id ? updatedTour : tour
                    )
                );

                setFilteredData(prevFiltered =>
                    prevFiltered.map(tour =>
                        tour.tour_id === selectedTour.tour_id ? updatedTour : tour
                    )
                );

                // Đóng modal và reset form
                setIsEditModalOpen(false);
                setFormData(defaultFormData);
                setSelectedTour(null);

                // Hiển thị thông báo thành công
                alert('Cập nhật tour thành công!');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert(`Lỗi: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };

    // Cập nhật dữ liệu form khi có thay đổi trên input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // Validate for positive numbers
        if (name === 'price' || name === 'available') {
            newValue = Math.max(0, Number(value));
        }

        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'available'
                ? Number(newValue)
                : value
        }));
    };

    // Lọc dữ liệu tour dựa theo lựa chọn của người dùng
    const handleFilterChange = selectedOption => {
        const safeTours = tours || []; // Đảm bảo tours không bao giờ là undefined
        if (selectedOption?.value) {
            setFilteredData(safeTours.filter(tour => tour?.status === selectedOption.value));
        } else {
            setFilteredData(safeTours);
        }
    };

    // Xử lý submit khi thêm tour mới
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);

            if (!formData.title || !formData.price || !formData.location_id) {
                throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
            }

            const response = await axios.post(`${API_URL}/api/tours`, formData);

            if (response.data.success) {
                // Thêm tour mới vào đầu danh sách
                const newTour = {
                    ...formData,
                    tour_id: response.data.tour_id // Giả sử API trả về ID của tour mới
                };

                setTours(prevTours => [newTour, ...prevTours]);
                setFilteredData(prevFiltered => [newTour, ...prevFiltered]);

                setIsAddModalOpen(false);
                setFormData(defaultFormData);
                alert('Thêm tour mới thành công!');
            }
        } catch (error) {
            console.error('Add new tour error:', error);
            alert(`Lỗi: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };

    // Mở modal thêm mới và reset dữ liệu form
    const handleAddNew = () => {
        setFormData({
            ...defaultFormData,
            category_id: categories.length > 0 ? categories[0].category_id : ''
        });
        setIsAddModalOpen(true);
    };

    // Xử lý file upload khi người dùng chọn file hình ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            axios.post(`${API_URL}/api/tours/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    if (response.data.success) {
                        // Cập nhật URL của hình ảnh được upload vào formData
                        setFormData(prev => ({
                            ...prev,
                            image_url: response.data.url
                        }));
                    } else {
                        alert('Upload hình ảnh thất bại');
                    }
                })
                .catch(error => {
                    console.error('Upload error:', error);
                    alert('Lỗi khi upload hình ảnh');
                });
        }
    };

    // ===== EFFECT HOOKS =====
    useEffect(() => {
        // Hàm fetchLocations lấy danh sách địa điểm từ API
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/locations`);
                if (response.data.success) {
                    console.log('Fetched locations:', response.data.data); // Ensure each location has the expected key
                    setLocations(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations(); // Gọi hàm lấy locations
    }, []);
    useEffect(() => {
        // Hàm fetchLocations lấy danh sách địa điểm từ API
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/categories`);
                if (response.data.success) {
                    console.log('Fetched locations:', response.data.data); // Ensure each location has the expected key
                    setCategories(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchCategory(); // Gọi hàm lấy locations
    }, []);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/api/tours`);
                console.log('Raw API Response:', response.data);

                if (response.data && Array.isArray(response.data.tours)) {
                    setTours(response.data.tours);
                    setFilteredData(response.data.tours);
                } else {
                    setError('Định dạng dữ liệu không hợp lệ');
                }
            } catch (error) {
                console.error('Error fetching tours:', error);
                setError('Không thể tải dữ liệu tours');
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    // ===== RENDER STATES =====
    // Hiển thị spinner nếu đang tải dữ liệu
    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    // Hiển thị thông báo lỗi nếu có lỗi từ API
    if (error) return (
        <div className="text-center text-red-600 p-4">
            Error: {error}
        </div>
    );

    // ===== RENDER COMPONENTS =====
    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quản lý Tour</h1>
                <p className="text-gray-600 mt-1">Quản lý thông tin và trạng thái các tour du lịch</p>
            </div>

            {/* Filter và Search Section */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FilterPanel onFilterChange={handleFilterChange} />
                    <button
                        onClick={handleAddNew}
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Thêm tour mới
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <TourTable data={filteredData || []} columns={columns} />
                </div>
            </div>

            {/* Modals */}
            <TourFormModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                formData={formData}
                onSubmit={handleAddSubmit}
                onChange={handleInputChange}
                isUpdating={isUpdating}
                modalTitle="Thêm Tour Mới"
                onFileChange={handleFileChange}
                locations={locations}
                categories={categories}
            />
            <EditTourModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                isUpdating={isUpdating}
                modalTitle="Chỉnh sửa Tour"
                onFileChange={handleFileChange}
                locations={locations}
                categories={categories}
            />

            {/* Hiển thị overlay khi đang cập nhật dữ liệu */}
            {isUpdating && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}
        </div>
    );
};

export default TourManagementPage;