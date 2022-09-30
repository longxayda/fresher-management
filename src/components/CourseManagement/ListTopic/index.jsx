import { useEffect, useState, useMemo } from "react";
import {
  Button,
  Modal,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/Loading"
import {
  listTopicSelector,
  isLoadingSelector,
} from "redux/selectors/topicSelector";
import { getListTopic } from "redux/actions/topicAction";
import WrapTable from "components/CourseManagement/ListTopic/table";
import ModalCreateTopic from "components/CourseManagement/ModalCreateTopic";
const TopicModal = ({ id ,setTopic, topic ,setHide, hide}) => {
  const [state, setState] = useState(true);
  const handleEditDuration = () => {
    setState(!state);
  };
  const handleUpdateDuration = () => {
    setState(!state);
  };
  const dispatch = useDispatch();
  const listTopic = useSelector(listTopicSelector);
  const isLoading = useSelector(isLoadingSelector);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModalTopic, setShowModalTopic] = useState(false);
  useEffect(() =>{
    if(show) {
      dispatch(getListTopic(id)); 
    }
  }, [show,id])
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Topic",
        accessor: "topicName",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
    ],
    []
  );
  return (
    <>
      <Button 
        style={{marginRight: '0px'}}
        variant="secondary"
        size="sm"
        className="btn-row-detail"
        onClick={handleShow}
      >
        <i className="fas fa-eye"></i>
      </Button>
      
    {<ModalCreateTopic moduleId={id} setShowModalTopic={setShowModalTopic} show={showModalTopic} topic={topic} setTopic={setTopic} setHide={setHide} />}

    {!hide&&
      <Modal size="lg" className="topicModule-modal" centered show={show} onHide={handleClose} >
      <Container >
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold fs-3 text-primary">
              LIST TOPIC
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WrapTable setShowModalTopic={setShowModalTopic} data={listTopic} columns={columns} state={state} topic={topic} setTopic={setTopic} setHide={setHide} isLoading={isLoading}/>
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          {state ? (
            <Button
              variant="primary"
              type="submit"
              className="mx-2 btn btn-fill"
              onClick={handleEditDuration}
            >
              Edit Duration
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              className="mx-2 btn btn-fill"
              onClick={handleUpdateDuration}
            >
              Update Duration
            </Button>
          )}
          <Button
            variant="secondary"
            className="btn btn-fill"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Container>
    </Modal>
    }
    </>
  );
};

export default TopicModal;
