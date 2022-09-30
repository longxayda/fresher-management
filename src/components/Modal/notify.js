export const notify = (place, type, message, notificationAlertRef) => {
  var options = {};
  options = {
    place: place,
    message: (
      <div>
        <div>{message}</div>
      </div>
    ),
    type: type,
    icon: "nc-icon nc-bell-55",
    autoDismiss: 7,
  };
  notificationAlertRef.current.notificationAlert(options);
};
