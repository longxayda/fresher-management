
import React,{useEffect, useState} from "react";
import TableSearch from "components/Audit/Schedule/Detail/Search/TableSearch"
import UpdateResourceModal from "components/Audit/Resource/ResourceModal/UpdateResourceModal";
import { useSelector, useDispatch } from "react-redux";
import { questionListResource, maxPageResourse } from 'redux/selectors/auditorsSelector/resourceSelectors'
import { fetchQuestions, fetchSearchQuestions, fetchSkillList, fetchModule } from "redux/auditorsSlice/resourceSlice";
import NotificationAlert from "react-notification-alert";

function Search() {

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
  useEffect(()=>{
    if(inputSearch === ""){
      dispatch(fetchQuestions({data: currentPage, notify: notify}))
    }else{
      dispatch(fetchSearchQuestions({currentPage: currentPage, keyword: inputSearch, notify: notify}))
    }
    dispatch(fetchSkillList(notify)) 
    dispatch(fetchModule(notify))
  },[dispatch, currentPage, inputSearch])
  return (
    <div id="resourceAuditId"className="resource">
      <NotificationAlert ref={notificationAlertRef} />
      <TableSearch
          columns={columns} 
          data={questionList} 
          maxIndexPage={maxIndexPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setInputSearch={setInputSearch}
          inputSearch={inputSearch}
      />
      
      <UpdateResourceModal notify={notify}/>
    </div>
  );
}

export default Search;

