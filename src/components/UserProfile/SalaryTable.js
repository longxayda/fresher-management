import React from "react";
import { Container, Table } from "react-bootstrap";

const salary = [
  {
    id:1,
    date: "Feb-25th",
    gpa: "67",
    level: "C",
    standardAllowance: "3.000.000",
    remark: "-----",
  },
  {
    id:2,
    date: "Mar-24th",
    gpa: "80",
    level: "B",
    standardAllowance: "5.000.000",
    remark: "-----",
  },
  {
    id:3,
    date: "Jan-25th",
    gpa: "67",
    level: "B",
    standardAllowance: "3.000.000",
    remark: "-----",
  },
];

function SalaryTable() {
  return (
    <Container fluid>
      <Table striped bordered hover size="sm" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>GPA(%)</th>
            <th>Level</th>
            <th>Standard Allowance</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {salary.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.gpa}</td>
                <td>{item.level}</td>
                <td>{item.standardAllowance}</td>
                <td>{item.remark}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default SalaryTable;
