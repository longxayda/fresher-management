import React, { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Input } from "reactstrap";
import { submitFeedbacks } from "redux/userProfileSlice/traineeUserProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { storage } from "services/storage";

function FeedbacksTable() {
  const [question1, setQuestion1] = useState(5);
  const [question2, setQuestion2] = useState(5);
  const [question3, setQuestion3] = useState(5);
  const [question4, setQuestion4] = useState(5);
  const [question5, setQuestion5] = useState(5);
  const [question6, setQuestion6] = useState(5);
  const [question7, setQuestion7] = useState(5);
  const [question8, setQuestion8] = useState(5);
  const [question9, setQuestion9] = useState(5);
  const [question10, setQuestion10] = useState(5);
  const [question11, setQuestion11] = useState(5);
  const [question12, setQuestion12] = useState(5);
  const [otherComments, setOtherComments] = useState("");
  const dispatch = useDispatch();

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

  function handleSubmit() {
    const feedbackItems = {
      feedbackItems: [
        {
          id: 1,
          answer: question1,
        },
        {
          id: 2,
          answer: question2,
        },
        {
          id: 3,
          answer: question3,
        },
        {
          id: 4,
          answer: question4,
        },
        {
          id: 5,
          answer: question5,
        },
        {
          id: 6,
          answer: question6,
        },
        {
          id: 7,
          answer: question7,
        },
        {
          id: 8,
          answer: question8,
        },
        {
          id: 9,
          answer: question9,
        },
        {
          id: 10,
          answer: question10,
        },
        {
          id: 11,
          answer: question11,
        },
        {
          id: 12,
          answer: question12,
        },
      ],
      commentAnswer: otherComments,
    };
    let promise = new Promise(function (resolve, reject) {
      resolve(dispatch(submitFeedbacks(feedbackItems)));
    });
    promise.then(function () {
      notify("tr", "Sent feedback successfully!!", "success");
    });
  }

  return (
    <Container fluid>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Card>
        <Card.Body>
          <div key="1">
            <Row
              style={{
                backgroundColor: "#A4A4A4",
                border: "1px solid #000000",
              }}
            >
              <h5 style={{ margin: "10px 0 10px" }}>
                Training program & content
              </h5>
            </Row>

            {[
              {
                key: "Q1",
                title: "Quesion 1: Topic content & structure",
                handler: setQuestion1,
              },
              {
                key: "Q2",
                title: "Quesion 2: Topic objectives",
                handler: setQuestion2,
              },
              {
                key: "Q3",
                title: "Quesion 3: Appropriate topic level",
                handler: setQuestion3,
              },
              {
                key: "Q4",
                title: "Quesion 4: Topic usefulness",
                handler: setQuestion4,
              },
              {
                key: "Q5",
                title: "Quesion 5: Training material quality",
                handler: setQuestion5,
              },
            ].map((ques) => {
              return (
                <div key={ques.key}>
                  <Row
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderTop: "1px solid #000000",
                    }}
                  >
                    <h6 style={{ margin: "10px" }}>{ques.title}</h6>
                  </Row>
                  <Form>
                    <Row>
                      {[
                        {
                          value: 1,
                          id: "unsatisfied",
                          optionVal: "unsatisfied",
                        },
                        {
                          value: 2,
                          id: "ratherUnsatisfied",
                          optionVal: "ratherUnsatisfied",
                        },
                        { value: 3, id: "normal", optionVal: "normal" },
                        {
                          value: 4,
                          id: "quiteSatisfied",
                          optionVal: "quiteSatisfied",
                        },
                        { value: 5, id: "satisfied", optionVal: "satisfied" },
                      ].map((option) => {
                        return (
                          <Col style={{ margin: "10px 0" }}>
                            <Form.Check className="form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="answer"
                                id={ques.key + option.id}
                                value={option.value}
                                onClick={() => {
                                  ques.handler(option.value);
                                }}
                              />
                              <Form.Label
                                htmlFor={ques.key + option.id}
                                style={{ paddingLeft: "10px" }}
                              >
                                {option.optionVal}
                              </Form.Label>
                            </Form.Check>
                          </Col>
                        );
                      })}
                    </Row>
                  </Form>
                </div>
              );
            })}
          </div>
        </Card.Body>

        <Card.Body>
          <div key="1">
            <Row
              style={{
                backgroundColor: "#A4A4A4",
                border: "1px solid #000000",
              }}
            >
              <h5 style={{ margin: "10px 0 10px" }}>Trainer/Coach</h5>
            </Row>
            {[
              {
                key: "Q6",
                title: "Quesion 6: Knowledge of Trainer",
                handler: setQuestion6,
              },
              {
                key: "Q7",
                title: "Quesion 7: Subject coverage",
                handler: setQuestion7,
              },
              {
                key: "Q8",
                title: "Quesion 8: Good instruction & communication",
                handler: setQuestion8,
              },
              {
                key: "Q9",
                title: "Quesion 9: Trainer's supporting",
                handler: setQuestion9,
              },
            ].map((ques) => {
              return (
                <div key={ques.key}>
                  <Row
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderTop: "1px solid #000000",
                    }}
                  >
                    <h6 style={{ margin: "10px" }}>{ques.title}</h6>
                  </Row>
                  <Form>
                    <Row>
                      {[
                        {
                          value: 1,
                          id: "unsatisfied",
                          optionVal: "unsatisfied",
                        },
                        {
                          value: 2,
                          id: "ratherUnsatisfied",
                          optionVal: "ratherUnsatisfied",
                        },
                        { value: 3, id: "normal", optionVal: "normal" },
                        {
                          value: 4,
                          id: "quiteSatisfied",
                          optionVal: "quiteSatisfied",
                        },
                        { value: 5, id: "satisfied", optionVal: "satisfied" },
                      ].map((option) => {
                        return (
                          <Col style={{ margin: "10px 0" }}>
                            <Form.Check className="form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="answer"
                                id={ques.key + option.id}
                                value={option.value}
                                onClick={() => {
                                  ques.handler(option.value);
                                }}
                              />
                              <Form.Label
                                htmlFor={ques.key + option.id}
                                style={{ paddingLeft: "10px" }}
                              >
                                {option.optionVal}
                              </Form.Label>
                            </Form.Check>
                          </Col>
                        );
                      })}
                    </Row>
                  </Form>
                </div>
              );
            })}
          </div>
        </Card.Body>

        <Card.Body>
          <div key="Organization">
            <Row
              style={{
                backgroundColor: "#A4A4A4",
                border: "1px solid #000000",
              }}
            >
              <h5 style={{ margin: "10px 0 10px" }}>Organization</h5>
            </Row>
            {[
              {
                key: "Q10",
                title: "Quesion 10: Logistics",
                handler: setQuestion10,
              },
              {
                key: "Q11",
                title: "Quesion 11: Information to trainees",
                handler: setQuestion11,
              },
              {
                key: "Q12",
                title: "Quesion 12: Class admin's attitude & support",
                handler: setQuestion12,
              },
            ].map((ques) => {
              return (
                <div key={ques.key}>
                  <Row
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderTop: "1px solid #000000",
                    }}
                  >
                    <h6 style={{ margin: "10px" }}>{ques.title}</h6>
                  </Row>
                  <Form>
                    <Row>
                      {[
                        {
                          value: 1,
                          id: "unsatisfied",
                          optionVal: "unsatisfied",
                        },
                        {
                          value: 2,
                          id: "ratherUnsatisfied",
                          optionVal: "ratherUnsatisfied",
                        },
                        { value: 3, id: "normal", optionVal: "normal" },
                        {
                          value: 4,
                          id: "quiteSatisfied",
                          optionVal: "quiteSatisfied",
                        },
                        { value: 5, id: "satisfied", optionVal: "satisfied" },
                      ].map((option) => {
                        return (
                          <Col style={{ margin: "10px 0" }}>
                            <Form.Check className="form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="answer"
                                id={ques.key + option.id}
                                value={option.value}
                                onClick={() => {
                                  ques.handler(option.value);
                                }}
                              />
                              <Form.Label
                                htmlFor={ques.key + option.id}
                                style={{ paddingLeft: "10px" }}
                              >
                                {option.optionVal}
                              </Form.Label>
                            </Form.Check>
                          </Col>
                        );
                      })}
                    </Row>
                  </Form>
                </div>
              );
            })}
          </div>
        </Card.Body>

        <Form.Group>
          <h6 style={{ margin: "10px" }}>Other comments</h6>
          <div className="me-3">
            <Input
              type="search"
              value={otherComments || ""}
              style={{
                height: "80px",
              }}
              onChange={(e) => setOtherComments(e.target.value)}
            />
          </div>
        </Form.Group>

        <Button
          className="btn-fill"
          type="submit"
          variant="primary"
          style={{ marginTop: "10px", float: "right" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card>
    </Container>
  );
}

export default FeedbacksTable;
