import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    useFilters,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from "react-table";

import { DeliveryColumns } from "./Columns";
import { v4 as uuidv4 } from "uuid";
import "./Table.scss";
import {
    newReportItem,
    updateDeliveryReportList,
} from "./deliveryReportListTableSlice";
import { FilterDate } from "components/Search";
import { MyCheckbox } from "components/validation/Validation";
import { getDeliveryReportList } from "redux/selectors";

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
    editableRowIndex,
}) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        updateMyData(index, id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return index === editableRowIndex ? (
        <input value={value} onChange={onChange} onBlur={onBlur} />
    ) : (
        <p>{value}</p>
    );
};

const defaultColumn = {
    Cell: EditableCell,
};

function DeliveryReportListTable({ setDelItems }) {
    const deliveryReportList = useSelector(getDeliveryReportList);

    const columns = useMemo(() => DeliveryColumns, []);
    const [data, setData] = useState([]);
    const [popperShow, setPopperShow] = useState(false);
    const [editableRowIndex, setEditableRowIndex] = React.useState(null);

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };
    const dispatch = useDispatch();

    const handleUpdateItem = (value) => {
        dispatch(updateDeliveryReportList(value));
    };

    const handleAddNewReportItem = (value) => {
        let newValue = { new: true, ...value };
        dispatch(newReportItem(newValue));
    };

    const tableInstanse = useTable(
        {
            columns,
            data,
            defaultColumn,
            updateMyData,
            editableRowIndex,
            setEditableRowIndex,
            handleAddNewReportItem,
            handleUpdateItem,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,

        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "selection",
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <MyCheckbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <MyCheckbox {...row.getToggleRowSelectedProps()} />
                        ),
                    },
                    ...columns,
                ];
            });
        }
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        rows,
        state,
        nextPage,
        pageOptions,
        canNextPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        setPageSize,
        previousPage,
        prepareRow,
        selectedFlatRows,
        allColumns,
        getToggleHideAllColumnsProps,
    } = tableInstanse;

    const { pageIndex, pageSize } = state;

    useEffect(() => {
        let res = selectedFlatRows.map((row) => row.original);
        setDelItems(res);
    }, [selectedFlatRows]);

    useEffect(() => {
        setData(deliveryReportList);
    }, [deliveryReportList]);

    return (
        <div className="deliveryReportTable">
            <Table className="table-hover table-striped" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            key={uuidv4()}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    <div className="columnHeader">
                                        {column.render("Header") ===
                                        "Created At" ? (
                                            <>
                                                <span
                                                    onClick={() =>
                                                        setPopperShow(
                                                            !popperShow
                                                        )
                                                    }
                                                    className="iconFilter"
                                                >
                                                    <i className="fas fa-filter"></i>
                                                </span>
                                                {popperShow ? (
                                                    <div className="popperDate">
                                                        <span
                                                            className="iconFilter"
                                                            onClick={() =>
                                                                setPopperShow(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <i
                                                                style={{
                                                                    fontSize: 12,
                                                                    color: "#2196f3",
                                                                }}
                                                                className="fas fa-filter"
                                                            ></i>
                                                        </span>
                                                        <div className="box">
                                                            <FilterDate />
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </>
                                        ) : null}

                                        <div {...column.getSortByToggleProps()}>
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <span>
                                                            <i className="fas fa-sort-amount-up"></i>
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <i className="fas fa-sort-amount-up-alt"></i>
                                                        </span>
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr key={uuidv4()} {...row.getRowProps}>
                                {row.cells.map((cell, i) => {
                                    return (
                                        <td
                                            key={uuidv4()}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className="paginate">
                <span>
                    Page
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <span>
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const pageNumber = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(pageNumber);
                        }}
                        style={{ width: 50 }}
                    />
                </span>
                <select
                    style={{ height: 30 }}
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 15, 20].map((pageSize) => (
                        <option key={uuidv4()} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <div className="groupBtn">
                    <Button
                        size="sm"
                        className="btn btn-fill"
                        variant="primary"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        <i className="fas fa-angle-double-left"></i>
                    </Button>
                    <Button
                        style={{ marginRight: "5px" }}
                        size="sm"
                        className="btn btn-fill"
                        variant="primary"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        <i className="fas fa-angle-left"></i>
                    </Button>

                    <Button
                        size="sm"
                        className="btn btn-fill"
                        variant="primary"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </Button>
                    <Button
                        size="sm"
                        className="btn btn-fill"
                        variant="primary"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        <i className="fas fa-angle-double-right"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DeliveryReportListTable;
