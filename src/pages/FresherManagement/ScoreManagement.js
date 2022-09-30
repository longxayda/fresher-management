import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  Modal,
  Container,
  Table,
  Row,
  Col,
  Form,
  Spinner,
} from "react-bootstrap";
import { Input } from "reactstrap";
import "assets/css/score.css";
import { getAllClass } from "redux/fresherManageSlice/scoreSlice";
import { getFresherFromClass } from "redux/fresherManageSlice/scoreSlice";
import { getFresherFromClassWithMonth } from "redux/fresherManageSlice/scoreSlice";
import { getMonthFromClass } from "redux/fresherManageSlice/scoreSlice";
function ManageScore() {
  const [showModal, setShowModal] = React.useState(false);
  const [topicMark, setTopicMark] = useState([]);
  const handleModal = (index) => {
    setShowModal(true);
    let obj = scoreTable.find((o) => o.id == index);
    if (obj.topic_marks == null) {
      setTopicMark([]);
    } else {
      setTopicMark(obj.topic_marks);
    }
  };
  const dispatch = useDispatch();
  const allClass = useSelector((state) => state.score.class);
  const loading = useSelector((state) => state.score.isLoading);
  const [classId, setClassId] = useState(0);
  const handleChangeClass = (e) => {
    setClassId(e.target.value);
  };
  const month_list = useSelector((state) => state.score.month);
  const [month, setMonth] = useState(0);
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const scoreTable = useSelector((state) => state.score.scoreTable);
  const [pageSize, setPageSize] = useState(10);
  const [maxIndex, setMaxIndex] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);
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
  useEffect(() => {
    let isMounted = true;
    if (allClass.length == 0) {
      dispatch(getAllClass())
        .unwrap()
        .then((res) => {
          if (isMounted) {
            setClassId(res[0].id);
          }
        });
    }
    if (allClass.length != 0) {
      if (month != 0) {
        dispatch(getFresherFromClassWithMonth([classId, month, currentIndex]))
          .unwrap()
          .then((res) => {
            if (isMounted) {
              setMaxIndex(() => {
                if (res.pageNumber < currentIndex) {
                  setCurrentIndex(1);
                }
                return res.pageNumber;
              });
            }
          });
      } else {
        dispatch(getFresherFromClass([classId, currentIndex]))
          .unwrap()
          .then((res) => {
            if (isMounted) {
              setMaxIndex(() => {
                if (res.pageNumber < currentIndex) {
                  setCurrentIndex(1);
                }
                return res.pageNumber;
              });
            }
          });
        dispatch(getMonthFromClass([classId]));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [classId, currentIndex, month]);
  return (
    <>
      <Container fluid>
        <Row style={{ marginBottom: "20px" }}>
          <Col md={3}>
            <Form.Select onChange={(e) => handleChangeClass(e)}>
              {allClass.map((name, index) => {
                return (
                  <option key={index} value={name.id}>
                    {name.classCode}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col md="2">
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ width: "150px" }}
              onChange={(e) => handleChangeMonth(e)}
            >
              <option value="0">Month</option>
              {month_list.map((row, index) => {
                return (
                  <option key={index} value={row.id}>
                    {row.month}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>
        <Card style={{ height: "540px", border: "none" }}>
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            {loading ? (
              <Spinner
                animation="border"
                variant="primary"
                role="status"
                className="position-absolute"
                style={{ height: "60px", width: "60px" }}
              ></Spinner>
            ) : (
              <Table striped hover className="text-nowrap">
                <thead>
                  <tr>
                    <th
                      style={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      #
                    </th>
                    <th>
                      <div
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Name
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Class
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Month Year
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Academic Mark
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Disciplinary Mark
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Bonus Mark
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Penalty Mark
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        GPA Mark
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoreTable.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.name}</td>
                      <td>{row.className}</td>
                      <td>{row.month}</td>
                      <td>{row.academic == null ? "" : row.academic}</td>
                      <td>
                        {row.disciplinary == null ? "" : row.disciplinary}
                      </td>
                      <td>{row.totalBonus == null ? "" : row.totalBonus}</td>
                      <td>
                        {row.totalPenalty == null ? "" : row.totalPenalty}
                      </td>
                      <td>{row.gpa == null ? "" : row.gpa}</td>
                      <td>
                        <Button
                          className="btn btn-secondary"
                          type="button"
                          variant="link"
                          onClick={() => handleModal(row.id)}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Row style={{ margin: "auto auto 0" }}>
              <Col>
                <Container
                  fluid
                  className="pagination d-flex align-items-center justify-content-center"
                  style={{ width: "840px" }}
                >
                  <Button
                    className="btn-fill m-1  btn-sm"
                    onClick={() => goToPage(1)}
                    disabled={currentIndex === 1}
                  >
                    {"<<"}
                  </Button>
                  <Button
                    className="btn-fill m-1  btn-sm"
                    onClick={() => goToPage(currentIndex - 1)}
                    disabled={currentIndex === 1}
                  >
                    {"<"}
                  </Button>
                  <Button
                    className="btn-fill m-1  btn-sm"
                    onClick={() => goToPage(currentIndex + 1)}
                    disabled={currentIndex === maxIndex}
                  >
                    {">"}
                  </Button>
                  <Button
                    className="btn-fill m-1  btn-sm me-3"
                    onClick={() => goToPage(maxIndex)}
                    disabled={currentIndex === maxIndex}
                  >
                    {">>"}
                  </Button>
                  <span>
                    Page <strong>{currentIndex} </strong>
                    of <strong>{maxIndex}</strong>
                    {" | "}
                  </span>
                  <span>
                    Go to page:{" "}
                    <Input
                      type="number"
                      className="d-inline"
                      value={currentIndex}
                      style={{ width: "100px" }}
                      onChange={(e) => handleChangeIndexEvent(e)}
                    />
                  </span>
                </Container>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Modal
          className="score-modal"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Body>
            <Table striped hover className="text-nowrap">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <div
                      style={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Topic
                    </div>
                  </th>
                  <th>
                    <div
                      style={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Subject Type
                    </div>
                  </th>
                  <th>
                    <div
                      style={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Score
                    </div>
                  </th>
                  <th>
                    <div
                      style={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Weight
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {topicMark.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.topic_name}</td>
                    <td>{row.subject_type}</td>
                    <td>{row.score == null ? "" : row.score}</td>
                    <td>{row.subject_weight == null ? "" : row.subject_weight}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <div className="modal-footer justify-content-end">
            <Button
              variant="secondary"
              className="btn btn-fill"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      </Container>
    </>
  );
}

export default ManageScore;
