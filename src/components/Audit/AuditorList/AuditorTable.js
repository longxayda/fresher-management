import React from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useRowSelect,
} from "react-table";

import store from "redux/store";
import { Table, Input, Label, Row, Col } from "reactstrap";
import { Button, Spinner } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectedIds } from "redux/selectors/auditorsSelector/auditorSelector";
import {
  selectedIdsChange,
  addModalChange,
  delModalChange,
  multiDelChange
} from "redux/auditorsSlice/auditorSlice"

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <Form>
      <Form.Group className="mt-2">
        <Form.Control
          onClick={(e) => e.stopPropagation()}
          type="search"
          name="search"
          value={filterValue || ""}
          onChange={(e) => {
            setFilter(e.target.value || undefined);
          }}
          placeholder={`Search ${count} records...`}
        ></Form.Control>
      </Form.Group>
    </Form>
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

export default function AuditorTable({ columns, data, searchValue, setSearchValue, currentIndex, setCurrentIndex, maxIndex }) {
  if (columns == null || data == null || columns == []) return null;

  const dispatch = useDispatch()
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  let props = null;
  try {
    props = useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState: { pageSize: 20 }
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
  catch {
    return (
      <>
        <h4>Something went wrong, please try again later!</h4>
      </>
    )
  }




  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    selectedFlatRows,
    state: { globalFilter },
  } = props;



  const selectedIdsData = useSelector(selectedIds)


  React.useEffect(() => {
    dispatch(selectedIdsChange(selectedFlatRows.map(row => row.original.id)))
  }, [selectedFlatRows]);


  const goToPage = (index) => {
    if (index <= 1) setCurrentIndex(1)
    else if (index >= maxIndex) setCurrentIndex(maxIndex)
    else setCurrentIndex(index)
  }


  return (
    <>
      <Row className="pb-3">
        <Col md="6" className="d-flex align-items-center ps-0">
          <div className="me-3" >
            <Label className="mb-0 text-capitalize" style={{ color: "#9C9C9C" }}><strong>Search: </strong></Label>
          </div>
          <div className="me-1">
            <Input
              type="search"
              placeholder="Type something..."
              value={searchValue || globalFilter || ""}
              onChange={(e) => {
                setGlobalFilter(e.target.value)
                setSearchValue(e.target.value)
                setCurrentIndex(1)
              }}
            />
          </div>
        </Col>
        <Col md="6" className="text-end pe-0">
          <Button
            className="addAuditorBtn btn btn-fill btn-primary me-2"
            variant="primary"
            onClick={() => dispatch(addModalChange(true))}
          >
            <i className="fas fa-plus me-1" ></i>
            Add Auditor
          </Button>
          <Button
            className=" delAuditorBtn btn btn-fill btn-danger"
            variant="primary"
            disabled={!selectedIdsData.length}
            onClick={() => {
              dispatch(delModalChange(true))
              dispatch(multiDelChange(true))
            }}
          >
            <i className="fas fa-trash me-1" ></i>
            Delete {selectedIdsData.length}
          </Button>
        </Col>
      </Row>
      <style>{`
      td,tr,th{
        text-align: center;
        border: none;
      }
      table{
        border-top: solid;
        border-bottom: solid;
      }
      .table > thead > tr > th{
        padding-bottom: 12px;
      }
      `}</style>
      <Row>
        {store.getState().auditor.isLoading ? (
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

          <Table className="auditorTable" bordered striped hover {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps(), {
                      style: { minWidth: column.minWidth, width: column.width },
                    })}>
                      <div
                        className="heading"
                        style={{
                          fontSize: "14px",
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "bold",
                          borderTop: "none !important",
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
                        <td {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            width: cell.column.width,
                          },
                        })}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>)}
        <div className="pagination d-flex align-items-center justify-content-center">
          <Button
            className="btn-fill btn-sm me-2"
            onClick={() => goToPage(1)}
            disabled={currentIndex === 1}
          >
            {"<<"}
          </Button>
          <Button
            className="btn-fill btn-sm me-2"
            onClick={() => goToPage(currentIndex - 1)}
            disabled={currentIndex === 1}
          >
            {"<"}
          </Button>
          <Button
            className="btn-fill btn-sm me-2"
            onClick={() => goToPage(currentIndex + 1)}
            disabled={currentIndex === maxIndex}
          >
            {">"}
          </Button>
          <Button
            className="btn-fill btn-sm me-4"
            onClick={() => goToPage(maxIndex)}
            disabled={currentIndex === maxIndex}
          >
            {">>"}
          </Button>
          <span className="me-2"> Page:</span>
          <Input
            type="number"
            className="me-2"
            min={1}
            max={maxIndex}
            value={currentIndex}
            onChange={(e) => {
              const index = Number(e.target.value);
              if (index <= 1) {
                goToPage(1);
              }
              else if (index >= maxIndex) {
                goToPage(maxIndex);
              }
              else {
                goToPage(index);
              }
            }}
            style={{ width: "60px" }}
          />
          <span className="">of<strong>  {maxIndex}  </strong> {maxIndex == 1? 'Page': 'Pages' }</span>
        </div>
        <br />
      </Row>
    </>
  );
}

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";