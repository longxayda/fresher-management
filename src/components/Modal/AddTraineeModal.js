import { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { Container, Col, Row } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { notify } from "./notify.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addFresher,
  getAllClassInYear,
} from "redux/fresherManageSlice/fresherManagementSlice";
import axios from "axios";
const AddTraineeMD = () => {
  const [form, setForm] = useState({});
  const { loading } = useSelector((state) => state.manageFR);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [classinYear, setClassinYear] = useState([]);
  const dispatch = useDispatch();
  const notificationAlertRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };
  const validateForm = () => {
    const {
      firstName,
      lastName,
      phone,
      email,
      classId,
      university,
      faculty,
      englishLevel,
      major,
      graduateYear,
      fsuAllocated,
    } = form;
    const newErrors = {};
    if (!firstName || firstName === "") {
      newErrors.firstName = "First name is required";
    }
    if (!lastName || lastName === "") {
      newErrors.lastName = "Last name is required";
    }
    if (!email || email === "") {
      newErrors.email = "email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = "email is invalid";
    }
    if (!phone || phone === "") {
      newErrors.phone = "Phone is required";
    } else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone)) {
      newErrors.phone = "Phone is invalid";
    }
    if (!university || university === "") {
      newErrors.university = "University is required";
    }
    if (!faculty || faculty === "") {
      newErrors.faculty = "Faculty is required";
    }
    if (!englishLevel || englishLevel === "") {
      newErrors.englishLevel = "English is required";
    }
    if (!major || major === "") {
      newErrors.major = " Major is required";
    }
    if (!graduateYear || graduateYear === "") {
      newErrors.graduateYear = "GraduateYear is required";
    }
    if (!fsuAllocated || fsuAllocated === "") {
      newErrors.fsuAllocated = "Headquaters name is required";
    }
    if (!classId || classId === "") {
      newErrors.classId = "Class name is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      notify(
        "tr",
        "danger",
        "Error occurred while adding member",
        notificationAlertRef
      );
    } else {
      try {
        await dispatch(addFresher(form)).unwrap();
        notify(
          "tr",
          "success",
          "Successfully added member",
          notificationAlertRef
        );
        handleClose();
      } catch (err) {
        // handle error here

        notify("tr", "danger", err, notificationAlertRef);
      }
    }
  };
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const getAllClass = async (currentYear) => {
      try {
        const originalData = await dispatch(
          getAllClassInYear(currentYear)
        ).unwrap();
        setClassinYear(originalData);
      } catch (error) {
        // console.log(error);
      }
    };
    getAllClass(currentYear);
  }, []);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn btn-fill w-100"
      >
        <i className="fas fa-plus fs-5 fw-bold ms-2 me-2"></i>Add
      </Button>

      <Modal className="modal__add" show={show} onHide={handleClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold fs-3 text-primary">
              ADD NEW FRESHER
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicFirstName" className="mb-3">
                    <Form.Label className="modal__label" required>
                      First Name
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setField("firstName", e.target.value)}
                      isInvalid={errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicLastName" className="mb-3">
                    <Form.Label className="modal__label ">Last Name</Form.Label>
                    <Form.Control
                      onChange={(e) => setField("lastName", e.target.value)}
                      isInvalid={errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label className="modal__label ">Phone</Form.Label>
                    <Form.Control
                      onChange={(e) => setField("phone", e.target.value)}
                      isInvalid={errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label className="modal__label ">Email</Form.Label>
                    <Form.Control
                      onChange={(e) => setField("email", e.target.value)}
                      type="email"
                      placeholder="name@example.com"
                      isInvalid={errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicUniversity" className="mb-3">
                    <Form.Label className="modal__label ">
                      University
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setField("university", e.target.value)}
                      isInvalid={errors.university}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.university}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicFaculty" className="mb-3">
                    <Form.Label className="modal__label ">Faculty</Form.Label>
                    <Form.Control
                      onChange={(e) => setField("faculty", e.target.value)}
                      isInvalid={errors.faculty}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.faculty}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicEnglish" className="mb-3">
                    <Form.Label className="modal__label ">
                      English Level
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setField("englishLevel", e.target.value)}
                      isInvalid={errors.englishLevel}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.englishLevel}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicMajor" className="mb-3">
                    <Form.Label className="modal__label">Major</Form.Label>
                    <Form.Control
                      onChange={(e) => setField("major", e.target.value)}
                      isInvalid={errors.major}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.major}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    controlId="formBasicYearGraduate"
                    className="mb-3"
                  >
                    <Form.Label className="modal__label ">
                      Graduate Year
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setField("graduateYear", e.target.value)}
                      isInvalid={errors.graduateYear}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.graduateYear}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicHeadquaters" className="mb-3">
                    <Form.Label className="modal__label">
                      Headquaters
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setField("fsuAllocated", e.target.value)}
                      placeholder="HoChiMinh"
                      isInvalid={errors.fsuAllocated}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fsuAllocated}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formBasicClass" className="mb-3">
                <Form.Label className="modal__label">Class</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setField("classId", e.target.value);
                  }}
                  isInvalid={errors.classId}
                >
                  <option>Select Class</option>
                  {classinYear.map((item, i) => (
                    <option key={i} value={item.classId}>
                      {item.classCode}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.classId}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            <Button
              variant="primary"
              type="submit"
              className="mx-2 btn btn-fill"
              onClick={handleSubmit}
              disabled={loading === "pending"}
            >
              {loading === "pending" ? (
                <div>
                  <span
                    class="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </div>
              ) : (
                "Add New"
              )}
            </Button>
            <Button
              variant="secondary"
              className="btn btn-fill"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
};

export default AddTraineeMD;
