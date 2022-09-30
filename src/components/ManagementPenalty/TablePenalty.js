import React, { useState } from "react";
import { useSelector} from "react-redux";

import {
    useTable,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
} from "react-table";

import {
    Button,
    Card,
    Form,
    Table,
    Row,
    Col,
    Container
} from "react-bootstrap";
import { Input, Label } from "reactstrap";
import ModalDetail from "components/ManagementPenalty/Modal/ModalDetail.js";
import FilterPenalty from "components/ManagementPenalty/FilterPenalty";


function TablePenalty({
    columns,
    data,
    pageSize,
    setPageSize,
    maxIndex,
    currentIndex,
    setCurrentIndex,
    queryParams,
    setQueryParams,
}) {
    const isLoading = useSelector((state) => state.manageFR.isLoading);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
        });

    function isPositiveInteger(str) {
        if (typeof str !== "string") {
            return false;
        }

        const num = Number(str);

        if (Number.isInteger(num) && num > 0) {
            return true;
        }

        return false;
    }

    function handleChangeIndexEvent(e) {
        if (isPositiveInteger(e.target.value)) {
            if (e.target.value < maxIndex) {
                setCurrentIndex(e.target.value);
            } else {
                setCurrentIndex(maxIndex);
            }
        } else {
            setCurrentIndex(1);
        }
    }

    function goToPage(index) {
        if (index === currentIndex)
            return;
        else if (index > maxIndex)
            setCurrentIndex(maxIndex);
        else if (index <= 0) {
            if (currentIndex !== 1)
                setCurrentIndex(1);
        }
        else
            setCurrentIndex(index);
    }

    return (
        <>
            <Row>
                <Col md="8" lg="8" xl="8" xxl="9">
                    <FilterPenalty filterParam={queryParams} setFilterParam={setQueryParams} />
                </Col>
            </Row>
            {isLoading === true ? (
                <div className="center-loader">
                    {" "}
                    <span className="loader"></span>{" "}
                </div>
            ) : (
                <Row>
                    <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>
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
                                                </div>
                                            </th>
                                        ))}
                                        <th className="heading justifyContentCenter">
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
                                                Detail
                                            </div>
                                        </th>
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            <td>{row.values.userId}</td>
                                            <td>{row.values.username}</td>
                                            <td>{row.values.fullName}</td>
                                            <td>{row.values.className}</td>
                                            <td>{row.values.email}</td>
                                            <td>
                                                <ModalDetail
                                                    userId={row.values.userId}
                                                    accountFresher={row.values.username}
                                                    fullNameFresher={row.values.fullName}
                                                    classFresher={row.values.className}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>

                    <Row>
                        <Col>
                            <Container fluid
                                className="pagination d-flex align-items-center justify-content-center"
                            >
                                <Button
                                    className="btn-fill btn-sm m-1"
                                    onClick={() => goToPage(1)}
                                    disabled={currentIndex === 1}
                                >
                                    {"<<"}
                                </Button>
                                <Button
                                    className="btn-fill btn-sm m-1"
                                    onClick={() => goToPage(currentIndex - 1)}
                                    disabled={currentIndex === 1}
                                >
                                    {"<"}
                                </Button>
                                <Button
                                    className="btn-fill btn-sm m-1"
                                    onClick={() => goToPage(currentIndex + 1)}
                                    disabled={currentIndex === maxIndex}
                                >
                                    {">"}
                                </Button>
                                <Button
                                    className="btn-fill btn-sm m-1"
                                    onClick={() => goToPage(maxIndex)}
                                    disabled={currentIndex === maxIndex}
                                >
                                    {">>"}
                                </Button>
                                <span className="mr-3 ml-5" style={{ marginRight: "10px" }}>
                                    Page <strong>{currentIndex} </strong>
                                    of <strong>{maxIndex}</strong>{" "}
                                </span>
                                <span className="mr-3 ml-5" style={{ marginRight: "10px" }}>
                                    Go to page:{" "}
                                    <Input
                                        type="number"
                                        className="d-inline"
                                        value={currentIndex}
                                        style={{ width: "100px" }}
                                        onChange={(e) => handleChangeIndexEvent(e)}
                                    />
                                </span>{" "}
                                <Input
                                    className="d-inline"
                                    type="select"
                                    style={{ width: "100px" }}
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                    }}
                                >
                                    {[10, 20, 30, 40, 50].map((_pageSize) => (
                                        <option key={_pageSize} value={_pageSize}>
                                            Show {_pageSize}
                                        </option>
                                    ))}
                                </Input>
                            </Container>
                        </Col>
                    </Row>
                </Row>
            )}
        </>
    );
}

export default TablePenalty;