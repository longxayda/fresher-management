import { React, useState } from "react";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AttendanceDetail from "pages/AttendanceManagement/traineeAttendanceDetail";
import DiligentSummaryTable from "pages/AttendanceManagement/DiligentSummary"

function TraineeAttendance() {
  const [key, setKey] = useState("attendance");

  return (
    <Container fluid>
      <Tabs
        defaultActiveKey={"attendance"}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="attendance" title="Attendance Status">
          <AttendanceDetail />
        </Tab>
        <Tab eventKey="summary" title="Diligent Summary">
          <DiligentSummaryTable />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default TraineeAttendance;
