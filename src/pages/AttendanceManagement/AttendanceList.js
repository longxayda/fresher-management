import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminClassList } from "redux/attendanceManagementSlice/adminManageAttendanceSlice";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { Table, Input, Label, Badge } from "reactstrap";
import { Button, Container, Row, Col } from "react-bootstrap";
import { fetchAdminAttendanceList, changeClass } from "redux/attendanceManagementSlice/adminManageAttendanceSlice"
import { findMonthList, isLoadingSelector } from "redux/selectors/attendanceSelectors/adminAttendanceSelectors";
import { myClassListSelector, adminAttendanceDataSelector, attendErrorMessageSelector } from "redux/selectors/attendanceSelectors/adminAttendanceSelectors";
import "assets/css/attendance-table.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { changeAttendStatus } from "redux/attendanceManagementSlice/adminManageAttendanceSlice";
import NotificationAlert from "react-notification-alert";
import CustomSpinner from 'components/TicketManagement/Spinner/CustomSpinner';

function AttendanceList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAdminClassList({
      })
    )
  }, [dispatch]);

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

  let classList = useSelector(myClassListSelector);
  let data = useSelector(adminAttendanceDataSelector);
  let errorMsg = useSelector(attendErrorMessageSelector);

  useEffect(() => {
    if (errorMsg != "") {
      notify("tr", errorMsg, "danger")
    }
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
        fetchAdminAttendanceList({ classId, month, year }),
      );
    }
  }, [myClass, myMonth]);

  function setColumns(data) {
    return (
      data[0].monthlyAttendanceResponses.map((d, index) => (
        {
          Header: String(d.date.slice(-2)),
          id: String(index),
          accessor: String("monthlyAttendanceResponses" + "[" + String(index) + "]" + ".status"),
          filter: 'equals',
          Cell: statusSelectCell
        }
      )
      )
    )
  }

  function refreshData() {
    const classId = myClassMonthList.classId
    const month = myMonth.split("-")[0]
    const year = myMonth.split("-")[1]
    let promise = new Promise(function (resolve, reject) {
      resolve(dispatch(
        fetchAdminAttendanceList({ classId, month, year }),
      ))
    });
    promise
      .then(function () {
        notify("tr", "Update data successfully!!", "success")
      })

  }

  function statusSelectCell({ value, row, column }) {
    const options = ['P', 'A', 'L', 'E', 'Ln', 'En', 'An']
    const [option, setOption] = useState(value || '')
    const [className, setClassName] = useState("")

    const handleAttendStatusChange = (e) => {
      const traineeId = Number(row.values.trainee_id);
      const status = String(e.target.value);
      let tmpDate = String(column.Header);
      if (tmpDate.length < 2) date = "0" + date;
      let month = myMonth.split("-")[0];
      if (month.length < 2) month = "0" + month;
      const year = myMonth.split("-")[1];
      const date = String(year + "-" + month + "-" + tmpDate)

      let promise = new Promise(function (resolve, reject) {

        resolve(dispatch(changeAttendStatus({ traineeId, date, status })))
      });
      promise
        .then(function () {
          refreshData()
        })

      setOption(e.target.value || undefined);
    }

    useEffect(() => {
      switch (option) {
        case 'P':
          setClassName("bg-primary")
          break

        case 'A':
          setClassName("bg-success")
          break

        case 'L':
          setClassName("bg-warning")
          break

        case 'E':
          setClassName("bg-warning")
          break

        case 'Ln':
          setClassName("bg-secondary")
          break

        case 'En':
          setClassName("bg-secondary")
          break

        case 'An':
          setClassName("bg-danger")
          break

        default:
          setClassName("bg-success")
      }
    }, [option])

    if (option != "--") {
      return (
        <>
          <Badge className={className} style={{ width: '100%', fontSize: "13px" }}>
            <select
              value={option}
              onChange={handleAttendStatusChange}
              style={{
                border: "none",
                background: "none",
                color: "white",
                fontWeight: "700"
              }}
            >
              <option disabled style={{ color: "grey" }}>{option}</option>
              {options.map((option, i) => (
                <option key={i} value={option} style={{ color: "black", fontWeight: "500" }}>
                  {option}
                </option>
              ))}
            </select>
          </Badge>
        </>
      )
    }
    else return (
      <>
        <div
          style={{
            width: "3rem",
          }}
        >

          <Input
            type="select"
            value={option}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              setOption(e.target.value || undefined);
            }}
          >
            <option disabled> {option} </option>
          </Input>
        </div>
      </>
    )

  }

  function caculateSummary({ data }) {
    let result = []

    data.map((d) => {
      let resultItem = {
        'P': 0,
        'A': 0,
        'E': 0,
        'L': 0,
        'An': 0,
        'En': 0,
        'Ln': 0
      }
      d.monthlyAttendanceResponses.map((item) => {

        const type = item.status;
        resultItem[type]++;
      })
      result = [
        ...result,
        resultItem
      ]

    })
    return result;
  }

  function statusSummaryCell({ row }) {
    let dataToDisplay = caculateSummary({ data })
    return (
      <>
        <Badge className="bg-primary mx-1" style={{ fontSize: "13px" }}>
          P: {dataToDisplay[row.index].P}
        </Badge>
        <Badge className="bg-success mx-1" style={{ fontSize: "13px" }}>
          A: {dataToDisplay[row.index].A}
        </Badge>
        <Badge className="bg-warning mx-1" style={{ fontSize: "13px" }}>
          L: {dataToDisplay[row.index].L}
        </Badge>
        <Badge className="bg-warning mx-1" style={{ fontSize: "13px" }}>
          E: {dataToDisplay[row.index].E}
        </Badge>
        <Badge className="bg-danger mx-1" style={{ fontSize: "13px" }}>
          An: {dataToDisplay[row.index].An}
        </Badge>
        <Badge className="bg-secondary" style={{ fontSize: "13px" }}>
          Ln: {dataToDisplay[row.index].Ln}
        </Badge>
        <Badge className="bg-secondary mx-1" style={{ fontSize: "13px" }}>
          En: {dataToDisplay[row.index].En}
        </Badge>
      </>
    )
  }

  const columns = useMemo(
    () => data[0]
      ?
      [
        {
          Header: "ID",
          columns: [
            {
              Header: "",
              accessor: "trainee_id",
            },
          ],
        },
        {
          Header: "Full Name",
          columns: [
            {
              Header: "First Name",
              accessor: "firstName",
            },
            {
              Header: "Last Name",
              accessor: "lastName",
            },
          ],
        },
        {
          Header: "Summary",
          columns: [
            {
              Header: "",
              accessor: 'Some summary here',
              Cell: statusSummaryCell,
            },
          ],
        },
        {
          Header: "Attend Status",
          columns: [
            ...setColumns(data)
          ],
        },
      ]
      :
      [
        {
          Header: "Data is loading or you need to choose class and month!",
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

  } = useTable({ columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const isLoading = useSelector(isLoadingSelector)

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container className="attend-table-content">
        <div className="d-flex align-items-center justify-content-between pb-2">
          <div className="me-3">
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
                disabled={disabledMonthList}
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


        {
          isLoading ? <CustomSpinner /> : <>
            <Row style={{ overflow: "auto" }} className="pt-2">
              <Container className="attend-table-container">
                <pre className="chorma">
                  <Table bordered striped hover {...getTableProps()} >
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
              </Col> : <Col></Col>}
            </Row>

          </>
        }
      </Container>
      <div className="attendance-status-description">
        <div>
          <Container fluid>
            <Row style={{ margin: "35px 0 0 0" }}>
              <Col md="3">
                <Row>
                  <Col md="2">
                    <Badge className="bg-primary" style={{ width: "39px" }}>
                      <h5 style={{ margin: "0" }}>P</h5>
                    </Badge>
                  </Col>
                  <Col md="8">
                    <h4 style={{ margin: "0" }}>Present</h4>
                  </Col>
                </Row>
              </Col>

              <Col md="3">
                <Row>
                  <Col md="2">
                    <Badge className="bg-warning" style={{ width: "39px" }}>
                      <h5 style={{ margin: "0" }}>L</h5>
                    </Badge>
                  </Col>
                  <Col md="8">
                    <h4 style={{ margin: "0" }}>Late coming</h4>
                  </Col>
                </Row>
              </Col>
              <Col md="3">
                <Row>
                  <Col md="2">
                    <Badge className="bg-warning" style={{ width: "39px" }}>
                      <h5 style={{ margin: "0" }}>E</h5>
                    </Badge>
                  </Col>
                  <Col md="8">
                    <h4 style={{ margin: "0" }}>Early Leaving</h4>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ margin: "10px 0 0 0" }}>
              <Col md="6">
                <Row>
                  <Col md="1">
                    <Badge className="bg-secondary" style={{ width: "39px" }}>
                      <h5 style={{ margin: "0" }}>Ln</h5>
                    </Badge>
                  </Col>
                  <Col md="10">
                    <h4 style={{ margin: "0" }}>Late coming with no permission</h4>
                  </Col>
                </Row>
              </Col>
              <Col md="6">
                <Row>
                  <Col md="1">
                    <Badge className="bg-secondary" style={{ width: "39px" }}>
                      <h5 style={{ margin: "0" }}>En</h5>
                    </Badge>
                  </Col>
                  <Col md="10">
                    <h4 style={{ margin: "0" }}>
                      Early Leaving with no permission
                    </h4>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ margin: "10px 0 0 0" }}>
              <Col md="6">
                <Row>
                  <Col md="1">
                    <Badge className="bg-danger" style={{ width: "39px" }}>
                      <h5 style={{ margin: "0" }}>An</h5>
                    </Badge>
                  </Col>
                  <Col md="10">
                    <h4 style={{ margin: "0" }}>Absent with no permission</h4>
                  </Col>
                </Row>
              </Col>
              <Col md="3">
                <Row>
                  <Col md="2">
                    <Badge className="bg-success" style={{ width: "39px" }}>
                      <h5 style={{ margin: "0" }}>A</h5>
                    </Badge>
                  </Col>
                  <Col md="8">
                    <h4 style={{ margin: "0" }}>Absent</h4>
                  </Col>
                </Row>
              </Col>
            </Row>

          </Container>
        </div>
      </div>
    </>
  );
}

export default AttendanceList;
