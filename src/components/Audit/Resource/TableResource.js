import React, { useEffect, useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useRowSelect,
} from "react-table";

import { Table, Input, Label } from "reactstrap";
import { Button, Form, Spinner,  Row, Col } from "react-bootstrap";


import { useSelector, useDispatch } from "react-redux";
import {selectIdsResource, isLoadingResource, totalQuestionResource, questionListResource} from 'redux/selectors/auditorsSelector/resourceSelectors'

import {idFilterChange, 
          isOpenModalAddEditChange, 
          isOpenModalDeleteChange, 
          isMultipleDeleteChange,
          isAddQuestionChange,
          deleteManyChange
  } from "redux/auditorsSlice/resourceSlice"

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

function TableResource({ columns, data, maxIndexPage, currentPage, setCurrentPage, setInputSearch, inputSearch}) {
  const dispatch = useDispatch()
  if(columns == null || data == null) return null;
  if(columns == [] || data == []) return null;
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  let props;
  try{ props = useTable(
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
  catch{
    return null
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

  const goToPage = (index) => {
    if(index <= 1) setCurrentPage(1)
    else if(index >= maxIndexPage) setCurrentPage(maxIndexPage)
    else setCurrentPage(index)
  }

  const questionList = useSelector(questionListResource)

  useEffect(() => {
    dispatch(idFilterChange(selectedFlatRows.map(row => row.original.id)))
  },[dispatch,selectedFlatRows])

  const selectedIdRows = useSelector(selectIdsResource);
  const isLoading = useSelector(isLoadingResource)
  const totalQuestion = useSelector(totalQuestionResource)
  const [keyword, setKeyword] = useState("")
  const handleSubmit = () => {
    setInputSearch(keyword)
    setCurrentPage(1)
  }
  const handleClear = () => {
    setKeyword("")
    setInputSearch("")
  }
  useEffect(() => {
    if(keyword == "") {
      setInputSearch("")
    }
  },[keyword])
  return (
    <div className="table-resource">
      <div className="d-flex align-items-center justify-content-between pb-3">
          <div>
          <Form >
          <Form.Group as={Row}  >
              <Col sm="10" className="d-flex align-items-center ">
            <Label className="mb-0 text-capitalize" style={{ color: "#9C9C9C" }}><strong>Search: </strong></Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder="Enter keyword..." 
                    value={keyword}
                    onChange = {e => {
                      setKeyword(e.target.value)}
                    }
                    style={{height: '44px', paddingRight: '30px', marginRight:'5px'}}
                >
                </Form.Control>
                  <Button 
                      variant="primary" 
                      className="btn-fill"
                      onClick={handleSubmit}
                      style={{marginRight: '5px'}}
                      disabled={!keyword}
                      >
                      <i className="fas fa-search" ></i>
                  </Button>
                  <Button 
                      variant="danger" 
                      className="btn-fill"
                      onClick={handleClear}
                      disabled={!keyword}
                      >
                      <i className="fas fa-eraser"></i>
                  </Button>
              </Col>
              <Col sm="2">
                </Col>
          </Form.Group>
          </Form>
        </div>
        <div>
          <Button
            className="btn-fill"
            variant="primary"
            style={{ minWidth: "140px", margin: '0 10px' }}
            onClick={()=>{
              dispatch(isOpenModalAddEditChange(true))
              dispatch(isAddQuestionChange(true))
            }
            }
          >
            <i className="fas fa-plus" style={{ marginRight: '5px' }}></i>
            Add question
          </Button>

          <Button
            className="btn-fill btn-delete-select"
            variant="danger"
            style={{ minWidth: "140px" }}
            onClick={()=>{
              dispatch(isOpenModalDeleteChange(true))
              dispatch(isMultipleDeleteChange(true))
              dispatch(deleteManyChange(selectedIdRows))
            }}
            disabled={!selectedIdRows.length}
          >
            <i className="fas fa-trash" style={{ marginRight: '5px' }}></i>
            Delete {selectedIdRows.length}
          </Button>
        </div>
      </div>
      <style>{`
      td,tr,th{
        text-align: center;
        border: none;
      }
      `}</style>
      {isLoading ?  (
        <div 
            className="d-flex flex-column justify-content-center align-items-center"
            style={{height: '100px', marginBottom: '20px'}}
        >
          <Spinner
            variant="primary"
            animation="border"
            role="status"
            className="position-absolute"
            style={{ height: "60px", width: "60px" }}
          ></Spinner>
        </div>
          ) : (!totalQuestion && keyword ? (
            <div 
                className="d-flex flex-column justify-content-center align-items-center"
                style={{height: '100px', marginBottom: '20px'}}
            >
              <span><b>Keyword is not found !</b></span>
            </div>
          ) :( 
      <Table bordered striped hover {...getTableProps()}>
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
      </Table>))}
      <div className="pagination d-flex align-items-center justify-content-center">
        <Button
          style={{ marginRight: '10px' }}
          className="btn-fill mr-3 btn-sm"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </Button>
        <Button
          style={{ marginRight: '10px' }}
          className="btn-fill mr-3 btn-sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </Button>
        <Button
          style={{ marginRight: '10px' }}
          className="btn-fill mr-3 btn-sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === maxIndexPage}
        >
          {">"}
        </Button>
        <Button
          style={{ marginRight: '10px' }}
          className="btn-fill mr-5 btn-sm"
          onClick={() => goToPage(maxIndexPage)}
          disabled={currentPage === maxIndexPage}
        >
          {">>"}
        </Button>
        <span className="mr-3 ml-5" style={{ marginRight: '10px' }}>
          Page:
          <strong>
            {totalQuestion ? currentPage : ''} of {totalQuestion ? maxIndexPage : ''}
          </strong>
        </span>
        <span className="mr-3" > Go to page: </span>
        <Input
              type="number"
              className="mr-3"
              min={1}
              max={maxIndexPage}
              onChange={(e) => {
                  const index = Number(e.target.value);
                  if(index <= 1) {
                      goToPage(1);
                  }
                  else if(index >= maxIndexPage) {
                      goToPage(maxIndexPage);
                  }
                  else {
                      goToPage(index);
                  }
              }}
              style={{ width: "100px", marginRight: '10px' }}
          />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span style={{ fontWeight: 'bold'}}>
              {questionList.length} of {totalQuestion ? totalQuestion : 0} questions 
            </span>
          </div>
      </div>
      <br />
    </div>
  );
}

export default TableResource;
