import React, { useEffect, useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useRowSelect,
} from "react-table";

import { Table, Input } from "reactstrap";
import { Button, CloseButton, Form, Modal } from "react-bootstrap";
import NewAuditModal from "components/Audit/CreateNewAudit/NewAuditModal";
import { useSelector, useDispatch } from "react-redux";
import CustomSpinner from "components/Audit/Evaluation/CustomSpinner";

import {
  selectIdsSchedule, isLoadingSchedule, totalScheduleSchedule, schedules
} from "redux/selectors/auditorsSelector/scheduleSelector"
import {
  idFilterChange,
  isOpenModalDeleteChange,
  isMultipleDeleteChange,
  deleteManyChange,
} from "redux/auditorsSlice/scheduleSlice"

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

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Input
      type="select"
      value={filterValue}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Input>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} style={{ transform: 'scale(1.3)' }} />
      </>
    );
  }
);

function TableSchedule({ columns, data, selectedRows, setSelectedRows, load }) {
  if (columns == null || data == null) { return null }
  if (columns.lenght == 0 || data.lenght == 0) { return null }
  const isLoad = useSelector(load);
  const dispatch = useDispatch()
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  let props;
  try {
    props = useTable(
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

            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),

            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns
        ]);
      }
    );
  }
  catch
  {
    return null;
  }
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
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter, selectedRowIds },
  } = props;

  useEffect(() => {
    setSelectedRows(selectedFlatRows.map(row => row.original.id));
  }, [setSelectedRows, selectedFlatRows]);
  const selectedIdRows = useSelector(selectIdsSchedule)
  const isLoading = useSelector(isLoadingSchedule)
  const totalSchedule = useSelector(totalScheduleSchedule)
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="d-flex align-items-center justify-content-between pb-3">
        <div className="mr-3 d-flex align-items-center">
          <div className="mb-0" style={{ marginRight: '5px' }}><b><span style={{ color: '#9C9C9C' }}>Search: </span></b> </div>
          <Input
            type="search"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>
        <div>
          <Button
            className="btn-fill"
            variant="primary"
            style={{ margin: '0 10px' }}
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-plus" style={{ marginRight: '5px' }}></i>
            Create new Audit
          </Button>
          <Button
            className="btn-fill"
            variant="danger"
            style={{ minWidth: "140px" }}
            onClick={() => {
              dispatch(isOpenModalDeleteChange(true))
              dispatch(isMultipleDeleteChange(true))
              dispatch(deleteManyChange(selectedRows))
            }}
            disabled={!selectedRows.length}
          >
            <i className="fas fa-trash" style={{ marginRight: '5px' }}></i>
            Delete {selectedRows.length}
          </Button>
        </div>
      </div>
      <style>{`
      td,tr,th{
        text-align: center;
        border: none;
      }
      `}</style>
      {
        isLoad ? <CustomSpinner /> : <>
          <Table className="Scheduletable" bordered striped hover {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div
                        className="heading"
                        style={{
                          fontSize: "14px",
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "bold",
                          borderTop: "none!important",
                          borderBottom: "none",
                          textAlign: "center"
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
          <div className="pagination d-flex align-items-center justify-content-center">
            <Button
              style={{ marginRight: '10px' }}
              className="btn-fill btn-sm mr-3"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              style={{ marginRight: '10px' }}
              className="btn-fill btn-sm mr-3"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
            <Button
              style={{ marginRight: '10px' }}
              className="btn-fill btn-sm mr-3"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            <Button
              style={{ marginRight: '10px' }}
              className="btn-fill btn-sm mr-5"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
            <span className="mr-3 ml-5" style={{ marginRight: '10px' }}>
              Page:
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <span className="mr-3" > Go to page: </span>
            <Input
              type="number"
              className="mr-3"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px", marginRight: '10px' }}
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
        </>
      }
      <Modal
        className="modal-primary"
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="fw-semibold fs-3 text-primary">CREATE NEW AUDIT</Modal.Title>
          <CloseButton onClick={() => setShowModal(false)}></CloseButton>
        </Modal.Header>
        <Modal.Body>
          <NewAuditModal></NewAuditModal>
        </Modal.Body>
      </Modal>
      <br />
    </>
  );
}

export { DefaultColumnFilter, SelectColumnFilter }
export default TableSchedule;
