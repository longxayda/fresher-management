import React from "react";
import { Container } from "react-bootstrap";
import AttendTableOneTrainee from "components/AttendTableOneTrainee";

function AttendanceStatus() {
  return (
    <>
      <Container fluid>
        <AttendTableOneTrainee />
      </Container>
      <div className="attendance-status-description">
        <Container fluid>
          <Row style={{ margin: "10px 0 0 0" }}>
            <Col md="3">
              <Row>
                <Col md="2">
                  <Badge className="bg-primary">
                    <h4 style={{ margin: "0" }}>P</h4>
                  </Badge>
                </Col>
                <Col md="8">
                  <h4 style={{ margin: "0" }}>Present</h4>
                </Col>
              </Row>
            </Col>
            <Col md="3">
              <Row>
                <Col md="2">
                  <Badge className="bg-success">
                    <h4 style={{ margin: "0" }}>A</h4>
                  </Badge>
                </Col>
                <Col md="8">
                  <h4 style={{ margin: "0" }}>Absent</h4>
                </Col>
              </Row>
            </Col>
            <Col md="3">
              <Row>
                <Col md="2">
                  <Badge className="bg-warning">
                    <h4 style={{ margin: "0" }}>L</h4>
                  </Badge>
                </Col>
                <Col md="8">
                  <h4 style={{ margin: "0" }}>Late coming</h4>
                </Col>
              </Row>
            </Col>
            <Col md="3">
              <Row>
                <Col md="2">
                  <Badge className="bg-warning">
                    <h4 style={{ margin: "0" }}>E</h4>
                  </Badge>
                </Col>
                <Col md="8">
                  <h4 style={{ margin: "0" }}>Early Leaving</h4>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ margin: "10px 0 0 0" }}>
            <Col md="6">
              <Row>
                <Col md="1">
                  <Badge className="bg-secondary">
                    <h4 style={{ margin: "0" }}>Ln</h4>
                  </Badge>
                </Col>
                <Col md="10">
                  <h4 style={{ margin: "0" }}>Late coming with no permission</h4>
                </Col>
              </Row>
            </Col>
            <Col md="6">
              <Row>
                <Col md="1">
                  <Badge className="bg-secondary">
                    <h4 style={{ margin: "0" }}>En</h4>
                  </Badge>
                </Col>
                <Col md="10">
                  <h4 style={{ margin: "0" }}>
                    Early Leaving with no permission
                  </h4>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ margin: "10px 0 0 0" }}>
            <Col md="6">
              <Row>
                <Col md="1">
                  <Badge className="bg-danger">
                    <h4 style={{ margin: "0" }}>An</h4>
                  </Badge>
                </Col>
                <Col md="10">
                  <h4 style={{ margin: "0" }}>Absent with no permission</h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AttendanceStatus;
