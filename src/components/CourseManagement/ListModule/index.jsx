import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listModuleSelector,
  isLoadingSelector,
} from "redux/selectors/moduleSelector";
import { getListModule } from "redux/actions/moduleAction";
import WrapTable from "components/CourseManagement/ListModule/table";


function ListModule({ setOpen }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Module",
        accessor: "moduleName",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
    ],
    []
  );
  
  // const [data, setData] = React.useState([]);
  const listModule = useSelector(listModuleSelector);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();
  const fetchIdRef = React.useRef(0);
  const [pageCount, setPageCount] = React.useState(0);

  const fetchData = React.useCallback(({ pageIndex, pageSize }) => {
    const fetchId = ++fetchIdRef.current;
    
    if (fetchId === fetchIdRef.current) {
      dispatch(getListModule({ page: pageIndex +1 , limit: pageSize })); 
    }
  }, []);

  const data = React.useMemo(() => {
    return listModule.data.map((item) => {
      return {
        moduleName: item.moduleName,
        duration: item.duration,
        id:item.id
      };
    });
  }, [listModule?.data]);

  useEffect(() => {
    setPageCount(listModule.page);
  },[listModule]);

  return (
    <>
      <WrapTable
        setOpen={setOpen}
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        isLoading ={isLoading}
      />
    </>
  );
}

export default ListModule;
