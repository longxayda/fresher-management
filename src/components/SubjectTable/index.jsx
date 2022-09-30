import React from "react";
import { useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useRowSelect,
} from "react-table";
import { Table, Input, Label} from "reactstrap";
import { Modal, Button, Spinner} from "react-bootstrap";
import { Form } from "react-bootstrap";


import {
  listSyllabusSelector,
  isLoadingSelector
} from "redux/selectors/syllabusSelector";
import { getListSyllabus,createSyllabus,deleteSyllabus } from "redux/actions/syllabusAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/Loading";
import {useLocation} from "react-router-dom"

import NotificationAlert from "react-notification-alert";
import { notify } from "./notify.js";

import { api } from "services/api";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

function WrapTable({ columns, data , fetchData , pageCount: controlledPageCount,topicId, isLoading}) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const notificationAlertRef = React.useRef(null);
  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };
  const validateForm = () => {
    const {
      unit,
      content,
      day,
      objective,
      deliveryType,
      duration,
      material,
    } = form;
    const newErrors = {};
    if (!unit || unit === "") {
      newErrors.unit = "Unit is required";
    }
    if (!content || content === "") {
      newErrors.content = "Content is required";
    }
    if (!day || day === "") {
      newErrors.day = "Number of days is required";
    } 
    if (!objective || objective === "") {
      newErrors.objective = "Learning Objective is required";
    } 
    if (!deliveryType || deliveryType === "") {
      newErrors.deliveryType = "Delivery Type is required";
    }
    if (!duration || duration === "") {
      newErrors.duration = "Duration is required";
    }
    if (!material || material === "") {
      newErrors.material = "Training material is required";
    } else if (!/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+.pptx*$/.test(material)) {
      newErrors.material = "Training material is invalid file format";
    }
    return newErrors;
  };
  const handleAddItem = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      notify(
        "tr",
        "danger",
        "Error occurred while adding syllabus item",
        notificationAlertRef
      );
    } else {
      try {
        await dispatch(createSyllabus([topicId,form])).unwrap();
        notify(
          "tr",
          "success",
          "Successfully added syllabus item",
          notificationAlertRef
        );
        handleCloseAddTopic();
      } catch (err) {

        notify("tr", "danger", err, notificationAlertRef);
      }
    }
  };

  const dispatch = useDispatch();
  const defaultColumn = React.useMemo(
    () => ({
    }),
    []
  );
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Action",
        Header: "ACTION",
        Cell: ({ row }) => (
          <div>
            {
              hideDeleteItem() &&
              (
                <Button variant="danger" size="sm" onClick={()=>{
                  dispatch(deleteSyllabus([row.original.id,topicId]));
                  notify(
                    "tr",
                    "success",
                    "Successfully delete syllabus item",
                    notificationAlertRef
                  );
                }}>
                <i className ="fa-solid fa-trash"></i>
                </Button>
              )
            }
          </div>
        ),
      },
    ]);
  };
  const props = useTable(
    {
      columns,
      data,
      defaultColumn,
      pageCount: controlledPageCount,
      autoResetPage: false
    },
    useGlobalFilter, 
    useSortBy,
    usePagination,
    useRowSelect,
    tableHooks
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


  const [showAddTopic, setShowAddTopic] = useState(false);


  const handleCloseAddTopic = () => {
    setShowAddTopic(false);
  };

  const handleShowAddTopic = () => setShowAddTopic(true);


  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);


  const hideAddItem = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user?.permissions?.includes("CL002")) {
        return true;
      }
    }
    return false;
  };
  const hideDeleteItem = () => {
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
      <Button variant="primary" onClick={() => history.go(-1)}><i className="fa fa-arrow-left" aria-hidden="true"></i></Button>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Modal  show={showAddTopic} onHide={handleCloseAddTopic} style={{transform: 'translateY(0%)', height: 800}} >       
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold fs-3 text-primary">Add new item</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <div className="row">
            <div className="col-6">
                <Form.Group className="unit">
                  <Form.Label>Unit</Form.Label>
                  <Form.Control type="number" placeholder="Enter unit" 
                                onChange={(e) => setField("unit", e.target.value)}
                                isInvalid={errors.unit}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.unit}
                    </Form.Control.Feedback>
                </Form.Group>
            </div>
            <div className="col-6">
                 <Form.Group className="day">
                  <Form.Label>Day</Form.Label>
                  <Form.Control type="number" placeholder="Input day" 
                                onChange={(e) => setField("day", e.target.value)}
                                isInvalid={errors.day}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.day}
                  </Form.Control.Feedback>
                </Form.Group>
            </div>
          </div>

                <Form.Group className="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" placeholder="Enter content" 
                                onChange={(e) => setField("content", e.target.value)}
                                isInvalid={errors.content}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.content}
                  </Form.Control.Feedback>
                </Form.Group>

               <Form.Group className="learningObjective">
                <Form.Label>Learning Objective</Form.Label>
                  <Form.Select
                    onChange={(e) => setField("objective", e.target.value)}
                    isInvalid={errors.objective}
                    placeholder='Add learning objective...'
                  >
                    <option>Add learning objective...</option>
                    <option>K6SD</option>
                    <option>H2SD</option>                   
                    <option>H3SD</option>
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                      {errors.objective}
                  </Form.Control.Feedback>
                </Form.Group>
         
          
                <Form.Group className="deliveryType">
                <Form.Label>Delivery Type</Form.Label>
                  <Form.Select
                    onChange={(e) => setField("deliveryType", e.target.value)}
                    isInvalid={errors.deliveryType}
                    placeholder='Add delivery Type...'
                  >
                    <option>Add delivery Type...</option>
                    <option>Assignment/Lab</option>
                    <option>Concept/Lecture</option>                   
                    <option>Exam</option>
                    <option>Guide/Review</option>
                    <option>Test/Quiz</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                      {errors.deliveryType}
                  </Form.Control.Feedback>
                </Form.Group>
      
                <Form.Group className="trainingMaterial">
                  <Form.Label>Training Material</Form.Label>
                  <Form.Control type="text" placeholder="Enter training material" 
                                onChange={(e) => setField("material", e.target.value)}
                                isInvalid={errors.material}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.material}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="duration">
                  <Form.Label>Duration (Min)</Form.Label>
                  <Form.Control type="number" placeholder="Enter duration" 
                                onChange={(e) => setField("duration", e.target.value)}
                                isInvalid={errors.duration}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.duration}
                  </Form.Control.Feedback>
                </Form.Group>

                      
                
            </Modal.Body>

             <Modal.Footer className="justify-content-end" >
              <Button variant="primary" className="btn-fill mx-1" type="submit" 
              onClick={handleAddItem}
              >
                Create
              </Button>
              <Button variant="secondary" className="btn-fill mx-1" onClick={handleCloseAddTopic}>
                Cancel
              </Button>
            </Modal.Footer>

        </Modal>
  
      <div className="d-flex align-items-center justify-content-end pb-3">
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
        {hideAddItem() && (<Button variant="primary" onClick={handleShowAddTopic} className='btn-fill'>+ ADD ITEM</Button>)}
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
        ) : (
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
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
      </Table>)}
      <div className="pagination d-flex align-items-center justify-content-center">
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
        <span className="mx-3 ml-5">
          Page {" "}
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
      <br />
    </>
  );
}

