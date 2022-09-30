import React, { useState, useEffect, useMemo, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import FresherListTable from "components/FresherListTable/FresherListTable";
import { fetchFresher } from "redux/fresherManageSlice/fresherManagementSlice";
import { useSelector, useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { APISubribed } from "redux/fresherManageSlice/fresherManagementSlice";
import { APIUnsubribed } from "redux/fresherManageSlice/fresherManagementSlice";

function FresherList() {
  const [pageSize, setPageSize] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const data = useSelector((state) => state.manageFR.value);
  const maxIndex = useSelector((state) => state.manageFR.maxIndex);
  const dispatch = useDispatch();
  const notificationAlertRef = useRef(null);
  const error = useSelector((state) => state.manageFR.fetchError);
  const isLoading = useSelector((state) => state.manageFR.isLoading);

  const changeIndex = (e) => {
    if (e < 1) {
      setCurrentIndex(1);
    } else {
      setCurrentIndex(e);
    }
  };
  const handleFilterParams = (input) => {
    setCurrentIndex(1);
    setQueryParams(input);
  };

  useEffect(() => {
    dispatch(APISubribed());
    dispatch(
      fetchFresher({
        pageNum: currentIndex,
        pageSize: pageSize,
        params: queryParams,
      })
    );
    return () => {
      dispatch(APIUnsubribed());
    };
  }, [dispatch, pageSize, queryParams, currentIndex]);

  useEffect(() => {
    if (error.error) {
      notify("tr", "danger", error.message, notificationAlertRef);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "userId",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Class",
        accessor: "className",
      },
    ],
    []
  );

  const notify = (place, type, message, notificationAlertRef) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
      <Container fluid className="ps-3 pe-3">
        <Row>
          <div className="rna-container">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
        </Row>
        <Row>
          <FresherListTable
            columns={columns}
            tableData={data}
            setQueryParams={handleFilterParams}
            pageSize={pageSize}
            setPageSize={setPageSize}
            maxIndex={maxIndex}
            currentIndex={currentIndex}
            setCurrentIndex={changeIndex}
            isLoading={isLoading}
          />
        </Row>
      </Container>
    </>
  );
}

export default FresherList;
