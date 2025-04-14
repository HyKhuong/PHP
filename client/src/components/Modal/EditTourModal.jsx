import PropTypes from 'prop-types';

const EditTourModal = ({ isOpen, onClose, formData, onSubmit, onChange, isUpdating }) => {
    // Không hiển thị modal nếu isOpen là false
    if (!isOpen) return null;

    return (
        // Overlay nền đen mờ
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa Tour</h2>
                <form onSubmit={onSubmit}>
                    {/* Grid layout cho form inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <div className="space-y-2">
                            <label>Địa điểm</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

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

                    </div>

                    {/* Footer buttons */}
                    <div className="mt-6 flex justify-end gap-3">
                        {/* Nút Hủy - disable khi đang cập nhật */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            disabled={isUpdating}
                        >
                            Hủy bỏ
                        </button>

                        {/* Nút Submit với trạng thái loading */}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2"
                            disabled={isUpdating}
                        >
                            {isUpdating ? (
                                <>
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

// Khai báo PropTypes cho type checking
EditTourModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool
};

export default EditTourModal;
