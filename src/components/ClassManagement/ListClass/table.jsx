import React, { useEffect, useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";

import { Table, Input, Label } from "reactstrap";
import { Button , Spinner} from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default React.memo(function WrapTable({
  columns,
  data,
  setOpen,
  fetchData,
  pageCount: controlledPageCount,
  isLoading
}) {
  const defaultColumn = React.useMemo(() => ({}), []);
  const history = useHistory();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
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
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      autoResetPage: false,
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  React.useEffect(() => {
    // props.dispatch({ type: actions.resetPage })
  }, [globalFilter]);
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);
  const hideAddClass = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user?.permissions?.includes("CL001")) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center  pb-3">
        <h4
          style={{
            margin: "0",
            fontWeight: "500",
          }}
        >
          Planning Class
        </h4>
        <div className="d-flex align-items-center justify-content-end">
          <div className="px-3">
            <Label className="mb-0">Search: </Label>
          </div>
          <div className="px-3">
            <Input
              type="search"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>

          {hideAddClass() && (
            <button
              onClick={() => setOpen(true)}
              className="btn btn-fill btn-primary"
            >
              ADD CLASS
            </button>
          )}
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
      <Table striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
              <tr
                {...row.getRowProps()}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(
                    "/admin/class/class-management/class-detail?id=" +
                      row.original.id
                  );
                }}
              >
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
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span className="mx-3"> Go to page: </span>
        <Input
          className="mr-3"
          type="number"
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
});
