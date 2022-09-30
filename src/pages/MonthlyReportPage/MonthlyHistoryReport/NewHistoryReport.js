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
import "./NewHistoryReport.scss";
import { getCoursesReport } from "redux/selectors";
import NewCoursesReport from "./courses/NewCourseReport";
import NewFinanceReport from "./finance/NewFinanceReport";
import { postHistoryReport } from "./newHistoryReportSlice";

let saved = false;
let noMove = "/admin/report/new-history-report";
let move = "/admin/report/history-report-list";

export default function NewHistoryReport() {
  const [showSave, setShowSave] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [key, setKey] = useState("courses");
  const location = useLocation();
  const dispatch = useDispatch();
  const reportItem = location.state;
  const historyCourseReport = useSelector(getCoursesReport);

  const handleSaveReport = () => {
    const res = [];
    historyCourseReport.forEach((item) => {
      const { deleted, id, historyReportId, fsuAllocated, ...obj } = item;
      res.push({ fsuAllocated: "HCM", ...obj });
    });
    const newValue = {
      monthDate: reportItem?.monthDate.toISOString() || "",
      reportName: reportItem?.reportName || "",
      historyCourseEntityList: [...res],
      financeObligationItemRequestList: [],
    };
    console.log(newValue);
    dispatch(postHistoryReport(newValue));
  };
  return (
    <>
      <div
        className="text-secondary"
        style={{ fontSize: "25px", textAlign: "center" }}
      >
        {reportItem ? reportItem.reportName : ""}
      </div>
      <Tabs
        className="mb-3"
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="courses" title="Courses">
          <NewCoursesReport reportItem={reportItem} />
        </Tab>
        <Tab eventKey="finance" title="Finance Obligation">
          <NewFinanceReport />
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
        >
          <CSVLink
            style={{ color: "#fff", textDecoration: "none" }}
            data={historyCourseReport}
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
              <span className="text-primary">
                THE REPORT IS SAVED SUCCESSFULLY!
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
              <span className="text-primary">
                THE REPORT IS UNSAVED! ARE YOU STILL WANT TO RETURN?
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
                to="/admin/report/history-report-list"
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
              <span className="text-primary">
                THE REPORT IS SAVED AND EXPROTED SUCCESSFULLY!
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
