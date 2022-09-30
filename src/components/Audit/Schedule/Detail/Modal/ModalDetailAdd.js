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
    isAddQuestionResource
} from 'redux/selectors/auditorsSelector/resourceSelectors'

import {
    idChange, 
    isOpenModalAddEditChange,
    formChange,
    errorsChange,
    isAddQuestionChange
} from "redux/auditorsSlice/resourceSlice"

function ModalDetailAdd()
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
                dispatch(addQuestion({
                  id: modalId,
                  question: selectedForm.question,
                  answer: selectedForm.answer,
                  skill: selectedForm.skill,
                  status: selectedForm.status,
                  level: selectedForm.level,
                  module: selectedForm.module,
                }))
            }else{
                console.log('Hi, edit question')
                dispatch(updateQuestion({
                    id: parseInt(idRow),
                    question: selectedForm.question,
                    answer: selectedForm.answer,
                    skill: selectedForm.skill,
                    status: selectedForm.status,
                    level: selectedForm.level,
                    module: selectedForm.module,
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
          skill: "",
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
                <Modal.Title style={{textTransform: 'uppercase', fontWeight: 'bold', color: "#9c9c9c"}}>{titleModal}</Modal.Title>
                <CloseButton onClick={closeModal} ></CloseButton>
                </Modal.Header>
                <Modal.Body style={{ border: '1px solid #ece9ea'}}>
                <Form noValidate method="POST" onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <b>ID:</b> 
                        
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={modalId}/>
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
                                {moduleList.map(module => (
                                     <option key={module} value={module}>{module}</option>
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
                                {skillList.map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
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
                                {levelList.map(level => (
                                    <option key={level} value={level}>{level}</option>
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

                    
                    <Row className="mt-3">
                                <Col md="12" className="text-end mt-1">
                                <Button 
                                    variant="secondary" 
                                    onClick={closeModal}
                                    style={{marginRight: '10px'}}
                                    className="btn-fill">
                                    Close
                                </Button>
                                <Button 
                                    variant="primary" 
                                    className="btn-fill"
                                    type="submit"
                                    style={{paddingLeft:'20px', paddingRight: '20px'}}
                                    >
                                    Save
                                </Button>
                                </Col>
                            </Row>
                
                </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalDetailAdd