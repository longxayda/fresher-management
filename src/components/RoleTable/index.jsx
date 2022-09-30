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
import { Button, Form, Badge, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Select from "react-select";
import {
  roleListSelector,
  authSelector,
  isLoadingSelector,
} from "redux/selectors/roleSelector.js";

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

// const IndeterminateCheckbox = React.forwardRef(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef();
//     const resolvedRef = ref || defaultRef;

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate;
//     }, [resolvedRef, indeterminate]);

//     return (
//       <>
//         <input
//           type="checkbox"
//           ref={resolvedRef}
//           {...rest}
//           style={{ transform: "scale(1.3)" }}
//         />
//       </>
//     );
//   }
// );

function WrapTable({
  columns,
  data,
  searchValue,
  filter,
  isAdminManager,
  isLoading,
  handleShowAddRole,
  handleShowPermission,
  handleChangeFilter,
  handleChangeSearchValue,
  // selectedRoles,
  // setselectedRoles,
  // handleShowActiveSelectedRoles,
  // handleShowInactiveSelectedRoles,
}) {
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
      initialState: {
        sortBy: [
          {
            id: "id",
            desc: false,
          },
        ],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect

    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllPageRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
    //         </div>
    //       ),
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );
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
    state: { pageIndex, pageSize, globalFilter },
  } = props;

  const filerOptions = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const filterStyles = {
    menu: (provided, state) => ({
      ...provided,
      top: "80%",
    }),
    control: (provided, state) => ({
      ...provided,
      width: 240,
      height: 40,
      marginLeft: 5,
    }),
  };

  // useEffect(() => {
  //   setselectedRoles(selectedFlatRows.map((row) => row.original.id));
  // }, [setselectedRoles, selectedFlatRows]);

  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [data]);

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        role="status"
        className="position-absolute"
        style={{ height: "60px", width: "60px", marginTop: 500 }}
      ></Spinner>
    );
  } else
    return (
      <>
        <div className="d-flex align-items-center justify-content-between pb-3">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <Input
                type="search"
                value={globalFilter || searchValue}
                onChange={(e) => {
                  setGlobalFilter(e.target.value);
                  handleChangeSearchValue(e.target.value);
                }}
                placeholder="Search..."
              />
            </div>
            <Select
              styles={filterStyles}
              options={filerOptions}
              value={filter}
              onChange={handleChangeFilter}
              placeholder="Filter by status..."
            />
          </div>
          <div>
            <Button
              variant="primary"
              onClick={handleShowAddRole}
              disabled={!isAdminManager}
              style={{ minWidth: "180px" }}
              className="btn-fill"
            >
              + Add New Role
            </Button>{" "}
            <Button
              variant="secondary"
              onClick={handleShowPermission}
              disabled={!isAdminManager}
              style={{ minWidth: "180px" }}
              className="btn-fill"
            >
              Show All Pemissions
            </Button>{" "}
            {/* <Button
            variant="danger"
            className="btn-fill"
            style={{ minWidth: "150px" }}
            onClick={handleShowInactiveSelectedRoles}
            disabled={!selectedRoles.length}
          >
            Inactive Selected ({selectedRoles.length})
          </Button>{" "}
          <Button
            variant="success"
            className="btn-fill"
            style={{ minWidth: "150px" }}
            onClick={handleShowActiveSelectedRoles}
            disabled={!selectedRoles.length}
          >
            Active Selected ({selectedRoles.length})
          </Button> */}
          </div>
        </div>
        <style>{`
      td,tr,th{
        text-align: center;
        border: none
      }
      `}</style>
        <div style={{ height: 480, overflowY: "scroll", marginBottom: 10 }}>
          <Table bordered striped hover {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      <div
                        className="heading"
                        style={{
                          fontSize: "14px",
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "bold",
                          borderTop: "none!important",
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
        </div>
        <div className="pagination d-flex align-items-center justify-content-center">
          <div
            className="d-flex justify-content-between"
            style={{ alignItems: "center", width: 670 }}
          >
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

            <span className="mx-3">
              <span>Page </span>
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>

            <div className="d-flex align-items-center">
              <span className="mx-3"> Go to page:</span>
              <Input
                type="number"
                className="mx-3"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  e.target.value = e.target.value < 1 ? 1 : e.target.value;
                  e.target.value =
                    e.target.value > pageOptions.length
                      ? pageOptions.length
                      : e.target.value;
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </div>

            <div className="">
              <Input
                type="select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                style={{ width: "90px" }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Input>
            </div>
          </div>
        </div>
      </>
    );
}

function RoleTable({
  changeTableFlag,
  handleShowDetailRole,
  handleShowEditRole,
  handleShowAddRole,
  handleShowPermission,
  // selectedRoles,
  // setselectedRoles,
  // handleShowActiveSelectedRoles,
  // handleShowInactiveSelectedRoles,
}) {
  const roleList = useSelector(roleListSelector);
  const user = useSelector(authSelector);
  const isLoading = useSelector(isLoadingSelector);

  let userRoles;
  if (typeof user === "string") {
    userRoles = JSON.parse(user).roles;
  } else {
    userRoles = user.roles;
  }

  const isAdminManager = userRoles.includes("Admin Manager");

  const [searchValue, setSearchValue] = useState("");

  const [filter, setFilter] = useState({ value: "All", label: "All" });

  const handleChangeSearchValue = (value) => {
    setSearchValue(value);
  };

  const handleChangeFilter = (e) => {
    setFilter(e);
  };

  const handleStatus = (status) => {
    if (status) return <Badge bg="success">Active</Badge>;
    else return <Badge bg="danger">Inactive</Badge>;
  };
  const showButton = (role) => {
    return (
      <div>
        <Button
          variant="secondary"
          disabled={!isAdminManager}
          onClick={() => handleShowDetailRole(role)}
          size="sm"
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
        <Button
          className="mx-2"
          disabled={!isAdminManager}
          onClick={(e) => handleShowEditRole(role)}
          size="sm"
        >
          <FontAwesomeIcon icon={faPenSquare} />
        </Button>
      </div>
    );
  };

  const isMatchFilter = (value) => {
    return (
      filter.value === "All" || value.status === (filter.value === "Active")
    );
  };

  const handleData = (roleList) => {
    return roleList.filter(isMatchFilter).map((role) => ({
      id: role.id,
      roleName: role.roleName,
      status: handleStatus(role.status),
      action: showButton(role),
    }));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
        Filter: () => null,
        disableGlobalFilter: true,
      },
      {
        Header: "role name",
        accessor: "roleName",
        Filter: () => null,
      },
      {
        Header: "status",
        accessor: "status",
        Filter: () => null,
        disableGlobalFilter: true,
      },
      {
        Header: "action",
        accessor: "action",
        Filter: () => null,
        disableGlobalFilter: true,
      },
    ],
    []
  );

  const [data, setData] = React.useState(handleData(roleList));

  const handleReset = () => {
    setData(handleData(roleList, filter.value));
  };

  React.useEffect(() => {
    handleReset();
  }, [changeTableFlag, roleList, filter]);

  return (
    <>
      <WrapTable
        columns={columns}
        data={data}
        searchValue={searchValue}
        filter={filter}
        isAdminManager={isAdminManager}
        isLoading={isLoading}
        handleShowAddRole={handleShowAddRole}
        handleShowPermission={handleShowPermission}
        handleChangeFilter={handleChangeFilter}
        handleChangeSearchValue={handleChangeSearchValue}
        // selectedRoles={selectedRoles}
        // setselectedRoles={setselectedRoles}
        // handleShowActiveSelectedRoles={handleShowActiveSelectedRoles}
        // handleShowInactiveSelectedRoles={handleShowInactiveSelectedRoles}
      />
    </>
  );
}

export default RoleTable;
