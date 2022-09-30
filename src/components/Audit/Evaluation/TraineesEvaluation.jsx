import React, { useEffect, useRef, useState } from "react";
import { Button, Stack, Badge, Modal, CloseButton } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import DetailEvaluation from "components/Audit/Evaluation/DetailEvaluation";
import { EvaluationTable } from "components/Audit/Evaluation/EvaluationTable";
import { useDispatch, useSelector } from "react-redux";
import { Classes, Trainees, Sessions, MaxPage, Trainee, TraineeLoading, Class, Session, CurrentPage } from "redux/selectors/auditorsSelector/evaluationSelectors";
import { changeClass, changeSession, setTrainee, setCurrentPage, fetchTrainees, fetchSessions, fetchEvaluate, fetchClasses } from "redux/auditorsSlice/evaluationSlice";
import Selection from "components/Audit/Evaluation/Selection";

function TraineeEvaluation() {
  const [showModal, setShowModal] = useState(false);
  const notificationAlertRef = useRef();

  const notify = (m, t, a = 3) => {
    let options = {};
    options = {
      place: 'tr',
      message: m,
      type: t,
      icon: 'nc-icon nc-bell-55',
      autoDismiss: a,
    };
    notificationAlertRef.current?.notificationAlert(options);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses({notify: notify}));
  }, []);

  const clickActionHandler = (id) => {
    dispatch(setTrainee(id));
    dispatch(fetchEvaluate({ id: id, notify: notify }));
    setShowModal(true);
  };
  const trainee = useSelector(Trainee);

  const obj = [
    {
      Header: "#",
      accessor: "id",
      Filter: () => null,
    },
    {
      Header: "Full Name",
      accessor: "full_name",
      Filter: () => null,
    },
    {
      Header: "Email",
      accessor: "email",
      Filter: () => null,
    },
    {
      Header: "Date Evaluated",
      accessor: "date_evaluated",
      Filter: () => null,
    },
    {
      Header: "Grade",
      accessor: "score",
      Filter: () => null,
      Cell: (p) => {
        return p.value >= 8.0 ? (
          <Badge bg="success">{p.value}</Badge>
        ) : p.value > 5.0 ? (
          <Badge bg="warning">{p.value}</Badge>
        ) : (
          <Badge bg="danger">{p.value}</Badge>
        );
      },
    },
    {
      Header: "Action",
      accessor: "individual_report_id",
      Filter: () => null,
      Cell: (row) => {
        return (
          <Button
            className="button-showModal"
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => clickActionHandler(row.value)}
          >
            <i className="fas fa-eye"></i>
          </Button>
        );
      },
    },
  ];
  const [isDisabled, setIsDisabled] = useState(true);
  const columns = React.useMemo(() => obj, []);
  const traineesList = useSelector(Trainees);
  const classList = useSelector(Classes);
  const sessionList = useSelector(Sessions);
  const maxIndex = useSelector(MaxPage);
  const currPage = useSelector(CurrentPage);
  const classSelected = useSelector(Class);
  const sessionSelected = useSelector(Session);

  useEffect(() => {
    if (classSelected !== '' && sessionSelected !== '')
      dispatch(fetchTrainees({ class: classSelected, session: sessionSelected, index: currPage, notify: notify }));
  }, [classSelected, sessionSelected, currPage]);

  const classSelectHandler = (e) => {
    if (isDisabled) setIsDisabled(false);
    dispatch(changeClass(e));
    dispatch(fetchSessions({ id: e, notify: notify }));
  };

  const sessionSelectHandler = (e) => {
    dispatch(changeSession(e));
  };

  return (
    <div id="trainees-evaluation">
      <NotificationAlert ref={notificationAlertRef} />
      <Selection
        handleClass={classSelectHandler}
        handleSession={sessionSelectHandler}
        classList={classList}
        sessionList={sessionList}
        isDisabled={isDisabled}
      />
      <EvaluationTable
        id="trainees-component"
        columns={columns}
        data={traineesList}
        currentIndex={currPage}
        maxIndex={maxIndex}
        setCurrentIndex={(i) => dispatch(setCurrentPage(i))}
        load={TraineeLoading}
      />
      <Modal
        className="modal-primary"
        show={showModal}
        onHide={() => setShowModal(false)}
        scrollable
        fullscreen
      >
        <Modal.Header>
          <Modal.Title
            style={{
              textTransform: "uppercase",
            }}
            className="fw-semibold fs-3 text-primary"
          >
            Detail of evaluation
          </Modal.Title>
          <CloseButton
            className="button-closeModal"
            onClick={() => setShowModal(false)}
          ></CloseButton>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "500px" }}>
          <DetailEvaluation></DetailEvaluation>
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="horizontal" gap={3}>
            <span style={{ fontWeight: "bold" }}>
              <span style={{ color: "#9C9C9C" }}>Trainee name: </span>
              <span style={{ color: "#808080" }}>{trainee.full_name}</span>
            </span>
            <strong>
              <span style={{ color: "#808080" }}>|</span>
            </strong>
            <span style={{ fontWeight: "bold", color: "#808080" }}>
              GPA: <Badge bg={trainee.score >= 8.0 ? "success" : trainee.score > 5.0 ? "warning" : "danger"}>
                {trainee.score}
              </Badge>
            </span>
          </Stack>
        </Modal.Footer>
      </Modal>
    </div>
  );

}

export default TraineeEvaluation;
