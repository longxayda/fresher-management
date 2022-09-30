import DeliveryReportListTable from "components/MonthlyReportTables/DeliveryReportListTable";
import { searchDeliveryReportList } from "components/MonthlyReportTables/deliveryReportListTableSlice";
import { fetchDeliveryReportList } from "components/MonthlyReportTables/deliveryReportListTableSlice";
import { deleteDeliveryReportList } from "components/MonthlyReportTables/deliveryReportListTableSlice";
import { MonthlyDeliveryModal } from "components/ReportModal/MonthlyModal";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./DeliveryReportList.scss";

function DeliveryReportList() {
    const [delItems, setDelItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDeliveryReportList());
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        console.log(value);
        dispatch(searchDeliveryReportList(value));
    };

    const handleDeleteDeliveryReport = async () => {
        try {
            if (delItems.length <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "OOPS...",
                    text: "No value is selected!",
                    footer: '<a href="">Why do I have this issue?</a>',
                });
            } else {
                Swal.fire({
                    title: "ARE YOU SURE?",
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
                        let value = [];
                        delItems.forEach((item) => {
                            value.push(item.id);
                        });
                        dispatch(deleteDeliveryReportList({ listId: value }));
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container fluid className="monthly-deliverry-report">
            <Row>
                <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4">
                                Delivery Report List
                            </Card.Title>
                            <div className="drl-headerContent">
                                <div className="headerLeft">
                                    <Button
                                        onClick={handleDeleteDeliveryReport}
                                        variant="danger"
                                        className="btn-fill"
                                    >
                                        <span>
                                            <i className="far fa-trash-alt"></i>
                                        </span>
                                        <span style={{ paddingLeft: "5px" }}>
                                            Delete
                                        </span>
                                    </Button>
                                    <Button
                                        onClick={() => setShowModal(true)}
                                        className="btn-fill "
                                        variant="primary"
                                    >
                                        <span>
                                            <i className="fas fa-plus"></i>
                                        </span>
                                        <span style={{ paddingLeft: "5px" }}>
                                            Create New Report
                                        </span>
                                    </Button>
                                </div>
                                <div className="headerRight">
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="search here..."
                                    />
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <DeliveryReportListTable
                                setDelItems={setDelItems}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <MonthlyDeliveryModal
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </Container>
    );
}

export default DeliveryReportList;
