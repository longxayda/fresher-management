import React, { useEffect, useState } from "react";
// react-bootstrap components
import { Modal, Button } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import { useDispatch, useSelector } from "react-redux";
import { USER_LIST_SELECTOR } from "redux/selectors/UserListSelectors";
import { deleteMultiUsersData } from "redux/UserListSlices/UserListSlice";

function DeleteSelected({ handleCurrentPage, showModal = false }) {
  const dispatch = useDispatch();
  const selectArr = useSelector(USER_LIST_SELECTOR).selectedUser;
  const [showDeleteUser, setshowDeleteUser] = useState(showModal);
  const handleCloseDeleteUser = () => setshowDeleteUser(false);
  const handleShowDeleteUser = () => setshowDeleteUser(true);
  let isSelect = selectArr.length;
  const handleSaveofDelete = () => {
    dispatch(deleteMultiUsersData(selectArr));
    // handleCurrentPage();
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
        id="deleteSelectedBtn"
        className="btn-fill"
        variant="danger"
        style={{ marginLeft: 10, width: 130 }}
        onClick={handleShowDeleteUser}
        disabled={!isSelect}
      >
        <i className="fas fa-trash" style={{ marginRight: "5px" }}></i>Delete{" "}
        {isSelect}
      </Button>
      <NotificationAlert ref={notificationAlertRef} />
      <Modal
        show={showDeleteUser}
        onHide={handleCloseDeleteUser}
        centered
        scrollable
        style={{ maxHeight: 700 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="fw-semibold fs-3 text-danger modal-title h4" style={{textTransform:'uppercase'}}>Delete users selected ?</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectArr.map((user, index) => {
            return (
              <div id="userNamesSelected" key={index}>
                <span style={{ color: "#3472F7" }}>
                  {user.username}
                  <br />
                </span>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button
            variant="danger"
            className="mx-1 btn-fill"
            onClick={handleSaveofDelete}
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

export default DeleteSelected;
