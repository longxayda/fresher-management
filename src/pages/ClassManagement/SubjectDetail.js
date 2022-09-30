import React from "react";
import ChartistGraph from "react-chartist";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import SubjectTable from "components/SubjectTable";

function SubjectDetail() {
  return (
    <>
      <Container fluid>
        <SubjectTable /> 
      </Container>
    </>
  );
}

export default SubjectDetail;