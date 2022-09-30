import React from "react";
import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/authSlice/authSlice";
import Loading from "components/Loading/loginLoading";
import axios from "axios";
import "assets/css/auth.css";
import { FormCheck, Modal, Nav } from "react-bootstrap";
// import ForgotPass from "./ForgotPass";
function Login() {
    const userRef = useRef();
    const pwdRef = useRef();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [email, setEmail] = useState("");
    const [typePassword, setTypePassword] = useState("password");
    const [username, setUsername] = useState("");
    const [pwd, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const errMsg = useSelector((state) => state.auth.message);
    const history = useHistory();
    const dispatch = useDispatch();
    const [showForgotPass, setShowForgotPass] = useState(false);

    const handleCloseForgotPass = async () => {
        setLoading(false);
        setSuccess(false);
        setErr("");
        setEmail("");
        setShowForgotPass(false);
    };
    const onGetPasswordHandle = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                "https://admin-tool-api-gateway-bu.herokuapp.com/user-service/api/users/password/mail",
                {
                    mail: email,
                }
            );
            //console.log(res.status);
            // console.log(res.data.message);
            if (res.status === 200) {
                setLoading(false);
                setSuccess(true);
            } else {
                if (res.status === 404) {
                    throw new Error("User not found");
                }
                else{
                    // throw new Error("Server is not responding.");
                    throw new Error("User not found");
                }
            }
        } catch (err) {
            setLoading(false);
            setSuccess(false);
            setErr(err.message ? err.message : "Something went wrong");
        }
    };
    const handleShowForgotPass = () => {
        setShowForgotPass(true);
    };

    useEffect(() => {
        if (isLoggedIn) history.push("/");
        userRef.current.focus();
    }, []);

    const handleSignIn = async () => {
        if (username && pwd) {
            await dispatch(
                login({
                    username: username,
                    password: pwd,
                })
            );
            setUsername("");
            setPassword("");
            history.push("/");
        } else {
            alert("Email and password cannot be null or empty.");
            history.push("/");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (event.target.name == "password") {
                handleSignIn();
            } else if (event.target.name == "username") {
                pwdRef.current.focus();
            }
        }
    };

    const changeTypePassword = () => {
        if (typePassword == "password") {
            setTypePassword("text");
        } else {
            setTypePassword("password");
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <Form className="auth-form">
                <div className="auth-form-content">
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            ref={userRef}
                            type="text"
                            placeholder="Enter email"
                            value={username}
                            disabled={isLoading}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            required
                        />
                        <Form.Text className={errMsg ? "text-danger" : "text-muted mt-2"}>
                            {errMsg ? errMsg : ""}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            ref={pwdRef}
                            type={typePassword}
                            value={pwd}
                            disabled={isLoading}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            required
                        />
                        <Form.Text className={errMsg ? "text-danger" : "text-muted mt-2"}>
                            {errMsg ? "" : ""}
                        </Form.Text>
                    </Form.Group>

                    <Form.Check style={{ float: "left" }} className="mb-1 pl-0" >
                        <Nav.Link
                            href="#"
                            disabled={isLoading}
                            onClick={handleShowForgotPass}
                            style={{padding:2}}
                        >
                            <Form.Text className="text-muted mt-2 text-primary">Forgot Password?</Form.Text>
                        </Nav.Link>
                    </Form.Check>

                    <Form.Check
                        style={{ float: "right" }}
                        className="mb-1 pl-0 float-right"
                    >
                        <Form.Check.Label>
                            <Form.Check.Input
                                type="checkbox"
                                disabled={isLoading}
                                onChange={changeTypePassword}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                            <Form.Text className="text-muted mt-2">Show password</Form.Text>
                        </Form.Check.Label>
                    </Form.Check>
                    <div className="auth-button-submit text-center">
                        <Button
                            variant="custom"
                            type="button"
                            disabled={isLoading}
                            onClick={handleSignIn}
                        >
                            SIGN IN
                        </Button>
                    </div>
                </div>
            </Form>
            <Modal show={showForgotPass} onHide={handleCloseForgotPass} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title 
                        class="fw-semibold fs-3 text-primary modal-title h4"
                        style={{ textTransform: "uppercase" }} 
                    >Forgot password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Text>
                            If you have forgotten your password, you can use this form to
                            reset your password. You will receive an email with instructions.
                        </Form.Text>
                        <br />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        {(!success) && (!loading) && (err)&&(
                            <Form.Text className={err ? "text-danger" : "text-muted mt-2"}>
                                {err ? err : ""}
                            </Form.Text>)
                        }
                        {(success) && (!loading) &&  (
                            <Form.Text className="text-success">
                                Password was sent successfully! Check your email
                            </Form.Text>
                        )}
                        {(loading) && (
                            <Form.Text className="">
                                Please wait...
                            </Form.Text>
                        )}
                        <br />

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button
                        variant="primary"
                        className="btn-fill mx-1"
                        onClick={onGetPasswordHandle}
                    >
                        Request
                    </Button>
                    <Button
                        variant="secondary"
                        className="mx-1 btn-fill"
                        onClick={handleCloseForgotPass}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function LoginLayout() {
    return (
        <>
            <div className="auth-container">
                <div className="auth-title text-center">
                    <h3>Sign in</h3>
                </div>
                <Login />
            </div>
        </>
    );
}

export default LoginLayout;