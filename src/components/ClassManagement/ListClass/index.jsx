import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import {
  listClassSelector,
  isLoadingSelector,
} from "redux/selectors/classSelector";
import { getListClass } from "redux/actions/classAction";
import WrapTable from "components/ClassManagement/ListClass/table";

function ListClass({ setOpen }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Class code",
        accessor: "classCode",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return (
            <Badge
              pill
              bg={
                row.values.status === "In Progress"
                  ? "success"
                  : row.values.status === "Delayed"
                  ? "warning"
                  : row.values.status === "Planned"
                  ? "primary"
                  : row.values.status === "Openned"
                  ? "info"
                  : "secondary"
              }
            >
              {row.values.status}
            </Badge>
          );
        },
      },
      {
        Header: "Format Type",
        accessor: "formatType",
      },
      {
        Header: "Trainee No",
        accessor: "size",
      },
      {
        Header: "Start date",
        accessor: "startDate",
      },
      {
        Header: "End date",
        accessor: "endDate",
      },
      {
        Header: "Admin",
        accessor: "adminName",
      },
    ],
    []
  );
  const listClass = useSelector(listClassSelector);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();
  const fetchIdRef = React.useRef(0);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchData = React.useCallback(({ pageIndex, pageSize }) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      dispatch(getListClass({ page: pageIndex + 1, limit: pageSize }));
    }
  }, []);
  const data = React.useMemo(() => {
    return listClass.listResult.map((item) => {
      return {
        ...item,
        startDate: new Date(item.startDate).toLocaleDateString(),
        endDate: new Date(item.endDate).toLocaleDateString(),
      };
    });
  }, [listClass.listResult]);
  useEffect(() => {
    setPageCount(listClass.totalPage);
  }, [listClass]);

  return (
    <>
      <WrapTable
        setOpen={setOpen}
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        isLoading={isLoading}
      />
    </>
  );
}

export default ListClass;
