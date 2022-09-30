import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { Table, Input, Label } from "reactstrap";
import { Button, Container, Row, Col } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { diligentSummarySelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";
import { fetchDiligentSummaryList } from "redux/attendanceManagementSlice/diligentSummarySlice";
import { useDispatch, useSelector } from "react-redux";

function DiligentSummaryTable() {
  const data = useSelector(diligentSummarySelector);
  if (data == null || typeof data != "object") return <Container></Container>;
  const dispatch = useDispatch();
  useEffect(() => {

      try{
        dispatch(fetchDiligentSummaryList());
      }
      catch(err){
        console.log(err)
      }
  }, [dispatch]);
  function changePercent({ value }) {
    const variable = value * 100;
    var a = variable.toFixed(2);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "right", width: "26%" }}>
          {a}{"%"}
        </div>
      </div>
    )
  }
  const columns = useMemo(
    () =>
      data[0]
        ? [
          {
            Header: "Month",
            accessor: "month",
          },
          {
            Header: "Year",
            accessor: "year",
          },
          {
            Header: "Number of Absent",
            accessor: "absentDay",
          },
          {
            Header: "Number of Late or Early",
            accessor: "lateOrEarlyDay",
          },
          {
            Header: "Rate of Absent with no permission",
            accessor: "rateAbsence",
            Cell: changePercent,
          },
          {
            Header: "Diligent grade",
            accessor: "diligentGrade",
          },
        ]
        : [

          {
            Header: "Month",
            accessor: "month",
          },
          {
            Header: "Year",
            accessor: "year",
          },
          {
            Header: "Number of Absent",
            accessor: "absentDay",
          },
          {
            Header: "Number of Late or Early",
            accessor: "lateOrEarlyDay",
          },
          {
            Header: "Rate of Absent with no permission",
            accessor: "rateAbsence",
            Cell: changePercent,
          },
          {
            Header: "Diligent grade",
            accessor: "diligentGrade",
          },
        ],
    [data]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    setGlobalFilter,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <div className="diligent-summary-detail">
      <div className="d-flex align-items-center justify-content-between pb-2">
        <div className="me-3"></div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="me-3">
            <Label className="mb-0">Search: </Label>
          </div>
          <div className="me-3">
            <Input
              type="search"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Row style={{ overflow: "auto" }} className="pt-2">
        <Container>
          <pre className="chorma">
            <Table striped hover {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        <div
                          className="heading"
                          style={{
                            fontSize: "14px",
                            textTranform: "uppercase",
                            color: "black",
                            fontWeight: "bold",
                            borderTop:"none!important",
                            borderBottom:"none",
                            textAlign: "center",
                          }}
                        >
                          {column.render("Header")}
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
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </pre>
        </Container>
      </Row>

      <Row>
        <Col className="pagination d-flex align-items-center justify-content-center">
          <Button
            className="btn-fill btn-sm me-3"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>
          <Button
            className="btn-fill btn-sm me-3"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>
          <Button
            className="btn-fill btn-sm me-3"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </Button>
          <Button
            className="btn-fill btn-sm me-5"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
          <span className="me-3 ml-5">
            Page
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span className="me-3"> Go to page: </span>
          <Input
            type="number"
            className="me-3"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
          <div className="">
            <Input
              type="select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Input>
          </div>
          <br />
        </Col>
      </Row>
    </div>
  );
}

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default DiligentSummaryTable;
