import React, { useEffect, useState } from "react";
import NotificationAlert from "react-notification-alert";
import AuditorTable from "components/Audit/AuditorList/AuditorTable.js";
import Validation from "components/Audit/AuditorList/Validation.js";

import store from "redux/store";
import { useSelector, useDispatch } from "react-redux";
import { selectedIds, auditorList, isAddModalOpen, isDelModalOpen, isMultiDel } from "redux/selectors/auditorsSelector/auditorSelector";
import { notifyContentChange, addModalChange, delModalChange, multiDelChange } from "redux/auditorsSlice/auditorSlice";
import { getPageAuditorList, addAuditor, deleteAuditor } from "redux/auditorsSlice/auditorSlice";

import {
    Badge,
    Button,
    Modal,
    Form,
    Container,
    Row,
    Col,
} from "react-bootstrap";

function Auditor() {

    const dispatch = useDispatch()

    const notificationAlertRef = React.useRef(null);
    const [auditorId, setauditorId] = useState("");
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        username: '',
    });

    const selectedIdsData = useSelector(selectedIds)
    const auditorListData = useSelector(auditorList)
    const isAddModalShow = useSelector(isAddModalOpen)
    const isDelModalShow = useSelector(isDelModalOpen)
    const isMultiDelAuditor = useSelector(isMultiDel)
    const [currentIndex, setCurrentIndex] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const maxIndex = store.getState().auditor.maxPage;


    const BadgeSkill = ({ values }) => {
        return (
            <>
                {values.map((skill, id) => {
                    let color;
                    switch (skill) {
                        case "Java":
                            color = "info"
                            break;
                        case ".NET":
                            color = "success"
                            break;
                        case "FE":
                            color = "secondary"
                            break;
                        case "React":
                            color = "primary"
                            break;
                        case "Angular":
                            color = "danger"
                            break;
                        case "Android":
                            color = "warning"
                            break;
                        case "CPP":
                            color = "dark"
                            break;
                        case "Autotest":
                            color = "primary"
                            break;
                        default:
                            color = "dark"
                    }
                    return (
                        <Badge key={id} bg={color} className="me-1 mb-1" style={{ fontSize: '0.85em' }}>{skill} {' '}</Badge>
                    );
                })}
            </>
        );
    };

    const notify = () => {
        let notifyoptions = {};
        notifyoptions = {
            place: 'tr',
            message: store.getState().auditor.notifyContent.message,
            type: store.getState().auditor.notifyContent.type,
            icon: store.getState().auditor.notifyContent.icon,
            autoDismiss: 3,
        };
        notificationAlertRef.current.notificationAlert(notifyoptions);
    };

    useEffect(() => {
        let body = {
            currentPageIndex: currentIndex,
            searchKey: searchValue
        }
        dispatch(getPageAuditorList(body)).then(() => {
            if (store.getState().auditor.notifyContent.message == "Loading Auditor List failed, please try again later!" && searchValue == '')
                try {
                    notify()
                }
                catch { return }
            dispatch(notifyContentChange({
                message: '',
                type: 'danger',
                icon: 'nc-icon nc-simple-remove',
            }))
        })
    }, [currentIndex, searchValue])

    const columns = React.useMemo(
        () => [
            {
                Header: "#",
                accessor: "",
                Cell: (row) => {
                    return <div>{Number(row.row.id) + 20 * (currentIndex - 1) + 1}</div>;
                },
                width: '5%',
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: "LAST NAME",
                accessor: "lastName",
                width: '15%',
                disableFilters: true,

            },
            {
                Header: "FIRST NAME",
                accessor: "firstName",
                width: '15%',
                disableFilters: true,
            },
            {
                Header: "USERNAME",
                accessor: "username",
                disableFilters: true,

            },
            {
                Header: "EMAIL",
                accessor: "mail",
                disableFilters: true,

            },
            {
                Header: "PHONE",
                accessor: "phone",
                disableFilters: true,

            },
            {
                Header: "SKILLS",
                accessor: "skillList",
                width: '25%',
                Cell: ({ cell: { value } }) => <BadgeSkill values={value} />,
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: "ACTION",
                accessor: "id",
                Cell: ({ row, value }) =>
                    <Row>
                        <Col className="md-12">
                            <Button className="btn-sm" value={value} variant="danger" onClick={() => {
                                setauditorId(value);
                                setForm({ username: row.original.username })
                                dispatch(delModalChange(true))
                            }}>
                                <i className="fas fa-trash"></i>
                            </Button>
                        </Col>
                    </Row>,
                disableSortBy: true,
                disableFilters: true,
            }
        ],
        [auditorListData]
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        if (!!errors[e.target.name]) setErrors({
            ...errors,
            [e.target.name]: null
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = Validation(form);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        }
        else {
            let body = {
                username: form.username,
                currentPageIndex: currentIndex,
                searchKey: searchValue
            }
            dispatch(addAuditor(body)).then(() => {
                notify()
            });
            closeModal();
        }
    }
    const handleDelete = () => {
        let item = isMultiDelAuditor ? selectedIdsData.join(',') : auditorId;
        let body = {
            ids: item,
            currentPageIndex: currentIndex,
            searchKey: searchValue
        }
        dispatch(deleteAuditor(body)).then(() => {
            notify()
        })
        closeModal();
    }

    const closeModal = () => {
        setForm({
            username: '',
        })
        setauditorId('');
        setErrors({});
        dispatch(addModalChange(false))
        dispatch(delModalChange(false))
        dispatch(multiDelChange(false))
    }

    const delTitle = () => {
        return isMultiDelAuditor ? selectedIdsData.length + ' auditors' : form.username;
    }

    return (
        <>
            <style>
                {
                    `.css-1pahdxg-control{
                    min-height: 40px;
                    border-color: hsl(0, 0%, 85%);
                }
                .css-1s2u09g-control{
                    min-height: 40px;
                    border-color: hsl(0, 0%, 85%);
                }
                .css-g1d714-ValueContainer{
                    padding: 0px 5px;
                }
                .css-14el2xx-placeholder{
                    color: hsl(0, 0%, 85%);
                }
                .css-319lph-ValueContainer{
                    padding: 0px 5px;
                }
                
                
                }`
                }
            </style>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <AuditorTable
                            columns={columns}
                            data={auditorListData}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                            maxIndex={maxIndex}
                        />
                    </Col>
                </Row>
            </Container>

            <Modal
                style={{ transform: 'translate(0)' }}
                className="modal-primary addModal"
                show={isAddModalShow}
                centered
                onHide={() => closeModal()}
            >
                <Modal.Header>
                    <Modal.Title className="mt-0 fw-semibold fs-3 text-primary" style={{ textTransform: 'uppercase', fontWeight: '400' }}>
                        Auditor Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <Form noValidate method="POST" onSubmit={handleSubmit}>
                        <Row className="my-2">
                            <Col className="pe-1">
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        placeholder="Username"
                                        type="text"
                                        value={form.username}
                                        name="username"
                                        onChange={handleChange}
                                        isInvalid={!!errors.username}
                                    ></Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="12" className="text-end mt-1">
                                <Button
                                    className="me-2 btn-fill closeModalBtn1"
                                    type="submit"
                                    variant="primary"
                                >
                                    Add
                                </Button>
                                <Button
                                    type="button"
                                    className="btn-fill"
                                    variant="secondary"
                                    onClick={() => closeModal()}
                                >
                                    Close
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </Modal.Body>
            </Modal>

            <Modal
                style={{ transform: 'translate(0)' }}
                className="modal-primary delModal"
                show={isDelModalShow}
                centered
                onHide={() => closeModal()}
            >
                <Modal.Header>
                    <Modal.Title className="mt-0 fw-semibold fs-3 text-danger" style={{ textTransform: 'uppercase', fontWeight: '400' }}>
                        Delete Auditor
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure to remove <strong>{delTitle()}</strong>?</h4>
                    <Row className="mt-3">
                        <Col md="12" className="text-end mt-1">
                            <Button
                                className="me-2 btn-fill closeModalBtn"
                                variant="danger"
                                onClick={() => handleDelete()}
                            >
                                Delete
                            </Button>
                            <Button
                                type="button"
                                className="btn-fill"
                                variant="secondary"
                                onClick={() => closeModal()}
                            >
                                Close
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Auditor;