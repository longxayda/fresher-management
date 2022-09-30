import React, { useEffect, useMemo, useState, useRef } from "react";
import TopicTable from "components/TopicTable/CustomTable";
import NotificationAlert from "react-notification-alert";
import { notify } from "components/Modal/notify";
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import TopicModal from "components/TopicTable/TopicModal";
import {
  columnsModal,
  columns,
  dataTopicID,
  columnsModalFinalMark,
  columnsTopicID,
  columnsModalAssignment,
} from "constants/topic-data";
import { useSelector, useDispatch } from "react-redux";
import { getAllClass } from "redux/fresherManageSlice/scoreSlice";
import {
  getModuleFromClass,
  getModuleMarkOfAll,
} from "redux/fresherManageSlice/topicMarkSlice";
import {
  selectQuiz,
  selectAssignment,
  selectFinalMark,
  selectScore,
} from "redux/selectors/topicSelector";
import {
  updateDetailTraineeMark,
  updateDetailListTraineeMark,
  clearScore,
} from "redux/fresherManageSlice/topicMarkSlice";
import { getModuleById } from "redux/fresherManageSlice/topicMarkSlice";
import { updateModuleTopic } from "redux/fresherManageSlice/topicMarkSlice";
import "assets/css/score.css";
function TopicID() {
  const notificationAlertRef = useRef(null);
  const { topicId } = useParams();
  console.log("TopicID", topicId);
  const dispatch = useDispatch();
  const [topicIdData, setTopicIdData] = useState([]);
  const [editScore, setEditScore] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [showFinalMark, setShowFinalMark] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const loading = useSelector((state) => state.topic.isLoading);
  const moduleTable = useSelector((state) => state.topic.moduleTable);
  const score = useSelector(selectScore);
  const quizMark = useSelector(selectQuiz);
  const detailTraineeMark = useSelector(
    (state) => state.topic.detailTraineeMark
  );
  const assignmentMark = useSelector(selectAssignment);
  const finalMark = useSelector(selectFinalMark);
  const moduleName = moduleTable.find((row) => row.id == topicId);
  const moduleNameTopic = moduleName?.name;

  const dataModalQuiz = useMemo(() => {
    return [
      {
        id: detailTraineeMark?.id,
        name: detailTraineeMark?.name,
        quiz1: quizMark?.[0],
        quiz2: quizMark?.[1],
        quiz3: quizMark?.[2],
        quiz4: quizMark?.[3],
        quiz5: quizMark?.[4],
      },
    ];
  }, [quizMark]);
  const dataModalAssignment = useMemo(() => {
    return [
      {
        id: detailTraineeMark?.id,
        name: detailTraineeMark?.name,
        assignment1: assignmentMark?.[0],
        assignment2: assignmentMark?.[1],
        assignment3: assignmentMark?.[2],
      },
    ];
  }, [assignmentMark]);
  const dataModalFinalMark = useMemo(() => {
    return [
      {
        id: detailTraineeMark?.id,
        name: detailTraineeMark?.name,
        finalAudit: finalMark?.[0],
        finalPractice: finalMark?.[1],
      },
    ];
  }, [finalMark]);

  const handleUpdateScore = async (setShowModal) => {
    let flag = true;
    score.forEach((val) => {
      if (val?.score > 10 || val?.score < 0) {
        notify(
          "tr",
          "danger",
          "Score must be between 0 and 10",
          notificationAlertRef
        );
        flag = false;
        dispatch(clearScore());
      }
    });
    if (flag) {
      if (score.length === 1) {
        try {
          await dispatch(updateDetailTraineeMark(score[0])).unwrap();
          notify(
            "tr",
            "success",
            "Successfull update score",
            notificationAlertRef
          );
          setShowModal(false);
          setEditScore(score);
        } catch (error) {
          notify("tr", "danger", error, notificationAlertRef);
        }
      } else {
        try {
          await dispatch(updateDetailListTraineeMark(score)).unwrap();

          notify(
            "tr",
            "success",
            "Successfull update score",
            notificationAlertRef
          );
          setShowModal(false);
          setEditScore(score);
        } catch (error) {
          notify("tr", "danger", error, notificationAlertRef);
        }
      }
      dispatch(clearScore());
      setIsEdit(true);
    }
  };
  const handleEditScore = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    let isMounted = true;
    dispatch(getModuleMarkOfAll(topicId))
      .unwrap()
      .then((res) => {
        if (isMounted) setTopicIdData(res);
      });
    return () => {
      isMounted = false;
    };
  }, [topicId, editScore]);

  return (
    <div>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="fw-semibold fs-2 text-primary">
        Module: {moduleNameTopic}
      </div>
      {/* Hide the quiz  */}
      <TopicModal
        triggerUpdateScore={() => handleUpdateScore(setShowQuiz)}
        show={showQuiz}
        triggerModal={() => setShowQuiz(!showQuiz)}
        columnsModal={columnsModal}
        data={dataModalQuiz}
        isEdit={isEdit}
        triggerEditScore={handleEditScore}
      >
        QUIZ TEST SCORES
      </TopicModal>
      <TopicModal
        triggerUpdateScore={() => handleUpdateScore(setShowAssignment)}
        show={showAssignment}
        triggerModal={() => setShowAssignment(!showAssignment)}
        columnsModal={columnsModalAssignment}
        data={dataModalAssignment}
        isEdit={isEdit}
        triggerEditScore={handleEditScore}
      >
        ASSIGNMENT SCORES
      </TopicModal>
      <TopicModal
        triggerUpdateScore={() => handleUpdateScore(setShowFinalMark)}
        show={showFinalMark}
        triggerModal={() => setShowFinalMark(!showFinalMark)}
        columnsModal={columnsModalFinalMark}
        data={dataModalFinalMark}
        isEdit={isEdit}
        triggerEditScore={handleEditScore}
      >
        FINAL MARK
      </TopicModal>

      {loading ? (
        <div className="text-center">
          <Spinner
            variant="primary"
            animation="border"
            role="status"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "50px",
              height: "50px",
            }}>
          </Spinner>
        </div>
      ) : (
        <TopicTable
          module_id={topicId}
          columns={columnsTopicID}
          data={topicIdData}
          setShowQuiz={setShowQuiz}
          setShowAssignment={setShowAssignment}
          showQuiz={showQuiz}
          showAssignment={showAssignment}
          showFinalMark={showFinalMark}
          setShowFinalMark={setShowFinalMark}
        />
      )}
    </div>
  );
}
function Topic() {
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const allClass = useSelector((state) => state.score.class);

  const [classId, setClassId] = useState(0);
  const handleChangeClass = (e) => {
    setClassId(e.target.value);
  };

  const moduleTable = useSelector((state) => state.topic.moduleTable);

  const [currentPath, setCurrentPath] = useState("module");

  // loading variable
  const loading = useSelector((state) => state.topic.isLoading);
  const isLoadingUpdate = useSelector((state) => state.topic.isLoadingUpdate);
  const errorUpdate = useSelector((state) => state.topic.errorUpdate);
  const handleOpenModal = (id) => {
    setShowModal(true);
    dispatch(getModuleById([id]));
  };
  const moduleById = useSelector((state) => state.topic.moduleById);
  const isLoadingModule = useSelector((state) => state.topic.isLoadingModule);

  const [valueQuiz, setValueQuiz] = useState(moduleById.quizWeight);
  const [valueAssignment, setValueAssignment] = useState(
    moduleById.assignmentWeight
  );
  const [valueFinal, setValueFinal] = useState(moduleById.finalWeight);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdate = () => {
    dispatch(
      updateModuleTopic([
        moduleById.id,
        {
          name: moduleById.name,
          classId: moduleById.classId,
          classModuleId: moduleById.classModuleId,
          quizWeight: valueQuiz,
          assignmentWeight: valueAssignment,
          finalWeight: valueFinal,
        },
      ])
    )
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.data != {}) {
          setUpdateSuccess(true);
        }
        dispatch(getModuleFromClass([classId]));
      });
  };
  if (showModal === false && updateSuccess === true) {
    setUpdateSuccess(false);
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
      if (classId == 0) {
        setClassId(allClass[0].id);
        dispatch(getModuleFromClass([allClass[0].id]));
      } else {
        dispatch(getModuleFromClass([classId]));
      }
    }
    if (moduleById != {}) {
      setValueQuiz(moduleById.quizWeight);
      setValueAssignment(moduleById.assignmentWeight);
      setValueFinal(moduleById.finalWeight);
    }

    return () => {
      isMounted = false;
    };
  }, [classId, moduleById]);

  return (
    <Container>
      <Modal
        className="topic_modal modal-mini modal-primary"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Container>
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold fs-3 text-primary">
              UPDATE TOPIC MARK
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isLoadingModule || moduleById == {} ? (
              <Spinner
                animation="border"
                role="status"
                variant="primary"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "50px",
                  height: "50px",
                }}
              ></Spinner>
            ) : (
              <Table striped hover className="text-nowrap">
                <thead>
                  <tr>
                    <th colSpan="1" role="columnheader">
                      <div
                        className="heading"
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center"
                        }}
                      >
                        Module
                      </div>
                    </th>
                    <th colSpan="1" role="columnheader">
                      <div
                        className="heading"
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center"
                        }}
                      >
                        Quiz Weight
                      </div>
                    </th>
                    <th colSpan="1" role="columnheader">
                      <div
                        className="heading"
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center"
                        }}
                      >
                        Assignment Weight
                      </div>
                    </th>
                    <th colSpan="1" role="columnheader">
                      <div
                        className="heading"
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          textAlign: "center"
                        }}
                      >
                        Final Weight
                      </div>
                    </th>
                  </tr>
                </thead>

                <>
                  <tbody>
                    <tr>
                      <td>{moduleById.name}</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={moduleById.quizWeight}
                          // value = {valueQuiz==0 ? moduleById.quizWeight : valueQuiz}
                          onChange={(e) =>
                            setValueQuiz(parseFloat(e.target.value))
                          }
                          style={{ width: "50px", borderRadius: "10px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={moduleById.assignmentWeight}
                          onChange={(e) =>
                            setValueAssignment(parseFloat(e.target.value))
                          }
                          style={{ width: "50px", borderRadius: "10px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={moduleById.finalWeight}
                          onChange={(e) =>
                            setValueFinal(parseFloat(e.target.value))
                          }
                          style={{ width: "50px", borderRadius: "10px" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </>
              </Table>
            )}

            {isLoadingUpdate ? (
              <Spinner animation="border" role="status" variant="primary"></Spinner>
            ) : (
              ""
            )}
            {errorUpdate != "" ? (
              <p style={{ marginTop: "20px", color: "red" }}>
                Error from server {errorUpdate}
              </p>
            ) : (
              ""
            )}
            {valueQuiz + valueAssignment + valueFinal != 1 &&
            valueFinal != undefined ? (
              <p style={{ marginTop: "20px", color: "red" }}>
                The sum of quiz, assignment, final columns must be 1
              </p>
            ) : (
              ""
            )}
            {updateSuccess == true ? (
              <p style={{ marginTop: "20px", color: "green" }}>
                Updated success
              </p>
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            <Button
              variant="primary"
              type="submit"
              className="mx-2 btn btn-fill"
              disabled={
                valueQuiz + valueAssignment + valueFinal != 1 &&
                valueFinal != undefined
                  ? true
                  : false
              }
              onClick={handleUpdate}
            >
              Update Score
            </Button>
            <Button
              variant="secondary"
              className="btn btn-fill"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
      <div className="align-baseline mb-3">
        <Link
          to={`${url}`}
          onClick={() => setCurrentPath("module")}
          style={
            currentPath == "module" ? { color: "black", cursor: "pointer" } : {}
          }
        >
          Modules Page
        </Link>
        <i
          className="fa-solid fa-greater-than"
          style={{ margin: "0 15px" }}
        ></i>
        <Link
          to={`#`}
          style={
            currentPath == "subject"
              ? { pointerEvents: "none", color: "black", cursor: "pointer" }
              : {}
          }
        >
          Subject Class
        </Link>
      </div>
      <Route exact path={`${path}`}>
        <Row className="mb-4">
          <Col md={3}>
            <Form.Select onChange={(e) => handleChangeClass(e)}>
              {allClass.map((row, index) => {
                return (
                  <option key={index} value={row.id}>
                    {row.classCode}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        </Row>

        {loading ? (
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "50px",
              height: "50px",
            }}
          ></Spinner>
        ) : (
          <Table striped hover className="text-nowrap">
            <thead>
              <tr>
                <th colSpan="1" role="columnheader">
                  <div
                    className="heading"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center"
                    }}
                  >
                    #
                  </div>
                </th>
                <th colSpan="1" role="columnheader">
                  <div
                    className="heading"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center"
                    }}
                  >
                    Module
                  </div>
                </th>
                <th colSpan="1" role="columnheader">
                  <div
                    className="heading"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center"
                    }}
                  >
                    Quiz Weight
                  </div>
                </th>
                <th colSpan="1" role="columnheader">
                  <div
                    className="heading"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center"
                    }}
                  >
                    Assignment Weight
                  </div>
                </th>
                <th colSpan="1" role="columnheader">
                  <div
                    className="heading"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center"
                    }}
                  >
                    Final Weight
                  </div>
                </th>
                <th colSpan="1" role="columnheader">
                  <div
                    className="heading"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center"
                    }}
                  >
                    Detail
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {moduleTable.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Button
                        className="btn-simple"
                        type="button"
                        variant="link"
                        onClick={(id) => handleOpenModal(row.id)}
                      >
                        {row.name}
                      </Button>
                    </td>
                    <td>{row.quizWeight}</td>
                    <td>{row.assignmentWeight}</td>
                    <td>{row.finalWeight}</td>
                    <td>
                      <Link to={`${url}/modules/${row.id}`} onClick={() => setCurrentPath("subject")}>
                        <Button>
                          <i className="fa-solid fa-eye"></i>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Route>
      <Route path={`${path}/modules/:topicId`}>
        <TopicID />
      </Route>
    </Container>
  );
}

export default Topic;
