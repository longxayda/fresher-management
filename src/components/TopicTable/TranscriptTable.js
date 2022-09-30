import { useTable } from "react-table";
import { Table, Container, Row, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setScore } from "redux/fresherManageSlice/topicMarkSlice";
export default function TranscriptTable({ columns, data, isEdit }) {
  const dispatch = useDispatch();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const { score, isLoadingModal } = useSelector((state) => state.topic);

  const handleChangeScore = (e) => {
    dispatch(
      setScore({
        [e.target.name]: {
          moduleSubjectMarkId: e.target.id,
          score: e.target.value,
        },
      })
    );
  };

  return (
    <>
      <Container className={isLoadingModal ? "d-flex":""}>
        {isLoadingModal ?  <Spinner
                  className="mx-auto"
                  animation="border"
                  variant="primary"
                />: 
        <Row style={{ minHeight: 120 }}>
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
            <tbody    {...getTableBodyProps()}>
              { 
                rows.map((row, i) => {
                  const array = [];
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {Object.keys(row.values).forEach((key) => {
                        key.includes("quiz") |
                        key.includes("assignment") |
                        key.includes("final")
                          ? array.push(
                              <input
                                id={row.values[key]?.moduleSubjectMarkId}
                                name={key}
                                className={
                                  isEdit ? "input-transparent" : "input-display"
                                }
                                defaultValue={row.values[key]?.score}
                                disabled={row.values[key] === undefined}
                                value={score[key]?.score}
                                onChange={handleChangeScore}
                              />
                            )
                          : array.push(row.values[key]);
                      })}
                      {array.map((item, index) => (
                        <td className="text-center" key={index}>
                          {item}
                        </td>
                      ))}
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </Row>}
      </Container>
    </>
  );
}
