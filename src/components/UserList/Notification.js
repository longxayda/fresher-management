import React from "react";
import { useEffect } from "react";
import NotificationAlert from "react-notification-alert";

function Notification({ show, type, message }) {
  const notificationAlertRef = React.useRef(null);
  const notify = () => {
    let options = {};
    options = {
      place: 'tr',
      icon: "nc-icon nc-bell-55",
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      autoDismiss: 5,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  useEffect(() => {
    if (show) {
      notify();
    }
  }, []);
  return <NotificationAlert ref={notificationAlertRef} />;
}

export default Notification;
