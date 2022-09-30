import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
function ChangePassword() {
    const [newPassword, setNewPassword] = useState({
        newpassword: "",
        confirmnewpassword: "",
    });
    const [err, setErr] = useState("");
    const [validateStatus, setValidateStatus] = useState({
        newpassword: true,
        confirmnewpassword: true,
    });
    const [showChangePassword, setShowChangePassword] = useState(false);
    const handleCloseChangePassword = () => {
        setShowChangePassword(false);
        setValidateStatus({
            newpassword: true,
            confirmnewpassword: true,
        });
    };
    const handleShowChangePassword = () => setShowChangePassword(true);

    const ValidatePassword = (password) => {
        let uppercaseRegExp = /(?=.*?[A-Z])/;
        let lowercaseRegExp = /(?=.*?[a-z])/;
        let digitsRegExp = /(?=.*?[0-9])/;
        let res = {
            status: true,
            mess: "",
        };
        if (
            password.length < 8 ||
            !uppercaseRegExp.test(password) ||
            !lowercaseRegExp.test(password) ||
            !digitsRegExp.test(password)
        ) {
            res.status = false;
            res.mess =
                "Password must be at least minumum 8 characters, and include at least one lowercase letter, one uppercase letter, and a number.";
        }
        return res;
    };

    const ValidateConfirmPassword = (password) => {
        let res = {
            status: true,
            mess: "",
        };
        if (password !== newPassword.newpassword) {
            res.status = false;
            res.mess = "Confirm new password is not matched";
        }
        return res;
    };
    const handleSaveChangePassword = async () => {
        console.log("#This is password change", newPassword);
        if (
            !ValidatePassword(newPassword.newpassword).status ||
            !ValidateConfirmPassword(newPassword.confirmnewpassword).status
        ) {
            if (!ValidatePassword(newPassword.newpassword).status) {
                setValidateStatus((pre) => ({ ...pre, newpassword: false }));
            }
            if (!ValidateConfirmPassword(newPassword.confirmnewpassword).status) {
                setValidateStatus((pre) => ({ ...pre, confirmnewpassword: false }));
            }
        } else {
            console.log("#user", JSON.parse(localStorage.getItem("user")).id);
            const user = localStorage.getItem("user");
            if (user) {
                try {
                    const userId = JSON.parse(user).id;
                    const res = await axios.put(
                        `https://admin-tool-api-gateway-bu.herokuapp.com/user-service/api/users/${userId}/password/change`,
                        {
                            password: newPassword.newpassword,
                        }
                    );
                    console.log(res.data);
                    if (res.status !== 200) {
                        throw new Error(res.data.message);
                    }
                    handleCloseChangePassword();
                    notify("tr");
                } catch (err) {
                    setErr("Something went wrong. Try again.");
                }
            }

            //  const res = await axios.post('',{

            //  },{
            //     headers:
            //  })
        }
    };
    const notificationAlertRef = React.useRef(null);
    const notify = (place) => {
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>Password updated!</div>
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
            <NotificationAlert ref={notificationAlertRef} />
            <span className="no-icon" onClick={handleShowChangePassword}>
                Change Password
            </span>

            <Modal show={showChangePassword} onHide={handleCloseChangePassword}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold fs-3 text-primary modal-title h4">CHANGE PASSWORD</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="newpassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword.newpassword}
                                placeholder="Enter new password"
                                onChange={(e) =>
                                    setNewPassword((pre) => ({
                                        ...pre,
                                        newpassword: e.target.value,
                                    }))
                                }
                            ></Form.Control>
                        </Form.Group>
                        {!validateStatus.newpassword ? (
                            <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                                {ValidatePassword(newPassword.newpassword).mess}
                            </span>
                        ) : (
                            <></>
                        )}
                        <br />
                        <br />

                        <Form.Group className="confirmnewpassword">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword.confirmpassword}
                                placeholder="confirm new password"
                                onChange={(e) =>
                                    setNewPassword((pre) => ({
                                        ...pre,
                                        confirmnewpassword: e.target.value,
                                    }))
                                }
                            ></Form.Control>
                        </Form.Group>
                        {!validateStatus.confirmnewpassword ? (
                            <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
                                {ValidateConfirmPassword(newPassword.confirmnewpassword).mess}
                            </span>
                        ) : (
                            <></>
                        )}
                    </Form>
                    {err && <span style={{ fontSize: 13, color: "red" }}>{err}</span>}
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button
                        variant="primary"
                        className="btn-fill mx-1"
                        onClick={handleSaveChangePassword}
                    >
                        Save
                    </Button>
                    <Button
                        variant="secondary"
                        className="btn-fill mx-1"
                        onClick={handleCloseChangePassword}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ChangePassword;
