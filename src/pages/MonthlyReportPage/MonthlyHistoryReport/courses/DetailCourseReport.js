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
  addItem,
  deleteCoursesReportList,
  fetchDetailCoursesReport,
} from "./detailCourseReportSlice";
import { getDetailCoursesReport } from "redux/selectors";
import { useLocation } from "react-router";
import { MyCheckbox } from "components/validation/Validation";
import Swal from "sweetalert2";
import { formatDate } from "utils";
import Pagination from "components/pagination/Pagination";
import ToasifyReport from "components/toasify";
import { getStatusCourses } from "redux/selectors";
import { getStatusContentCourses } from "redux/selectors";
import { getNumPageCourses } from "redux/selectors";

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

  const handleClickBtnEdit = (row) => {
    dispatch(addItem(row.original));
  };
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
                <Button
                  size="sm"
                  variant="primary"
                  //onClick={() => handleClickBtnEdit(row)}
                  style={{
                    cusor: "pointer",
                    fontSize: "6px",
                    marginLeft: "3px",
                  }}
                >
                  <i style={{ fontSize: 12 }} className="fas fa-edit"></i>
                </Button>
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
    selectedFlatRows,
    setPageSize,
    state: { pageSize, globalFilter },
  } = props;
  const [deleteCourses, setDeleteCourses] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const numPageList = useSelector(getNumPageCourses);
  const handleDeleteCourses = () => {
    if (deleteCourses.length <= 0) {
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
          deleteCourses.forEach((course) => {
            value.push(course.id);
          });
          dispatch(deleteCoursesReportList(value));
        }
      });
    }
  };
  const [pageIndex, setPageIndex] = useState(0);
  const handleNextPage = () => {
    dispatch(
      fetchDetailCoursesReport({
        id: location?.state?.id,
        page: Number(pageIndex + 1),
        num: pageSize,
      })
    );
    setPageIndex((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    dispatch(
      fetchDetailCoursesReport({
        id: location?.state?.id,
        page: Number(pageIndex - 1),
        num: pageSize,
      })
    );
    setPageIndex((prev) => prev - 1);
  };
  const handleGotoNextPage = () => {
    dispatch(
      fetchDetailCoursesReport({
        id: location?.state?.id,
        page: Number(numPageList - 1),
        num: pageSize,
      })
    );
    setPageIndex(Number(numPageList - 1));
  };
  const handleGotoPreviousPage = () => {
    dispatch(
      fetchDetailCoursesReport({
        id: location?.state?.id,
        page: 0,
        num: pageSize,
      })
    );
    setPageIndex(0);
  };
  const handleShowPageSize = (num) => {
    setPageSize(num);
    dispatch(
      fetchDetailCoursesReport({
        id: location?.state?.id,
        page: pageIndex,
        num: num,
      })
    );
  };
  const handleGoToPage = (pageIdex) => {
    if (pageIdex <= numPageList && pageIdex !== 0) {
      dispatch(
        fetchDetailCoursesReport({
          id: location?.state?.id,
          page: Number(pageIdex - 1),
          num: pageSize,
        })
      );
      setPageIndex(Number(pageIdex - 1));
    } else {
      return;
    }
  };
  useEffect(() => {
    let res = selectedFlatRows.map((row) => row.original);
    setDeleteCourses(res);
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
            variant="danger"
            type="button"
            className="deleteBtn btn-fill"
            onClick={handleDeleteCourses}
          >
            <span>DELETE</span> {deleteCourses?.length}
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
        <Pagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          numPageList={numPageList}
          handleGotoNextPage={handleGotoNextPage}
          handleGotoPreviousPage={handleGotoPreviousPage}
          handleGoToPage={handleGoToPage}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          handleShowPageSize={handleShowPageSize}
        />
      </div>
    </>
  );
}

export default function DetailCoursesReport() {
  const data = useSelector(getDetailCoursesReport);
  const location = useLocation();
  const dispatch = useDispatch();
  const status = useSelector(getStatusCourses);
  const statusContent = useSelector(getStatusContentCourses);
  useEffect(() => {
    if (location?.state?.id) {
      dispatch(
        fetchDetailCoursesReport({ id: location?.state?.id, page: 0, num: 10 })
      );
    }
  }, [location?.state?.id]);

  const columns = useMemo(
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
            Cell: ({ value }) => {
              return formatDate(new Date(value), "dd/MM/yyyy");
            },
          },
          {
            Header: "To Date",
            accessor: "toDate",
            Cell: ({ row, value }) => {
              return formatDate(new Date(value), "dd/MM/yyyy");
            },
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
            Header: "Update By",
            accessor: "updateBy",
          },
          {
            Header: "Update Date",
            accessor: "updateAt",
          },
        ],
      },
      {
        Header: "Validation & supporting info",
        columns: [
          {
            Header: "Note",
            accessor: "note",
          },
        ],
      },
    ],
    []
  );
  return (
    <>
      <WrapTable columns={columns} data={data} />
      <ToasifyReport status={status} statusContent={statusContent} />
    </>
  );
}
