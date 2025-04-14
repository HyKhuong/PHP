import PropTypes from 'prop-types';

const TourFormModal = ({ isOpen, onClose, formData, onSubmit, onChange, isUpdating, modalTitle, locations = [], categories = [] }) => {
    // Nếu modal không mở thì trả về null (không render gì)

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-55 flex items-center justify-center p-4">
            {/* Container Modal */}
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tên tour */}
                        <div className="space-y-2">
                            <label>Tên tour</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Giá tour */}
                        <div className="space-y-2">
                            <label>Giá (VND)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Địa điểm (dành cho khóa ngoại hoặc tên địa điểm) */}
                        <div className="space-y-2">
                            <label>Địa điểm</label>
                            <select
                                name="location_id"
                                value={formData.location_id}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="" disabled>Chọn địa điểm</option> {/* Placeholder */}
                                {locations.map(loc => (
                                    <option key={loc.location_id} value={loc.location_id}>
                                        {loc.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label>Loại Tour</label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="" disabled>Chọn loại tour</option> {/* Updated placeholder */}
                                {categories.map(cate => (
                                    <option key={cate.category_id} value={cate.category_id}>
                                        {cate.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Số chỗ trống */}
                        <div className="space-y-2">
                            <label>Số chỗ trống</label>
                            <input
                                type="number"
                                name="available"
                                value={formData.available}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Ngày bắt đầu */}
                        <div className="space-y-2">
                            <label>Ngày bắt đầu</label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Ngày kết thúc */}
                        <div className="space-y-2">
                            <label>Ngày kết thúc</label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Trạng thái hoạt động của tour */}
                        <div className="space-y-2">
                            <label>Trạng thái</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="Active">Hoạt động</option>
                                <option value="Inactive">Ngừng hoạt động</option>
                            </select>
                        </div>

                        {/* Mô tả chi tiết của tour */}
                        <div className="space-y-2 col-span-2">
                            <label>Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                                className="w-full p-2 border rounded h-32"
                                required
                            />
                        </div>

                        {/* Upload hình ảnh (tùy chọn) */}
                        <div className="space-y-2 col-span-2">
                            <label>Upload Hình ảnh</label>
                            <input
                                type="url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                placeholder="Nhập URL hình ảnh"
                            />
                        </div>
                    </div>

                    {/* Các nút hành động: Hủy và Submit */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            disabled={isUpdating}
                        >
                            Hủy bỏ
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2"
                            disabled={isUpdating}
                        >
                            {isUpdating ? (
                                <>
                                    {/* Spinner khi đang cập nhật */}
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Đang lưu...</span>
                                </>
                            ) : (
                                'Lưu thay đổi'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

TourFormModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,        // Kiểm soát hiển thị modal
    onClose: PropTypes.func.isRequired,         // Hàm đóng modal
    formData: PropTypes.object.isRequired,      // Dữ liệu form của tour
    onSubmit: PropTypes.func.isRequired,        // Hàm xử lý submit form
    onChange: PropTypes.func.isRequired,        // Hàm cập nhật dữ liệu khi nhập
    isUpdating: PropTypes.bool,                 // Trạng thái loading khi cập nhật
    modalTitle: PropTypes.string.isRequired,    // Tiêu đề modal
    onFileChange: PropTypes.func.isRequired,   // Hàm xử lý khi upload file
    locations: PropTypes.array,
    categories: PropTypes.array             // Danh sách địa điểm
};

export default TourFormModal;