
import React from "react";
import { Button, CloseButton, Modal} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import {dataModalResource, isOpenModalDetailResource} from 'redux/selectors/auditorsSelector/resourceSelectors'
import {dataModalChange, isOpenModalDetailChange} from "redux/auditorsSlice/resourceSlice"

function DetailResourceModal(){
    const dispatch = useDispatch()
    const isOpenModalDetail = useSelector(isOpenModalDetailResource);
    const dataModal = useSelector(dataModalResource)
    const hideModal = () => {
        dispatch(isOpenModalDetailChange(false))
        dispatch(dataModalChange({}))
    };

    return(
        <div className="modal-detail">
             <Modal 
                show={isOpenModalDetail} 
                onHide={hideModal}
                size="lg"
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-primary"
                > 
                    Detail question
                </Modal.Title>
                <CloseButton  onClick={hideModal} ></CloseButton>
                </Modal.Header>
                <Modal.Body >
                    <p><b>ID: </b> {dataModal.id} </p>
                    <p><b>Module: </b> {dataModal.module} </p>
                    <p><b>Code: </b>{"N"+dataModal.id} <b> - Skill: </b>{dataModal.skill}  </p>
                    <p><b>Level: </b>{dataModal.level} <b> - Status: </b>{dataModal.status}</p>
                    <div style={{maxHeight:'250px', overflowY: 'scroll', border: '1px solid #ece9ea', padding: '5px 0'}}>    
                        <p style={{margin:'0 5px', padding: "5px"}}><b>Question: </b><br/>{dataModal.question} </p>
                        <p style={{margin:'0 5px', padding: "5px"}}><b>Answer: </b><br/>{dataModal.answer} </p>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{display: 'flex', justifyContent: 'flex-end',marginTop: "10px"}}>
                    <div>
                        <Button 
                        variant="primary" 
                        onClick={hideModal}
                        className="btn-fill button-close-detail"
                        style={{paddingLeft: '26px', paddingRight: '26px'}}
                        >
                            OK
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default DetailResourceModal
