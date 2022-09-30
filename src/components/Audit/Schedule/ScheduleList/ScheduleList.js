import React, { useEffect , useRef} from "react";
import TableSchedule from "components/Audit/Schedule/ScheduleList/TableSchedule";
import ModalScheduleEdition from "components/Audit/Schedule/ScheduleList/Modal/ModalScheduleEdition";
import ModalScheduleRowDeletion from "components/Audit/Schedule/ScheduleList/Modal/ModalScheduleRowDeletion";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { setScheduleID, fetchSchedule, fetchTrainerList} from "redux/auditorsSlice/scheduleSlice";
import { schedules } from "redux/selectors/auditorsSelector/scheduleSelector";
import { isLoadingSchedule } from "redux/selectors/auditorsSelector/scheduleSelector";
import NotificationAlert from "react-notification-alert";
import 
{
  idChange, 
  isOpenModalDeleteChange,
  isOpenEditChange,
  formChange,
} from "redux/auditorsSlice/scheduleSlice"
function ScheduleList() {
  const notificationAlertRef = React.useRef(null);
  const notify = (place, message, type, icon) => {
    let notifyoptions = {};
    notifyoptions = {
        place: place,
        message: message,
        type: type,
        icon: icon,
        autoDismiss: 4,
    };
    notificationAlertRef.current.notificationAlert(notifyoptions);
};
  const { url } = useRouteMatch()
  const dispatch = useDispatch()
  dispatch (fetchSchedule)
  const scheduleList = useSelector(schedules)
  
  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        Filter: () => null,
        accessor: "no",
      },
      {
        Header: "Auditor",
        accessor: "nameAuditor",
        Filter: () => null,
      },
      {
        Header: "Date",
        accessor: "date",
        Filter: () => null,
      },
      {
        Header: "Room",
        accessor: "room",
        Filter: () => null,
      },
      {
        Header: "Action",
        accessor: 'id',
        Filter: () => null,
        Cell: row => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link
                to={`${url}/detail`}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => dispatch(setScheduleID(row.value))}
                >
                  <i className="fas fa-eye"></i>
                </Button>
              </Link>
              <Button
                    onClick={()=>{
                      dispatch(isOpenEditChange(true))
                      dispatch(idChange(row.row.original.id))
                      dispatch(formChange({
                        id: row.row.original.id,
                        Trainer: row.row.original.auditor,
                        date: row.row.original.date,
                        room: row.row.original.room,
                      }))
                    }}
                variant="primary"
                size="sm"
                style={{ marginLeft: "2%" }}
              >
                <i className="fas fa-pen-square"></i>
              </Button>
              <Button
                onClick={()=>{
                  dispatch(idChange(row.row.original.id))
                  dispatch(isOpenModalDeleteChange(true))
                }}
                variant="danger"
                size="sm"
                style={{ marginLeft: "2%" }}
              >
                <i className="fas fa-trash"></i>
              </Button>
          </div>
        ),
      }
    ],
    []
  );

  const [selectedRows, setSelectedRows] = React.useState([])

  return (

    <div className="ScheduleList">
      <NotificationAlert ref={notificationAlertRef} />
      <TableSchedule  load={isLoadingSchedule} columns={columns} data={scheduleList} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      <ModalScheduleEdition
        notify={notify}
      />

      {/* Delete Each Row  */}
      <ModalScheduleRowDeletion
        notify={notify}
      />
    </div>
  );
}

export default ScheduleList;
