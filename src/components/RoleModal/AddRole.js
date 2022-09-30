import React from "react";
import Select from "react-select";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { rightListSelector } from "redux/selectors/roleSelector.js";

function AddRole({
  newRole,
  rightArr,
  showAddRole,
  setNewRole,
  handleCloseAddRole,
  setRightArr,
  handleAddRole,
  validateStatus,
  validateRoleName,
}) {
  const rightList = useSelector(rightListSelector);
  const rightOptions = rightList.map((right) => {
    return {
      value: right.id,
      label: `${right.code}: ${right.rightName}`,
    };
  });
  return (
    <Modal
      show={showAddRole}
      onHide={handleCloseAddRole}
      size="lg"
      style={{ height: 1000 }}
    >
      <Modal.Header closeButton>
        <Modal.Title
          class="fw-semibold fs-3 text-primary modal-title h4"
          style={{ textTransform: "uppercase" }}
        >
          Add new role
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflowY: "scroll", maxHeight: 450 }}>
        <Form.Group className="mb-3">
          <Form.Label>Role name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type role name"
            value={newRole.roleName}
            onChange={(e) =>
              setNewRole((pre) => {
                return { ...pre, roleName: e.target.value };
              })
            }
          />
          {!validateStatus.roleName ? (
            <span style={{ fontSize: 13, color: "red", paddingLeft: 10 }}>
              {validateRoleName(newRole.roleName).mess}
            </span>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <div className="d-flex align-items-center">
            <input
              type="radio"
              id="new-role-active"
              name="status"
              value="1"
              checked={newRole.status}
              onChange={(e) => {
                setNewRole({
                  ...newRole,
                  status: newRole.status ? 0 : 1,
                });
              }}
              style={{
                height: "20px",
                width: "20px",
                marginRight: "5px",
              }}
            />
            <label htmlFor="new-role-active">Active</label>
            <input
              type="radio"
              id="new-role-inactive"
              name="status"
              value="0"
              checked={!newRole.status}
              onChange={(e) => {
                setNewRole({
                  ...newRole,
                  status: newRole.status ? 0 : 1,
                });
              }}
              style={{
                height: "20px",
                width: "20px",
                marginLeft: "50px",
                marginRight: "5px",
              }}
            />
            <label htmlFor="new-role-inactive">Inactive</label>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Permissions</Form.Label>
          <Select
            options={rightOptions}
            closeMenuOnSelect={false}
            value={rightArr}
            onChange={setRightArr}
            isMulti
            placeholder="Filter by Right..."
            maxMenuHeight={250}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="mt-4 d-flex justify-content-end">
        <Button
          className="btn-fill mx-4"
          variant="primary"
          onClick={handleAddRole}
        >
          Save
        </Button>
        <Button
          className="btn-fill"
          variant="secondary"
          onClick={handleCloseAddRole}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddRole;
