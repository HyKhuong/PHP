import { useTable, usePagination, useSortBy } from 'react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

const TourTable = ({ data, columns }) => {
    console.log("Number of tours:", data.length);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        pageOptions,

        pageIndex,

    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 4 },
            pageIndex: 0
        },

        useSortBy,
        usePagination,

    );

    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-4">
                No tours available.
            </div>
        );
    }


    const totalPages = pageOptions.length; // Số trang
    console.log("pageIndex:", pageIndex, "totalPages:", totalPages);
    return (
        <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full table-auto">
                {/* Phần thead giữ nguyên */}
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200" key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="px-4 py-2 border text-left cursor-pointer"
                                    key={column.id}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <FaSortDown />
                                            ) : (
                                                <FaSortUp />
                                            )
                                        ) : (
                                            <FaSort />
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="border-b" key={row.id}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="px-4 py-2" key={cell.column.id}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Phần phân trang */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 px-4 py-2 bg-gray-100 rounded-md shadow-md">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>



                        <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

TourTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default TourTable;