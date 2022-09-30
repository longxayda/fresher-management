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
import { getFinanceReport } from "redux/selectors";
import { fetchFinanceReport, fetchFinancesReport } from "./financeReportSlice";

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
      hooks.visibleColumns.push((columns) => [
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
      ]);
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

export default function NewFinanceReport() {
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
        ],
      },
      {
        Header: "Training Event Info",
        columns: [
          {
            Header: "Site",
            accessor: "site",
          },
          {
            Header: "Event Code",
            accessor: "eventCode",
          },
          {
            Header: "Certificate Provider",
            accessor: "certificateProvider",
          },
          {
            Header: "Certificate Name",
            accessor: "certificateName",
          },
          {
            Header: "Delivery Type",
            accessor: "deliveryType",
          },
        ],
      },
      {
        Header: "Trainee Info",
        columns: [
          {
            Header: "Actual of Attendence Start Date",
            accessor: "actualOfAttendenceStartDate",
          },
          {
            Header: "Actual of  Attendence End Date",
            accessor: "actualOfAttendenceEndDate",
          },
          {
            Header: "Status",
            accessor: "status",
          },
        ],
      },
      {
        Header: "Training Deposit",
        columns: [
          {
            Header: "Deposit Date",
            accessor: "depositeDate",
          },
          {
            Header: "Deposit Amount(VND)",
            accessor: "depositeAmount",
          },
          {
            Header: "Refund Date",
            accessor: "refundDate",
          },
          {
            Header: "Refund Amount(VND)",
            accessor: "refundAmount",
          },
          {
            Header: "Notes For Deposit",
            accessor: "notesForDeposit",
          },
        ],
      },
      {
        Header: "Commitment Info",
        columns: [
          {
            Header: "Commited Value",
            accessor: "commitedValue",
          },
          {
            Header: "Commited working duration(month)",
            accessor: "commitedWorkingDuration",
          },
          {
            Header: "Start of commitment date",
            accessor: "startOfCommitmentDate",
          },
          {
            Header: "End of commitment date",
            accessor: "endOfCommitmentDate",
          },
          {
            Header: "Notes For Commitments",
            accessor: "notesForCommitments",
          },
          {
            Header: "Toeic Grade",
            accessor: "toeicGrade",
          },
          {
            Header: "Updated By",
            accessor: "updatedBy",
          },
          {
            Header: "Updated Date",
            accessor: "updatedDate",
          },
        ],
      },
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
        Header: "Commitment violation charge",
        columns: [
          {
            Header: "Job Leaving Date",
            accessor: "jobLeavingDate",
          },
          {
            Header: "Last Working Date",
            accessor: "lastWorkingDate",
          },
          {
            Header: "Actual duration of working commitment",
            accessor: "actualDurationOfWorkingCommitment",
          },
          {
            Header: "Remaining duration",
            accessor: "remainingDuration",
          },
          {
            Header: "Payback to FSOFT",
            accessor: "payBackToFsoft",
          },
        ],
      },
      {
        Header: "Validation & supporting info",
        columns: [
          {
            Header: "Employee valid",
            accessor: "employeeValid",
          },
          {
            Header: "Event Valid",
            accessor: "eventValid",
          },
        ],
      },
    ],
    []
  );
  //API Finance bị lỗi
  const data = useSelector(getFinanceReport);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFinanceReport());
  }, []);

  return (
    <>
      <WrapTable columns={columns} data={data} />
    </>
  );
}
