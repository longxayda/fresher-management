import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card, Col, Container, Form, Row, Modal
} from "react-bootstrap";
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import NotificationAlert from "react-notification-alert";
import { useDispatch, useSelector } from "react-redux";
import { replaceCurrentValue } from "redux/auditorsSlice/createNewAuditSlice";
import {
  fetchAuditorList,
  fetchTraineeClassList,
  fetchModuleList,
  fetchSessionList,
  fetchTraineeList,
  updateNewAudit
} from "redux/auditorsSlice/createNewAuditSlice";
import {
  auditListNewAudit,
  traineeClassListNewAudit,
  moduleListNewAudit,
  sessionListNewAudit,
  traineeListNewAudit,
  currentValueNewAudit
} from "redux/selectors/auditorsSelector/newAuditSelector";

import { fetchSchedule } from 'redux/auditorsSlice/scheduleSlice'

function NewAuditModal() {

  const dispatch = useDispatch();
  const auditList = useSelector(auditListNewAudit);
  const traineeClassList = useSelector(traineeClassListNewAudit);
  const moduleList = useSelector(moduleListNewAudit);
  const sessionList = useSelector(sessionListNewAudit);
  const currentValue = useSelector(currentValueNewAudit);
  const receivedTraineeList = useSelector(traineeListNewAudit);

  // trainee section
  const [traineeList, setTraineeList] = useState([]);

  const [pickedDateTime, setPickedDateTime] = useState();

  const [search, setSearch] = useState('');

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [display, setDisplay] = useState(false);

  // const selectedAuditor = useRef();    
  
  useEffect(() => {
    dispatch(fetchAuditorList())
    dispatch(fetchTraineeClassList())
    const currentTime = moment()
    setPickedDateTime(currentTime);
    dispatch(replaceCurrentValue({ time: currentTime.format("YYYY-MM-DD HH:mm") }))
  }, [])

  useEffect(() => {
    const { audit, traineeClass } = currentValue.updated;
    if (audit && traineeClass) {
      dispatch(replaceCurrentValue({
        audit: auditList[0].id,
        class: traineeClassList[0].id
      }))
    }
  }, [currentValue.updated])

  useEffect(() => {
    if (moduleList.length > 0) {
      dispatch(replaceCurrentValue({
        module: moduleList[0].id
      }))
    }
  }, [moduleList])

  useEffect(() => {
    if (sessionList.length > 0) {
      dispatch(replaceCurrentValue({
        session: sessionList[0]
      }))
    }
  }, [sessionList])

  const handleAuditorChange = (e) => {
    dispatch(replaceCurrentValue({ audit: e.target.value }))
  }

  const handleClassChange = (e) => {
    dispatch(replaceCurrentValue({ traineeClass: e.target.value }))
    dispatch(fetchModuleList({ id: e.target.value, callnotify: callnotify }))
    dispatch(fetchSessionList({ id: e.target.value, callnotify: callnotify }))
    dispatch(fetchTraineeList({ id: e.target.value, callnotify: callnotify }))
  }


  //function for module
  const handleModuleChange = (e) => {
    dispatch(replaceCurrentValue({ module: e.target.value }))
  }

  //function for add session
  const handleSessionChange = (e) => {
    dispatch(replaceCurrentValue({ session: e.target.value }))
  }
  //function for add trainee name
  const searchTrainee = (searchValue) => {
    setSearch(searchValue);
    if (search !== '') {
      const filteredTrainee = receivedTraineeList.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
      })
      setFilteredOptions(filteredTrainee);
    }
    else {
      setFilteredOptions(receivedTraineeList);
    }
  }
  const handleTraineeChose = (e) => {
    setSearch(e);
    setDisplay(false);
  }


  function handleAddName() {
    const selectedTrainee = receivedTraineeList.filter(trainee => {
      return trainee.name == search;
    })
    if (selectedTrainee) {
      setTraineeList([...traineeList, ...selectedTrainee])
    }
    else {
      console.log("Trainee name not found");
    }
  }

  //delete trainee from list
  function handleDelete(id) {
    const newTraineeList = traineeList.filter((item) => item.id !== id);
    setTraineeList(newTraineeList);
  }

  //handle Create
  const notificationAlertRef = useRef(null);

  const notify = (place) => {
    var options = {}
    options = {
      place: place,
      message: (
        <div>
          <div>
            Audit created successfully!
          </div>
        </div>
      ),
      type: "success",
      icon: "nc-icon nc-check-2",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options)
  };

  const notifyError = (place) => {
    var options = {
      place: place,
      message: (
        <div>
          <div>
            Empty space is not allowed.
          </div>
        </div>
      ),
      type: "danger",
      icon: "nc-icon nc-simple-remove",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  const callnotify = (m, t, a = 3) => {
    let options = {};
    options = {
      place: 'tr',
      message: m,
      type: t,
      icon: 'nc-icon nc-bell-55',
      autoDismiss: a,
    };
    notificationAlertRef.current?.notificationAlert(options);
  };

  const handleCreate = async () => {
    const payload = {
      "time": currentValue["time"],
      "auditorId": Number(currentValue["audit"]),
      "room": currentValue["room"],
      "moduleId": Number(currentValue["module"]),
      "classId": Number(currentValue["traineeClass"]),
      "traineesId": traineeList.map(trainee => trainee.id),
      "session": Number(currentValue["session"])
    }
    await dispatch(updateNewAudit(payload));
    handleClear();
    dispatch(fetchSchedule());
  }


  function handleCreateAndNotify() {
    if (currentValue["room"] === '' || traineeList === []) {
      notifyError("tr");
    }
    else {
      notify("tr")
      handleCreate();
    };
  }

  const handleClear = () => {
    setTraineeList([]);
    setSearch('');
    const currentTime = moment();
    setPickedDateTime(currentTime)
    dispatch(replaceCurrentValue({
      room: '',
      time: currentTime.format("YYYY-MM-DD HH:mm"),
      module: moduleList.length == 0 ? '' : moduleList[0].id,
      session: sessionList.length == 0 ? '' : sessionList[0]
    }))
  }
  //handle Clear      
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col>
            <Card style={{ border: 'none' }}>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <select className="form-select" onChange={handleAuditorChange} value={currentValue["audit"]} style={{ paddingTop: "8px" }}>
                        {auditList.map(auditor => {
                          const { id, name = '' } = auditor || {}
                          return <option key={id} value={id}>{name}</option>
                        })}
                      </select>
                    </Col>
                  </Row>
                  <Row>

                    <Col className="pr-1 mt-2" md="7">
                      <DatePicker
                        value={pickedDateTime}
                        onChange={(val) => {
                          setPickedDateTime(val);
                          dispatch(replaceCurrentValue({ time: val.format("YYYY-MM-DD HH:mm") }))
                        }}
                      >
                      </DatePicker>
                    </Col>
                    <Col className="pl-1 mt-2" md="5">
                      <input
                        type="text"
                        placeholder="Input room"
                        className="form-control"
                        value={currentValue["room"]}
                        onChange={(e) => dispatch(replaceCurrentValue({ 'room': e.target.value }))}>
                      </input>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1 mt-2" md="3">
                      <select className="form-select" value={currentValue["traineeClass"]} onChange={handleClassChange} style={{ paddingTop: "8px" }}>
                        {traineeClassList.map(tclass => {
                          const { id, classCode = '' } = tclass || {}
                          return <option key={id} value={id}>{classCode}</option>
                        })}
                      </select>
                    </Col>
                    <Col className="pxr-1 mt-2" md="2">
                      <select className="form-select" value={currentValue["module"]} onChange={handleModuleChange} style={{ paddingTop: "8px" }}>
                        {moduleList.map(tmodule => {
                          const { id, name = '' } = tmodule || {}
                          return <option key={id} value={id}>{name}</option>
                        })}
                      </select>
                    </Col>
                    <Col className="pxl-1 mt-2" md="2">
                      <select value={currentValue["session"]} className="form-select" onChange={handleSessionChange} style={{ paddingTop: "8px" }}>
                        {sessionList.map((tSession, tIndex) => {
                          return <option key={tIndex} value={tSession}>{tSession}</option>
                        })}
                      </select>
                    </Col>
                    <Col className="pxl-1 mt-2" md="4">
                      <input type="text" value={search} onClick={() => {
                        setDisplay(!display);
                      }} onChange={(e) => searchTrainee(e.target.value)} className="form-control" placeholder="Choose trainees' name"></input>
                      {
                        display && (
                          <Card>
                            {search.length > 1 ?
                              (
                                filteredOptions.map((trainee) => {
                                  const { id, name = '' } = trainee || {}
                                  return <div
                                    key={id}
                                    value={name}
                                    onClick={() => handleTraineeChose(name)}
                                  >
                                    <option>{name}</option></div>
                                }
                                )) : (
                                receivedTraineeList.map((trainee) => {
                                  const { id, name = '' } = trainee || {}
                                  return <div
                                    key={id}
                                    value={name}
                                    onClick={() => handleTraineeChose(name)}
                                  >
                                    <option>{name}</option></div>
                                }))
                            }
                          </Card>
                        )
                      }
                    </Col>
                    <Col className="pl-1 mt-2" md="1">
                      <Button className="btn btn-outline" id="add-button" style={{ padding: "6px 10px" }} onClick={handleAddName} type="button"><span className="bi bi-plus"></span></Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="mt-2">
                      <ul>
                        {traineeList.map((item) => (
                          <li key={item.id}>
                            <span style={{ marginRight: "8px" }}></span>
                            <span style={{ marginRight: "8px" }}>{item.name}</span>
                            <Button className="btn btn-danger btn-sm rounded-0" style={{ border: "none", padding: "1px" }} onClick={() => handleDelete(item.id)}><i className="fas fa-times"></i></Button>
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <div className="d-flex" style={{ justifyContent: "flex-end" }}>
                        <Button className="btn btn-fill" type="button" id="create-button" style={{ marginRight: "5px" }} onClick={handleCreateAndNotify}>Create</Button>
                        <Button className="btn btn-fill btn-danger" id="clear-button" type="button" onClick={handleClear}>Clear</Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default NewAuditModal;