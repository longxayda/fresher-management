import React from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { roleListSelector } from "redux/selectors/roleSelector.js";

function ActiveSelectedRoles({
  selectedRoles,
  showActiveSelectedRoles,
  handleActiveSelectedRoles,
  handleCloseActiveSelectedRoles,
}) {
  const roleList = useSelector(roleListSelector);
  return (
    <Modal
      show={showActiveSelectedRoles}
      onHide={handleCloseActiveSelectedRoles}
    >
      <Modal.Header closeButton>
        <Modal.Title>Active {selectedRoles.length} roles?</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#9A9A9A", fontStyle: "italic" }}>
        Do you really want to active these roles?
        <ListGroup>
          {selectedRoles.map((roleId) => {
            let objIndex = roleList.findIndex((obj) => obj.id == roleId);
            if (roleList[objIndex])
              return (
                <ListGroup.Item key={roleId}>
                  {roleId}. {roleList[objIndex].roleName}
                </ListGroup.Item>
              );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer className="mt-4 d-flex justify-content-end">
        <Button
          variant="success mx-4"
          className="btn-fill"
          onClick={handleActiveSelectedRoles}
        >
          Active
        </Button>
        <Button
          variant="secondary"
          className="btn-fill"
          onClick={handleCloseActiveSelectedRoles}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function InactiveSelectedRoles({
  selectedRoles,
  showInactiveSelectedRoles,
  handleInactiveSelectedRoles,
  handleCloseInactiveSelectedRoles,
}) {
  const roleList = useSelector(roleListSelector);
  return (
    <Modal
      show={showInactiveSelectedRoles}
      onHide={handleCloseInactiveSelectedRoles}
    >
      <Modal.Header closeButton>
        <Modal.Title>Inactive {selectedRoles.length} roles?</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#9A9A9A", fontStyle: "italic" }}>
        Do you really want to inactive these roles?
        <ListGroup>
          {selectedRoles.map((roleId) => {
            let objIndex = roleList.findIndex((obj) => obj.id == roleId);
            if (roleList[objIndex])
              return (
                <ListGroup.Item key={roleId}>
                  {roleId}. {roleList[objIndex].roleName}
                </ListGroup.Item>
              );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer className="mt-4 d-flex justify-content-end">
        <Button
          variant="danger mx-4"
          className="btn-fill"
          onClick={handleInactiveSelectedRoles}
        >
          Inactive
        </Button>
        <Button
          variant="secondary"
          className="btn-fill"
          onClick={handleCloseInactiveSelectedRoles}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ActiveSelectedRoles, InactiveSelectedRoles };
