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
        createdAt: yup
            .date()
            .required("The field is required")
            .transform((curr, orig) => (orig === "" ? null : curr))
            .nullable(),
    })
    .required();

function OutputsModal({ showModal, setShowModal }) {
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
                        pathname: "/admin/report/new-output-report",
                        state: value, // your data array of objects
                    });
                    reset({ reportName: "", createdAt: "" });
                }
                resolve();
            }, 200);
        });
    };
    const handleClose = () => {
        reset({ reportName: "", createdAt: "" });
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
                className="form-output-report-list"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create New Report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyInput
                        id="createdAt"
                        type="date"
                        name="createdAt"
                        label="CreatedAt"
                        control={control}
                        errors={errors.createdAt?.message}
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
                    <Button className="btn-fill" variant="primary" type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default OutputsModal;
