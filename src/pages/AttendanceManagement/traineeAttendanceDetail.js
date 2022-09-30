import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { Badge } from "reactstrap";
import { Table, Input, Label } from "reactstrap";
import { Button, Container, Row, Col } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { traineeAttendanceMonthListSelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";
import { traineeAttendanceTableSelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";
import { fetchTraineeMonthList } from "redux/attendanceManagementSlice/traineeAttendanceTableSlice";
import { fetchTraineeAttendanceList } from "redux/attendanceManagementSlice/traineeAttendanceTableSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomSpinner from "components/TraineeAttendance/__tests__/Spinner/CustomSpinner";
import { traineeLoading } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";

function TraineeAttendance() {
  const dispatch = useDispatch();

  useEffect(() => {
    try{
      dispatch(fetchTraineeMonthList());
    }
    catch(err){
      console.log(err)
    }
  }, [dispatch]);

  const monthList = useSelector(traineeAttendanceMonthListSelector);
  const [myMonth, setMyMonth] = useState("Choose month");

  const createMonthList = (MonthList) => {
    if (typeof(MonthList) !== "object") return;
    const startDate = MonthList ? Number(MonthList.startDate.slice(5, 7)) : null;
    const endDate = MonthList ? Number(MonthList.endDate.slice(5, 7)) : null;
    const start_year = MonthList !== undefined ? MonthList.startDate.slice(0, 4) : null;
    const end_year = MonthList !== undefined ? MonthList.endDate.slice(0, 4) : null;
    let myMonthList = [];
    if (start_year == end_year) {
      for (let i = startDate; i <= endDate; i++) {
        const tmp = String(i) + "-" + String(start_year);
        myMonthList.push(tmp);
      }
    } else {
      const MonthListPart1 = [];
      const MonthListPart2 = [];
      for (let i = startDate; i <= 12; i++) {
        const tmp = String(i) + "-" + String(start_year);
        MonthListPart1.push(tmp);
      }
      for (let i = 1; i <= endDate; i++) {
        const tmp = String(i) + "-" + String(end_year);
        MonthListPart2.push(tmp);
      }
      myMonthList = MonthListPart1.concat(MonthListPart2);
    }
    return myMonthList ;
  };

  const myMonthList = createMonthList(monthList);
  const data = useSelector(traineeAttendanceTableSelector);
  
  useEffect(() => {
      if (myMonth !== "Choose month") {
        const month = myMonth.split("-")[0];
        const year = myMonth.split("-")[1];
        try{
          dispatch(fetchTraineeAttendanceList({ month, year }));
        }
        catch(err){
          console.log(err)
        }
      }
  }, [dispatch, myMonth]);

  const handleChangeMonth = (e) => {
    if (e.target.value != "Choose month") setMyMonth(e.target.value);
  };

  function handleDate({ value }) {
    const date = new Date(value).getDay();
    const dayOfWeek = isNaN(date) ? null
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][date];
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "right", width: "26%" }}>
          {dayOfWeek}, {value}
        </div>
      </div>
    );
  }

  function handleStatus({ value }) {
    let name = "";
    let className = "";

    switch (value) {
      case "P":
        className = "bg-primary";
        name = "Present";
        break;

      case "A":
        className = "bg-success";
        name = "Absent";
        break;

      case "L":
        className = "bg-warning";
        name = "Late coming";
        break;

      case "E":
        className = "bg-warning";
        name = "Early leaving";
        break;

      case "Ln":
        className = "bg-secondary";
        name = "Late coming with no permission";
        break;

      case "En":
        className = "bg-secondary";
        name = "Early leaving with no permission";
        break;

      case "An":
        className = "bg-danger";
        name = "Absent with no permission";
        break;

      default:
        className = "";
        name = "";
    }
    return (
      <>
        <Badge
          className={className}
          style={{ fontSize: "15px", height: "26px" }}
        >
          <div>{name}</div>
        </Badge>
      </>
    );
  }

  const columns = useMemo(
    () =>
      myMonth == "Choose month"
        ? [
            {
              Header: "Please choose month",
            }
          ]
        : [
            {
              Header: "Date",
              accessor: "date",
              Cell: handleDate,
            },
            {
              Header: "Attendance Status",
              accessor: "status",
              Cell: handleStatus,
            },
          ],
    [myMonth]
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
  const isLoad = useSelector(traineeLoading);
  return (
    <div className="trainee-attendance-detail">
      <div className="d-flex align-items-center justify-content-between pb-2">
        <div className="me-3">
          <div className="trainee-attendance-select-box">
            <select
              className="me-1"
              value={myMonth}
              onClick={(e) => e.stopPropagation()}
              onChange={handleChangeMonth}
              style={{
                width: "10rem",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E3E3E3",
                borderRadius: "4px",
                color: "#565656",
                padding: "8px 12px",
                height: "40px",
                boxShadow: "none",
                marginLeft: "5px",
              }}
            >
              <option value="Choose month">Choose month</option>
              {myMonthList !== undefined ? (
                myMonthList.map((month, i) => (
                  <option key={i} value={month}>
                    {month}
                  </option>
                ))
              ) : (
                <option></option>
              )}
            </select>
          </div>
        </div>

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
      
      {isLoad ? <CustomSpinner /> : <>
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
                            textTransform:"uppercase",
                            color:"black",
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
              className="btn-fill btn-sm me-1"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              className="btn-fill btn-sm me-1"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
            <Button
              className="btn-fill btn-sm me-1"
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
      </>}
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

export default TraineeAttendance;
