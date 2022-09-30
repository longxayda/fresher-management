import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReportModal.scss";

import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Link, useHistory } from "react-router-dom";
import { MyInput, MySelect } from "components/validation/Validation";

const schema = yup
    .object({
        reportName: yup.string().required("The field is required"),
        monthDate: yup
            .date()
            .required("The field is required")
            .transform((curr, orig) => (orig === "" ? null : curr))
            .nullable(),
    })
    .required();

function MonthlyModalList({ showModal, setShowModal }) {
    let history = useHistory();
    const [show, setShow] = useState(false);
    const {
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (value) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (isValid) {
                    history.push({
                        pathname: "/admin/report/new-history-report",
                        state: value, // your data array of objects
                    });
                    reset({ reportName: "", createAt: "" });
                }
                resolve();
            }, 200);
        });
    };
    const handleClose = () => {
        // const res = getWeeklyReportByIds();
        reset({ reportName: "", createAt: "" });
        setShow(false);
        setShowModal(false);
    };
    useEffect(() => {
        setShow(showModal);
    }, [showModal]);
    return (
        <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create New Report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyInput
                        id="monthDate"
                        type="date"
                        name="monthDate"
                        label="Month Date"
                        control={control}
                        errors={errors.monthDate?.message}
                        className="inputModal"
                    />
                    <MyInput
                        placeholder="Report name"
                        id="reportName"
                        label="Report name"
                        name="reportName"
                        control={control}
                        errors={errors.reportName?.message}
                        className="inputModal"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="btn-fill"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn-fill"
                        variant="primary"
                        type="submit"
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

function MonthlyDeliveryModal({ showModal, setShowModal }) {
    let history = useHistory();
    const [show, setShow] = useState(false);
    const {
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (value) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (isValid) {
                    history.push({
                        pathname: "/admin/report/new-delivery-report",
                        state: value,
                    });
                    reset({ reportName: "", createAt: "" });
                }
                resolve();
            }, 200);
        });
    };
    const handleClose = () => {
        reset({ reportName: "", createAt: "" });
        setShow(false);
        setShowModal(false);
    };
    useEffect(() => {
        setShow(showModal);
    }, [showModal]);
    return (
        <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-delivery-report-list"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        CREATE NEW REPORT
                    </Modal.Title>
                </Modal.Header>
                <hr />
                <Modal.Body>
                    <MyInput
                        id="monthDate"
                        type="date"
                        name="monthDate"
                        label="Month Date"
                        control={control}
                        errors={errors.monthDate?.message}
                        className="inputModal"
                    />
                    <MyInput
                        placeholder="Report name"
                        id="reportName"
                        label="Report name"
                        name="reportName"
                        control={control}
                        errors={errors.reportName?.message}
                        className="inputModal"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="btn-fill"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn-fill"
                        variant="primary"
                        type="submit"
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export { MonthlyDeliveryModal, MonthlyModalList };
