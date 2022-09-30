import React from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useRowSelect,
} from "react-table";
import { Input, Label } from "reactstrap";
import { Button, Table, Form ,Spinner} from "react-bootstrap";

function NoneColumnFilter({
}) {
  return (
    <Form.Group className="mb-0" >
    </Form.Group>
  );
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

function PlanTable({ columns, data, isLoading}) {

  const defaultColumn = React.useMemo(
    () => ({
      Filter: NoneColumnFilter,
    }),
    []
  );
  const props = useTable(
    {
      columns: columns ? columns : [],
      data: data ? data : [],
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
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

  let toggleRow = '';
  let rowColor = true;

  return (
    <>
      <div className="d-flex align-items-center justify-content-end pb-3">
        <div className="mr-3">
          <Label className="mb-0">Search: </Label>
        </div>
        <div className="mr-3">
          <Input
            type="search"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
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
      <Table hover {...getTableProps()} >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} >        
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="plan-details-header">
                  <div
                    className="heading"
                    style={{
                      fontSize: "16px",
                      textTransform: "uppercase",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                  </div>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            let subject = '';
            if(row.values.topic){
              subject = row.original.moduleName;
            } 
            if (subject !== toggleRow) {
              rowColor = !rowColor;
            }
            toggleRow = subject;
  
            return (
              <tr style={{ backgroundColor: rowColor ? "white":"rgb(221, 221, 221)"}} {...row.getRowProps()} className="plan-details-data">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>)}
      <div className=" d-flex align-items-center justify-content-center">
        <Button
          className="btn-fill btn-sm mx-1"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>
        <Button
          className="btn-fill btn-sm mx-1"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        <Button
          className="btn-fill btn-sm mx-1"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>
        <Button
          className="btn-fill btn-sm mx-1"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>
        <span className=" mx-3">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span className="mx-3"> Go to page: </span>
        <Input
          type="number"
          className="mr-3"
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
      <br/>
    </>
  );
}

export function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default PlanTable;
