import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, Container, Spinner } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { notify } from "./notify";
import NotificationAlert from "react-notification-alert";
import { updateFresher } from "redux/fresherManageSlice/fresherManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import fresherService from "services/fresherManagement/fresherService";

function EditMem(props) {
  const [show, setShow] = useState(false);
  const notificationAlertRef = useRef(null);
  const dispatch = useDispatch();

  const [courseList, setCourseList] = useState([]);
  const filterYear = 2022;
  useEffect(async () => {
    if (filterYear !== 0) {
      try {
        const response = await fresherService.getCourseList(filterYear);
        setCourseList(response.data);
      } catch {
        setCourseList([]);
      }
    } else {
      setCourseList([]);
    }
  }, []);

  const getClassId = (classCode) => {
    let classId = 1;
    for (let i = 0; i < courseList.length; i++) {
      if (courseList[i].classCode === classCode) {
        classId = courseList[i].classId;
        break;
      }
    }
    return classId;
  };

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    gender: "",
    classId: "",
    university: "",
    faculty: "",
    englishLevel: "",
    major: "",
    graduateYear: "",
    fsuAllocated: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const id = props.id;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // check if all fields are filled
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.phone === "" ||
      data.email === "" ||
      data.classId === "" ||
      data.university === "" ||
      data.faculty === "" ||
      data.englishLevel === "" ||
      data.major === "" ||
      data.graduateYear === "" ||
      data.fsuAllocated === "" ||
      data.status === ""
    ) {
      notify(
        "tr",
        "danger",
        "Please fill all fields before submitting",
        notificationAlertRef
      );
    }
    // phone must be 10 digits
    else if (data.phone.length !== 10) {
      notify(
        "tr",
        "danger",
        "Phone number must be 10 digits",
        notificationAlertRef
      );
    }
    // mail validation
    else if (!mailRegex.test(data.email)) {
      notify(
        "tr",
        "danger",
        "Email address is not valid",
        notificationAlertRef
      );
    } else {
      // update fresher here
      try {
        const classCode = data.classCode;
        data.classId = getClassId(data.classCode);
        const res = await dispatch(updateFresher({ data, id, classCode }));

        notify(
          "tr",
          "success",
          "Update member successfully !!!",
          notificationAlertRef
        );
      } catch (error) {
        notify("tr", "danger", "Error when updating member or something went wrong", notificationAlertRef);
      }

      handleClose();
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const rddata = useSelector((state) => state.manageFR.value);

  // get data from api
  useEffect(() => {
    const fetchTrainees = async () => {
      setIsLoading(true);
      const response = await fresherService.getOneFresher(id);
      return response;
    };

    fetchTrainees().then((response) => {
      const tempData = {
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        phone: response.data.data.phone,
        email: response.data.data.email,
        classCode: response.data.data.className,
        classId: 1,
        university: response.data.data.university,
        faculty: response.data.data.faculty,
        englishLevel: response.data.data.englishLevel,
        major: response.data.data.major,
        graduateYear: response.data.data.graduateYear,
        fsuAllocated: response.data.data.fsuAllocated,
        status: response.data.data.status,
        startDate: response.data.data.startDate,
        endDate: response.data.data.endDate,
        dob: response.data.data.dob,
        gender: response.data.gender,
      };

      setData(tempData);
      setIsLoading(false);
    });
  }, [show]);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <div className="btn-className">
        <Button variant="primary" onClick={handleShow} className="btn-sm">
          <i className="fas fa-pen-square"></i>
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        className="modal__add"
      >
        <Container>
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold fs-3 text-primary">
              UPDATE FRESHER
            </Modal.Title>
          </Modal.Header>
          {isLoading ? (
            <div className="text-center">
              <Spinner
                variant="primary"
                animation="border"
                role="status"
                style={{ "margin-top": "15px", padding: "15px" }}
              ></Spinner>
            </div>
          ) : (
            <Modal.Body>
              <form>
                <div className="row">
                  <div className="mb-3 col">
                    <label for="first-name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={isLoading ? "loading..." : data.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col">
                    <label for="last-name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={isLoading ? "loading..." : data.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col">
                    <label for="first-name" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={isLoading ? "loading..." : data.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={isLoading ? "loading..." : data.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col">
                    <label for="university" className="form-label">
                      University
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="university"
                      name="university"
                      value={isLoading ? "loading..." : data.university}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col">
                    <label for="faculty" className="form-label">
                      Faculty
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="faculty"
                      name="faculty"
                      value={isLoading ? "loading..." : data.faculty}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col">
                    <label for="englevel" className="form-label">
                      English Level
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="englishLevel"
                      name="englishLevel"
                      value={isLoading ? "loading..." : data.englishLevel}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col">
                    <label for="major" className="form-label">
                      Major
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="major"
                      name="major"
                      value={isLoading ? "loading..." : data.major}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col">
                    <label for="graduate-year" className="form-label">
                      Graduate Year
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="graduateYear"
                      name="graduateYear"
                      value={isLoading ? "loading..." : data.graduateYear}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col">
                    <label for="headquaters" className="form-label">
                      Headquaters
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fsuAllocated"
                      name="fsuAllocated"
                      value={isLoading ? "loading..." : data.fsuAllocated}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col">
                    <label for="status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={data.status}
                      onChange={handleChange}
                    >
                      <option value="In progress">In progress</option>
                      <option value="Drop out">Drop out</option>
                      <option value="Done">Done</option>
                      <option value="Fail">Fail</option>
                    </select>
                  </div>

                  <div className="mb-3 col">
                    <label for="classCode" className="form-label">
                      Class (Disabled)
                    </label>
                    <select
                      className="form-select"
                      id="classCode"
                      name="classCode"
                      value={data.classCode}
                      onChange={handleChange}
                      disabled={true}
                    >
                      {courseList.map((course) => (
                        <option key={course.classCode} value={course.classCode}>
                          {course.classCode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </Modal.Body>
          )}
          <Modal.Footer className="justify-content-end">
            <Button
              variant="primary"
              type="submit"
              className="mx-2 btn btn-fill"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Update
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
}

export default EditMem;
