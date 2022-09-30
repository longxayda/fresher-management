import React from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useRowSelect,
} from "react-table";
import { useEffect, useRef } from "react";
import { Table, Input, Label } from "reactstrap";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../NewHistoryReport.scss";
import { changeCourses, fetchCoursesReport } from "./coursesReportSlice";
import { getCoursesReport } from "redux/selectors";
import { useLocation } from "react-router";
import { formatDate } from "utils";

function DefaultColumnFilter() {
  return <Form.Group className="mb-0"></Form.Group>;
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return (
      <>
        <Input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function WrapTable({ columns, data }) {
  const selectedClasses = useRef([]);
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
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ page, getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                  onClick={() => {
                    if (selectedClasses.current.length == 0) {
                      page.map((row) => selectedClasses.current.push(row.id));
                    } else if (selectedClasses.current.length == page.length)
                      selectedClasses.current = [];
                    else {
                      page.map((row) => {
                        if (!selectedClasses.current.includes(row.id))
                          selectedClasses.current.push(row.id);
                      });
                    }
                  }}
                />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox
                  {...row.getToggleRowSelectedProps()}
                  onClick={() => {
                    if (selectedClasses.current.includes(row.id)) {
                      selectedClasses.current = selectedClasses.current.filter(
                        (item) => item !== row.id
                      );
                    } else {
                      selectedClasses.current.push(row.id);
                    }
                  }}
                />
              </div>
            ),
          },
          ...columns,
        ];
      });
    }
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
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between pb-3">
        <div className="mr-3 d-flex align-items-center">
          <Label className="mb-0 searchLabel">Search: </Label>
          <Input
            className="searchBox"
            placeholder="..."
            type="search"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div>
          <Button
            variant="danger"
            type="button"
            className="deleteBtn btn-fill"
            onClick={() => {
              if (selectedClasses.current.length == 0) {
                alert("Need to select at least 1 class to delete");
              } else if (selectedClasses.current.length == 1) {
                if (confirm("Do you really want to delete selected class?"))
                  alert("Delete function is not work here.");
              } else {
                if (
                  confirm(
                    `Do you really want to delete ${selectedClasses.current.length} classes?`
                  )
                )
                  alert("Delete function is not work here.");
              }
            }}
          >
            DELETE
          </Button>
        </div>
      </div>
      <style>{`td,tr,th{text-align: center;}`}</style>
      <pre className="chorma">
        <Table bordered striped hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div
                      className="heading"
                      style={{
                        fontFamily: "Arial",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                        textTransform: "uppercase",
                        borderTop: "none !important",
                        borderBottom: "none",
                        textAlign: "center",
                      }}
                    >
                      {column.render("Header")}
                    </div>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </pre>
      <div className="pagination d-flex align-items-center justify-content-center">
        <Button
          className="btn-fill mr-3 pageNavi-btn btn-sm"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>
        <Button
          className="btn-fill mr-3 pageNavi-btn btn-sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        <Button
          className="btn-fill mr-3 pageNavi-btn btn-sm"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>
        <Button
          className="btn-fill mr-5 pageNavi-btn btn-sm"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>
        <span className="mr-3 ml-5" style={{ margin: "0 6px 0 6px" }}>
          Page
          <strong> {pageIndex + 1} </strong>
          of
          <strong> {pageOptions.length} </strong>
        </span>
        <span className="mr-3" style={{ marginRight: "4px" }}>
          {" "}
          Go to page:{" "}
        </span>
        <Input
          type="number"
          className="mr-3"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: "70px" }}
        />
        <div>
          <Input
            style={{ width: "90px" }}
            type="select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Input>
        </div>
      </div>
    </>
  );
}

export default function NewCoursesReport() {
  const data = useSelector(getCoursesReport);
  const location = useLocation();
  const month = Number(location?.state?.monthDate?.getMonth() + 1);
  const year = location?.state?.monthDate.getFullYear();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoursesReport({ month, year }));
  }, []);
  const handleInputChange = (row, e) => {
    const newValue = { ...row, note: e.target.value };
    dispatch(changeCourses(newValue));
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Employee Info",
        columns: [
          {
            Header: "Empl. ID",
            accessor: "emplId",
          },
          {
            Header: "National ID",
            accessor: "nationalId",
          },
          {
            Header: "Account",
            accessor: "account",
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Course Code",
            accessor: "courseCode",
          },
        ],
      },
      {
        Header: "Trainee Info",
        columns: [
          {
            Header: "From Date",
            accessor: "fromDate",
          },
          {
            Header: "To Date",
            accessor: "toDate",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Final Grade",
            accessor: "finalGrade",
          },
          {
            Header: "Completion Level",
            accessor: "completionLevel",
          },
          {
            Header: "FSU Allocated",
            accessor: "fsuAllocated",
          },
          {
            Header: "Updated By",
            accessor: "updatedBy",
          },
          {
            Header: "Updated Date",
            accessor: "updatedDate",
            Cell: ({ value }) => {
              return formatDate(new Date(value), "dd/MM/yyyy");
            },
          },
        ],
      },
      {
        Header: "Validation & supporting info",
        columns: [
          {
            Header: "Note",
            accessor: "note",
            Cell: ({ row }) => {
              return (
                <Input
                  type="text"
                  onChange={(e) => handleInputChange(row.original, e)}
                  placeholder="..."
                  style={{ width: "200px" }}
                />
              );
            },
          },
          {
            Header: "Employee Valid",
            accessor: "employeeValid",
          },
          {
            Header: "Course Status",
            accessor: "courseStatus",
          },
          {
            Header: "Course Valid/Subject Type",
            accessor: "subjectType",
          },
          {
            Header: "Course Valid/Format Type",
            accessor: "formatType",
          },
          {
            Header: "Course Valid/Scope",
            accessor: "scope",
          },
          {
            Header: "Course Valid/Start Date",
            accessor: "startDate",
          },
          {
            Header: "Course Valid/End Date",
            accessor: "endDate",
          },
          {
            Header: "Course Valid/Learning Time(hrs)",
            accessor: "learningTime",
          },
          {
            Header: "End Year",
            accessor: "endYear",
          },
          {
            Header: "End Month",
            accessor: "endMonth",
          },
        ],
      },
    ],
    []
  );
  return (
    <>
      <WrapTable columns={columns} data={data} />
    </>
  );
}
