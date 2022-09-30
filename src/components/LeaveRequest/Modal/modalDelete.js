import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Form} from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveRequest } from "redux/attendanceManagementSlice/leaveRequestSlice";
import { leaveRequestSelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";


function ModalDelete() {
  const [show, setShow] = useState(false);
  const [cancelReason, setReason] = useState();
  const data = useSelector(leaveRequestSelector);

  return (
    <div >
      <Button className="ms-2" variant="danger" onClick={()=> setShow(true)}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>

          <Modal show={show} onHide={()=> setShow(false)} centered>
            <Modal.Header closeButton variant="primary">
            <Modal.Title>
                <i className="nc-icon nc-bulb-63 text-primary me-2 my-auto mx-auto"></i>
                <span className='text-primary'>Cancel ticket ?</span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Provide a Detailed Reason:</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={5}
                    style={{height:"100%"}}
                    value={cancelReason}
                    onChange={(e) => setReason(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer className="justify-content-end">
              <Button
                variant="primary"
                className="btn-fill"
                onClick={()=>setShow(false)}
              >
                Confirm
              </Button>

              <Button
                variant="secondary"
                className="btn-fill ms-1"
                onClick={()=>setShow(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  );
}

export default ModalDelete;
