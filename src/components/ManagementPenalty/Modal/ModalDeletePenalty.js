import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { deleteOneBonusPenalty } from "redux/fresherManageSlice/penaltySlice";
import { useDispatch, useSelector } from "react-redux";
import { isProcessingSelector } from "redux/selectors/penaltySelector"

function ModalDeletePenalty({ no, id, type, notifyDelete }) {
  const dispatch = useDispatch();
  const isProcessing = useSelector(isProcessingSelector);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const deleted = async () => {
    try {
      await dispatch(deleteOneBonusPenalty(id)).unwrap();
      notifyDelete("success");
      handleClose();
    }
    catch (err) {
      notifyDelete("failed");
    }
  }
  const handleShow = () => setShow(true);
  const footerDelete = {
    paddingLeft: "20%",
    paddingTop: "16px",
    borderTop: "1px solid #e9ecef",
  };
  const headerDelete = {
    borderBottom: "1px solid #e9ecef",
  };
  const titleDelete = {
    marginTop: "0",
  };

  return (
    <>
      <Button
        id="delete-pelnaty-btn"
        type="button"
        variant="danger"
        className="position-action-delete"
        onClick={handleShow}
        size="sm"
      >
        <i className="fas fa-trash"></i>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton style={headerDelete}>
          <Modal.Title style={titleDelete} className="text-danger modal-title h4">
            DELETE {type.toUpperCase()} NO {no}
          </Modal.Title>
          {isProcessing && <div className="processing"></div>}
        </Modal.Header>

        <Modal.Body>
          <h5>
            Are you sure you want to delete {type.toUpperCase()} NO {no}?
          </h5>
        </Modal.Body>

        <Modal.Footer style={footerDelete}>
          <Row>
            <Col lg="2" md sm xs="2"></Col>
            <Col lg="5" md sm xs="5">
              <Button
                id="delete-btn"
                className="btn-fill btn-wd"
                variant="danger"
                onClick={deleted}
              >
                Delete
              </Button>
            </Col>
            <Col lg="2" md sm xs="5">
              <Button
                id="delete-btn"
                className="btn-fill btn-wd"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDeletePenalty;