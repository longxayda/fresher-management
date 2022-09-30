
import { Button, CloseButton, Modal } from "react-bootstrap";
import { Badge, Row, Col, Form } from "react-bootstrap";
import Evaluate from "components/Audit/Schedule/Detail/Evaluate/Evaluate";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestionList } from "redux/auditorsSlice/scheduleSlice"
import { QuestionList} from "redux/selectors/auditorsSelector/scheduleSelector";
import React, { useEffect, useRef, useState } from "react";


function ModalDetailEvaluate({ isOpen, hideModal, dataModal, id }) {

    const question = useSelector(QuestionList)
    let total = 0, average=0;
    const totalScore = question.reduce((total, question) => { return total + question.evaluate}, 0);
    average = totalScore && question.length ? totalScore/question.length : 0 ;

    return (
        <div className="modal-evaluate">
            <Modal
                show={isOpen}
                onHide={hideModal}
                fullscreen={true}
                scrollable
            >
                <Modal.Header style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between' }}>
                    <Modal.Title style={{ textTransform: 'uppercase', fontWeight: 'bold' }} className="fw-semibold fs-3 text-primary">Evaluate</Modal.Title>
                    <CloseButton onClick={hideModal} ></CloseButton>
                </Modal.Header>
                <Modal.Body style={{maxHeight: '500px' }}>
                    <Evaluate></Evaluate>
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'flex', marginTop: "10px" }}>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm="8" style={{ display: 'flex' }}>
                            <span style={{ color: '#9C9C9C' }}><b>Grade:<span>{average}</span></b></span>
                            <Form.Control plaintext readOnly value={id} />
                            <span>
                                <Badge bg={average >= 6 ? 'success' : 'danger'}>{average >= 6 ? 'Pass' : 'Fail'}</Badge>
                            </span>
                        </Col>
                    </Form.Group>
                    <div>
                        <Button
                            variant="primary"
                            onClick={hideModal}
                            className="btn-fill"
                            style={{ marginLeft: '50px' }}
                        >
                            Save
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDetailEvaluate

