import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { updateBonusPenalty } from "redux/fresherManageSlice/penaltySlice";
import { useDispatch, useSelector } from "react-redux";
import { isProcessingSelector } from "redux/selectors/penaltySelector"

const colorBonus = "#28a745";
const colorPenalty = "#dc3545";
const maxDate = new Date();

function ModalUpdatePenalty({
    userId,
    no,
    id,
    date,
    type,
    score,
    reason,
    notifyUpdate,
}) {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const isProcessing = useSelector(isProcessingSelector);

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        if (!errors.date && !errors.reason) {
            const newData = {
                ...data,
                id: id,
                user_id: userId,
            };
            try {
                await dispatch(updateBonusPenalty(newData)).unwrap();
                notifyUpdate("success");
                handleClose();
            }
            catch (err) {
                notifyUpdate("failed");
            }
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
        setColorType(type === "Bonus" ? colorBonus : colorPenalty);
        reset();
    };
    const buttonAddClose = {
        display: "grid",
        justifyContent: "end",
        paddingRight: "0",
        paddingLeft: "0",
    };

    const titleAdd = {
        marginTop: "0",
    };

    const optionType = ["Penalty", "Bonus"];

    const [colorType, setColorType] = useState(() => {
        if (type == "Bonus") return colorBonus;
        else return colorPenalty;
    });

    const [optionScore, setOptionScore] = useState(() => {
        const optionScore = [];
        for (let i = 1; i < 101; i++) {
            optionScore.push(i);
        }
        return optionScore;
    });

    const handleStyle = (e) => {
        const value = e.target.value;
        if(value === "Bonus"){
            setColorType(colorBonus);
        }
        else{
            setColorType(colorPenalty);
        }
    };

    const { setValue } = useForm();

    return (
        <>
            <Button
                id="update-penalty-btn"
                type="button"
                variant="primary"
                onClick={handleShow}
                className="position-action-delete"
                size="sm"
            >
                <i className="fas fa-pen-square"></i>
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={titleAdd} className="text-primary modal-title h4">
                        UPDATE {type.toUpperCase()} NO {no}
                    </Modal.Title>
                    {isProcessing && <div className="processing" ></div>}
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col lg="6" md sm xs="4" >
                                    <label>Date</label>
                                    <Form.Control
                                        defaultValue={date}
                                        style={errors.date ? { border: "1px solid #dc3545" } : {}}
                                        type="date"

                                        {...register("date", {
                                            validate: {
                                                require: (value) => value !== "",
                                                overtime: (value) => new Date(value) <= maxDate,
                                            }
                                        })}
                                    >
                                    </Form.Control>
                                    {errors.date && errors.date.type === "require" && (
                                        <p style={{ color: "red" }}>⚠ This field is required</p>
                                    )}
                                    {errors.date && errors.date.type === "overtime" && (
                                        <p style={{ color: "red" }}>⚠ You cannot choose future day</p>
                                    )}
                                </Col>
                                <Col lg="3" md sm xs="4" >
                                    <label>Type</label>
                                    <div>
                                        <select
                                            {...register("type")}
                                            style={{ height: "40px", width: "88px", border: "1px solid #E3E3E3", borderRadius: "4px", color: colorType }}
                                            onChange={(e) => handleStyle(e)}
                                            defaultValue={type}
                                        >
                                            {optionType.map(type => (
                                                <option key={type}
                                                    value={type}
                                                    style={type === "Bonus" ? { color: colorBonus } : { color: colorPenalty }}
                                                >
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Col>
                                <Col lg="3" md sm xs="4">
                                    <label> Score </label>
                                    <div>
                                        <select
                                            {...register("score")}
                                            style={{ height: "40px", width: "88px", border: "1px solid #E3E3E3", borderRadius: "4px", color: colorType }}
                                            defaultValue={score}
                                        >
                                            {optionScore.map(score => (
                                                <option key={score} value={score}>{score}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <label>Reason</label>
                            <Form.Control
                                defaultValue={reason}
                                {...register("reason", {
                                    validate: (value) => value !== ""
                                })}
                                style={errors.reason ? { border: "1px solid #dc3545" } : {}}
                                placeholder="Here can be write your description for this bonus/penalty"
                                as="textarea"
                                rows="4"
                                className="input formReason">
                            </Form.Control>
                            {errors.reason && <p style={{ color: "red" }}>⚠ This field is required</p>}
                        </Form.Group>
                        <Container style={{ marginTop: "25px" }}>
                            <Row>
                                <Col lg="4" md sm xs="4" ></Col>
                                <Col lg="4" md sm xs="4" style={buttonAddClose}>
                                    <Button
                                        id='update-btn'
                                        type="submit"
                                        className="btn-fill btn-wd"
                                        variant="primary"
                                    >
                                        Update
                                    </Button>
                                </Col>
                                <Col lg="4" md sm xs="4" style={buttonAddClose}>
                                    <Button
                                        className="btn-fill btn-wd"
                                        variant="secondary"
                                        onClick={handleClose}>
                                        Close
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
};
export default ModalUpdatePenalty;