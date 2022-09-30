
import React from "react";
import { Button, CloseButton, Modal} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import 
{
    idResource, 
    selectIdsResource, 
    isOpenModalDeleteResource, 
    isMultipleDeleteResource,
} from 'redux/selectors/auditorsSelector/resourceSelectors'
import 
{
    idChange, 
    isOpenModalDeleteChange,
    isMultipleDeleteChange,
} from "redux/auditorsSlice/resourceSlice"
import { deleteOneQuestion, deleteManyQuestion} from "redux/auditorsSlice/resourceSlice";

function DeleteResourceModal({notify})
{
    const dispatch = useDispatch()
    const selectedRow = useSelector(selectIdsResource)
    const idRow = useSelector(idResource)
    const isMultipleDelete = useSelector(isMultipleDeleteResource)
    const isOpenModalDelete = useSelector(isOpenModalDeleteResource)
   
    const hideOpenDelete = () => {
        dispatch(idChange(""))
        dispatch(isOpenModalDeleteChange(false))
        dispatch(isMultipleDeleteChange(false))
    }
    const onSubmitDelete = () => {
      const items = isMultipleDelete ? selectedRow : idRow;
      if(isMultipleDelete){
        dispatch(deleteManyQuestion({data: items, notify: notify}))
      }else{
        dispatch(deleteOneQuestion({data: idRow, notify: notify}))
      }
      dispatch(isOpenModalDeleteChange(false))
      dispatch(isMultipleDeleteChange(false))
    }
    
    return (
        <div className="modal-delete">
            <Modal 
                show={isOpenModalDelete} 
                onHide={hideOpenDelete}
                size="lg"
                >
                <Modal.Header style={{padding: '0 24px', display: 'flex', justifyContent:'space-between'}}>
                <Modal.Title 
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}
                    className="fw-semibold fs-3 text-danger"
                >
                        Delete question
                </Modal.Title>
                <CloseButton className="button-close-delete" onClick={hideOpenDelete} ></CloseButton>
                </Modal.Header>
                <Modal.Body >
                    <p style={{fontWeight: 'bold'}}>ARE YOU SURE YOU WANT TO DELETE ?</p>
                    <p><b>Number of question: </b>{isMultipleDelete ? selectedRow.length : 1} </p>
                    <p style={{fontWeight: 'bold'}}>Question codes: </p> 
                    <div style={{maxHeight:'250px', overflowY: 'scroll'}}>  
                        <ol>{isMultipleDelete ? selectedRow.map(a=>(<li key={a}>{"N"+a}</li>)) : <li key={idRow}>{"N"+idRow}</li>}</ol>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{display: 'flex', justifyContent:'flex-end'}}>
                    <div >
                        <Button 
                            variant="danger" 
                            onClick={onSubmitDelete}
                            style={{marginRight: '10px'}}
                            className="btn-fill"
                        >
                            Delete
                        </Button>

                        <Button 
                            variant="secondary" 
                            onClick={hideOpenDelete}
                            style={{paddingLeft:'18.97px', paddingRight: '18.97px'}}
                            className="btn-fill button-close-delete"
                        >
                            Close
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default DeleteResourceModal
