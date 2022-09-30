import React from "react";
import axios from "axios";
// import HorizontalScroll from "react-horizontal-scrolling";
import Barchart from "pages/FresherManagement/Barchart";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function TableList() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <div>
        <div onClick={toggle}>
          <button className="btn btn-fill btn-primary">ADD CLASS</button>
        </div>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{
            transform: "none",
          }}
          className="createclass"
        >
          <h4 className="px-4 mb-0 font-weight-bold"> ADD NEW CLASS</h4>
          <ModalBody>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Site</label>
                  <select type="text" className="form-control">
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Da Nang">Da Nang</option>
                    <option value="Ha Noi">Ha Noi</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="">Status</label>
                  <select type="text" className="form-control">
                    <option value=""> </option>
                    <option value="opened">opened</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="">Attendee Type</label>
                  <select type="text" className="form-control">
                    <option value="FR">FR</option>
                    <option value="FRF">FRF</option>
                    <option value="CPL">CPL</option>
                    <option value="PFR">PFR</option>
                    <option value="CPLU">CPLU</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="">Format Type</label>
                  <select name="" id="" className="form-control">
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="OJT">OJT</option>'
                    <option value="Virtual Training">Virtual Training</option>
                    <option value="Blended">Blended</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="">Technical group</label>
                  <select name="" id="" className="form-control">
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="OJT">OJT</option>'
                    <option value="Virtual Training">Virtual Training</option>
                    <option value="Blended">Blended</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="">Program Content ID</label>
                  <select name="" id="" className="form-control">
                    <option value="JAVA">JAVA</option>
                    <option value="NET">NET</option>
                    <option value="FE">FE</option>
                    <option value="Android">Android</option>
                    <option value="CPP">CPP</option>
                    <option value="Angular">Angular</option>
                    <option value="REACT">REACT</option>
                    <option value="PRN">PRN</option>
                    <option value="EMB">EMB</option>
                    <option value="OST">OST</option>
                    <option value="SP">SP</option>
                    <option value="TEST">TEST</option>
                    <option value="IOS">IOS</option>
                    <option value="COBOL">COBOL</option>
                    <option value="AUT">AUT</option>
                    <option value="AI">AI</option>
                    <option value="DE">DE</option>
                    <option value="QA">QA</option>
                    <option value="COMTOR">COMTOR</option>
                    <option value="DevOps">DevOps</option>
                    <option value="SAP">SAP</option>
                    <option value="AC">AC</option>
                    <option value="TC">TC</option>
                    <option value="GOL">GOL</option>
                    <option value="Flutter">Flutter</option>
                    <option value="ServiceNow">ServiceNow</option>
                    <option value="PFR_JAVA">PFR_JAVA</option>
                    <option value="FJW">FJW</option>
                    <option value="JWD">JWD</option>
                    <option value="JSE">JSE</option>
                    <option value="PAD">PAD</option>
                    <option value="FED">FED</option>
                    <option value="FNW">FNW</option>
                    <option value="NWD">NWD</option>
                    <option value="NPD">NPD</option>
                    <option value="WAT">WAT</option>
                    <option value="PRD">PRD</option>
                    <option value="PML">PML</option>
                    <option value="ITF">ITF</option>
                    <option value="FJB">FJB</option>
                    <option value="OCA">OCA</option>
                    <option value="BA">BA</option>
                    <option value="APM">APM</option>
                    <option value="DSA">DSA</option>
                    <option value="FIF">FIF</option>
                    <option value="DEE">DEE</option>
                    <option value="STE">STE</option>
                    <option value="Flexcube">Flexcube</option>
                    <option value="OCP">OCP</option>
                    <option value="FUJS">FUJS</option>
                    <option value="CES">CES</option>
                    <option value="CLOUD">CLOUD</option>
                    <option value="PHP">PHP</option>
                    <option value="NodeJS">NodeJS</option>
                    <option value="ASE">ASE</option>
                    <option value="MPP">MPP</option>
                    <option value="DATA">DATA</option>
                    <option value="Sitecore">Sitecore</option>
                    <option value="MAT">MAT</option>
                    <option value="AND">AND</option>
                    <option value="ADR">ADR</option>
                    <option value="JAVA">JAVA</option>
                    <option value="Mobile">Mobile</option>
                    <option value="GST_JAVA">GST_JAVA</option>
                    <option value="LITE_CPP">LITE_CPP</option>
                    <option value="WinApp">WinApp</option>
                    <option value="Magento">Magento</option>
                    <option value="Python">Python</option>
                    <option value="RN">RN</option>
                    <option value="FUKS">FUKS</option>
                    <option value="RPA">RPA</option>
                    <option value="Erlang">Erlang</option>
                    <option value="Golang">Golang</option>
                    <option value="C++/Linux">C++/Linux</option>
                    <option value="AEM">AEM</option>
                    <option value="GST_EMB">GST_EMB</option>
                    <option value="GST_NET">GST_NET</option>
                    <option value="JP">JP</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Trainer</label>
                  <select name="" id="" className="form-control">
                    <option value="Offline">Name trainer 1</option>
                    <option value="Offline">Name trainer 2</option>
                    <option value="Offline">Name trainer 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="">Mentor</label>
                  <select name="" id="" className="form-control">
                    <option value="Offline">Name Mentor 1</option>
                    <option value="Offline">Name Mentor 2</option>
                    <option value="Offline">Name Mentor 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="">Admin</label>
                  <select name="" id="" className="form-control">
                    <option value="Offline">Name Admin 1</option>
                    <option value="Offline">Name Admin 2</option>
                    <option value="Offline">Name Admin 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="">Trainee No</label>
                  <input type="number" min={0} className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="">Plan start date</label>
                  <input type="date" min={0} className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="">Duration (months)</label>
                  <input type="number" min={0} className="form-control" />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-end">
            <button className="btn btn-fill btn-primary mx-3" onClick={toggle}>
              Create
            </button>
            <button className="btn btn-fill btn-secondary" onClick={toggle}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <p className="card-category">
                  Name: <> </>
                  <input
                    text="text"
                    width="90.5%"
                    style={{
                      padding: "5px 5px",
                      margin: "8px 0",
                      display: "inline-block",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                    onChange={(event) => this.handleonChangeName(event)}
                  />{" "}
                  <button onClick={(event) => this.handleonFlag(event)}>
                    Filter
                  </button>
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {/* <HorizontalScroll className="scrollbar "> */}
                  <table className="table">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold" }}> ID</td>
                        <td style={{ fontWeight: "bold" }}> Full Name</td>
                        <td style={{ fontWeight: "bold" }}> Class</td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Topic content & structure
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Topic objectives
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Appropriate topic level
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Training material quality
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Knowledge of Trainer
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Subject coverage
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Good instruction & communication
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Trainer's supporting
                        </td>
                        <td style={{ fontWeight: "bold" }}> Logistics</td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Information to trainees
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {" "}
                          Class admin's attitude & support
                        </td>
                        <td style={{ fontWeight: "bold" }}> Other comment?</td>
                      </tr>
                      {
                        //-----------------------condition 1-----------------------
                        course !== "" && check === true
                          ? name !== "" && flag === true
                            ? listusers.map((item, i) =>
                                item.fullname === name &&
                                flag === true &&
                                item.class == course ? (
                                  <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.class}</td>
                                    <td>{item.Topic_content_and_structure}</td>
                                    <td>{item.Topic_objectives}</td>
                                    <td>{item.Appropriate_topic_level}</td>
                                    <td>{item.Training_material_quality}</td>
                                    <td>{item.Knowledge_of_Trainer}</td>
                                    <td>{item.Subject_coverage}</td>
                                    <td>
                                      {item.Good_instruction_communication}
                                    </td>
                                    <td>{item.Trainer_supportings}</td>
                                    <td>{item.Logistics}</td>
                                    <td>{item.Information_to_trainees}</td>
                                    <td>{item.Class_admin_attitude_support}</td>
                                    <td>{item.other_cmt}</td>
                                  </tr>
                                ) : null
                              )
                            : //-----------------------condition 2-----------------------
                              listusers.map((item, i) =>
                                item.class === course ? (
                                  <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.class}</td>
                                    <td>{item.Topic_content_and_structure}</td>
                                    <td>{item.Topic_objectives}</td>
                                    <td>{item.Appropriate_topic_level}</td>
                                    <td>{item.Training_material_quality}</td>
                                    <td>{item.Knowledge_of_Trainer}</td>
                                    <td>{item.Subject_coverage}</td>
                                    <td>
                                      {item.Good_instruction_communication}
                                    </td>
                                    <td>{item.Trainer_supportings}</td>
                                    <td>{item.Logistics}</td>
                                    <td>{item.Information_to_trainees}</td>
                                    <td>{item.Class_admin_attitude_support}</td>
                                    <td>{item.other_cmt}</td>
                                  </tr>
                                ) : null
                              )
                          : //-----------------------condition 2-----------------------
                            null
                        //-----------------------condition 1-----------------------
                      }
                    </tbody>
                  </table>
                {/* </HorizontalScroll> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Barchart chartdata={Userdata} />
    </>
  );
}

export default TableList;
