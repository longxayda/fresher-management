import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "./index.scss";
import Loading from "components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingSelector } from "redux/selectors/topicSelector";
import { createTopic } from "redux/actions/topicAction";
export default function CreateTopic({ setShowModalTopic, show, moduleId, setTopic, setHide}) {

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [no, setNo] = useState("");
  const dispatch = useDispatch();
  const toggle = () => {setTopic(false)};
  const handleCreate = async () => {
    if (
      no&&
      name &&
      duration
    ) {
      const body = { no, topicName: name, duration };
      setShowModalTopic(false)
      await dispatch(createTopic({body,id: moduleId}));
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  return (
    <div>
      <Modal isOpen={show} toggle={toggle} className="createtopic">
        <h4 className="pt-5 px-4 mb-0 font-weight-bold text-primary"> ADD TOPIC</h4>
        <ModalBody>
          <div className="row">
            <div className="form-group">
                <label htmlFor="">Number of topic</label>
                <input
                  type="number"
                  min={0}
                  onChange={(e) => setNo(e.target.value)}
                  className="form-control"
                >
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="">Name of topic</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                >
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="">Duration (day)</label>
                <input
                  type="number"
                  min={0}
                  onChange={(e) => setDuration(e.target.value)}
                  className="form-control"
                >
                </input>
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
          <button className="btn btn-fill btn-secondary" onClick={()=>{
            setShowModalTopic(false);setHide(false)}}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
