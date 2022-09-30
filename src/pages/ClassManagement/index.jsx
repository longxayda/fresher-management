import React, { useEffect, useState } from "react";
import ModalCreateClass from "components/ClassManagement/ModalCreateClass";
import ListClass from "components/ClassManagement/ListClass";
import { useDispatch, useSelector } from "react-redux";
import {
  isErrorSelector,
  isSuccessSelector,
} from "redux/selectors/classSelector";
import NotificationAlert from "react-notification-alert";
import { resetError } from "redux/classManagementSlice/classSlice";

var options = {};
options = {
  place: "tr",
  message: (
    <div>
      <div>Get list class failed</div>
    </div>
  ),
  type: "danger",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 7,
};

function ClassManagement() {
  const [open, setOpen] = useState(false);
  const isError = useSelector(isErrorSelector);
  const isSuccess = useSelector(isSuccessSelector);
  const dispatch = useDispatch();
  const notificationAlert = React.useRef(null);
  useEffect(() => {
    if (isError) {
      notificationAlert.current.notificationAlert(options);
      dispatch(resetError());
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess != undefined) {
      var options = {};
      if (isSuccess) {
        options = {
          place: "tr",
          message: (
            <div>
              <div>Create class successfully</div>
            </div>
          ),
          type: "success",
          icon: "now-ui-icons ui-1_bell-53",
          autoDismiss: 7,
        };
      } else {
        options = {
          place: "tr",
          message: (
            <div>
              <div>Create class failure</div>
            </div>
          ),
          type: "danger",
          icon: "now-ui-icons ui-1_bell-53",
          autoDismiss: 7,
        };
      }
      notificationAlert.current.notificationAlert(options);
      dispatch(resetError());
    }
  }, [isSuccess]);
  return (
    <>
      <div className="container-fluid">
        {open && <ModalCreateClass open={open} setOpen={setOpen} />}
        <NotificationAlert ref={notificationAlert} />
        <ListClass setOpen={setOpen} />
      </div>
    </>
  );
}

export default ClassManagement;
