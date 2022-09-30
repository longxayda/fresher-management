
import React, { useEffect, useRef } from "react";
import TableDetail from "components/Audit/Schedule/Detail/TableDetail";
import ModalDetailEvaluate from "components/Audit/Schedule/Detail/Modal/ModalDetailEvaluate";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { fetchTraineeList, setTrainee } from 'redux/auditorsSlice/scheduleSlice';
import { traineeListSchedule, scheduleID, isLoadingSchedule} from "redux/selectors/auditorsSelector/scheduleSelector";

import NotificationAlert from "react-notification-alert";
function Detail() {
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
  
  const dispatch = useDispatch()
  const [dataModal, setDataModal] = React.useState({})
  const [isOpen, setIsOpen] = React.useState(false);
  const hideModal = () => {
    setIsOpen(false);
    setDataModal({})
  };

  const schedule_id = useSelector(scheduleID)
  useEffect(() => {
    dispatch(fetchTraineeList({id: schedule_id, notify: notify}))
  }, [])
  const TraineeList = useSelector(traineeListSchedule)
  const actionClicHandle = (id) => {
    setIsOpen(true)
    dispatch(setTrainee(id))
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Trainee's name",
        accessor: "traineeName",
        Filter: () => null,
      },
      {
        Header: "Email",
        accessor: "email",
        Filter: () => null,
      },
      {
        Header: "Grade",
        accessor: "grade",
        Filter: () => null,
      },

      {
        Header: "Action",
        accessor: 'action',
        Filter: () => null,
        Cell: row => (
          <div style={{ alignItems: 'center' }}>
            <Button
              onClick={() => {actionClicHandle(row.row.original.idTrainee) }}
              variant={row.value == "unGrade" ? "success" : "primary"}
              size="sm"
            >
              <i className="fas fa-pen-square" />
            </Button>
          </div>
        ),
      }
    ],
    []
  );

  return (
    <div className="detail">
      <NotificationAlert ref={notificationAlertRef} />

      <TableDetail columns={columns} data={TraineeList} load={isLoadingSchedule} />

      <ModalDetailEvaluate isOpen={isOpen} hideModal={hideModal} dataModal={dataModal} notify={notify}/>
    </div>
  );
}
export { Detail };
export default Detail;
