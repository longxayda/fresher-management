import React, { useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { Table, Input, Label } from "reactstrap";
import { Button, Spinner } from "react-bootstrap";
import TopicModal from "components/CourseManagement/ListTopic/index";
export default React.memo(function WrapTable({
    columns,
    data,
    setOpen,
    fetchData,
    pageCount: controlledPageCount,
    isLoading,
}) {
    const defaultColumn = React.useMemo(() => ({}), []);
    const props = useTable({
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            autoResetPage: false,
            pageCount: controlledPageCount,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
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
    } = props;
    const [topic, setTopic] = useState(false);
    const [hide, setHide] = useState(false);


  React.useEffect(() => {}, [globalFilter]);
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);
  const hideAddModule = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user?.permissions?.includes("CL002")) {
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
          List Module
        </h4>
        <div className="d-flex align-items-center justify-content-end">
          <div className="px-3">
            <Label className="mb-0"> Search: </Label>
          </div>
          <div className="px-3">
            <Input
              type="search"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          {hideAddModule() && (
            <button
            onClick={() => setOpen(true)}
            className="btn btn-fill btn-primary"
          >
            ADD MODULE
          </button>
          )}
        </div>
      </div>
      <style>        
        {`
      td,tr,th{
        text-align: center;
      }
      `}
      </style>
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
      ) : (
        <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div
                    className="heading"
                    style={{
                      fontSize: "16px",
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
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  );
                })}
                <td
                  className="text-center d-flex"
                  style={{ justifyContent: "center" }}
                >
                  <TopicModal
                    id={row.original.id}
                    topic={topic}
                    setTopic={setTopic}
                    hide={hide}
                    setHide={setHide}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      )}
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
            {pageIndex + 1}
            of {pageOptions.length}
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