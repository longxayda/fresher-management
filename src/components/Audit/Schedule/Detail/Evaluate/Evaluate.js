
import React, { useEffect, useRef } from "react";
import TableEvaluate from "components/Audit/Schedule/Detail/Evaluate/TableEvaluate";

import ModalDetailEvaluate from "components/Audit/Schedule/Detail/Modal/ModalDetailEvaluate";
import ModalDetailRowDeletion from "components/Audit/Schedule/Detail/Modal/ModalDetailRowDeletion";
import ModalDetailSelectedDeletion from "components/Audit/Schedule/Detail/Modal/ModalDetailSelectedDeletion";
import ModalDetailSearch from "components/Audit/Schedule/Detail/Modal/ModalDetailSearch";

import { Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { fetchQuestionList, addfieldEvaluationChange , deleteQuestionEvaluate, setScheduleID,setTrainee } from "redux/auditorsSlice/scheduleSlice"
import { QuestionList, scheduleID, IDtrainee, totalItemEvaluationSchedule , fieldEvaluationSchedule} from "redux/selectors/auditorsSelector/scheduleSelector";
import { isLoadingSchedule } from "redux/selectors/auditorsSelector/scheduleSelector";
import NotificationAlert from "react-notification-alert";
function Evaluate() {

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
  const schedule_id = useSelector(scheduleID)
  const trainee_id = useSelector(IDtrainee)
  const totalItems = useSelector(totalItemEvaluationSchedule)
  useEffect(() => {
    dispatch(fetchQuestionList({ id: schedule_id, idTrainee: trainee_id, notify: notify }))
  }, [totalItems])
  const question = useSelector(QuestionList)
const field=useSelector(fieldEvaluationSchedule)
  const [id, setId] = React.useState(null)
  const [updateQuestion, setUpdateQuestion] = React.useState("")
  const [updateEva, setupdateEva] = React.useState()
  const [updateType, setUpdateType] = React.useState("")
  const [updateComment, setUpdateComment] = React.useState()
  const [updateLevel, setUpdateLevel] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(false);
  const hideModal = () => {
    setIsOpen(false);
    setDataModal({})
  };
  const handleDataModal = (data) => {
    setIsOpen(true)
    setDataModal(data)
  }
  const [isOpenSearch, setIsOpenSearch] = React.useState(false);
  const hideModalSearch = () => {
    setIsOpenSearch(false);
    setDataModal({})
  };
  const handleDataModalSearch = (data) => {
    setIsOpenSearch(true)
    setDataModal(data)
  }

  const [isOpenDelete, setIsOenDelete] = React.useState(false)
  const handleOpenDelete = () => {
    if (selectedRows.length) {
      setIsOenDelete(true)
    }
    else {
      window.alert('Choose questions to delete')
    }
  }
  const hideOpenDelete = () => {
    setIsOenDelete(false)
    setId(null)
    setUpdateQuestion("")
    setupdateEva("")
    setUpdateType("")
    setUpdateLevel("")
    setUpdateComment("")
  }
  const [isOpenRowDeleteModal, setIsOpenRowDeleteModal] = React.useState(false)
  const handleOpenRowDeleteModal = (data) => {
    setIsOpenRowDeleteModal(true);
    setDataModal(data)
    setId(data.id)
    
  }
  const hideOpenRowDeleteModal = () => {
    setIsOpenRowDeleteModal(false)
    setDataModal({})
    setId(null)
  }
  function onSumbitDeleteRow() {
    setIsOpenRowDeleteModal(false)
    setId(null)
    setDataModal({})
    dispatch(deleteQuestionEvaluate({idSchedule: schedule_id , IDtrainee: trainee_id, id: id}))
  }

  const [data, setData] = React.useState([])

  const [dataModal, setDataModal] = React.useState({})

  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: "no",
        Filter: () => null,
        Cell: (row) => {
          return <div>{Number(row.row.id) + 1}</div>;
        }, width: '6%',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "Question",
        accessor: "question",
        Filter: () => null,

      },
      {
        Header: "Question level",
        accessor: "level",
        Filter: () => null,
      },
      {
        Header: "Comment",
        accessor: "comment",
        Filter: () => null,
        Cell: row => {
          let temp = field.find(item => {
            item.id == row.row.original.id
          })
          return (
            <>
              <input
                type="text"
                style={{ width: '100px' }}
                defaultValue={row.row.original.comment}
                onChange={e => dispatch(addfieldEvaluationChange({ id: row.row.original.id, comment: e.target.value, score: temp ? temp.score : row.row.original.evaluate }))}
              /></>
          )
        },
      },
      {
        Header: "Evaluate",
        accessor: "evaluate",
        Filter: () => null,
        Cell: row => {
          let temp = field.find(item => {
            item.id == row.row.original.id
          })
          return (
            <>
              <input
                type="number"
                style={{ width: '100px' }}
                defaultValue={row.row.original.evaluate}
                onChange={e => dispatch(addfieldEvaluationChange({ id: row.row.original.id, score: e.target.value, comment: temp ? temp.comment : row.row.original.comment }))}
              /></>
          )
        },
      },
      {
        Header: "Action",
        accessor: 'action',
        Filter: () => null,
        Cell: row => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {handleOpenRowDeleteModal(row.row.original)}}
              variant="danger"
              style={{ height: '40px', width: '20px', display: 'flex', justifyContent: 'center' }}
            >
              <i className="fas fa-trash" style={{ fontSize: '18px' }}></i>
            </Button>
          </div>
        ),

      }
    ],
    []
  );


  return (
    <div className="evaluate">

      <NotificationAlert ref={notificationAlertRef} />

      <TableEvaluate load={isLoadingSchedule} columns={columns} data={question} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleDataModalSearch={handleDataModalSearch} handleDataModal={handleDataModal} handleOpenDelete={handleOpenDelete} />

      <ModalDetailEvaluate isOpen={isOpen} hideModal={hideModal} dataModal={dataModal} id={id} notify={notify} />

      <ModalDetailSearch isOpenSearch={isOpenSearch} hideModalSearch={hideModalSearch} dataModal={dataModal} notify={notify} setIsOpenSearch={setIsOpenSearch} />

      <ModalDetailSelectedDeletion isOpenDelete={isOpenDelete} hideOpenDelete={hideOpenDelete} selectedRows={selectedRows} notify={notify} />

      <ModalDetailRowDeletion
        isOpenRowDeleteModal={isOpenRowDeleteModal}
        hideOpenRowDeleteModal={hideOpenRowDeleteModal}
        dataModal={dataModal}
        onSumbitDeleteRow={onSumbitDeleteRow}
        notify={notify}
      />
    </div>
  );
}
export { Evaluate };
export default Evaluate;
