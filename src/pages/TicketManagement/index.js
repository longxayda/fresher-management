import "assets/css/attendance-table.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect, useMemo } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { Table, Input, Label, Badge } from "reactstrap";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useRowSelect
} from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { changeClass } from "redux/attendanceManagementSlice/adminTicketSlice"
import { findMonthList } from "redux/selectors/attendanceSelectors/adminTicketSelectors";
import { myClassListSelector, adminTicketDataSelector, ticketErrorMessageSelector, ticketLoading } from "redux/selectors/attendanceSelectors/adminTicketSelectors";
import { fetchAdminTicketList, fetchAdminTicketClassList, handleAdminTicketRequest, handleAdminTicketRequestAll } from 'redux/attendanceManagementSlice/adminTicketSlice'
import NotificationAlert from "react-notification-alert";
import CustomSpinner from 'components/TicketManagement/Spinner/CustomSpinner';
import { storage } from "services/storage";


function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <Form.Group className="mb-0" />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      style={{
        textAlign: "center",
        fontWeight: "800",
        width: "6.5rem",
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
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

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

export function TicketManagement() {

  const [ticketPageSize, setTicketPageSize] = useState(10);
  const [ticketCurrentIndex, setTicketCurrentIndex] = useState(1);
  const [queryParams, setQueryParams] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAdminTicketClassList({})
    );
  }, [dispatch, ticketPageSize, queryParams, ticketCurrentIndex]);

  let data = useSelector(adminTicketDataSelector);
  let classList = useSelector(myClassListSelector);

  let errorMsg = useSelector(ticketErrorMessageSelector);
  const [myErrMsg, setMyErrMsg] = useState(errorMsg);
  useEffect(() => {
    if (errorMsg != "") {
      notify("tr", errorMsg, "danger")
    }
    setMyErrMsg(errorMsg);
  }, [errorMsg])

  const [myClasses, setMyClasses] = useState(classList);
  const myClassMonthList = useSelector(findMonthList);
  const createMonthList = (myClassMonthList) => {
    const startDate = myClassMonthList ? Number(myClassMonthList.startDate.slice(5, 7)) : null
    const endDate = myClassMonthList ? Number(myClassMonthList.endDate.slice(5, 7)) : null
    const start_year = myClassMonthList ? myClassMonthList.startDate.slice(0, 4) : null
    const end_year = myClassMonthList ? myClassMonthList.endDate.slice(0, 4) : null
    let MonthList = []
    if (start_year == end_year) {

      for (let i = startDate; i <= endDate; i++) {
        const tmp = String(i) + "-" + String(start_year)
        MonthList.push(tmp)
      }
    }
    else {
      const MonthListPart1 = []
      const MonthListPart2 = []
      for (let i = startDate; i <= 12; i++) {
        const tmp = String(i) + "-" + String(start_year)
        MonthListPart1.push(tmp)
      }
      for (let i = 1; i <= endDate; i++) {
        const tmp = String(i) + "-" + String(end_year)
        MonthListPart2.push(tmp)
      }
      MonthList = MonthListPart1.concat(MonthListPart2)
    }
    return MonthList;
  }

  const monthList = createMonthList(myClassMonthList)
  const [disabledMonthList, setDisabledMonthList] = useState(true)

  useEffect(() => {
    setMyClasses(classList)
  }, [classList])

  const [myClass, setMyClass] = useState("Choose class")
  const [myMonth, setMyMonth] = useState("Choose month")

  const handleChangeClass = (e) => {
    setDisabledMonthList(false)
    setMyMonth("Choose month")
    dispatch(changeClass(e.target.value))
    if (e.target.value != "Choose class") setMyClass(e.target.value)
  }
  const handleChangeMonth = (e) => {
    if (e.target.value != "Choose month") setMyMonth(e.target.value)
  }

  useEffect(() => {
    if (myClass !== "Choose class" && myMonth !== "Choose month") {
      const classId = myClassMonthList.classId
      const month = myMonth.split("-")[0]
      const year = myMonth.split("-")[1]
      dispatch(
        fetchAdminTicketList({ classId, month, year }),
      );
    }
  }, [myClass, myMonth]);

  const [clickAbleButton, setClickAbleButton] = useState(true)

  function handleStatus({ value }) {
    let className = ""
    switch (value) {
      case 'Pending':
        className = "bg-secondary"
        break

      case 'Denied':
        className = "bg-danger"
        break

      case 'Approved':
        className = "bg-success"
        break
    }
    return (
      <>
        <Badge className={className} style={{ width: '70%', fontSize: "15px" }}>
          {value}
        </Badge>
      </>
    )
  }

  const notificationAlertRef = React.useRef(null);
  const notify = (place, message, notifyType) => {
    var type = notifyType;
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  function refreshData(status) {
    const classId = myClassMonthList.classId
    const month = myMonth.split("-")[0]
    const year = myMonth.split("-")[1]

    let promise = new Promise(function (resolve, reject) {
      resolve(dispatch(
        fetchAdminTicketList({ classId, month, year }),
      ))
    });
    promise
      .then(function () {
        if (myErrMsg != "") {
          notify(
            "tr",
            "danger",
            errorMsg
          );
        }
        if (status == "Approved") {
          notify(
            "tr",
            "Ticket Approved!!",
            "success"
          );
        }
        else {
          notify(
            "tr",
            "Ticket Denied!!",
            "danger"
          );
        }
      })
  }

  function handleAdmin({ row }) {
    if (data[row.index].status == "Pending") {
      return (
        <div className="attendance-handle-buttons">
          <Button
            style={{ marginRight: '8px' }} variant="primary" size="sm" >
            <FontAwesomeIcon icon={faCheck} onClick={() => {
              const userFromCache = storage.getCache("user").id;
              let object = {
                "id": data[row.index].id,
                "adminID": userFromCache,
                "status": "Approved"
              }

              let promise = new Promise(function (resolve, reject) {
                resolve(dispatch(
                  handleAdminTicketRequest({ object })
                ))
              });
              promise
                .then(function () {
                  refreshData("Approved")
                })
            }} />
          </Button>
          <Button variant="danger" size="sm" onClick={() => {
            const userFromCache = storage.getCache("user").id;
            let object = {
              "id": data[row.index].id,
              "adminID": userFromCache,
              "status": "Denied"
            }
            console.log('Object: ', JSON.stringify(object))
            let promise = new Promise(function (resolve, reject) {
              resolve(dispatch(
                handleAdminTicketRequest({ object })
              ))
            });
            promise
              .then(function () {
                refreshData("Denied")
              })
          }}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      )
    }
    else return (
      <></>
    )
  }


  function handleContent({ row }) {
    let startDate = data[row.index].startDate;
    let endDate = data[row.index].endDate;
    return (
      <>
        <p style={{ margin: "0", fontSize: "0.875rem" }}>From <span style={{ fontWeight: "700" }}>{String(startDate)}</span> to <span style={{ fontWeight: "700" }}>{String(endDate)}</span></p>
      </>
    )
  }

  const columns = useMemo(
    () => data[0]
      ?
      [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Firstname",
          accessor: "firstName",
        },
        {
          Header: "Lastname",
          accessor: "lastName",
        },
        {
          Header: "Absence duration",
          accessor: 'Some content here',
          Cell: handleContent,
        },
        {
          Header: "Partial",
          accessor: "partial",
        },
        {
          Header: "Reason",
          accessor: "reason",
        },
        {
          Header: "Status",
          accessor: "status",
          Cell: handleStatus,
          Filter: SelectColumnFilter,
        },
        {
          Header: "Action",
          accessor: "handled",
          Cell: handleAdmin,
        }
      ]
      :
      [
        {
          Header: "Data is loading or you need to choose class and month!",
          columns: [
            {
              Header: "ID",
              accessor: "id",
            },
            {
              Header: "Firstname",
              accessor: "firstName",
            },
            {
              Header: "Lastname",
              accessor: "lastName",
            },
            {
              Header: "Absence duration",
              accessor: 'Some content here',
            },
            {
              Header: "Partial",
              accessor: "partial",
            },
            {
              Header: "Reason",
              accessor: "reason",
            },
            {
              Header: "Status",
              accessor: "status",
            },
            {
              Header: "Action",
              accessor: "handled",
            }
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
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    selectedFlatRows,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize, globalFilter, selectedRowIds },
  } = useTable({ columns, data, defaultColumn },
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
  )

  useEffect(() => { selectedFlatRows.length > 0 ? setClickAbleButton(false) : setClickAbleButton(true) }, [selectedFlatRows.length]);

  React.useEffect(() => { }, [globalFilter]);

  const isLoad = useSelector(ticketLoading);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="wrap-table-content">
        <Container>
          <div className="d-flex align-items-center justify-content-between pb-3">
            <div className="d-flex align-items-center justify-content-start">
              <div className="attendance-select-boxes">
                <select
                  className="me-1"
                  value={myClass}
                  onClick={(e) => e.stopPropagation()}
                  onChange={handleChangeClass}
                  style={{
                    width: "15rem",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E3E3E3",
                    borderRadius: "4px",
                    color: "#565656",
                    padding: "8px 12px",
                    height: "40px",
                    boxShadow: "none",
                  }}
                >
                  <option value="Choose class">
                    Choose class
                  </option>
                  {
                    classList !== null ?
                      myClasses.map((d, i) => (
                        <option value={d.classCode} key={i}>
                          {d.classCode}
                        </option>
                      ))
                      :
                      <option value="data-not-found">
                        Data is loading, please wait...
                      </option>
                  }
                </select>

                <select
                  value={myMonth}
                  onClick={(e) => e.stopPropagation()}
                  onChange={handleChangeMonth}
                  disabled={disabledMonthList}
                  style={{
                    width: "10rem",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E3E3E3",
                    borderRadius: "4px",
                    color: "#565656",
                    padding: "8px 12px",
                    height: "40px",
                    boxShadow: "none",
                  }}
                >
                  <option value="Choose class">
                    Choose month
                  </option>
                  {monthList.map((month, i) => (
                    <option key={i} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-end">
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

              <div >
                <Button
                  className="btn-fill "
                  variant="primary"
                  style={{ color: "white", border: "none" }}
                  onClick={() => {
                    const RowIds = JSON.stringify(
                      {
                        selectedIDs: selectedFlatRows.map(
                          d => {if (d.original.status === "Pending")  { return d.original.id}}
                        ),
                      },
                      null,
                      2
                    )
                    const idsObj = JSON.parse(RowIds).selectedIDs
                    const list = idsObj.filter((d) => {return d!=null})

                    const userFromCache = storage.getCache("user").id;
                    let object = {
                      "list": list,
                      "adminId": userFromCache,
                      "status": "Approved"
                    }
                    let promise = new Promise(function (resolve, reject) {
                      resolve(dispatch(
                        handleAdminTicketRequestAll({ object })
                      ))
                    });
                    promise
                      .then(function () {
                        refreshData("Approved")
                      })
                  }}
                  disabled={clickAbleButton}
                >
                  Accept all <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button
                  className="btn-fill ms-1"
                  variant="danger"
                  style={{ color: "white", border: "none" }}
                  onClick={() => {
                    const RowIds = JSON.stringify(
                      {
                        selectedIDs: selectedFlatRows.map(
                          d => {if (d.original.status === "Pending")  { return d.original.id}}
                        ),
                      },
                      null,
                      2
                    )
                    const idsObj = JSON.parse(RowIds).selectedIDs
                    const list = idsObj.filter((d) => {return d!=null})

                    const userFromCache = storage.getCache("user").id;
                    let object = {
                      "list": list,
                      "adminId": userFromCache,
                      "status": "Denied"
                    }
                    let promise = new Promise(function (resolve, reject) {
                      resolve(dispatch(
                        handleAdminTicketRequestAll({ object })
                      ))
                    });
                    promise
                      .then(function () {
                        refreshData("Denied")
                      })
                  }}
                  disabled={clickAbleButton}
                >
                  Reject all <FontAwesomeIcon icon={faXmark} />
                </Button>
              </div>
            </div>
          </div>
          {
            isLoad ? <CustomSpinner /> : <>
              <Row style={{ overflow: "auto" }} className="pt-2">
                <Container className="attend-table-container">
                  <pre className="chorma">
                    <Table striped hover {...getTableProps()} >
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
                </Col> : <Col></Col>}
              </Row>
            </>
          }
        </Container>
      </div>
    </>
  );
}

export default TicketManagement;
