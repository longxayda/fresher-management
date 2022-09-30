import React, { useState } from "react";
import Select from "react-select";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { USER_LIST_SELECTOR } from "redux/selectors/UserListSelectors";
import { editUserData } from "redux/UserListSlices/UserListSlice";
import Notification from "components/UserList/Notification";
import { ValidateUserName, ValidateEmail, ValidateRoleArr } from "./Validate";
import { toggleEditUserModal } from "redux/UserListSlices/UserListSlice";
import { useEffect } from "react";

function EditUser({ user }) {
  const dispatch = useDispatch();
  const roleSystem = useSelector(USER_LIST_SELECTOR).role;
  const error = useSelector(USER_LIST_SELECTOR).modalEditUser.error;
  const showEditUser = useSelector(USER_LIST_SELECTOR).modalEditUser.show;
  const success = useSelector(USER_LIST_SELECTOR).modalEditUser.success;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState([]);
  const [status, setStatus] = useState({});
  const [validateStatus, setValidateStatus] = useState({
    username: true,
    email: true,
    role: true,
  });
  const handleCloseEditUser = () => dispatch(toggleEditUserModal());
  const handleSaveChangeEdit = () => {
    if (
      !ValidateUserName(username, 1).status ||
      !ValidateEmail(email).status ||
      !ValidateRoleArr(role).status
    ) {
      if (!ValidateUserName(username, 1).status) {
        setValidateStatus((pre) => ({ ...pre, username: false }));
      }
      if (!ValidateEmail(email).status) {
        setValidateStatus((pre) => ({ ...pre, email: false }));
      }
      if (!ValidateRoleArr(role).status) {
        setValidateStatus((pre) => ({ ...pre, role: false }));
      }
    } else {
      dispatch(
        editUserData({
          id: user.id,
          username: username,
          email: email,
          role: role.map((role) => role.value),
          status: status.value,
        })
      );
      // setValidateStatus({
      //   username: true,
      //   email: true,
      //   role: true,
      // });
      // handleCloseEditUser();
    }
  };

  useEffect(() => {
    const payLoad = JSON.parse(JSON.stringify(user));
    setUsername(payLoad.username);
    setEmail(payLoad.email);
    setRole(payLoad.role.map((role) => ({ value: role, label: role })));
    setStatus({
      value: payLoad.status,
      label: payLoad.status ? "Active" : "Inactive",
    });
  }, [user]);
  // Style of Select
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      top: "80%",
    }),
    control: (provided, state) => ({
      ...provided,
      minWidth: 300,
    }),
  };
  return (
    <>
      {success ? (
        <Notification
          show={true}
          type="success"
          message="Update successfully!"
        />
      ) : (
        <></>
      )}
      <Modal
        show={showEditUser}
        onHide={handleCloseEditUser}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div
              className="fw-semibold fs-3 text-primary modal-title h4"
              style={{ textTransform: "uppercase" }}
            >
              {" "}
              Edit user: <span>{user.username}</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <Form.Group className="mb-1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  id="usernameEdit"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  disabled
                  onChange={(e) => e}
                />
                {!validateStatus.username ? (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {ValidateUserName(username, 1).mess}
                  </span>
                ) : (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {error}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="emailEdit"
                  type="text"
                  placeholder="Enter username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setUsername((pre) => {
                      let value = e.target.value.includes("@")
                        ? e.target.value.substring(
                            0,
                            e.target.value.indexOf("@")
                          )
                        : e.target.value;
                      return value;
                    });
                  }}
                />
                {!validateStatus.email ? (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {ValidateEmail(email).mess}
                  </span>
                ) : (
                  <span
                    style={{ fontSize: 13, color: "red", paddingLeft: 10 }}
                  ></span>
                )}
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <Form.Group className="mb-1">
                <Form.Label>Role</Form.Label>
                <Select
                  id="rolesEdit"
                  styles={customStyles}
                  options={roleSystem.map((role) => {
                    return {
                      value: role.role,
                      label: role.role,
                    };
                  })}
                  value={role}
                  onChange={setRole}
                  isMulti
                  placeholder="Filter by Role..."
                />
                {!validateStatus.role ? (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {ValidateRoleArr(role).mess}
                  </span>
                ) : (
                  <span
                    style={{ fontSize: 13, color: "red", paddingLeft: 10 }}
                  ></span>
                )}
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-1">
                <Form.Label>Status</Form.Label>
                <Select
                  id="statusEdit"
                  styles={customStyles}
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "Inactive" },
                  ]}
                  value={status}
                  onChange={setStatus}
                />
                <span
                  style={{ fontSize: 13, color: "red", paddingLeft: 10 }}
                ></span>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button
            variant="primary"
            className="mx-1 btn-fill"
            onClick={handleSaveChangeEdit}
          >
            Save change
          </Button>
          <Button
            variant="secondary"
            className="mx-1 btn-fill"
            onClick={handleCloseEditUser}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;
