import React, { useState } from "react";
import Select from "react-select";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserData,
  toggleAddUserModal,
} from "redux/UserListSlices/UserListSlice";
import { USER_LIST_SELECTOR } from "redux/selectors/UserListSelectors";
import Notification from "components/UserList/Notification";
import {
  ValidateUserName,
  ValidateEmail,
  ValidatePassword,
  ValidateRoleArr,
} from "./Validate";

function AddUser({ showModal = false }) {
  const dispatch = useDispatch();
  const roleSystem = useSelector(USER_LIST_SELECTOR).role;
  const error = useSelector(USER_LIST_SELECTOR).modalAddUer.error;
  const showAddUser = useSelector(USER_LIST_SELECTOR).modalAddUer.show;
  const success = useSelector(USER_LIST_SELECTOR).modalAddUer.success;

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(true);
  const [pass, setPass] = useState("");
  const [roleNewUser, setRoleNewUser] = useState([]);
  const [validateStatus, setValidateStatus] = useState({
    username: true,
    email: true,
    role: true,
    password: true,
  });
  const handleCloseAddUser = () => {
    dispatch(toggleAddUserModal());
    setValidateStatus({
      username: true,
      email: true,
      role: true,
      password: true,
    });
    setUsername("");
    setEmail("");
    setPass("");
    setRoleNewUser([]);
  };
  const handleShowAddUser = () => dispatch(toggleAddUserModal());

  const handleSaveAddUSer = async () => {
    if (
      !ValidateUserName(username, 1).status ||
      !ValidateEmail(email).status ||
      !ValidatePassword(pass).status ||
      !ValidateRoleArr(roleNewUser).status
    ) {
      if (!ValidateUserName(username, 6).status) {
        setValidateStatus((pre) => ({ ...pre, username: false }));
      }
      if (!ValidateEmail(email).status) {
        setValidateStatus((pre) => ({ ...pre, email: false }));
      }
      if (!ValidateEmail(roleNewUser).status) {
        setValidateStatus((pre) => ({ ...pre, role: false }));
      }
      if (!ValidatePassword(pass).status) {
        setValidateStatus((pre) => ({ ...pre, password: false }));
      }
    } else {
      dispatch(
        addUserData({
          firstName: firstName,
          lastName: lastName,
          userName: username,
          password: pass,
          mail: email,
          isActive: status,
          role: roleNewUser.map((role) => role.value),
        })
      );
    }
  };
  // Style of select
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
        <Notification show={true} type="success" message="Add successfully!" />
      ) : (
        <></>
      )}
      <Button
        variant="primary"
        onClick={handleShowAddUser}
        className="btn-fill"
      >
        + Add new user
      </Button>
      <Modal show={showAddUser} onHide={handleCloseAddUser} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="fw-semibold fs-3 text-primary modal-title h4" style={{textTransform:'uppercase'}}>Add new user</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <Form.Group className=" firstNamee">
                <Form.Label> First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                {""}
              </span>
            </div>
            <div className="col-6">
              <Form.Group className=" Lastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                {""}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Form.Group className=" username">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  id="usernameAddUser"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  disabled
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
              <Form.Group className=" email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  id="emailAddUser"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setUsername((pre) => {
                      return e.target.value.includes("@")
                        ? e.target.value.substring(
                            0,
                            e.target.value.indexOf("@")
                          )
                        : e.target.value;
                    });
                  }}
                />
                {!validateStatus.email ? (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {ValidateEmail(email).mess}
                  </span>
                ) : (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {""}
                  </span>
                )}
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Form.Group className=" role">
                <Form.Label>Role</Form.Label>
                <Select
                  id="rolesAddUser"
                  styles={customStyles}
                  options={roleSystem.map((role) => {
                    return {
                      value: role.role,
                      label: role.role,
                    };
                  })}
                  value={roleNewUser}
                  onChange={setRoleNewUser}
                  isMulti
                  placeholder="Add role..."
                />
                {!validateStatus.role ? (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {ValidateRoleArr(roleNewUser).mess}
                  </span>
                ) : (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {""}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className=" password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="passAddUser"
                  type="password"
                  placeholder="Enter password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                {!validateStatus.password ? (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {ValidatePassword(pass).mess}
                  </span>
                ) : (
                  <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                    {""}
                  </span>
                )}
              </Form.Group>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="justify-content-end">
          <Button
            variant="primary"
            className="btn-fill mx-1"
            onClick={handleSaveAddUSer}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            className="btn-fill mx-1"
            onClick={handleCloseAddUser}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;
