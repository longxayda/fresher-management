import React, { useState } from "react";
import { useTable } from "react-table";
import { useHistory } from "react-router-dom";
import {
  Table,
  Container,
  Row,
  Spinner
} from "react-bootstrap";
export default function WrapTable({setShowModalTopic, columns, data, state, setTopic,setHide, isLoading }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [duration, setDuration] = useState({});
  const history = useHistory();
  const handleChangeDuration = (e) => {
    setDuration({ ...duration, [e.target.name]: e.target.value });
  };
  return (
    <>
    
      {<Container>
        <Row>
          <Container>
            <div className="d-flex justify-content-end align-items-center  pb-3">
              <div className="d-flex align-items-center justify-content-end">
                <button
                  onClick={() => {
                    setTopic(true);
                    setHide(true);
                    setShowModalTopic(true);
                  }}
                  className="btn btn-fill btn-primary"
                >
                  ADD TOPIC
                </button>
              </div>
            </div>
            <style>{`
            td,tr,th{
              text-align: center;
            }
            `}</style>
            {isLoading ? (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100px', marginBottom: '20px' }}
              >
                <Spinner
                  variant="primary"
                  animation="border"
                  role="status"
                  className="position-absolute"
                  style={{ height: "60px", width: "60px" }}
                ></Spinner>
              </div>
            ) :(
            <Table {...getTableProps()} striped hover className="text-nowrap">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="sfr__header-middle"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}
                    >
                      <td className="text-center">{row.values.id}</td>
                      <td className="text-center" 
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                        history.push('/admin/class/course-management/sylabus?id='+row.values.id);
                        }}
                      >{row.values.topicName}</td>
                      <td className="text-center">
                        <input
                          name={row.values.id}
                          className={
                            state ? "input-transparent" : "input-display"
                          }
                          defaultValue={row.values.duration}
                          disabled={state}
                          value={duration[row.values.id]}
                          onChange={handleChangeDuration}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>)}
          </Container>
        </Row>
      </Container>}
     
    </>
  );
}
