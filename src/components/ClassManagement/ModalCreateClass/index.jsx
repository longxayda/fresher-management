import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { createClass } from "redux/actions/classAction";
import { listSkillSelector } from "redux/selectors/classSelector";
import { getListSkill, getListClass } from "redux/actions/classAction";
import { getListAdmin } from "redux/classManagementSlice/classSlice";
import { listAdminSelector } from "redux/selectors/classSelector";
import { isSuccessSelector } from "redux/selectors/classSelector";
export default function CreateClass({ open, setOpen }) {
  const [site, setSite] = useState("");
  const [skillId, setSkillId] = useState("");
  const [traineeNo, setTraineeNo] = useState("");
  const [attendeeType, setAttendeeType] = useState("");
  const [formatType, setFormatType] = useState("");
  const [planStartDate, setPlanStartDate] = useState("");
  const [adminId, setAdminId] = useState("");
  const isSuccess = useSelector(isSuccessSelector);
  const listSkill = useSelector(listSkillSelector);
  const listAdmin = useSelector(listAdminSelector);
  const dispatch = useDispatch();
  const notificationAlert = React.useRef();

  useEffect(() => {
    dispatch(getListSkill());
    dispatch(getListAdmin({ page: 0, limit: 1000 }));
  }, []);
  const toggle = () => setOpen(false);
  const handleCreate = async () => {
    if (
      site &&
      skillId &&
      attendeeType &&
      formatType &&
      traineeNo &&
      adminId &&
      !isNaN(Date.parse(planStartDate))
    ) {
      const body = {
        site,
        skillId,
        traineeNo,
        attendeeType,
        formatType,
        planStartDate,
        adminId,
      };
      await dispatch(createClass(body));
      toggle();
      await dispatch(getListClass({ page: 1, limit: 10 }));
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };
  return (
    <div>
      <Modal isOpen={open} toggle={toggle} className="createclass">
        <h4 className="pt-5 px-4 mb-0 font-weight-bold text-primary"> ADD CLASS</h4>
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
                  value={attendeeType}
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
                  className="form-control"
                  value={formatType}
                  onChange={(e) => setFormatType(e.target.value)}
                >
                  <option value=""> </option>
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
                  value={skillId}
                  onChange={(e) => setSkillId(e.target.value)}
                >
                  <option value=""></option>
                  {listSkill?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.technicalGroup}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Trainee No</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  value={traineeNo}
                  onChange={(e) => setTraineeNo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Plan start date</label>
                <input
                  type="date"
                  value={planStartDate}
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
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                >
                  <option value=""></option>
                  {listAdmin?.map((item) => (
                    <option value={item?.id} key={item.id}>
                      {item?.name}
                    </option>
                  ))}
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
