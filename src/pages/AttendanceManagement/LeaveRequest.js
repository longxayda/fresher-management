import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { addRequest as addRequestAction } from "redux/attendanceManagementSlice/leaveRequestSlice";
import { useRowSelect } from 'react-table'
import { Table, Input, Label, Badge } from "reactstrap";
import { Button, Col, Row, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "assets/css/attendance-table.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import RequestModal from "components/LeaveRequest/Modal/modalRequest";
import ModalDelete from "components/LeaveRequest/Modal/modalDelete";
import NotificationAlert from "react-notification-alert";
import notify from "components/LeaveRequest/Alert/alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveRequest } from "redux/attendanceManagementSlice/leaveRequestSlice";
import { leaveRequestSelector, addRequestSelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";


function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <Form.Group className="mb-0"/>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = (val) => !val;

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export function LeaveRequest() {
  const data = useSelector(leaveRequestSelector);
  if (data == null || typeof(data) != "object"  ) return <Container></Container>

  const dispatch = useDispatch();

  const notificationAlertRef = React.useRef(null);

  const [requestArr, setRequestArr] = useState([]);

  useEffect(() => {
    const traineeId = 3
    dispatch(
      fetchLeaveRequest({
        traineeId
      })
    );
  }, [dispatch]);

  //Add new request
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    traineeID: 2,
    requestType: "Vắng",
    partial: "",
    startDate: "",
    endDate: "",
    reason: ""
  });
  const handleShowAddRequest = () => {
    setRequestArr([]);
    setShowAddRequest(true);
  };
  const handleCloseAddRequest = () => {
    setNewRequest({
      traineeID: 2,
      requestType: "Vắng",
      partial: "",
      startDate: "",
      endDate: "",
      reason: ""
     });
    setShowAddRequest(false);
  };
  const completeAddRequest = (newRequest) => {
    dispatch(
      addRequestAction({
        partial: newRequest.partial,
        startDate: newRequest.startDate,
        endDate: newRequest.endDate,
        reason: newRequest.reason,
      })
    );
    notify(
      "tr",
      "success",
      "Add new role successfully !!!",
      notificationAlertRef
    );
  };
  const handleAddRequest = () => {
    const newRequest = requestArr.map((request) => {
      return request.value;
    });
    completeAddRequest({
      id: Math.floor(Math.random() * 100) + 1,
      trainee_id: 3,
      requestType: "Vắng",
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      partial: newRequest.partialType,
      detailReason: newRequest.reason,
      status: "Pending"
    });
    handleCloseAddRole();
  };



  function handleContent({ row }) {
    let startDate = data[row.index].startDate;
    let endDate = data[row.index].endDate;
    let content = "Request for absence from " + String(startDate) + " to " + String(endDate);
    return <a href="#" style={{ color: "blue", textDecoration: "none" }}>{content}</a>
  }

  function handleStatus({ value }) {
    let className = "";
    switch (value) {
      case "Pending":
        className = "bg-warning";
        break;

      case "Cancelled":
        className = "bg-secondary";
        break;

      case "Denied":
        className = "bg-danger";
        break;

      case "Approved":
        className = "bg-success";
        break;
    }
    return (
      <>
        <Badge className={className} style={{ fontSize: "1rem" }}>
          {value}
        </Badge>
      </>
    );
  }

  function handleDelete({ row }) {
    if (data[row.index].status == "Pending") {
      return <ModalDelete />
    }
    return <div />;
  }

  const columns = useMemo(
    () => data[0]
    ?
    [
      {
                Header: "#",
                accessor: "id",
              },
              {
                Header: "Content",
                accessor: "Some content",
                Cell: handleContent,
              },
              {
                Header: "Detailed Reason",
                accessor: "detailReason",
              },
              {
                Header: "Status",
                accessor: "status",
                Cell: handleStatus,
              },
              {
                Header: "Start Date",
                accessor: "startDate",
              },
              {
                Header: "End Date",
                accessor: "endDate",
              },
              {
                Header: "Partial",
                accessor: "partial",
              },
              {
                Header: "Action",
                accessor: "Some status",
                Cell: handleDelete,
              },
    ]
    :
    [
      {
        Header: "Data is loading, please wait...",
        columns: [
          {
            Header: "",
            accessor: "Data is loading, please wait..."
          },
        ],
      }
    ],
    [data]
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
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
  } = useTable({ columns, data, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  )

  React.useEffect(() => {}, [globalFilter]);

  return (
    <>
      <div className='wrap-table-content'>
        <Container>
        <div className="d-flex align-items-center justify-content-between pb-3">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <RequestModal
                newRequest={newRequest}
                requestArr={requestArr}
                showAddRequest={showAddRequest}
                setNewRequest={setNewRequest}
                handleCloseAddRequest={handleCloseAddRequest}
                setRequestArr={setRequestArr}
                handleAddRequest={handleAddRequest} />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <div className="me-3">
                <Label className="mb-0">Search: </Label>
              </div>
              <div className=" mb-1">
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
                              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
            {data ? <Col className="pagination d-flex align-items-center justify-content-center">
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
                  {' '}{pageIndex + 1} of {pageOptions.length}
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
            </Col> : <Col></Col>}
          </Row>
        </Container>
      </div>
    </>
  );

}

export default LeaveRequest;
