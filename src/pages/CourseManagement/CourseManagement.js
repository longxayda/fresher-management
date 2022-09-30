import React, { useState, useEffect } from "react";
import ModalCreateModule from "components/CourseManagement/ModalCreateModule";
import ListModule from "components/CourseManagement/ListModule";
import { useSelector, useDispatch } from "react-redux";
import {
  isErrorModuleSelector,
  isSuccessModuleSelector,
} from "redux/selectors/moduleSelector";
import { 
  isErrorTopicSelector,
  isSuccessTopicSelector,
} from "redux/selectors/topicSelector";
import NotificationAlert from "react-notification-alert";
import {resetModule} from "redux/classManagementSlice/moduleSlice";
import {resetTopic} from "redux/classManagementSlice/topicSlice";

var optionsModule = {};
optionsModule = {
  place: "tr",
  message: (
    <div>
      <div>Get list module failed</div>
    </div>
  ),
  type: "danger",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 7,
};

var optionsTopic = {};
optionsTopic = {
  place: "tr",
  message: (
    <div>
      <div>Get list topic failed</div>
    </div>
  ),
  type: "danger",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 7,
};

function CourseManagement() {
  const [open, setOpen] = useState(false);
  const isErrorModule = useSelector(isErrorModuleSelector);
  const isSuccessModule = useSelector(isSuccessModuleSelector);
  const isErrorTopic = useSelector(isErrorTopicSelector);
  const isSuccessTopic = useSelector(isSuccessTopicSelector);
  const dispatch = useDispatch();
  const notificationAlert = React.useRef();

  useEffect(() => {
    if (isErrorModule){
      notificationAlert.current.notificationAlert(optionsModule);
      dispatch(resetModule());
    }
  }, [isErrorModule]);
  useEffect(() => {
    if (isSuccessModule != undefined){
      let optionsModule = {};
      if (isSuccessModule){
        optionsModule = {
          place: "tr",
          message: (
            <div>
              <div>Create module successfully</div>
            </div>
          ),
          type: "success",
          icon: "now-ui-icons ui-1_bell-53",
          autoDismiss: 7,
        };
      } else {
        optionsModule = {
          place: "tr",
          message: (
            <div>
              <div>Create module failed</div>
            </div>
          ),
          type: "danger", 
          icon: "now-ui-icons ui-1_bell-53",
          autoDismiss: 7,
        };
      }
      notificationAlert.current.notificationAlert(optionsModule);
      dispatch(resetModule());
    }
  }, [isSuccessModule]);

  useEffect(() => {
    if (isErrorTopic){
      notificationAlert.current.notificationAlert(optionsTopic);
      dispatch(resetTopic());
    }
  }, [isErrorTopic]);
  useEffect(() => {
    if (isSuccessTopic != undefined){
      let optionsTopic = {};
      if (isSuccessTopic){
        optionsTopic = {
          place: "tr",
          message: (
            <div>
              <div>Create topic successfully</div>
            </div>
          ),
          type: "success",
          icon: "now-ui-icons ui-1_bell-53",
          autoDismiss: 7,
        };
      } else {
        optionsTopic = {
          place: "tr",
          message: (
            <div>
              <div>Create topic failed</div>
            </div>
          ),
          type: "danger", 
          icon: "now-ui-icons ui-1_bell-53",
          autoDismiss: 7,
        };
      }
      notificationAlert.current.notificationAlert(optionsTopic);
      dispatch(resetTopic());
    }
  }, [isSuccessTopic]);

  return (
    <>
      <div className="container-fluid">
        {open && <ModalCreateModule open={open} setOpen={setOpen} />}
        <NotificationAlert ref={notificationAlert} />
        <ListModule setOpen={setOpen} />
      </div>
    </>
  );
}

export default CourseManagement;