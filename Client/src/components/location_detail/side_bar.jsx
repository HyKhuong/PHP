import { useState } from "react";
import PropTypes from "prop-types";

const Sidebar = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
  };

  const handleSummit = () => {
    onSortChange(sortOption);
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-md w-64">
      <h2 className="text-lg font-semibold">BỘ LỌC TÌM KIẾM</h2>

      {/* Sorting Options */}
      <div className="mt-4">
        <label className="block text-gray-700">Sắp xếp theo:</label>
        <select
          className="mt-1 w-full rounded border p-2"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Mặc định</option>
          <option value="title">Tên (A-Z)</option>
          <option value="price">Giá (Thấp đến Cao)</option>
          <option value="duration">Thời gian (Ngắn đến Dài)</option>
        </select>
      </div>

      <button
        className="mt-4 w-full rounded bg-gradient-to-r from-[#89A5C7] to-[#AFD7E6] py-2 font-semibold text-white shadow-md"
        onClick={handleSummit}
      >
        Áp dụng
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  onSortChange: PropTypes.func.isRequired, 
};

export default Sidebar;
