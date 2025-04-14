
import PropTypes from 'prop-types';

const UserTable = ({ data, columns }) => {
    return (
        <table className="min-w-full border">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index} className="border p-2">{col.Header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {columns.map((col, i) => (
                            <td key={i} className="border p-2">
                                {col.Cell ? col.Cell({ value: row[col.accessor], row }) : row[col.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

UserTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default UserTable;