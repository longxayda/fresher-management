import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingSelector } from "redux/selectors/moduleSelector";
import { createModule } from "redux/actions/moduleAction";

export default function CreateModule({ open, setOpen }) {
  const [name, setName] = useState("");
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();
  const toggle = () => setOpen(false);
  const handleCreate = async () => {
    if (
      name
    ) {
      const body = { name };
      toggle();
      await dispatch(createModule(body));
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  return (
    <div>
      <Modal isOpen={open} toggle={toggle} className="createmodule">
        <h4 className="pt-5 px-4 mb-0 font-weight-bold text-primary"> ADD MODULE</h4>
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">Name of module</label>
                <input 
                  type="text" 
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                >
                </input>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button
            className="btn btn-fill btn-primary mx-3"
            onClick={handleCreate}
          >
            Create
          </button>
          <button className="btn btn-fill btn-secondary" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
