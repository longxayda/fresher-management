import React from "react";
import Select from "react-select";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { rightListSelector } from "redux/selectors/roleSelector.js";

function EditRole({
  showEditRole,
  editRole,
  rightArr,
  setEditRole,
  setRightArr,
  handleCloseEditRole,
  handleEditRole,
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
      show={showEditRole}
      onHide={handleCloseEditRole}
      size="lg"
      style={{
        height: "1000px",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title
          class="fw-semibold fs-3 text-primary modal-title h4"
          style={{ textTransform: "uppercase" }}
        >
          Edit role
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflowY: "scroll", maxHeight: 450 }}>
        <Form.Group className="mb-3">
          <Form.Label>Role name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type role name"
            value={editRole.roleName}
            onChange={(e) =>
              setEditRole((pre) => {
                return { ...pre, roleName: e.target.value };
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <div className="d-flex align-items-center">
            <input
              type="radio"
              id="active"
              name="status"
              value="1"
              checked={editRole.status}
              onChange={(e) => {
                setEditRole({
                  ...editRole,
                  status: editRole.status ? 0 : 1,
                });
              }}
              style={{
                height: "20px",
                width: "20px",
                marginRight: "5px",
              }}
            />
            <label htmlFor="active">Active</label>
            <input
              type="radio"
              id="inactive"
              name="status"
              value="0"
              checked={!editRole.status}
              onChange={(e) => {
                setEditRole({
                  ...editRole,
                  status: editRole.status ? 0 : 1,
                });
              }}
              style={{
                height: "20px",
                width: "20px",
                marginLeft: "50px",
                marginRight: "5px",
              }}
            />
            <label htmlFor="inactive">Inactive</label>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Permissions</Form.Label>
          <Select
            options={rightOptions}
            defaultValue={rightArr}
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
          variant="primary"
          className="btn-fill mx-4"
          onClick={handleEditRole}
        >
          Save change
        </Button>
        <Button
          variant="secondary"
          className="btn-fill"
          onClick={handleCloseEditRole}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditRole;
