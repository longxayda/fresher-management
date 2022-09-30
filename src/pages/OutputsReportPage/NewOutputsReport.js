import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import "react-tabs/style/react-tabs.css";
import "./NewOutputsReport.scss";

import FresherReport from "./fresher/FresherReport";
import { getOutputsReport } from "redux/selectors";
import { postOutputsReport } from "./newOutputsReportSlice";
import SVTTReport from "./svtt/SVTTReport";
import { getFresherReport } from "redux/selectors";
import { getSVTTReport } from "redux/selectors";
let saved = false;
let noMove = "/admin/report/new-Outputs-report";
let move = "/admin/report/Outputs-report-list";

export default function NewOutputsReport() {
  const [showSave, setShowSave] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [key, setKey] = useState("fresher");
  const location = useLocation();
  const dispatch = useDispatch();
  const outputsReport = useSelector(getOutputsReport);
  const fresherReport = useSelector(getFresherReport);
  const svttReport = useSelector(getSVTTReport);
  const handleSaveReport = () => {
    const fresher = [];
    const svtt = [];
    fresherReport.forEach((item, index) => {
      const { deleted, id, outputReportId, ...obj } = item;
      fresher.push({ ...obj, no: Number(index + 1) });
    });
    svttReport.forEach((item, index) => {
      const { deleted, id, outputReportId, ...obj } = item;
      svtt.push({
        ...obj,
        no: Number(fresherReport.length + index + 1),
      });
    });
    const newValue = {
      createdAt: location?.state?.createdAt.toISOString() || "",
      reportName: location?.state?.reportName || "",
      outputReportItemRequestList: [...fresher, ...svtt],
    };
    console.log(newValue);
    dispatch(postOutputsReport(newValue));
  };
  return (
    <>
      <div
        className="text-secondary"
        style={{ fontSize: "25px", textAlign: "center" }}
      >
        {location?.state?.reportName}
      </div>
      <Tabs
        className="mb-3"
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="fresher" title="Fresher">
          <FresherReport />
        </Tab>
        <Tab eventKey="svtt" title="SVTT">
          <SVTTReport />
        </Tab>
      </Tabs>
      <div className="m-3 d-flex justify-content-center">
        <Button
          onClick={() => {
            setShowReturn(saved ? false : true);
          }}
          type="button"
          className="btn-fill returnBtn"
        >
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            to={`${saved ? move : noMove}`}
          >
            RETURN
          </Link>
        </Button>
        <Button
          onClick={() => {
            handleSaveReport();
            setShowSave(true);
            saved = true;
          }}
          type="button"
          className="btn-fill saveBtn"
        >
          SAVE
        </Button>
        <Button
          onClick={() => setShowExport(true)}
          type="button"
          className="btn-fill exportBtn"
          style={{ background: "green", border: "green" }}
        >
          <CSVLink
            style={{ color: "#fff", textDecoration: "none" }}
            data={outputsReport}
            filename={"Report"}
          >
            <span>EXPORT </span>
            <i className="fas fa-download"></i>
          </CSVLink>
        </Button>
        {/* SaveModal */}
        <Modal show={showSave} onHide={() => setShowSave(false)} size="lg">
          <Modal.Header className="modalTitle">
            <Modal.Title>
              <span className="text-secondary">
                The report is saved successfully!
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className="justify-content-end">
            <Button
              variant="secondary"
              className="btn-fill ms-1"
              onClick={() => setShowSave(false)}
            >
              CLOSE
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ReturnModal */}
        <Modal show={showReturn} onHide={() => setShowReturn(false)} size="lg">
          <Modal.Header className="modalTitle">
            <Modal.Title>
              <span className="text-secondary">
                The report is unsaved! Are you still want to return?
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className="justify-content-end">
            <Button
              variant="primary"
              className="btn-fill"
              onClick={() => setShowReturn(false)}
            >
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                to="/admin/report/Outputs-report-list"
              >
                CONFIRM
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="btn-fill ms-1"
              onClick={() => setShowReturn(false)}
            >
              CLOSE
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Export Modal */}
        <Modal show={showExport} onHide={() => setShowExport(false)} size="lg">
          <Modal.Header className="modalTitle">
            <Modal.Title>
              <span className="text-secondary">
                The report is saved and exported successfully!
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className="justify-content-end">
            <Button
              variant="secondary"
              className="btn-fill ms-1"
              onClick={() => setShowExport(false)}
            >
              CLOSE
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
