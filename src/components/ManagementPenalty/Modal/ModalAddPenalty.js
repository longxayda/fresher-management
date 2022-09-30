import React, { useState} from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Modal,
    Form,
    Container,
    Row,
    Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBonusPenalty } from "redux/fresherManageSlice/penaltySlice";
import { isProcessingSelector } from "redux/selectors/penaltySelector"
const colorBonus = "#28a745";
const colorPenalty = "#dc3545";
const maxDate = new Date();

function ModalAddPenalty({ userId, notifyAdd }) {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    const isProcessing = useSelector(isProcessingSelector);
    const onSubmit = async (data) => {
        if (!errors.date && !errors.reason) {
            const newData = {
                ...data,
                user_id: userId,
            };
            try {
                await dispatch(addBonusPenalty(newData)).unwrap();
                notifyAdd(data.type);
                handleClose();
            }
            catch (err) {
                console.log(err);
                if(err.message === "Network Error"){
                    notifyAdd("Network Error");
                }
                else{
                    notifyAdd("");
                }
            }
        }
    };
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        reset();
    }
    const handleShow = () => {
        setShow(true);
        setColorType(colorBonus);
    }

    const [optionScore, setOptionScore] = useState(() => {
        const optionScore = [];
        for (let i = 1; i < 101; i++) {
            optionScore.push(i);
        }
        return optionScore;
    });
    
    const buttonAddClose = {
        display: "grid",
        justifyContent: "end",
        paddingRight: "0",
        paddingLeft: "0",
    };
    const titleAdd = {
        marginTop: "0",
    };
    const [colorType, setColorType] = useState(colorBonus);

    const handleStyle = (e) => {
        const value = e.target.value;

        if (value === "Bonus") {
            setColorType(colorBonus);
        }
        else {
            setColorType(colorPenalty);
        }
    };

    return (
        <>
            <Button
                id="button-add-testing"
                className="btn-fill btn-wd bbb"
                variant="primary"
                onClick={handleShow}
                style={{ width: "210px", marginLeft: "8px" }}
            >
                <i className="fas fa-plus"
                    style={{ marginRight: "4px" }}>
                </i>
                New Bonus/Penalty
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={titleAdd} className="text-primary modal-title h4">
                        ADD NEW BONUS / PENALTY
                    </Modal.Title>
                    {isProcessing && <div className="processing" ></div>}
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Row>
                                <Col lg="6" md sm xs="4" >
                                    <label>Date</label>
                                    <Form.Control
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
                                            onChange={handleStyle}
                                        >
                                            <option value="Bonus" style={{ color: colorBonus }}>Bonus</option>
                                            <option value="Penalty" style={{ color: colorPenalty }}>Penalty</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col lg="3" md sm xs="4">
                                    <label> Score </label>
                                    <div>
                                        <select
                                            {...register("score")}
                                            style={{ height: "40px", width: "88px", border: "1px solid #E3E3E3", borderRadius: "4px", color: colorType }}
                                        >
                                            {optionScore.map(score => (
                                                <option key={score} value={score}>{score}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                        <label>Reason</label>
                        <Form.Control
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
                        <Form.Group>
                            <Container style={{ marginTop: "25px" }}>
                                <Row>
                                    <Col lg="4" md sm xs="4" ></Col>
                                    <Col lg="4" md sm xs="4" style={buttonAddClose}>
                                        <Button
                                            type="submit"
                                            className="btn-fill btn-wd"
                                            variant="primary">
                                            Add
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
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
};
export default ModalAddPenalty;