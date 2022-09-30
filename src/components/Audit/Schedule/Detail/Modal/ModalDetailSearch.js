

import React from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import Search from "components/Audit/Schedule/Detail/Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { questionSelectedListSchedule, traineeSchedule, scheduleID } from 'redux/selectors/auditorsSelector/scheduleSelector'
import { addQuestionSchedule } from "redux/auditorsSlice/scheduleSlice";

function ModalDetailSearch({ isOpenSearch, hideModalSearch, data, notify,setIsOpenSearch}) {
    const dispatch = useDispatch();
    const traineeID = useSelector(traineeSchedule);
    const scheduleId = useSelector(scheduleID);
    const listId = useSelector(questionSelectedListSchedule);
    const onAddSubmit = () => {
        dispatch(addQuestionSchedule({idSchedule: scheduleId, IDtrainee: traineeID, listIdQuestion:listId, notify:notify}))
        setIsOpenSearch(false);
    }
    return (
        <div className="modal-search">
            <Modal
                show={isOpenSearch}
                onHide={hideModalSearch}
                // size= "lg"
                fullscreen={true}
                scrollable
            >
                <Modal.Header style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between' }}>
                    <Modal.Title style={{ textTransform: 'uppercase', fontWeight: 'bold' }}> <span style={{ color: '#9C9C9C' }}>Add question</span> </Modal.Title>
                    <CloseButton onClick={hideModalSearch} ></CloseButton>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '500px' }}>
                    <Search></Search>
                    {/* <Resource></Resource>  */}
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "10px" }}>
                    <div>
                        <Button
                            variant="primary"
                            onClick={onAddSubmit}
                            className="btn-fill"
                        >
                            Add
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={hideModalSearch}
                            className="btn-fill"
                            style={{ marginLeft: '8px' }}
                        >
                            Close
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDetailSearch

