import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap"
import "../assets/css/Modal.scss"

export default function UpdateTrainers() {
    const [open, setOpen] = React.useState(false)

    const toggle = () => setOpen(!open)

    return (
        <div>
          <div onClick={toggle}>
            <button className="btn btn-fill btn-primary">Update trainers</button>
          </div>
          <Modal
            isOpen={open}
            toggle={toggle}
            style={{
              transform: "none",
            }}
            className="updatetrainers"
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
      );    
}