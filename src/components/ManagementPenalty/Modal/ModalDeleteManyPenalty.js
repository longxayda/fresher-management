import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { isProcessingSelector } from "redux/selectors/penaltySelector"
import { deleteManyBonusPenalty } from "redux/fresherManageSlice/penaltySlice";

function ModalDeleteManyPenalty({ selectedRows, notifyDelete }) {
  const dispatch = useDispatch();
  const isProcessing = useSelector(isProcessingSelector);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const arrId = selectedRows.map((row) => (Number(row.id)));

  const deleted = async () => {
    const ids = { ids: arrId };
    try {
      await dispatch(deleteManyBonusPenalty(ids)).unwrap();
      notifyDelete("success");
      handleClose();
    }
    catch (err) {
      notifyDelete("failed");
    }
  }
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
        id="multi-delete-btn"
        type="button"
        variant="danger"
        className="btn-fill"
        onClick={handleShow}
        style={{ width: "170px", marginLeft: "8px" }}
        disabled={!selectedRows.length}>
        <i className="fas fa-trash" style={{ marginRight: "4px" }}></i>
        Delete {selectedRows.length}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton style={headerDelete}>
          <Modal.Title style={titleDelete} className="text-danger modal-title h4">
            DELETE BONUS / PENALTY
          </Modal.Title>
          {isProcessing && <div className="processing"></div>}
        </Modal.Header>

        <Modal.Body>
          <h5>
            Are you sure you want to delete:
            {selectedRows.map((row) => (
              <ul key={row.id} style={{ marginTop: "15px" }}>
                <li>
                  {row.type.toUpperCase()} NO {row.stt}
                </li>
              </ul>
            ))}
          </h5>
        </Modal.Body>

        <Modal.Footer style={footerDelete}>
          <Row>
            <Col lg="2" md sm xs="2"></Col>
            <Col lg="5" md sm xs="5">
              <Button
                id="delete-all-btn"
                className="btn-fill btn-wd"
                variant="danger"
                onClick={deleted}
              >
                Delete
              </Button>
            </Col>
            <Col lg="2" md sm xs="5">
              <Button
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
export default ModalDeleteManyPenalty;