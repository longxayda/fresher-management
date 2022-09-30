import React from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { useState, useRef } from "react";
import NotificationAlert from "react-notification-alert";

import TableDetail from "components/ManagementPenalty/TableDetail.js";
import ModalAddPenalty from "components/ManagementPenalty/Modal/ModalAddPenalty.js";
import ModalDeleteManyPenalty from "components/ManagementPenalty/Modal/ModalDeleteManyPenalty.js";
import FilterDetail from "components/ManagementPenalty/FilterDetail";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { getBonusPenalty } from "redux/fresherManageSlice/penaltySlice";
import { listBonusPenaltySelector, isLoadingSelector } from "redux/selectors/penaltySelector";

function ModalDetail({
  userId,
  accountFresher,
  fullNameFresher,
  classFresher,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const listBonusPenalty = useSelector(listBonusPenaltySelector);

  const isLoading = useSelector(isLoadingSelector);

  const getData = async (queryParams) => {
    try{
      await dispatch(getBonusPenalty({
        userId: userId,
        queryParams: queryParams
      })).unwrap();
    }
    catch (error){
      if(error.message === "com.users.exception.NotFoundException: No grade entity was found, check if the entered trainee is still onboard or not, otherwise please report to system administrator"){
        notify("tr", 'Invalid grade database in the system', "danger");
      }
      else{
        notify("tr", `${error.message}`, "danger");
      }
    }
  }
  const [selectedRows, setSelectedRows] = useState([]);
  const notifyAdd = (type) => {
    if (type === "Bonus" || type === "Penalty") {
      notify("tr", `Add New ${type} Successfully`, "success");
    }
    else if(type ==="Network Error"){
      notify("tr", "Network Error", "danger");
    }
    else {
      notify("tr", "Add New Bonus/Penalty Failed, Invalid Date For The Learning Path Of Trainee", "danger");
    }
  }
  const notifyDelete = (type) => {
    if (type === "success") {
      notify("tr", "Deleted Successfully", "success");
    }
    else {
      notify("tr", "Delete Failed", "danger")
    }
  }
  const notificationAlertRef = useRef(null);
  const notify = (place, mess, type) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          {mess}
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
      <Container fluid>
        <Button id="detail-btn" variant="secondary" size="sm" className="btn-row-detail" onClick={() => { handleShow(), getData("") }}>
          <FontAwesomeIcon icon={faEye} />
        </Button>
        <Modal show={show} onHide={handleClose} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold fs-3 text-primary modal-title h4">
              DETAIL BONUS / PENALTY
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="rna-container">
              <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Row>
              <div style={{ fontSize: "20px" }}>
                <b>Account: </b>
                {accountFresher}
              </div>
              <div style={{ fontSize: "20px" }}>
                <b>Fullname: </b>
                {fullNameFresher}
              </div>
              <div style={{ fontSize: "20px" }}>
                <b>Class: </b>
                {classFresher}
              </div>
            </Row>
            <Row style={{ marginRight: "-2px" }}>
              <Col md="12" lg="5" xl="7" xxl="7" className="p-1">
                <FilterDetail userId={userId} onGetData={getData} />
              </Col>
              <Col md="" lg="4" xl="3" xxl="3" className="p-1">
                <ModalAddPenalty userId={userId} notifyAdd={notifyAdd} />
              </Col>
              <Col md="" lg="3" xl="2" xxl="2" className="p-1"  >
                <ModalDeleteManyPenalty selectedRows={selectedRows} notifyDelete={notifyDelete} />
              </Col>
            </Row>
            {isLoading === true ? (
              <div className="center-loader">
                {" "}
                <span className="loader"></span>{" "}
              </div>
            ) : (
              <TableDetail
                setSelectedRows={setSelectedRows}
                listBonusPenalty={listBonusPenalty}
                userId={userId}
              />
            )}
          </Modal.Body>

          <Modal.Footer style={{ justifyContent: "right" }}>
            <Button
              id="close-btn"
              className="btn-fill btn-wd btn btn-secondary"
              style={{ display: "flex",  justifyContent: "center"}}
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default ModalDetail;