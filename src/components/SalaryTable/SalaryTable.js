import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import { Table, Input, Label } from "reactstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <Form.Group className="mb-0">
      <Form.Control
        onClick={(e) => e.stopPropagation()}
        type="search"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      ></Form.Control>
    </Form.Group>
  );
}

export default function SalaryTable({
  columns,
  data,
  handleGetdata,
  classList,
  handlegetClassList,
}) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const props = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = props;
  React.useEffect(() => {}, [globalFilter]);
  const [newClass, setNewClass] = React.useState("");
  const [newMonth, setNewMonth] = React.useState("");
  const [newYear, setNewYear] = React.useState("");

  React.useEffect(() => {
    if (newYear != "") {
      handlegetClassList(newYear);
    }
  }, [newYear]);

  return (
    <>
      <div className="d-flex justify-content-start">
        <div
          className="d-flex justify-content-start align-items-center mb-3"
          style={{ width: "60%" }}
        >
          <div className="me-3 ms-3">
            <Label className="mb-0">Filter: </Label>
          </div>
          <div className="me-3">
            <select
              style={{
                alignItems: "center",
                textAlign: "center",
                width: "100px",
                height: "40px",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              className="p-2"
              onChange={(e) => setNewYear(e.target.value)}
            >
              <option value="">Year</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </div>
          <div className="me-3">
            <select
              style={{
                alignItems: "center",
                textAlign: "center",
                width: "240px",
                height: "40px",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              className="p-2"
              onChange={(e) => setNewClass(e.target.value)}
            >
              <option value="">Class</option>
              {classList.map((item) => {
                return <option value={item.classId}>{item.classCode}</option>;
              })}
            </select>
          </div>
          <div className="me-3">
            <select
              style={{
                alignItems: "center",
                textAlign: "center",
                width: "140px",
                height: "40px",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              className="p-2"
              onChange={(e) => setNewMonth(e.target.value)}
            >
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <Button
            className=""
            style={{ minWidth: "60px", padding: "6px 16px" }}
            onClick={() => handleGetdata(newClass, newMonth)}
          >
            <FaSearch />
          </Button>
        </div>
        <div
          className="d-flex align-items-center justify-content-end mb-3"
          style={{ width: "40%" }}
        >
          <div className="me-3">
            <Label className="mb-0">Search: </Label>
          </div>
          <div className="me-3">
            <Input
              style={{
                height: "40px",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              boder
              placeholder="Search..."
              type="search"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <style>{`
        td,tr,th{
          text-align: center;
        }
        `}</style>
      <Table striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    color: "black",
                    fontWeight: "bold",
                    borderTop: "none!important",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                >
                  <div
                    className="heading"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td>{row.cells[0].render("Cell")}</td>
                <td>{row.cells[1].render("Cell")}</td>
                <td>{row.cells[2].render("Cell")}</td>
                <td>{row.cells[3].render("Cell")}</td>
                <td>
                  {/* {row.cells[4].render("Cell")} */}
                  {(row.values.status == "Done" && (
                    <span
                      className="badge bg-primary"
                      style={{ minWidth: "82px" }}
                    >
                      {row.values.status}
                    </span>
                  )) ||
                    (row.values.status == "In progress" && (
                      <span
                        className="badge bg-success "
                        style={{ minWidth: "82px" }}
                      >
                        {row.values.status}
                      </span>
                    )) ||
                    (row.values.status == "Fail" && (
                      <span
                        className="badge bg-warning "
                        style={{ minWidth: "82px" }}
                      >
                        {row.values.status}
                      </span>
                    )) ||
                    (row.values.status == "Drop out" && (
                      <span
                        className="badge bg-danger "
                        style={{ minWidth: "82px" }}
                      >
                        {row.values.status}
                      </span>
                    ))}
                </td>
                <td>{row.cells[5].render("Cell")}</td>
                <td>
                  {/* {row.cells[6].render("Cell")} */}
                  {(row.values.level == "A" && (
                    <span className="badge bg-success ">
                      {row.values.level}
                    </span>
                  )) ||
                    (row.values.level == "B" && (
                      <span className="badge bg-primary ">
                        {row.values.level}
                      </span>
                    )) ||
                    (row.values.level == "C" && (
                      <span className="badge bg-warning ">
                        {row.values.level}
                      </span>
                    )) ||
                    (row.values.level == "D" && (
                      <span className="badge bg-danger ">
                        {row.values.level}
                      </span>
                    ))}
                </td>
                <td>{row.cells[7].render("Cell")}</td>
                <td>{row.cells[8].render("Cell")}</td>
                <td>{row.cells[9].render("Cell")}</td>
                <td>{row.cells[10].render("Cell")}</td>
                <td>{row.cells[11].render("Cell")}</td>
                <td>{row.cells[12].render("Cell")}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination d-flex align-items-center justify-content-center">
        <Button
          className="btn-fill me-3 btn-sm"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>
        <Button
          className="btn-fill me-3 btn-sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        <Button
          className="btn-fill me-3 btn-sm"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>
        <Button
          className="btn-fill me-3 btn-sm"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>
        <span className="me-3">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span className="me-3"> Go to page: </span>
        <Input
          type="number"
          className="me-3"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: "100px" }}
        />
        <div className="">
          <Input
            type="select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Input>
        </div>
      </div>
      <br />
    </>
  );
}
