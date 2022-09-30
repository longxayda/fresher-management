import React, { useMemo, useState } from "react";
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
import {
  changeFresher,
  deleteFresherReport,
  fetchFresherReportList,
} from "./fresherReportSlice";
import { getFresherReport } from "redux/selectors";
import { MyCheckbox } from "components/validation/Validation";
import { formatDate } from "utils";
import Swal from "sweetalert2";

function DefaultColumnFilter() {
  return <Form.Group className="mb-0"></Form.Group>;
}

function WrapTable({ columns, data }) {
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
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <MyCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <div>
                <MyCheckbox {...row.getToggleRowSelectedProps()} />
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
    selectedFlatRows,
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
  const dispatch = useDispatch();
  const [deleteFreshers, setDeleteFreshers] = useState([]);
  const handleDeleteFreshers = () => {
    if (deleteFreshers.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No value is selected!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const value = [];
          deleteFreshers.forEach((item) => {
            value.push(item.classCode);
          });
          dispatch(deleteFresherReport(value));
        }
      });
    }
  };
  useEffect(() => {
    let res = selectedFlatRows.map((row) => row.original);
    setDeleteFreshers(res);
  }, [selectedFlatRows]);
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
            onClick={handleDeleteFreshers}
            variant="danger"
            type="button"
            className="deleteBtn btn-fill"
          >
            <i className="fas fa-trash-alt"></i>
            DELETE {deleteFreshers?.length}
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
                        fontSize: "15px",
                        fontWeight: "500",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        width: "100%",
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
          className="btn-fill mr-3 pageNavi-btn"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>
        <Button
          className="btn-fill mr-3 pageNavi-btn"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        <Button
          className="btn-fill mr-3 pageNavi-btn"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>
        <Button
          className="btn-fill mr-5 pageNavi-btn"
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

export default function FresherReport() {
  const data = useSelector(getFresherReport);

  const month = new Date().getMonth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFresherReportList(month + 1));
  }, [month]);
  const handleInputChange = (row, e) => {
    const newValue = { ...row, note: e.target.value };
    dispatch(changeFresher(newValue));
  };
  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "no",
      },
      {
        Header: "Class Code",
        accessor: "classCode",
      },
      {
        Header: "Class Type",
        accessor: "classType",
      },
      {
        Header: "Class Status",
        accessor: "classStatus",
      },
      {
        Header: "Skill",
        accessor: "skill",
      },
      {
        Header: "OB",
        accessor: "ob",
      },
      {
        Header: "Note",
        accessor: "note",
        Cell: ({ row, value }) => {
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
        Header: "Drop Out",
        accessor: "dropOut",
      },
      {
        Header: "Fail",
        accessor: "fail",
      },
      {
        Header: "TrainingInFA",
        accessor: "trainingInFA",
      },

      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ value }) => {
          return formatDate(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: "Pass",
        accessor: "pass",
      },
      {
        Header: "End Date",
        accessor: "end_date",
        Cell: ({ value }) => {
          return formatDate(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: "FSU Booked",
        accessor: "fsuBooked",
      },

      {
        Header: "Update By",
        accessor: "updateBy",
      },
      {
        Header: "Update Date",
        accessor: "updateDate",
        Cell: ({ value }) => {
          return formatDate(new Date(value), "dd/MM/yyyy");
        },
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
