import PropTypes from 'prop-types';
import Select from 'react-select';

const FilterPanel = ({ onFilterChange }) => {
    const filterOptions = [
        { value: '', label: 'Tất cả' },
        { value: 'Active', label: 'Đang mở' },
        { value: 'Inactive', label: 'Hết Hạn' },

    ];

    const handleChange = selectedOption => {
        onFilterChange(selectedOption);
    };

    return (
        <div className="mb-4">
            <Select
                options={filterOptions}
                onChange={handleChange}
                placeholder="Filter by Status"
            />
        </div>
    );
};

FilterPanel.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default FilterPanel;
