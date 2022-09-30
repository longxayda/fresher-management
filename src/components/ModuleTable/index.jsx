import React from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useRowSelect,
} from "react-table";
import styles from "./course.module.css";
import { Input} from "reactstrap";
import { Button, Table, Form ,Spinner } from "react-bootstrap";

function NoneColumnFilter() {
  return (
    <Form.Group className="mb-0">
    </Form.Group>
  );
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

function ModuleTable({ columns, data, setdatagroup,isLoading }) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: NoneColumnFilter(),
    }),
    []
  );
  const props = useTable(
    {
      columns: columns ? columns : [],
      data: data ? data : [],
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
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

  React.useEffect(() => {
    setPageSize(5);
  }, [])

  
  let toggleRow = '';
  let rowColor = true;

  let indexDrag = -1;
  let itemDrag = "";
  const dragStart = e => {
      const target = e.target;
      itemDrag = target.dataset.item;
      const id = target.lastChild.id.split(",")[0];
      const duration = target.lastChild.id.split(",")[1];
      e.dataTransfer.setData('name', target.dataset.item);
      e.dataTransfer.setData('id', id);
      e.dataTransfer.setData('duration', duration);
  }
  const drop = e => {
      e.preventDefault();
      const card_id = e.dataTransfer.getData('card_id');
      const card_name = e.dataTransfer.getData('card_name');
      const card_duration = e.dataTransfer.getData('card_duration');
      if(card_name){
        const currentmodule = data.map(item => item.moduleName);
        if(currentmodule.includes(card_name) !== true){
          if(indexDrag!=-1){
            setdatagroup((prev) => {
              let newdata = prev.filter(item => item.moduleName != card_name)
              newdata.splice(indexDrag, 0, {
                  id: card_id,
                  moduleName: card_name,
                  duration: card_duration,
              });
              return newdata.map((item, idx) => ({
                id: item.id,
                moduleName: item.moduleName,
                duration: item.duration,
                no: idx
              }));
            })
          }else{
            setdatagroup((data) => {
                return [...data, {
                      id: card_id,
                      moduleName: card_name,
                      duration: card_duration,
                      no: data.length
                    }
                ]}
            )
          }
        }
      }else{
        setdatagroup((prev) => {
          const id = e.dataTransfer.getData('id');
          const name = e.dataTransfer.getData('name');
          const duration = e.dataTransfer.getData('duration');
          let newdata = prev.filter(item => item.moduleName != name)
          newdata.splice(indexDrag, 0, {
              id: id,
              moduleName: name,
              duration: duration,
          });
          return newdata.map((item, idx) => ({
            id: item.id,
            moduleName: item.moduleName,
            duration: item.duration,
            no: idx
          }));
        })
      }
  }
  const dragover = e => {
      e.preventDefault();
  }
  const dragcardover = e => {
      const target = e.target;
      if(indexDrag == target.dataset.index){
        return;
      }
      indexDrag = target.dataset.index;
  }
  const dragend = e =>{
    itemDrag = "";
    indexDrag =-1;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-end pb-3">
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
        ) :(
      <Table hover {...getTableProps()} 
        onDrop={drop} onDragOver={dragover} 
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>        
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="module-header">
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
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            let subject = '';
            if (row.values.moduleName) {
              subject = row.values.moduleName;
            }
            if (subject !== toggleRow) {
              rowColor = !rowColor;
            }
            toggleRow = subject;
  
            return (
              <tr key={i} id="module-data" className={rowColor ? styles['tr-light'] : styles['tr-dark']} data-item={row.values.moduleName} {...row.getRowProps()} onDragStart={dragStart} onDragOver={dragcardover} onDragEnd={dragend} draggable> 
                {row.cells.map((cell) => {
                    return (
                      <td data-index={i} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                })}
                <td id={[row.original.id, row.original.duration]} hidden />
              </tr>
            );
          })}
        </tbody>
      </Table>)}
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
          Page
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
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Input>
        </div>
      </div>
      <br/>
    </>
  );
}
export function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default ModuleTable;
