import React from "react";
import { useEffect, useRef } from "react";
import ModalDeletePenalty from "components/ManagementPenalty/Modal/ModalDeletePenalty.js";
import ModalUpdatePenalty from "components/ManagementPenalty/Modal/ModalUpdatePenalty.js";
import NotificationAlert from "react-notification-alert";
import {
    useTable,
    usePagination,
    useGlobalFilter,
    useSortBy,
    useFilters,
    useRowSelect
} from "react-table";

import { Table, Input } from "reactstrap";
import {
    Card,
    Row,
    Col,
    Button,
    Container,
} from "react-bootstrap";
import { useState } from "react";

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length;

    return (
        <Form.Group className="mb-0">
            <Form.Control
                onClick={(e) => e.stopPropagation()}
                type="search"
                value={filterValue || ""}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
                placeholder={`Search ${count} records...`}
            ></Form.Control>
        </Form.Group>
    );
}

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} style={{ transform: 'scale(1.3)' }} />
            </>
        );
    }
);

function WrapTable({ columns, data, setSelectedRows }) {
    const defaultColumn = React.useMemo(() => ({
        Filter: DefaultColumnFilter,
    }), []);
    const props = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        page,

        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    } = props;

    useEffect(() => {
        setSelectedRows(selectedFlatRows.map((row) => (row.original)));
    }, [setSelectedRows, selectedFlatRows]);

    return (
        <>
            <Container style={{ marginTop: "20px" }} fluid >
                <Row>
                    <Card className="strpied-tabled-with-hover px-0" >
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                >
                                                    <div
                                                        className="heading"
                                                        style={{
                                                            fontSize: "14px",
                                                            textTransform: "uppercase",
                                                            color: "black",
                                                            fontWeight: "bold",
                                                            borderTop: "none!important",
                                                            borderBottom: "none",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {column.render("Header")}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? ' 🔽'
                                                                    : ' 🔼'
                                                                : ''}
                                                        </span>
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
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td {...cell.getCellProps()}
                                                        >
                                                            {
                                                                cell.render("Cell")
                                                            }
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="table-paging m-2 d-flex align-items-center">
                    <Col>
                        <Container fluid
                            className="pagination d-flex align-items-center justify-content-center"
                        >
                            <Button
                                className="btn-fill btn-sm m-1"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                {"<<"}
                            </Button>
                            <Button
                                className="btn-fill btn-sm m-1"
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                {"<"}
                            </Button>
                            <Button
                                className="btn-fill btn-sm m-1"
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                {">"}
                            </Button>
                            <Button
                                className="btn-fill btn-sm m-1"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                {">>"}
                            </Button>
                            <span className="mr-3 ml-5" style={{ marginRight: "10px" }}>
                                Page <strong> {pageIndex + 1}  </strong>
                                of <strong> {pageOptions.length} </strong>{" "}
                            </span>
                            <span className="mr-3 ml-5" style={{ marginRight: "10px" }}>
                                Go to page: {" "}
                                <Input
                                    type="number"
                                    className="d-inline"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(page);
                                    }}
                                    style={{ width: "100px" }}
                                    min="1"
                                    max={pageOptions.length}
                                />
                            </span>{" "}
                            <Input
                                type="select"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                                style={{ width: "100px" }}
                            >
                                {[5, 10, 20].map((pageSize) => (
                                    <option key={pageSize} value={pageSize} >
                                        Show {pageSize}
                                    </option>
                                ))}
                            </Input>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

function TableDetail({ userId, listBonusPenalty, setSelectedRows }) {

    const columns = React.useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'stt',
            },
            {
                Header: 'DATE',
                accessor: 'date',
            },
            {
                Header: 'MODIFIED',
                accessor: 'modified',
            },
            {
                Header: 'TYPE',
                accessor: 'type',
                Cell: s => (
                    <span className={s.value == 'Bonus' ? 'badge bg-success fontType' : 'badge bg-danger fontType'}>
                        {s.value}
                    </span>
                )
            },
            {
                Header: 'SCORE',
                accessor: 'score',
                disableSortBy: true,
            },
            {
                Header: 'REASON',
                accessor: 'reason',
            },
            {
                Header: 'ACTION',
                accessor: 'update_delete',
                disableSortBy: true,
            },
        ],
        []
    );


    const notificationAlertRef = useRef(null);
    const notify = (place, mess, type) => {
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    {mess}
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 2,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const notifyUpdate = (type) => {
        if (type === "success") {
            notify("tr", "Updated Successfully", "success")
        }
        else {
            notify("tr", "Update Failed", "danger")
        }
    }

    const notifyDelete = (type) => {
        if (type === "success") {
            notify("tr", "Deleted Successfully", "success")
        }
        else {
            notify("tr", "Delete Failed", "danger")
        }
    }

    const newBonusPenalty = (bonusPenalty, count = 0) => {
        return {
            stt: count + 1,
            date: bonusPenalty.date,
            modified: bonusPenalty.modified,
            type: bonusPenalty.type,
            score:
                <div style=
                    {bonusPenalty.type == "Penalty" ? { color: "#dc3545" } : { color: "#28a745" }}>
                    {bonusPenalty.score}
                </div>,
            reason: bonusPenalty?.reason,
            update_delete:
                <>
                    <ModalUpdatePenalty
                        userId={userId}
                        no={count + 1}
                        id={bonusPenalty.id}
                        date={bonusPenalty.date}
                        type={bonusPenalty.type}
                        score={bonusPenalty.score}
                        reason={bonusPenalty.reason}
                        notifyUpdate={notifyUpdate}
                    />
                    <ModalDeletePenalty
                        no={count + 1}
                        id={bonusPenalty.id}
                        type={bonusPenalty.type}
                        notifyDelete={notifyDelete}
                    />
                </>,
            id: bonusPenalty.id
        };
    };

    const makeDataBonusPenalty = (bonusPenalty) => {
        const makeDataLevel = () => {
            return bonusPenalty.map((d, count) => {
                return {
                    ...newBonusPenalty(d, count),
                };
            });
        };
        return makeDataLevel();
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(makeDataBonusPenalty(listBonusPenalty));
    }, [listBonusPenalty])

    return (
        <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <WrapTable columns={columns} data={data} setSelectedRows={setSelectedRows} />
        </>
    );
}

export default TableDetail;