import React from "react";
import { useEffect } from "react";
import NotificationAlert from "react-notification-alert";
import { useSelector, useDispatch } from "react-redux";
import { notificationSelector } from "redux/selectors/roleSelector.js";
import { closeNotification } from "redux/roleSlice";

function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelector);
  const notificationAlertRef = React.useRef(null);
  const notify = () => {
    let options = {};
    options = {
      place: "tr",
      icon: "nc-icon nc-bell-55",
      message: (
        <div>
          <div>{notification.message}</div>
        </div>
      ),
      type: notification.success ? "success" : "danger",
      autoDismiss: 5,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  useEffect(() => {
    if (notification.show) {
      notify();
      dispatch(closeNotification());
    }
  }, [notification.flag]);
  return <NotificationAlert ref={notificationAlertRef} />;
}

export default Notification;
