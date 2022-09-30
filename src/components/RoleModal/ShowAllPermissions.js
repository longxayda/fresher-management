import { useState } from "react";
import { Button, Col, Form, ListGroup, Modal, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { rightListSelector } from "redux/selectors/roleSelector";

function ShowAllPermissions({ showAllPermissions, handleCloseAllPermissions }) {
    const rightList = useSelector(rightListSelector);
    const [permission, setPermission] = useState({
        index: "",
        id: "",
        rightName: "",
        description: "",
    });
    const handleClickPermissionItem = (id, index) => {
        setPermission({ index: index, ...rightList[--id] });
    };
    return (
        <Modal
            show={showAllPermissions}
            onHide={handleCloseAllPermissions}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>All Permissions</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 450, overflowY: "scroll" }}>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="">
                    <Row>
                        <Col sm={6}>
                            <ListGroup>
                                {rightList?.map((list, index) => {
                                    return (
                                        <ListGroup.Item
                                            key={index}
                                            active={permission.id === list.id}
                                            action
                                            onClick={() => handleClickPermissionItem(list.id, index)}
                                            href={"#right-" + permission?.id}
                                        >
                                            {list.rightName}
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </Col>
                        <Col sm={6}>
                            <div style={{ marginTop: 9 + 47.4 * permission.index }}>
                                {permission?.description}
                            </div>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer className="mt-4 d-flex justify-content-end">
                <Button
                    variant="secondary"
                    className="btn-fill"
                    onClick={handleCloseAllPermissions}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShowAllPermissions;