import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "./index.scss";
import Loading from "components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingSelector } from "redux/selectors/classSelector";
import { createClass } from "redux/actions/classAction";
export default function CreateClass({ open, setOpen }) {
  const [site, setSite] = useState("");
  const [skill, setSkill] = useState("");
  const [attendeeType, setAttendeeType] = useState("");
  const [traineeno, setTraineeno] = useState("");
  const [formatType, setFormatType] = useState("");
  const [planStartDate, setPlanStartDate] = useState("");
  const [admin, setAdmin] = useState("");
  // const [loading, setLoading] = useState(false);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();
  const toggle = () => setOpen(false);
  const handleCreate = async () => {
    // if (
    //   site &&
    //   skill &&
    //   attendeeType &&
    //   traineeno &&
    //   !isNaN(Date.parse(planStartDate)) &&
    //   admin
    // ) {
    //   const body = {};
    //   await dispatch(createClass(body));
    //   toggle();
    // } else {
    //   alert("Vui lòng điền đầy đủ thông tin");
    // }
  };

  return (
    <div>
      {/* {isLoading && <Loading />} */}
      <Modal isOpen={open} toggle={toggle} className="createclass">
        <h4 className="pt-5 px-4 mb-0 font-weight-bold"> ADD CLASS</h4>
        <ModalBody>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Site</label>
                <select
                  type="text"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  className="form-control"
                >
                  <option value=""></option>
                  <option value="HCM">Hồ Chí Minh</option>
                  <option value="DN">Đà Nẵng</option>
                  <option value="HN">Hà Nội</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Attendee Type</label>
                <select
                  type="text"
                  value={attendeetype}
                  onChange={(e) => setAttendeeType(e.target.value)}
                  className="form-control"
                >
                  <option value=""></option>
                  <option value="FR">FR</option>
                  <option value="FRF">FRF</option>
                  <option value="CPL">CPL</option>
                  <option value="PFR">PFR</option>
                  <option value="CPLU">CPLU</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Format Type</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  value={formatType}
                  onChange={(e) => setFormatType(e)}
                >
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                  <option value="OJT">OJT</option>'
                  <option value="Virtual Training">Virtual Training</option>
                  <option value="Blended">Blended</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Skill group</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Java">Java</option>
                  <option value=".NET">.NET</option>
                  <option value="FE">FE</option>
                  <option value="Android">Android</option>
                  <option value="CPP">CPP</option>
                  <option value="Angular">Angular</option>
                  <option value="React">React</option>
                  <option value="Embedded">Embedded</option>
                  <option value="Out System">Out System</option>
                  <option value="Sharepoint">Sharepoint</option>
                  <option value="iOS">iOS</option>
                  <option value="Cobol">Cobol</option>
                  <option value="AUT">AUT</option>
                  <option value="AI">AI</option>
                  <option value="Data">Data</option>
                  <option value="QA">QA</option>
                  <option value="Comtor">Comtor</option>
                  <option value="DevOps">DevOps</option>
                  <option value="SAP">SAP</option>
                  <option value="ABAP">ABAP</option>
                  <option value="Go Lang">Go Lang</option>
                  <option value="Flutter">Flutter</option>
                  <option value="ServiceNow">ServiceNow</option>
                  <option value="Front-End">Front-End</option>
                  <option value="Manual Test">Manual Test</option>
                  <option value="Automation Test">Automation Test</option>
                  <option value="C++">C++</option>
                  <option value="Python">Python</option>
                  <option value="IT">IT</option>
                  <option value="OCA8">OCA8</option>
                  <option value="BA">BA</option>
                  <option value="APM">APM</option>
                  <option value="DSA">DSA</option>
                  <option value="FIF">FIF</option>
                  <option value="STE">STE</option>
                  <option value="Flexcube">Flexcube</option>
                  <option value="CLOUD">CLOUD</option>
                  <option value="PHP">PHP</option>
                  <option value="NodeJS">NodeJS</option>
                  <option value="Security Engineer">Security Engineer</option>
                  <option value="Microsoft Power Platform">
                    Microsoft Power Platform
                  </option>
                  <option value="Data Engineer">Data Engineer</option>
                  <option value="Sitecore">Sitecore</option>
                  <option value="Agile">Agile</option>
                  <option value="React Native">React Native</option>
                  <option value="Certificate">Certificate</option>
                  <option value="SAP,ABAP">SAP,ABAP</option>
                  <option value="Mobile">Mobile</option>
                  <option value="WinApp">WinApp</option>
                  <option value="PHP">PHP</option>
                  <option value="RPA">RPA</option>
                  <option value="Erlang">Erlang</option>
                  <option value="Fullstack Java">Fullstack Java</option>
                  <option value="Fullstack .NET">Fullstack .NET</option>
                  <option value="Java Standard">Java Standard</option>
                  <option value=".NET standard">.NET standard</option>
                  <option value="Golang">Golang</option>
                  <option value="C++/Linux">C++/Linux</option>
                  <option value="AEM">AEM</option>
                  <option value="JP">JP</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Trainee No</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  value={traineeno}
                  onChange={(e) => setTraineeno(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Plan start date</label>
                <input
                  type="date"
                  min={0}
                  value={planstartdate}
                  onChange={(e) => setPlanStartDate(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">Admin</label>
                <select
                  className="form-control"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                >
                  <option value=""></option>
                  <option value="abc">1 admin</option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button
            className="btn btn-fill btn-primary mx-3"
            onClick={handleCreate}
          >
            Create
          </button>
          <button className="btn btn-fill btn-secondary" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
