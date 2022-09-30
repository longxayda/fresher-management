
import React from "react";
import { Button, Form, CloseButton, Modal, Row, Col } from "react-bootstrap";
import Validation from "components/Audit/Resource/Validation";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, updateQuestion } from "redux/auditorsSlice/resourceSlice";
import {
    idResource,
    skillListResource,
    moduleListResource,
    questionListResource,
    levelListResource,
    isOpenModalAddEditResource,
    formResource,
    errorsResource,
    isAddQuestionResource,
} from 'redux/selectors/auditorsSelector/resourceSelectors'

import {
    idChange, 
    isOpenModalAddEditChange,
    formChange,
    errorsChange,
    isAddQuestionChange,
} from "redux/auditorsSlice/resourceSlice"

function UpdateResourceModal({notify})
{
    const dispatch = useDispatch()
    const skillList = useSelector(skillListResource);
    const moduleList = useSelector(moduleListResource)
    const levelList = useSelector(levelListResource);
    const idRow = useSelector(idResource);
    const questionList = useSelector(questionListResource);
    const selectedForm = useSelector(formResource);
    const errorsForm = useSelector(errorsResource)
    const isOpenModalAddEdit = useSelector(isOpenModalAddEditResource);
    const isAddQuestion = useSelector(isAddQuestionResource)
   
    const newId = questionList.length ? ~~questionList[questionList.length - 1].id + 1 : 1;
    const modalId = idRow ? idRow : newId;
    const titleModal = isAddQuestion ? "Add Question" : "Update Question"

    const handChange = (e) => {
        dispatch(formChange({
            ...selectedForm,
            [e.target.name]: e.target.value}))

        dispatch(errorsChange({
            ...errorsForm,
            [e.target.name]: null
        }))
      }

    const handleSubmit = (event) => {
        event.preventDefault()

        const newErrors = Validation(selectedForm);
        if (Object.keys(newErrors).length > 0) {
            dispatch(errorsChange(newErrors))
        }else {
            if(isAddQuestion){
                dispatch(addQuestion(
                    {
                        data: 
                        {
                            question: selectedForm.question,
                            answer: selectedForm.answer,
                            skill: selectedForm.skill,
                            status: selectedForm.status,
                            level: selectedForm.level,
                            module: selectedForm.module,
                        },
                        notify: notify
                    }))
            }else{
                dispatch(updateQuestion(
                    {
                        data: 
                        {
                            id: parseInt(idRow),
                            question: selectedForm.question,
                            answer: selectedForm.answer,
                            skill: selectedForm.skill,
                            status: selectedForm.status,
                            level: selectedForm.level,
                            module: selectedForm.module,
                        },
                        notify: notify
                    }))
            }
          closeModal()
        }
      }

    const closeModal = () => {
        dispatch(isOpenModalAddEditChange(false))
        dispatch(idChange(""))
        dispatch(formChange({
          question: "",
          answer: "",
          skill: "",
          status: "Processing",
          level: "",
          module: "",
        }))
        dispatch(errorsChange({}))
        dispatch(isAddQuestionChange(false))
      }
      
    return (
        <div className="modal-add-edit">
            <Modal 
                show={isOpenModalAddEdit} 
                onHide={closeModal}
                size="lg"
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-primary"
                >
                    {titleModal}
                </Modal.Title>
                <CloseButton onClick={closeModal} ></CloseButton>
                </Modal.Header>
                <Modal.Body >
                <Form noValidate method="POST" onSubmit={handleSubmit}>
                   {!isAddQuestion && <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>ID:</b> 
                        
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={modalId}/>
                        </Col>
                    </Form.Group>}


                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>Status:</b>
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                                required
                                as="select"
                                value={selectedForm.status}
                                name="status"
                                onChange = {e => {handChange(e)}}
                                isInvalid={!!errorsForm.status}
                                >
                                <option value="Processing">Processing</option>
                                <option value="Approve">Approve</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>Module:</b>
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control 
                                required
                                as="select"
                                value={selectedForm.module}
                                name="module"
                                onChange = {e => {handChange(e)}}
                                isInvalid={!!errorsForm.module}
                                >
                                <option key='blankChoice' hidden value>-- Select Module --</option>
                                {moduleList.map((module , key ) => (
                                     <option key={key} value={module}>{module}</option>
                                ))}
                            </Form.Control>
                            <div style={{ width: '100%', fontSize: '.875em', marginTop: '.25rem', color: '#dc3545' }}>{errorsForm.module}</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicSelect">
                        <Form.Label column sm="2">
                            <b>Skill:</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                required
                                as="select"
                                value={selectedForm.skill}
                                name="skill"
                                onChange = {e => {handChange(e)}}
                                isInvalid={!!errorsForm.skill}
                                >
                                <option key='blankChoice' hidden value>-- Select Skill --</option>
                                {skillList.map((skill , key) => (
                                    <option key={key} value={skill}>{skill}</option>
                                ))}
                            </Form.Control>
                            <div style={{ width: '100%', fontSize: '.875em', marginTop: '.25rem', color: '#dc3545' }}>{errorsForm.skill}</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicSelect">
                        <Form.Label column sm="2">
                            <b>Level:</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                required
                                as="select"
                                value={selectedForm.level}
                                name="level"
                                onChange = {e => {handChange(e)}}
                                isInvalid={!!errorsForm.level}
                                >
                                <option key='blankChoice' hidden value>-- Select Level --</option>
                                {levelList.map((level, key) => (
                                    <option key={key} value={level}>{level}</option>
                                ))}
                            </Form.Control>
                            <div style={{ width: '100%', fontSize: '.875em', marginTop: '.25rem', color: '#dc3545' }}>{errorsForm.level}</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="2">
                            <b>Question:</b>
                        </Form.Label>
                        <Form.Control 
                            required
                            type="text" 
                            placeholder="Enter question..." 
                            value={selectedForm.question}
                            name="question"
                            onChange = {e => {handChange(e)}}
                            isInvalid={!!errorsForm.question}                           
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errorsForm.question}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="2">
                            <b>Answer:</b>
                        </Form.Label>
                        <Form.Control 
                            required
                            type="text" 
                            placeholder="Enter Answer..."
                            value={selectedForm.answer}
                            name="answer"
                            onChange = {e => {handChange(e)}}
                            isInvalid={!!errorsForm.answer}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errorsForm.answer}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mt-3">
                                <Col md="12" className="text-end mt-1">
                                <Button 
                                    variant="primary" 
                                    className="btn-fill"
                                    type="submit"
                                    style={{paddingLeft:'19.26px', paddingRight: '19.26px', marginRight: '10px'}}
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
                                
                                </Col>
                            </Row>
                
                </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default UpdateResourceModal
