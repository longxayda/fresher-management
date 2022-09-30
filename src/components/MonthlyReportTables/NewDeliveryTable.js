import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from "react-table";
import "./NewDeliveryReport.scss";
import { AddNewReportModal } from "components/ReportModal/ReportModal";
import { GlobalFilter } from "components/Search";
import { MyCheckbox } from "components/validation/Validation";
import { NewDeliveryColumns } from "./Columns";
import { v4 as uuidv4 } from "uuid";
import { getDeliveryClassesInfo } from "redux/selectors";
function NewDeliveryReportTable({ setDelItems }) {
    const dispatch = useDispatch();
    const columns = useMemo(() => NewDeliveryColumns, []);
    const [data, setData] = useState([]);

    const deliveryClassInfo = useSelector(getDeliveryClassesInfo);
    console.log(deliveryClassInfo);
    const [modalShow, setModalShow] = useState(false);
    const tableInstanse = useTable(
        { columns, data, setModalShow, initialState: { pageIndex: 0 } },
        useGlobalFilter,
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
        prepareRow,
        selectedFlatRows,
        allColumns,
        getToggleHideAllColumnsProps,
        setGlobalFilter,
    } = tableInstanse;

    const { globalFilter } = state;

    useEffect(() => {
        let res = selectedFlatRows.map((row) => row.original);
        setDelItems(res);
    }, [selectedFlatRows]);
    useEffect(() => {
        setData(deliveryClassInfo);
    }, [deliveryClassInfo]);
    return (
        <div className="monthlyTable">
            <div className="actionBtn">
                <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                />
            </div>
            {modalShow && (
                <AddNewReportModal
                    data={data}
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    recordItem={recordItem}
                    classId={classId}
                />
            )}
            <Table className="table-hover table-striped" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            key={uuidv4()}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column) => (
                                <th
                                    key={uuidv4()}
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
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
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr key={uuidv4()} {...row.getRowProps}>
                                {row.cells.map((cell) => {
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
        </div>
    );
}

export default NewDeliveryReportTable;
