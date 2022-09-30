import { Button, Modal, Container } from "react-bootstrap";
import TransciptTable from "./TranscriptTable";
const TopicModal = ({
  columnsModal,
  show,
  data,
  triggerModal,
  children,
  triggerUpdateScore,
  isEdit,
  triggerEditScore,
}) => {
  return (
    <>
      <Modal className="topic_modal" show={show} onHide={triggerModal}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold fs-3 text-primary">
              {children}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TransciptTable
              data={data}
              columns={columnsModal}
              isEdit={isEdit}
            />
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            {isEdit ? (
              <Button
                variant="primary"
                type="submit"
                className="mx-2 btn btn-fill"
                onClick={triggerEditScore}
              >
                Edit Score
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="mx-2 btn btn-fill"
                onClick={triggerUpdateScore}
              >
                Update Score
              </Button>
            )}
            <Button
              variant="secondary"
              className="btn btn-fill"
              onClick={triggerModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
};

export default TopicModal;
