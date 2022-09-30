import React from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import
{
    isOpenModalDeleteSchedule,
    isMultipleDeleteSchedule,
} from 'redux/selectors/auditorsSelector/scheduleSelector'
import
{
    idChange,
    isOpenModalDeleteChange,
    isMultipleDeleteChange,
} from 'redux/auditorsSlice/scheduleSlice'
import { deleteOneSchedule, deleteManySchedule } from 'redux/auditorsSlice/scheduleSlice'
import { useDispatch, useSelector } from "react-redux";
import { idSchedule, deleteManyScheduleSelector } from "redux/selectors/auditorsSelector/scheduleSelector";

function ModalScheduleRowDeletion({notify}) {
    const dispatch = useDispatch()
    const selectedRow = useSelector(deleteManyScheduleSelector)
    const idRow = useSelector(idSchedule)
    const isMultipleDelete = useSelector(isMultipleDeleteSchedule)
    const isOpenModalDelete = useSelector(isOpenModalDeleteSchedule)

    const hideOpenDelete = () => {
        dispatch(idChange(""))
        dispatch(isOpenModalDeleteChange(false))
        dispatch(isMultipleDeleteChange(false))
    }

    const onSubmitDelete = () => {
        const items = isMultipleDelete ? selectedRow : idRow;
        if(isMultipleDelete){
            dispatch(deleteManySchedule({data: selectedRow, notify: notify}))
        }
        else{
            dispatch(deleteOneSchedule({data : idRow, notify: notify}))
        }
        dispatch(isOpenModalDeleteChange(false))
        dispatch(isMultipleDeleteChange(false))
    }
    return (
        <div className="RowDeletion">
            <Modal
                show={isOpenModalDelete}
                onHide={hideOpenDelete}
                size="lg"
            >
                <Modal.Header style={{ padding: '0 24px', display: 'flex', justifyContent: 'center' }}>
                    <Modal.Title style={{ textTransform: 'uppercase' }} className="fw-semibold fs-3 text-danger">Delete Audit</Modal.Title>
                    <CloseButton onClick={hideOpenDelete} ></CloseButton>
                </Modal.Header>
                <Modal.Body style={{ border: '1px solid #ece9ea'}}>
                    <p><b>Number of Audit: </b>{isMultipleDelete ? selectedRow.length : 1} </p>
                    <p style={{fontWeight: 'bold'}}>id: </p> 
                    <div style={{maxHeight:'250px', overflowY: 'scroll', border: '1px solid #ece9ea'}}>  
                        <ol>{isMultipleDelete ? selectedRow.map(a=>(<li key={a}>{"N"+a}</li>)) : <li key={idRow}>{"N"+idRow}</li>}</ol>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'flex-end' }}>
                    <div>
                        <Button
                            variant="secondary"
                            onClick={hideOpenDelete}
                            style={{ paddingLeft: '20px', paddingRight: '20px' }}
                            className="btn-fill"
                        >
                            NO
                        </Button>
                        <Button
                            variant="danger"
                            onClick={onSubmitDelete}
                            style={{ marginRight: '10px' }}
                            className="btn-fill"
                        >
                            YES
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalScheduleRowDeletion
