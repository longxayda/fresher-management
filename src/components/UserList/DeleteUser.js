import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import NotificationAlert from "react-notification-alert";
import { Button, Modal } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { deleteUserData } from "redux/UserListSlices/UserListSlice";

function DeleteUser({
  user = { id: "", username: "", email: "", role: [], status: true },
  showModal = false,
}) {
  const dispatch = useDispatch();

  const [showDeleteUser, setshowDeleteUser] = useState(showModal);

  const handleCloseDeleteUser = () => setshowDeleteUser(false);
  const handleShowDeleteUser = () => setshowDeleteUser(true);

  const handleSaveofDelete = () => {
    // Call API to delete
    dispatch(deleteUserData(user));
    handleCloseDeleteUser();
    notify("tr");
  };
  // Notification
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>User has been deleted</div>
        </div>
      ),
      type: "success",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>
      <Button
        id="btnDelete"
        variant="danger"
        onClick={() => handleShowDeleteUser(user)}
        style={{ marginRight: 10 }}
        size="sm"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <NotificationAlert ref={notificationAlertRef} />
      <Modal show={showDeleteUser} onHide={handleCloseDeleteUser} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div
              className="fw-semibold fs-3 text-danger modal-title h4"
              style={{ textTransform: "uppercase" }}
            >
              Delete user ?
            </div>
            <div className="fw-semibold fs-3 text-primary modal-title ">
              {user.username}
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body></Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button
            variant="danger"
            className="mx-1 btn-fill"
            onClick={() => handleSaveofDelete()}
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            className="mx-1 btn-fill"
            onClick={handleCloseDeleteUser}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
