import TourTable from '../../components/Table/DataTable.jsx';
import FilterPanel from '../../components/Filter/FilterPanel';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
            Cell: ({ value }) => `$${value}` // Hiển thị giá có ký hiệu $
        },
        {
            Header: 'Loại tour',
            accessor: 'category_id',
            Cell: ({ value }) => {
                
                const category = categories.find(cate => String(cate.category_id) === String(value));
                
                return category ? category.title : 'Unknown Category';
            }
        },
        {
            Header: 'Địa điểm',
            accessor: 'location_id', // Sử dụng khóa ngoại location_id
            Cell: ({ value }) => {
                
                const location = locations.find(loc => String(loc.location_id) === String(value));
                
                return location ? location.title : 'Unknown Location';
            }
        },
        {
            Header: 'Sô chỗ trống',
            accessor: 'available', // Số chỗ trống của tour
        },
        {
            Header: 'Ngày bắt đầu',
            accessor: 'start_date',
            Cell: ({ value }) => new Date(value).toLocaleDateString() // Format ngày
        },
        {
            Header: 'Ngày kết thúc',
            accessor: 'end_date',
            Cell: ({ value }) => new Date(value).toLocaleDateString() // Format ngày
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
            const response = await axios.delete(`http://localhost/server/public/tours/${tourId}`);
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
            const response = await axios.get(`http://localhost/server/public/tours/${tourId}`);
            if (response.data.status) {
                const tourData = response.data.data;
                setSelectedTour(tourData);
                // Format ngày (loại bỏ phần thời gian trong chuỗi ISO)
                setFormData({
                    ...tourData,
                    start_date: tourData.start_date.split('T')[0],
                    end_date: tourData.end_date.split('T')[0]
                });
                setIsEditModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching tour details:', error);
        }
    };

    // Xử lý submit form khi chỉnh sửa tour
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);  // Bắt đầu hiển thị trạng thái cập nhật
            const response = await axios.put(
                `http://localhost/server/public/tours/admin/${selectedTour?.tour_id}`,
                formData
            );
            console.log("api recive1:", formData);

            if (response.data.status) {
                setIsEditModalOpen(false);
                // Tạo hiệu ứng loading ngắn trước khi làm mới dữ liệu
                await new Promise(resolve => setTimeout(resolve, 1000));

                const refreshResponse = await axios.get('http://localhost/server/public/tours');
                if (refreshResponse.data.status) {
                    const toursData = refreshResponse.data.data;
                    setTours(toursData);
                    console.log("api recive2:", toursData);
                    setFilteredData(toursData);
                }
            }
        } catch (error) {
            console.error('Update error:', error);
            alert(`Lỗi: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsUpdating(false);  // Tắt loading sau khi hoàn thành
        }
    };

    // Cập nhật dữ liệu form khi có thay đổi trên input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'available'
                ? Number(value)
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

            // Kiểm tra dữ liệu bắt buộc trước khi gửi
            if (!formData.title || !formData.price || !formData.location_id) {
                throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
            }

            const response = await axios.post('http://localhost/server/public/tours', formData);

            if (response.data.status) {
                setIsAddModalOpen(false);
                // Hiệu ứng loading ngắn để làm mới dữ liệu
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Làm mới danh sách tour
                const refreshResponse = await axios.get('http://localhost/server/public/tours');
                if (refreshResponse.data.status) {
                    const toursData = refreshResponse.data.data;
                    setTours(toursData);
                    setFilteredData(toursData);
                }
                alert('Thêm tour mới thành công!');

                // Reset lại dữ liệu form
                setFormData(defaultFormData);
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

            axios.post('http://localhost/server/public/tours', formData, {
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
                const response = await axios.get('http://localhost/server/public/locations');
                if (response.data.status) {
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
                const response = await axios.get('http://localhost/server/public/categories');
                if (response.data.status) {
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
        // Hàm fetchTours lấy danh sách tours từ API và cập nhật state
        const fetchTours = async () => {
            try {
                const response = await axios.get('http://localhost/server/public/tours');
                if (response.data.status) {
                    const toursData = response.data.data;
                    console.log('Fetched tours:', toursData); // Ensure tour objects include location_id
                    setTours(toursData);
                    setFilteredData(toursData);
                }
            } catch (error) {
                setError('Failed to fetch tours');
                console.error('Error:', error);
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
        <div className="container mx-auto p-4">
            <FilterPanel onFilterChange={handleFilterChange} />
            {/* Modal thêm mới Tour */}
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
            {/* Modal chỉnh sửa Tour */}
            <TourFormModal
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

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Tour Management</h1>
                <button
                    onClick={handleAddNew}  // Mở modal thêm mới khi click
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Thêm tour mới
                </button>
            </div>
            {/* Hiển thị bảng Tour */}
            <TourTable data={filteredData || []} columns={columns} />

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
