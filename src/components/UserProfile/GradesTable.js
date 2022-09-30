import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";

const grades = [
  {
    id: 1,
    subject: "PPL",
    grade: 10.0,
    weight: 20,
  },
  {
    id: 2,
    subject: "DSA",
    grade: 9.0,
    weight: 20,
  },
  {
    id: 3,
    subject: "OS",
    grade: 9.0,
    weight: 10,
  },
];

function GradesTable() {
  return (
    <Container fluid>
      <Table striped bordered hover size="sm" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.subject}</td>
                <td>{item.grade}</td>
                <td>{item.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default GradesTable;
