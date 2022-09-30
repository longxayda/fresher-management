import React from "react";
import { Container, Row, Col, Badge, Button, Form } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import { FaPenSquare, FaListAlt, FaTrash, FaCheckSquare, FaBook, FaWpforms, FaSistrix, FaBuilding, FaCalendarAlt, FaCalendarCheck, FaClipboardCheck, FaGlasses, FaShieldAlt, FaUserTie, FaUserGraduate } from "react-icons/fa";
import Select from "react-select";
import LearningPathModal from "components/LearningPathModal";
import "./ClassDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { isClassDetailsSelector, isLoadingSelector, isMentorListSelector, isTrainerListSelector, isSuccessMessageSelector, isErrorMessageSelector } from "redux/selectors/classDetailsSelector";
import { getClassDetails, updateClassDetails, getMentorList, getTrainerList, setSuccess, setErr } from "redux/actions/classDetailsAction";
import Loading from "components/Loading";
import { useLocation } from "react-router-dom";
import { api } from "services/api";

const subjectOptions = [
    {value: "ReactJS", label: "ReactJS"},
    {value: "Java", label: "Java"},
    {value: "C#", label: "C#"},
    {value: ".NET", label: ".NET"}
]

const formatOptions = [
    {value: "Online", label: "Online"},
    {value: "Offline", label: "Offline"},
    {value: "OJT", label: "OJT"},
    {value: "Virtual Training", label: "Virtual Training"},
    {value: "Blended", label: "Blended"}
]

const scopeOptions = [
    {value: "Frontend", label: "Frontend"},
    {value: "Backend", label: "Backend"},
    {value: "Fullstack", label: "Fullstack"}
]

const supplierOptions = [
    {value: "FPT software HCM", label: "FPT software HCM"},
    {value: "FPT software HN", label: "FPT software HN"},
    {value: "FPT software DN", label: "FPT software DN"}
]

const statusOptions = [
    {value: "Openned", label: "Openned"}, 
    {value: "In Progress", label: "In Progress"}, 
    {value: "Delayed", label: "Delay"}, 
    {value: "Planned", label: "Planned"}, 
    {value: "Done", label: "Done"}
]

