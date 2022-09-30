import React,{useEffect, useState} from "react";
import TableResource from "components/Audit/Resource/TableResource";
import DetailResourceModal from "components/Audit/Resource/ResourceModal/DetailResourceModal";
import UpdateResourceModal from "components/Audit/Resource/ResourceModal/UpdateResourceModal";
import DeleteResourceModal from "components/Audit/Resource/ResourceModal/DeleteResourceModal";
import { Button,Badge } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { questionListResource, maxPageResourse,totalQuestionResource, isDeleteQuestionResource } from 'redux/selectors/auditorsSelector/resourceSelectors'
import 
{
  idChange, 
  dataModalChange,
  isOpenModalAddEditChange,
  isOpenModalDetailChange,
  isOpenModalDeleteChange,
  formChange,
  isDeleteQuestionChange
} from "redux/auditorsSlice/resourceSlice"
import { fetchQuestions, fetchSearchQuestions, fetchSkillList, fetchModule } from "redux/auditorsSlice/resourceSlice";
import NotificationAlert from "react-notification-alert";

function Resource() {
  const dispatch = useDispatch()
  const columns = React.useMemo(
    () => [
          {
            Header: "Code",
            Filter: () => null,
            accessor: (row) => {return "N" + row.id},
          },
          {
            Header: "Question",
            accessor: "question",
            Filter: () => null,
            Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>
          },
          {
            Header: "Skill",
            accessor: "skill",
            Filter: () => null,
          },
          {
            Header: "Level",
            accessor: "level",
            Filter: () => null,
          },
          {
            Header: "Status",
            accessor: "status",
            Filter: () => null,
            Cell: s => (
                <Badge bg={s.value == 'Approve' ? 'success' : 'secondary'}>
                    {s.value}  
                </Badge>
            )
          },
          {
            Header:"Action",
            accessor: 'action',
            Filter: () => null,
            Cell: row => (
            <div style={{display:'flex', justifyContent:'center'}}>
               <Button 
                    onClick={()=>{
                      dispatch(isOpenModalDetailChange(true))
                      dispatch(dataModalChange(row.row.original))
                    }}
                    style={{marginRight: '8px'}}
                    variant="secondary"
                    size="sm"
                    className="btn-row-detail"
                >
                    <i className="fas fa-eye"></i>
                </Button>
                <Button 
                    onClick={()=>{
                      dispatch(isOpenModalAddEditChange(true))
                      dispatch(idChange(row.row.original.id))
                      dispatch(formChange({
                        question: row.row.original.question,
                        answer: row.row.original.answer,
                        skill: row.row.original.skill,
                        status: row.row.original.status,
                        level: row.row.original.level,
                        module: row.row.original.module,
                      }))
                    }}
                    style={{marginRight: '8px'}}
                    variant="primary"
                    size="sm"
                    className="btn-row-edit"
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
                    className="btn-row-delete"
                >
                    <i className="fas fa-trash"></i>
                </Button>
            </div>
            ),
          }
        ],
    []
  );
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

  const [currentPage, setCurrentPage] = useState(1);
  const [inputSearch, setInputSearch] = useState("");
  const maxIndexPage = useSelector(maxPageResourse);
  const questionList = useSelector(questionListResource)  
  const totalQuestions = useSelector(totalQuestionResource)
  const isDeleteQuestion = useSelector(isDeleteQuestionResource)
  
  useEffect(()=>{
    if(inputSearch === ""){
      dispatch(fetchQuestions({data: (isDeleteQuestion && questionList.length == 0 ? ((currentPage - 1) <= 0 ? 1 : (currentPage - 1)) : currentPage), notify: notify}))
    }else{
      dispatch(fetchSearchQuestions({currentPage:  (isDeleteQuestion && questionList.length == 0 ? ((currentPage - 1) <= 0 ? 1 : (currentPage - 1)) : currentPage), keyword: inputSearch, notify: notify}))
    }
    if(isDeleteQuestion && questionList.length == 0){
      dispatch(isDeleteQuestionChange(false))
      setCurrentPage((currentPage - 1) <= 0 ? 1 : (currentPage - 1))
    }
    dispatch(fetchSkillList(notify)) 
    dispatch(fetchModule(notify))
  },[ currentPage, inputSearch, totalQuestions])
  return (
    <div id="resourceAuditId"className="resource">
      <NotificationAlert ref={notificationAlertRef} />
      <TableResource 
          columns={columns} 
          data={questionList} 
          maxIndexPage={maxIndexPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setInputSearch={setInputSearch}
          inputSearch={inputSearch}
      />
      
      <DetailResourceModal />

      <UpdateResourceModal notify={notify}/>

      <DeleteResourceModal notify={notify} /> 
    </div>
  );
}
export default Resource;
