import { React, useState, useEffect, useRef } from "react";
import NotificationAlert from "react-notification-alert";
import { notify } from "components/Modal/notify";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
// react-bootstrap components
import {
  Table,
  Container,
  Row,
  Col,
  Pagination,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { Input } from "reactstrap";
import { getAllDetailTraineeMark } from "redux/fresherManageSlice/topicMarkSlice";
import { useDispatch } from "react-redux";
export default function CustomTable({
  module_id,
  columns,
  data,
  button_icon,
  triggerPath,
  url,
  id,
  setShowQuiz,
  setShowAssignment,
  showQuiz,
  showAssignment,
  setShowFinalMark,
}) {
  const [pageSize, setPageSize] = useState(10);
  const [maxIndex, setMaxIndex] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [queryParams, setQueryParams] = useState("");
  const notificationAlertRef = useRef(null);
  const dispatch = useDispatch();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  useEffect(() => {
    // set max index
    const maxTemp = Math.ceil(data.length / pageSize);
    setMaxIndex(maxTemp === 0 ? 1 : maxTemp);
  }, [data, pageSize]);

  function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
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
    if (index == currentIndex) {
      return;
    }
    if (index > maxIndex) {
      if (maxIndex != currentIndex) {
        setCurrentIndex(maxIndex);
      }
    } else if (index <= 0) {
      if (1 != currentIndex) {
        setCurrentIndex(1);
      }
    } else {
      setCurrentIndex(index);
    }
  }
  async function handleOpenQuizModal(index, trainee_id, trainee_name) {
    setShowQuiz(true);
    // try{
    await dispatch(
      getAllDetailTraineeMark({ index, trainee_id, module_id, trainee_name })
    );

    // }
    // catch(error){
    //   notify("tr", "danger", error, notificationAlertRef);
    // }
  }
  async function handleOpenAssignmentModal(index, trainee_id, trainee_name) {
    setShowAssignment(true);
    await dispatch(
      getAllDetailTraineeMark({ index, trainee_id, module_id, trainee_name })
    );
  }
  async function handleOpenFinalMark(index, trainee_id, trainee_name) {
    setShowFinalMark(true);
    await dispatch(
      getAllDetailTraineeMark({ index, trainee_id, module_id, trainee_name })
    );
  }

  return (
    <>
      <Container>
        <div className="rna-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row style={{ height: "65vh", overflow: "auto" }}>
          <Container>
            <Table {...getTableProps()} striped hover className="text-nowrap">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        key={index}
                        {...column.getHeaderProps()}
                        className="sfr__header-middle"
                        style={{
                          fontSize: "14px",
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "bold",
                          borderTop: "none!important",
                          borderBottom: "none",
                          textAlign: "center",
                        }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows
                  .slice(
                    (currentIndex - 1) * pageSize,
                    (currentIndex - 1) * pageSize + pageSize
                  )
                  .map((row, index) => {
                    const array = [];
                    prepareRow(row);
                    console.log(row);
                    const userId = row.original.userId;
                    const fullName = row.original.fullName;
                    return (
                      <>
                        <tr key={index} {...row.getRowProps()}>
                          {Object.keys(row.values).forEach((key) => {
                            key === "button-icon"
                              ? array.push(
                                  <Link
                                    to={`${url}/modules/${row.values["id"]}`}
                                  >
                                    <Button onClick={triggerPath}>
                                      <i className={button_icon} />
                                    </Button>
                                  </Link>
                                )
                              : key === "quizMark"
                              ? array.push(
                                  <div
                                    onClick={() =>
                                      handleOpenQuizModal(
                                        index + 1,
                                        userId,
                                        fullName
                                      )
                                    }
                                    className="edit-score"
                                  >
                                    {row.values[key] == null ? (
                                      <i className="fas fa-plus-circle text-primary"></i>
                                    ) : (
                                      row.values[key]
                                    )}
                                  </div>
                                )
                              : key === "assignmentMark"
                              ? array.push(
                                  <div
                                    onClick={() =>
                                      handleOpenAssignmentModal(
                                        index + 1,
                                        userId,
                                        fullName
                                      )
                                    }
                                    className="edit-score"
                                  >
                                    {row.values[key] == null ? (
                                      <i className="fas fa-plus-circle text-primary"></i>
                                    ) : (
                                      row.values[key]
                                    )}
                                  </div>
                                )
                              : key === "finalMark"
                              ? array.push(
                                  <div
                                    onClick={() =>
                                      handleOpenFinalMark(
                                        index + 1,
                                        userId,
                                        fullName
                                      )
                                    }
                                    className="score-value edit-score"
                                  >
                                    {row.values[key] == null ? (
                                      <i className="fas fa-plus-circle text-primary"></i>
                                    ) : (
                                      row.values[key]
                                    )}
                                  </div>
                                )
                              : key === "id"
                              ? array.push(index + 1)
                              : array.push(row.values[key]);
                          })}
                          {array.map((item, index) => (
                            <td className="text-center" key={index}>
                              {item}
                            </td>
                          ))}
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </Table>
          </Container>
        </Row>
        <Row>
          <Col>
            <Container
              fluid
              className="pagination d-flex align-items-center justify-content-center"
              style={{ width: "840px" }}
            >
              <Button
                className="btn-fill m-1 btn-sm"
                onClick={() => goToPage(1)}
                disabled={currentIndex === 1}
              >
                {"<<"}
              </Button>
              <Button
                className="btn-fill m-1 btn-sm"
                onClick={() => goToPage(currentIndex - 1)}
                disabled={currentIndex === 1}
              >
                {"<"}
              </Button>
              <Button
                className="btn-fill m-1 btn-sm"
                onClick={() => goToPage(currentIndex + 1)}
                disabled={currentIndex === maxIndex}
              >
                {">"}
              </Button>
              <Button
                className="btn-fill m-1 btn-sm"
                onClick={() => goToPage(maxIndex)}
                disabled={currentIndex === maxIndex}
              >
                {">>"}
              </Button>
              <span  className="mr-3 ml-5" style={{ marginRight: "10px" }}>
                Page <strong>{currentIndex} </strong>
                of <strong>{maxIndex}</strong>
                {/* {" | "} */}
              </span>
              <span className="mr-3 ml-5" style={{ marginRight: "10px" }}>
                Go to page:{" "}
                <Input
                  type="number"
                  className="d-inline"
                  value={currentIndex}
                  style={{ width: "100px" }}
                  onChange={(e) => handleChangeIndexEvent(e)}
                  min={1}
                />
              </span>
              {/* {" | "}Show{" "} */}
              <Input
                className="d-inline"
                type="select"
                style={{ width: "90px" }}
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
              {/* {" rows per page"} */}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
