import React, { useEffect, useState } from "react";
import { Button, Card, Form, Nav, Container, Row, Col } from "react-bootstrap";
import FeedbacksTable from "components/UserProfile/FeedBackTable";
import SalaryTable from "components/UserProfile/SalaryTable";
import GradesTable from "components/UserProfile/GradesTable";
import { storage } from "services/storage";
import { fetchUpdateAdminUserProfile } from "redux/userProfileSlice/adminUserProfileSlice";
import { useDispatch, useSelector } from "react-redux";

import NotificationAlert from "react-notification-alert";
import { adminUserProfileSelector } from "redux/selectors/userProfileSelectors/adminUserProfileSelectors";
import { fetchGetAdminUserProfile } from "redux/userProfileSlice/adminUserProfileSlice";

function UserProfile() {
  const userFromCache = storage.getCache("user");
  const userRole = userFromCache.roles;
  const [showGrades, setShowGrades] = useState(true);
  const [showSalary, setShowSalary] = useState(false);
  const [showFeedBacks, setShowFeedBacks] = useState(false);
  const [typePassword, setTypePassword] = useState("password");
  const changeTypePassword = () => {
    if (typePassword == "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };

  const data = useSelector(adminUserProfileSelector);
  // console.log("index data", data)

  const dispatch = useDispatch();

  let promise = new Promise(function (resolve, reject) {
    resolve(dispatch(fetchGetAdminUserProfile()));
  });

  const [firstName, setFirstName] = useState("Van A");
  const [lastName, setLastName] = useState("Nguyen");
  const [phone, setPhone] = useState("0234567899");
  const [dob, setDob] = useState("20/07/2001");
  const [gender, setGender] = useState("Nam");
  const [appPassword, setAppPassword] = useState("hbebwspevyvngl");
  const [aboutMe, setAboutMe] = useState("Xin chào");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let body = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      dob: dob,
      gender: gender,
      appPassword: appPassword,
      aboutMe: aboutMe,
    };
    let promise = new Promise(function (resolve, reject) {
      resolve(dispatch(fetchUpdateAdminUserProfile({ body })));
    });
  };

  const notificationAlertRef = React.useRef(null);
  const notify = (place, message, notifyType) => {
    var type = notifyType;
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

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Personal Information</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Fistname</label>
                        <Form.Control
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Lastname</label>
                        <Form.Control
                          value={lastName}
                          placeholder="Last Name"
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="nguyenvana"
                          placeholder="Username"
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="8">
                      <Form.Group>
                        <label>Mail</label>
                        <Form.Control
                          defaultValue="nguyenvana@hcmut.edu.vn"
                          placeholder="Mail"
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Form.Group>
                        <label>Phone</label>
                        <Form.Control
                          value={phone}
                          placeholder="Phone"
                          onChange={(e) => setPhone(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group>
                        <label>Date of birth</label>
                        <Form.Control
                          value={dob}
                          placeholder="dob"
                          onChange={(e) => setDob(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group>
                        <label>Gender</label>
                        <Row>
                          <Col style={{ margin: "10px 0" }}>
                            <Form.Check className="form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value={gender}
                              />
                              <Form.Label
                                htmlFor="male"
                                style={{ paddingLeft: "10px" }}
                              >
                                Male
                              </Form.Label>
                            </Form.Check>
                          </Col>
                          <Col style={{ margin: "10px 0" }}>
                            <Form.Check className="form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                              />
                              <Form.Label
                                htmlFor="female"
                                style={{ paddingLeft: "10px" }}
                              >
                                Female
                              </Form.Label>
                            </Form.Check>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                  </Row>

                  {userRole.find((name) => name === "Admin") ? (
                    <Row>
                      <Col md="4">
                        <Form.Group>
                          <label>App password</label>
                          <Form.Control
                            value={appPassword}
                            placeholder="App password"
                            onChange={(e) => setAppPassword(e.target.value)}
                            type={typePassword}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md="8">
                        <Row style={{ margin: "25px 0 0 0" }}>
                          <Col md="1">
                            <Form.Check.Input
                              style={{ margin: "6px 0 0 0" }}
                              type="checkbox"
                              onChange={changeTypePassword}
                            ></Form.Check.Input>
                          </Col>
                          <Col md="10">
                            <label style={{ margin: "5px 0 0 0" }}>
                              Show password
                            </label>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )}
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue={aboutMe}
                          onChange={(e) => setAboutMe(e.target.value)}
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                          style={{ height: "100%" }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/fpt-corporation--600.png").default}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo">
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-1.jpg").default}
                    ></img>
                    <h5 className="title">Nguyễn Văn A</h5>
                  </a>
                  <p className="description">nguyenvana</p>
                </div>
                <p className="description text-center">
                  "Hi, Tôi là Nguyen Van A"<br></br>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {userRole.find(
        (name) => name === "Admin Manager" || name === "Fresher"
      ) ? (
        <>
          <Container fluid>
            <Nav justify variant="tabs">
              <Nav.Item>
                <Nav.Link
                  eventKey="link-1"
                  title="Điểm"
                  onClick={() => {
                    setShowFeedBacks(false),
                      setShowSalary(false),
                      setShowGrades(!showGrades);
                  }}
                >
                  Grades
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-2"
                  title="Lương"
                  onClick={() => {
                    setShowFeedBacks(false), setShowGrades(false);
                    setShowSalary(!showSalary);
                  }}
                >
                  Salary
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-3"
                  title="Feedbacks"
                  onClick={() => {
                    setShowSalary(false),
                      setShowGrades(false),
                      setShowFeedBacks(!showFeedBacks);
                  }}
                >
                  Feedbacks
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
          {showGrades && <GradesTable />}
          {showSalary && <SalaryTable />}
          {showFeedBacks && <FeedbacksTable />}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserProfile;
