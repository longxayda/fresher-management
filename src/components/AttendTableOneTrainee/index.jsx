import React, { useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
} from "react-table";
import {Badge} from "reactstrap";
import { Table, Input, Label} from "reactstrap";
import { Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import makeData from "components/AttendTableOneTrainee/makeData";
import "assets/css/attendance-table.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <Form.Group className="mb-0">

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
    <select
      value={filterValue}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      style={{
        textAlign: "center",
        fontWeight: "800",
        width: "3.5rem",
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}



function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)


export function WrapTable({ columns, data, handleReset }) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  let props = null
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
    usePagination
   );
  } catch {
    return null;
  }
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

  React.useEffect(() => {

    console.log('Global Filter:', globalFilter);
  }, [globalFilter]);

  return (

    <>
    <div className="wrap-table-content">
      <div className="d-flex align-items-center justify-content-between pb-3">
        <div className="me-3">
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <div className="me-3">
            <Label className="mb-0">Search: </Label>
          </div>
          <div className="me-3">
            <Input
              type="search"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          </div>
        </div>

      <style>{`
      td,tr,th{
        text-align: center;
      }
      `}</style>
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
                      fontSize: "16px",
                      fontWeight: "600",
                      justifyContent: "center",
                      textAlign: "center", 
                      width: "100%",
                      
                    }}
                  >
                    {column.render("Header")}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
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
              <tr {...row.getRowProps()} 
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
      </Table>
      </pre>
      <div className="pagination d-flex align-items-center justify-content-center">
        <Button
          className="btn-fill btn-sm me-3"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>
        <Button
          className="btn-fill btn-sm me-3"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        <Button
          className="btn-fill btn-sm me-3"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>
        <Button
          className="btn-fill btn-sm me-5"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>
        <span className="me-3 ml-5">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span className="me-3"> Go to page: </span>
        <Input
          type="number"
          className="me-3"
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
      </div>
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

function AttendTableOneTrainee() {
  
  const [data, setData] = React.useState(makeData());

  function emplIDCell({value}){
    return <a href="#" style={{color: "blue", textDecoration: "none"}}>{value}</a>
  }

  function statusSelectCell({value}){
    const options = ['P', 'A', 'L', 'E', 'Ln', 'En', 'An']
    const [option, setOption] = useState(value || '--')
    let className = ""
    switch(value){
      case 'P': 
        className = "bg-primary"
        break
      
      case 'A':
        className = "bg-success"
        break
      
      case 'L':
        className = "bg-warning"
        break

      case 'E':
        className = "bg-warning"  
        break
      
      case 'Ln':
        className = "bg-secondary"
        break
  
      case 'En':
        className = "bg-secondary" 
        break
      
      case 'An':
        className = "bg-danger"
        break

      default:
        className = "bg-success"
    }

    if(option != "--"){
      return(
        <>
          <Badge className={className} style={{width:'100%', fontSize: "15px"}}>
            <div
              style={{
                width: "3rem",
              }}
            >
  
              <select
                value={option}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setOption(e.target.value || undefined);
                }}
                style={{
                  border: "none",
                  background: "none",
                  color: "white",
                  fontWeight: "700"
                }}
              >
                <option disabled style={{color: "grey"}}>{option}</option>
                {options.map((option, i) => (
                  <option key={i} value={option} style={{color: "black", fontWeight: "500"}}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </Badge>
        </>
      )
    }
    else return(
      <>
        <div
          style={{
            width: "3rem",
          }}
        >

            <Input
              type="select"
              value={option}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setOption(e.target.value || undefined);
              }}
            >
              <option disabled>{option}</option>
            </Input>
        </div>
      </>
    )
    
  }

  function caculateSummary({data}){
    let result = []

    data.map((d)=>{
      let resultItem = {
        'P': 0,
        'A': 0,
        'E': 0,
        'L': 0,
        'An': 0,
        'En': 0,
        'Ln': 0
      }
      d.monthlyAttendanceResponses.map((item) => {
        
        const type = item.status;
        resultItem[type]++;
      })
      result = [
        ...result,

        resultItem
      ]

    })
    return result;
  }

  function statusSummaryCell({row}){
    let dataToDisplay = caculateSummary({data})
    return (
      <>
        <p>
        <Badge className = "bg-primary mx-1" style={{fontSize:"15px"}}>
          P: {dataToDisplay[row.index].P} 
        </Badge>
        <Badge className = "bg-success mx-1" style={{fontSize:"15px"}}>
          A: {dataToDisplay[row.index].A}
        </Badge>
        <Badge className = "bg-warning mx-1" style={{fontSize:"15px"}}>
          L: {dataToDisplay[row.index].L}
        </Badge>
        <Badge className = "bg-warning mx-1" style={{fontSize:"15px"}}>
          E: {dataToDisplay[row.index].E}
        </Badge>
        <Badge className = "bg-danger mx-1" style={{fontSize:"15px"}}>
          An: {dataToDisplay[row.index].An}
        </Badge>
        <Badge className = "bg-secondary" style={{fontSize:"15px"}}>
          Ln: {dataToDisplay[row.index].Ln}
        </Badge>
        <Badge className = "bg-secondary mx-1" style={{fontSize:"15px"}}>
          En: {dataToDisplay[row.index].En}
        </Badge>
        </p>
      </>
    )
  }

  function setColumns({data}){
    return (
      data[0].monthlyAttendanceResponses.map((d, index) => (
        {
          Header: String(d.date.slice(-2)),
          id: String(index),
          accessor: String("monthlyAttendanceResponses" + "[" + index + "]" + ".status"),
          Filter: SelectColumnFilter,
          filter: 'equals',
          
          Cell: statusSelectCell,
        }
      )
      )
    )
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        columns: [
          {
            Header: "",
            accessor: "trainee_id",
            Cell: emplIDCell,
          },
        ],
      },
      {
        Header: "Full Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Summary",
        columns: [
          {
            Header: "",
            accessor: 'Some summary here',
            Cell: statusSummaryCell,  
          },
        ],
      },
      {
        Header: "Attend Status",
        id: 223,
        columns: [
          ...setColumns({data}) 
          

        ],
      },
    ],
    []
  );

  const handleReset = () => {
    setData(makeData());
  };

  return (
    <>
      <div className="attendance-details">
        <WrapTable columns={columns} data={data} handleReset={handleReset} />
      </div>
    </>
  );
}

export default AttendTableOneTrainee;
