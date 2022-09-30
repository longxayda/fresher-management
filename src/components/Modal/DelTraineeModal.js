import { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Container, Col, Row } from "reactstrap";
import { notify } from "./notify";
import NotificationAlert from "react-notification-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOneFresher,
  deleteManyFresher,
} from "redux/fresherManageSlice/fresherManagementSlice";

const DelTraineeMD = ({ id, children, optionSmall = true }) => {
  const [show, setShow] = useState(false);
  const notificationAlertRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { value: data, loading } = useSelector((state) => state.manageFR);
  const { checkedIDs } = useSelector((state) => state.checkboxFR);
  const filteredData = data.filter((item) => checkedIDs.includes(item.userId));
  const filterOneData = data.filter((item) => item.userId === id);

  const handleDelete = async (e) => {
    try {
      const deleteFucntion = id
        ? deleteOneFresher(id)
        : deleteManyFresher(checkedIDs);
      await dispatch(deleteFucntion).unwrap();
      handleClose();
      // notify(
      //   "tr",
      //   "success",
      //   "Successfully delete member",
      //   notificationAlertRef
      // );
    } catch (err) {
      notify(
        "tr",
        "danger",
        "Error while deleting member",
        notificationAlertRef
      );
    }
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Button
        variant="danger"
        onClick={handleShow}
        className={
          (id ? "" : "btn-fill w-100") + (optionSmall ? " btn-sm" : " ")
        }
        disabled={id ? false : checkedIDs.length === 0}
      >
        {children}
      </Button>
      {/* Modal */}
      <Modal className="show__modal" show={show} onHide={handleClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold fs-3 text-primary text-danger">
              DELETE FRESHER
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this member?
            {id ? (
              <div className="text-primary">{filterOneData[0].fullName}</div>
            ) : (
              filteredData.map((item) => (
                <div className="text-primary">{item.fullName}</div>
              ))
            )}
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            <Button
              variant="danger"
              type="submit"
              className="mx-2 btn btn-fill"
              onClick={handleDelete}
              disabled={loading === "pending"}
            >
              {loading === "pending" ? (
                <div>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
            <Button
              variant="secondary"
              className="btn btn-fill"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
};

export default DelTraineeMD;
