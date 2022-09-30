import React from "react";
import { Button, Form, CloseButton, Modal, Row, Col} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux"
import { updateSchedule } from "redux/auditorsSlice/scheduleSlice"

import {
    idSchedule,
    ListtrainerSchedule,
    formSchedule,
    errorsSchedule,
    isOpenEditSchedule
} from 'redux/selectors/auditorsSelector/scheduleSelector'

import {
    idChange,
    formChange,
    errorsChange,
    isOpenEditChange,
} from "redux/auditorsSlice/scheduleSlice"
function ModalScheduleEdition( {notify}
    ){
    const dispatch = useDispatch()
    const Trainer = useSelector(ListtrainerSchedule)
    const selectedForm = useSelector(formSchedule)
    const errorsForm = useSelector(errorsSchedule)
    const idRow = useSelector(idSchedule)
    const isOpenEdit = useSelector(isOpenEditSchedule)
    const handChange = (e) => {
        dispatch(formChange({
            ...selectedForm,
            [e.target.name]: e.target.value
        }))

        dispatch(errorsChange({
            ...errorsForm,
            [e.target.name]: null
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(updateSchedule(
            {
                data:
                {
                    id: parseInt(idRow),
                    Trainer: selectedForm.trainer,
                    date: selectedForm.date,
                    room: selectedForm.room,
                },
                notify: notify
            }
        ))
        closeModal()
    }

    const closeModal = () => {
        dispatch(isOpenEditChange(false))
        dispatch(idChange(""))
        dispatch(formChange({
            id: "",
            Trainer: "",
            date: "",
            room: "",
        }))
        dispatch(errorsChange({}))
    }
    return (
        <div className="Edition">
            <Modal 
                show={isOpenEdit} 
                onHide={closeModal}
                size="lg"
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title style={{ textTransform: 'uppercase' }} className="fw-semibold fs-3 text-primary">Audit Edit</Modal.Title>
                <CloseButton onClick={closeModal} ></CloseButton>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>ID: </b> 
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control plaintext readOnly value={idRow}/>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>Auditor:</b>
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            required
                            as="input"
                            value={selectedForm.Trainer}
                            name="auditor"
                            onChange = {e => {handChange(e)}}
                        />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicSelect">
                        <Form.Label column sm="2">
                            <b>Date:</b>
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            required
                            as="input"
                            value={selectedForm.date}
                            name="date"
                            onChange = {e => {handChange(e)}}
                        />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicSelect">
                        <Form.Label column sm="2">
                            <b>Room:</b>
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                            required
                            as="input"
                            value={selectedForm.room}
                            name="room"
                            onChange = {e => {handChange(e)}}
                        />
                        </Col>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer style={{display: "flex",justifyContent: 'flex-end', marginTop: "10px"}}>
                <Button 
                    variant="primary" 
                    className="btn-fill"
                    type="submit"
                    style={{paddingLeft:'20px', paddingRight: '20px'}}
                    >
                    Save
                </Button>
                <Button 
                    variant="secondary" 
                    onClick={closeModal}
                    style={{marginLeft: '10px'}}
                    className="btn-fill">
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalScheduleEdition
