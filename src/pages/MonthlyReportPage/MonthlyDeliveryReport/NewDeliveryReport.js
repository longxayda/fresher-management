import NewDeliveryReportTable from "components/MonthlyReportTables/NewDeliveryTable";
import { updateDeliveryClassesInfo } from "components/MonthlyReportTables/newDeliveryTableSlice";
import { deleteClassesInfo } from "components/MonthlyReportTables/newDeliveryTableSlice";
import { fetchDeliveryClassesInfo } from "components/MonthlyReportTables/newDeliveryTableSlice";
import { fetchDeliveryClasses } from "components/MonthlyReportTables/newDeliveryTableSlice";
import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getDeliveryClassesInfo } from "redux/selectors";
import { getDeliveryClasses } from "redux/selectors";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import "./NewDeliveryReport.scss";

function NewDeliveryReport() {
    const [delItems, setDelItems] = useState([]);
    const classes = useSelector(getDeliveryClasses);
    const deliveryClassInfo = useSelector(getDeliveryClassesInfo);
    const [deliveryClasses, setDeliveryClasses] = useState([]);
    const location = useLocation();
    const dispatch = useDispatch();
    const history_ = useHistory();

    const handleSaveReport = () => {
        deliveryClassInfo.forEach((item) => {
            dispatch(
                updateDeliveryClassesInfo({
                    value: item,
                    idReport: 1,
                    idClass: item.classId,
                })
            );
        });
        history_.push("delivery-report-list");
    };

    const handleSelectClassCode = (e) => {
        dispatch(fetchDeliveryClassesInfo(e.target.value));
    };

    const handleDeleteDelivery = () => {
        if (delItems.length <= 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No value is selected!",
                footer: '<a href="">Why do I have this issue?</a>',
            });
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#a9a9a9",
                confirmButtonText: "Delete",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );
                    const value = [];
                    delItems.forEach((item) => {
                        value.push(item.classId);
                    });
                    dispatch(deleteClassesInfo(value));
                }
            });
        }
    };
    useEffect(() => {
        setDeliveryClasses(classes);
    }, [classes]);

    let history = useHistory();

    useEffect(() => {
        dispatch(fetchDeliveryClasses());
    }, []);

    return (
        <>
            <Container className="deliveryTable" fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title
                                    as="h4"
                                    style={{ color: " #939090" }}
                                >
                                    {location?.state?.reportName}
                                </Card.Title>
                                <div className="headerContent">
                                    <div className="headerLeft">
                                        <Button
                                            variant="danger"
                                            className="btn-fill"
                                            onClick={handleDeleteDelivery}
                                        >
                                            <span>
                                                <i className="far fa-trash-alt"></i>
                                            </span>
                                            <span
                                                style={{
                                                    paddingLeft: "5px",
                                                }}
                                            >
                                                Delete
                                            </span>
                                        </Button>
                                        <Form.Select
                                            aria-label="Default select example"
                                            onChange={handleSelectClassCode}
                                            style={{ width: "300px" }}
                                        >
                                            <option>Choose a option</option>
                                            {deliveryClasses?.map((item) => (
                                                <option
                                                    key={uuidv4()}
                                                    value={item.id}
                                                    name={item.classCode}
                                                >
                                                    {item.classCode}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className="table-full-width table-report-week  table-responsive px-0">
                                <NewDeliveryReportTable
                                    setDelItems={setDelItems}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="btnSave" onClick={handleSaveReport}>
                    <Button variant="primary" className="btn-fill">
                        Create
                    </Button>
                </div>
            </Container>
        </>
    );
}

export default NewDeliveryReport;