export default function ClassDetails() {
    const dispatch = useDispatch();
    const search = useLocation().search;
    const classid = new URLSearchParams(search).get('id');
    const classDetails = useSelector(isClassDetailsSelector);
    const isLoading = useSelector(isLoadingSelector);
    const mentorList = useSelector(isMentorListSelector);
    const trainerList = useSelector(isTrainerListSelector);
    const successMessage = useSelector(isSuccessMessageSelector);
    const errorMessage = useSelector(isErrorMessageSelector);
    const [currentClass, setCurrentClass] = React.useState({});
    const [newClass, setNewClass] = React.useState({});
    const [isUpdatePermission, setIsUpdatePermission] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [changed, setChanged] = React.useState(false);
    const [learningPathModal, setLearningPathModal] = React.useState(false);

    React.useEffect(() => {
        setIsUpdatePermission(api.getCache("user").permissions.includes("CL002"));
    }, []);

    React.useEffect(() => {
        try{
            dispatch(getClassDetails(classid));
            dispatch(getMentorList());
            dispatch(getTrainerList());
        }
        catch(e) {
            notify("Something went wrong!", 3);
        }
    }, [])

    React.useEffect(() => {
        setCurrentClass(classDetails);
    }, [classDetails])

    const mentorOptions = React.useMemo(
        () => mentorList.map(mentor => {
            return {
                value: mentor.id,
                label: mentor.name
            }
        }), [mentorList]
    );

    const trainerOptions = React.useMemo(
        () => trainerList.map(trainer => {
            return {
                value: trainer.id,
                label: trainer.name
            }
        }), [trainerList]
    );

    const notificationAlertRef = React.useRef(null);

    const notify = (mess, variant) => {
        var color = variant;
        var type;
        switch (color) {
          case 1:
            type = "primary";
            break;
          case 2:
            type = "success";
            break;
          case 3:
            type = "danger";
            break;
          case 4:
            type = "warning";
            break;
          case 5:
            type = "info";
            break;
          default:
            type = "secondary";
            break;
        }
        var options = {
            place: "tr",
            message: (
              <div>
                <div>
                  {mess}
                </div>
              </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 5,
            closeButton: true
          };
          notificationAlertRef.current.notificationAlert(options);
    };

    const updateClass = async () => {
        if (changed === true) {
            if (
                (newClass.status?.length > 0) &&
                (newClass.subjectType?.length > 0) &&
                (newClass.formatType?.length > 0) &&
                (newClass.scope?.length > 0) &&
                (newClass.supplier?.length > 0) &&
                (newClass.mentors?.length > 0) &&
                (newClass.trainers?.length > 0) &&
                newClass.trainees &&
                !isNaN(Date.parse(newClass.startDate))
            ) {
                setEditMode(!editMode);
                const body = {
                    status: newClass.status,
                    subjectType: newClass.subjectType,
                    formatType: newClass.formatType,
                    scope: newClass.scope,
                    supplier: newClass.supplier,
                    startDate: newClass.startDate,
                    mentorId: newClass.mentors.map(mentor => {
                        return mentor.value;
                    }),
                    trainerId: newClass.trainers.map(trainer => {
                        return trainer.value;
                    }),
                    trainees: newClass.trainees
                };
                await dispatch(updateClassDetails([classid, body]));
                setChanged(false);
            } 
            else {
                notify("Some fields are missing! Please fill out all fields below", 3);
            }
        }
        else {
            cancelUpdate();
            notify("Nothing changed!", 5);
        }
    }

    React.useEffect(() => {
        if (successMessage) {
            notify(successMessage, 2);
            dispatch(setSuccess());
        }
    }, [successMessage])

    React.useEffect(() => {
        if (errorMessage) {
            notify(errorMessage, 3);
            dispatch(setErr());
        }
    }, [errorMessage])


    const cancelUpdate = () => {
        setEditMode(!editMode);
        setChanged(false);
    }

    return (
        <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            {isLoading? (<Loading />):(
            <Container fluid>
                <LearningPathModal show={learningPathModal} onHide={() => setLearningPathModal(false)} notifyhandler={(mes,variant)=>notify(mes,variant)}/>

                <Row>
                    <Col>      
                        <Button variant="primary" onClick={() => history.go(-1)}><i className="fa fa-arrow-left" aria-hidden="true"></i></Button>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col>
                        <h2 style={{fontWeight: 'bold'}}>
                            {currentClass.classCode}{' '}
                            {<Badge pill bg={currentClass.status === "In Progress" ? "success" 
                                            : currentClass.status === "Delayed" ? "warning" 
                                            : currentClass.status === "Planned" ? "primary" 
                                            : currentClass.status === "Openned" ? "info" 
                                            : "secondary"}>
                                    {currentClass.status}
                            </Badge>}
                        </h2>
                    </Col>
                    
                    <div className="planRow">
                        <Col>
                            <button id="planBtn" className="btn btn-primary" onClick={() => setLearningPathModal(true)}>Plan <FaListAlt size={20}/></button>
                        </Col>
                    </div>
                </Row>

                <br/>

                <Row>
                    <h4 className="heading">Class info:</h4>
                </Row>

                <br/>

                <Row>
                    <Col xs={1}></Col>

                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaBook size={20}/>{' '}Subject type: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{!editMode && currentClass.subjectType}</Col>
                            <Col className="align-self-center col-md-6">
                                {editMode && 
                                    <Select options={subjectOptions} defaultValue={{
                                            value: newClass.subjectType,
                                            label: newClass.subjectType
                                        }} onChange={
                                            (e) => {
                                                setNewClass({...newClass, subjectType: e.value});
                                                setChanged(true);
                                            }
                                        }
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaWpforms size={20}/>{' '}Format type: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{!editMode && currentClass.formatType}</Col>
                            <Col className="align-self-center col-md-6">
                                {editMode && 
                                    <Select options={formatOptions} defaultValue={{
                                            value: newClass.formatType,
                                            label: newClass.formatType
                                        }} onChange={
                                            (e) => {
                                                setNewClass({...newClass, formatType: e.value});
                                                setChanged(true);
                                            }
                                        }
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <br/>  

                <Row>
                    <Col xs={1}></Col>

                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaSistrix size={20}/>{' '}Scope: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{!editMode && currentClass.scope}</Col>
                            <Col className="align-self-center col-md-6">
                                {editMode && 
                                    <Select options={scopeOptions} defaultValue={{
                                            value: newClass.scope,
                                            label: newClass.scope
                                        }} onChange={
                                            (e) => {
                                                setNewClass({...newClass, scope: e.value});
                                                setChanged(true);
                                            }
                                        }
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaBuilding size={20}/>{' '}Supplier: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{!editMode && currentClass.supplier}</Col>
                            <Col className="align-self-center col-md-6">
                                {editMode && 
                                    <Select options={supplierOptions} defaultValue={{
                                            value: newClass.supplier,
                                            label: newClass.supplier
                                        }} onChange={
                                            (e) => {
                                                setNewClass({...newClass, supplier: e.value});
                                                setChanged(true);
                                            }
                                        }
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col xs={1}></Col>

                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaCalendarAlt size={20}/>{' '}Start: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{!editMode && new Date(currentClass.startDate).toLocaleDateString()}</Col>
                            <Col className="align-self-center col-md-6">
                                {editMode &&
                                    <Form.Group>
                                        <Form.Control
                                            type="date"
                                            defaultValue={new Date(newClass.startDate).toISOString().substring(0, 10)}
                                            onChange={
                                                (e) => {
                                                    setNewClass({...newClass, startDate: e.target.value});
                                                    setChanged(true);
                                                }
                                            }
                                        />
                                    </Form.Group>
                                }
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            {!editMode && <Col className="align-self-center col-md-4 class-field"><FaCalendarCheck size={20}/>{' '}End: </Col>}
                            {editMode && <Col className="align-self-center col-md-4 class-field"><FaClipboardCheck size={20}/>{' '}Status: </Col>}
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{!editMode && new Date(currentClass.endDate).toLocaleDateString()}</Col>
                            <Col className="align-self-center col-md-6">
                                {editMode &&
                                    <Select options={statusOptions} defaultValue={{
                                                value: newClass.status,
                                                label: newClass.status
                                        }} onChange={
                                            (e) => {
                                                setNewClass({...newClass, status: e.value});
                                                setChanged(true);
                                            }
                                        }
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <br/><br/>

                <Row>
                    <h4 className="heading">Participants:</h4>
                </Row>

                <br/>

                <Row>
                    <Col xs={1}></Col>

                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaShieldAlt size={20}/>{' '}Admins: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{currentClass.admins?.map(admin => {return admin.name}).toString()}</Col>
                            <Col className="align-self-center col-md-6"></Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaGlasses size={20}/>{' '}Mentors: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{!editMode && currentClass.mentors?.map(mentor=> {return mentor.name}).toString()}</Col>
                            <Col className="align-self-center col-md-6">
                                {editMode && 
                                    <Select options={mentorOptions} isMulti defaultValue={newClass.mentors} onChange={
                                            (e) => {
                                                let result = e.map(mentor => {
                                                    return mentor;
                                                })
                                                setNewClass({...newClass, mentors: [...result]});
                                                setChanged(true);
                                            }
                                        }
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <br/> 

                <Row>
                    <Col xs={1}></Col>

                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaUserTie size={20}/>{' '}Trainers: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}><div hidden={editMode}>{currentClass.trainers?.map(trainer => {return trainer.name}).toString()}</div></Col>
                            <Col className="align-self-center col-md-6">
                                {editMode && 
                                    <Select options={trainerOptions} isMulti defaultValue={newClass.trainers} onChange={
                                            (e) => {
                                                let result = e.map(trainer => {
                                                    return trainer;
                                                })
                                                setNewClass({...newClass, trainers: [...result]});
                                                setChanged(true);
                                            }
                                        }
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col className="align-self-center col-md-4 class-field"><FaUserGraduate size={20}/>{' '}Trainee: </Col>
                            <Col className="align-self-center col-auto" style={{fontSize: "20px"}}>{!editMode && currentClass.trainees}</Col>
                            <Col className="align-self-center col-md-6">
                                {editMode && 
                                    <Form.Group>
                                        <Form.Control
                                            type="text" 
                                            defaultValue={newClass.trainees}
                                            onChange={
                                                (e) => {
                                                    setNewClass({...newClass, trainees: e.target.value});
                                                    setChanged(true);
                                                }
                                            }
                                        />
                                    </Form.Group>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            
                <br/><br/><br/>

                <div className="updateRow">
                    {isUpdatePermission && !editMode && 
                        <Button variant="primary" id="updateBtn" onClick={
                            () => {
                                setEditMode(!editMode);
                                setNewClass({...currentClass, 
                                    mentors: currentClass.mentors?.map(mentor => {return {
                                                value: mentor.id,
                                                label: mentor.name
                                            }
                                        }),
                                    trainers: currentClass.trainers?.map(trainer => {return {
                                                value: trainer.id,
                                                label: trainer.name
                                            }
                                        })
                                    }
                                );
                            }
                        }>Update <FaPenSquare size={20}/></Button>
                    }
                    {editMode &&
                        <Button variant="primary" id="saveBtn" onClick={updateClass}>Save <FaCheckSquare size={20}/></Button>
                    }
                    {editMode &&
                        <Button variant="danger" id="cancelBtn" onClick={cancelUpdate}>Cancel <FaTrash size={20}/></Button>
                    }
                </div>
            </Container>)}
        </>
    )
}