function SubjectTable() {
  const search = useLocation().search;
  const topicId = new URLSearchParams(search).get('id');
  const columns = React.useMemo(
    () => [
      {
        Header: "Schedule",
        columns: [
          {
            Header: "Unit",
            accessor: "unit",
          },
          {
            Header: "Content",
            accessor: "content",
            
          },
          {
            Header: "Day",
            accessor: "day",
          },
        ],
      },

      {
        Header: "Info",
        columns: [
          {
            Header: "Learning Objective",
            accessor: "objective",
          },
          {
            Header: "Delivery Type",
            accessor: "deliveryType",
          },
          {
            Header: "Duration (Min)",
            accessor: "duration",
          },
          {
            Header: "Training Material",
            accessor: "material",
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const listSyllabus = useSelector(listSyllabusSelector);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();
  const fetchIdRef = React.useRef(0);
  
  React.useEffect(() => {
    if(listSyllabus) setData(listSyllabus);
    
  }, [listSyllabus]);

 const fetchData = React.useCallback(({ id }) => {

     dispatch(getListSyllabus(topicId));
    
  }, []);

  return (
    <>
      {<WrapTable
        columns={columns}
        data={data?data:[]}
        fetchData={fetchData}
        topicId={topicId}
        isLoading={isLoading}
      />}
    </>
  );
}

export default SubjectTable;
