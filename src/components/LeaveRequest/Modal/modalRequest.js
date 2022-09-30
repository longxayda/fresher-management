import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { addRequestSelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";

function RequestModal({
  newRequest,
  rightArr,
  showAddRequest,
  setNewRequest,
  handleCloseAddRequest,
  setRightArr,
  handleAddRequest
}) {

  //Calculate duration
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [partialType, setPartial] = useState("All day");
  const [reason, setReason] = useState();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const partial = partialType == "All day" ? 1 : 0.5;
    const durations =
      ((new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24)) *
      partial;
    setDuration(durations > 0 ? durations : partial);
  }, [startDate, endDate, partialType]);

  //Add new request
  const requestList = useSelector(addRequestSelector);

  return (
    <div className="leave-request-modal">
      <Button
        style={{}}
        onClick={() => setShow(true)}
        variant="primary"
        className="btn-fill"
      >
        Make leave request
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Form>
          <Modal.Header closeButton variant="primary">
            <Modal.Title>
              <i className="nc-icon nc-paper-2 text-primary me-2 my-auto mx-auto"></i>
              <span className="text-primary">Create an absence request</span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="mb-3">
              <Col xs md lg={2}>
                <Form.Label>Type absence:</Form.Label>
              </Col>

              <Col lg={4}>
                <Form.Group>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="Absence with no salary"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs md lg={2}>
                <Form.Label>Start date:</Form.Label>
              </Col>

              <Col lg={3}>
                <Form.Group>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col lg={1}></Col>

              <Col md lg={2}>
                <Form.Label>End date:</Form.Label>
              </Col>

              <Col lg={3}>
                <Form.Group>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs md lg={2}>
                <Form.Label>Partial:</Form.Label>
              </Col>

              <Col lg={3}>
                <Form.Select
                  value={partialType}
                  onChange={(e) => setPartial(e.target.value)}
                >
                  <option>All day</option>
                  <option>Morning (8AM-12PM)</option>
                  <option>Afternoon (1PM-5PM)</option>
                </Form.Select>
              </Col>

              <Col lg={1}></Col>

              <Col md lg={2}>
                <Form.Label>Duration:</Form.Label>
              </Col>

              <Col xs md lg={2}>
                <b>{duration} day(s)</b>
              </Col>
            </Row>

            <Row className="pt-3">
              <Col xs md lg={2}>
                <Form.Label>Reason:</Form.Label>
              </Col>

              <Col lg={9}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ height: "100%" }}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="justify-content-end">
            <Button
              variant="primary"
              type="submit"
              className="btn-fill"
              onClick={(e) => {
                e.preventDefault();
                setShow(false)
              }}
            >
              Submit
            </Button>

            <Button
              variant="secondary"
              className="btn-fill ms-1"
              onClick={() => setShow(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default RequestModal;
