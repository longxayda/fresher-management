import React from "react";
import { Table, Input } from "reactstrap";
import { useTable, usePagination, useGlobalFilter, useSortBy, useFilters } from "react-table";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import CustomSpinner from "components/Audit/Evaluation/CustomSpinner";

export const EvaluationTable = ({ columns, data, currentIndex, maxIndex, setCurrentIndex, load }) => {
    const props = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 20 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setGlobalFilter,
        page,
        state: { globalFilter },
    } = props;

    const goToPage = (index) => {
        if (index <= 1) setCurrentIndex(1)
        else if (index >= maxIndex) setCurrentIndex(maxIndex)
        else setCurrentIndex(index)
    }

    const isLoad = useSelector(load);

    return (
        <div className="evaluation-table">
            <div className="d-flex align-items-center justify-content-end pb-3">
                <div className="mr-3">
                    <span style={{ fontWeight: "bold", color: "#9C9C9C" }}>Search:&nbsp;</span>
                </div>
                <div className="mr-3">
                    <Input
                        type="search"
                        value={globalFilter || ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        style={{ borderWidth: "2px", width: "300px" }}
                    />
                </div>
            </div>
            <style>
                {`
                td,tr,th{
                    text-align: center;
                    border: none;
                }
            `}
            </style>
            {
                isLoad ? <CustomSpinner /> : <>
                    <Table bordered striped hover {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <div
                                                className="heading"
                                                style={{
                                                    color: "black",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    textTransform: "uppercase"                                                    
                                                }}
                                            >
                                                {column.render("Header")}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? " 🔽"
                                                            : " 🔼"
                                                        : ""}
                                                </span>
                                            </div>
                                            <div>{column.canFilter ? column.render("Filter") : null}</div>
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
                                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <div className="pagination d-flex align-items-center justify-content-center">
                        <Button
                            className="btn-fill btn-sm mr-3"
                            size="sm"
                            onClick={() => goToPage(1)}
                            disabled={currentIndex == 1}
                        >
                            {"<<"}
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                            className="btn-fill btn-sm mr-3"
                            size="sm"
                            onClick={() => goToPage(currentIndex - 1)}
                            disabled={currentIndex == 1}
                        >
                            {"<"}
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                            className="btn-fill btn-sm mr-3"
                            size="sm"
                            onClick={() => goToPage(currentIndex + 1)}
                            disabled={currentIndex == maxIndex}
                        >
                            {">"}
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                            className="btn-fill btn-sm mr-5"
                            size="sm"
                            onClick={() => goToPage(maxIndex)}
                            disabled={currentIndex == maxIndex}
                        >
                            {">>"}
                        </Button>
                        &nbsp;
                        <span className="mr-3 ml-5">
                            Page&nbsp;
                            <strong>
                                {currentIndex} of {maxIndex}
                            </strong>
                        </span>
                        &nbsp;
                        <span className="mr-3"> Go to page: </span>
                        &nbsp;
                        <Input
                            type="number"
                            className="mr-3"
                            min={1}
                            max={maxIndex}
                            defaultValue={currentIndex}
                            onChange={(e) => {
                                if(e.target.value == '') return; 
                                const index = Number(e.target.value);
                                if (index <= 1) {
                                    goToPage(1);
                                }
                                else if (index >= maxIndex) {
                                    goToPage(maxIndex);
                                }
                                else {
                                    goToPage(index);
                                }
                            }}
                            style={{ width: "100px" }}
                        />
                    </div>
                </>
            }
            <br />
        </div>
    );
}