import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Badge,
  Tab,
  ListGroup,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { rightListSelector } from "redux/selectors/roleSelector.js";

function DetailRole({ detailRole, showDetailRole, handleCloseDetailRole }) {
  const rightList = useSelector(rightListSelector);
  return (
    <Modal show={showDetailRole} onHide={handleCloseDetailRole} size="lg">
      <Modal.Header closeButton>
        <Modal.Title
          class="fw-semibold fs-3 text-primary modal-title h4"
          style={{ textTransform: "uppercase" }}
        >
          Role {detailRole.roleName}{" "}
          {detailRole.status ? (
            <Badge bg="success">Active</Badge>
          ) : (
            <Badge bg="danger">Inactive</Badge>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 450, overflowY: "scroll" }}>
        <Form.Label>Permissions</Form.Label>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="">
          <Row>
            <Col sm={6}>
              <ListGroup>
                {detailRole.rights.map((rightId) => {
                  let objIndex = rightList.findIndex(
                    (obj) => obj.id == rightId
                  );
                  return (
                    <ListGroup.Item
                      action
                      key={rightList[objIndex].id}
                      href={"#right-" + rightList[objIndex].id}
                    >
                      <strong>{rightList[objIndex].code}: </strong>
                      {rightList[objIndex].rightName}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
            <Col sm={6}>
              <Tab.Content>
                {detailRole.rights.map((rightId, index) => {
                  let objIndex = rightList.findIndex(
                    (obj) => obj.id == rightId
                  );
                  return (
                    <Tab.Pane
                      key={rightList[objIndex].id}
                      eventKey={"#right-" + rightList[objIndex].id}
                      style={{ marginTop: 9 + 47.4 * index }}
                    >
                      {rightList[objIndex].description}
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer className="mt-4 d-flex justify-content-end">
        <Button
          variant="secondary"
          className="btn-fill"
          onClick={handleCloseDetailRole}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailRole;
