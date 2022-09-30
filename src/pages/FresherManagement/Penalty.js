import React, { useEffect, useState, useMemo, useRef } from "react";

import { Container } from "react-bootstrap";
import TablePenalty from "components/ManagementPenalty/TablePenalty";
import { fetchFresher } from "redux/fresherManageSlice/fresherManagementSlice";
import { useSelector, useDispatch } from "react-redux";
import { dataSelector, maxIndexSelector } from "redux/selectors/penaltySelector"
import NotificationAlert from "react-notification-alert";

function Penalty() {
  const [pageSize, setPageSize] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const maxIndex = useSelector(maxIndexSelector);
  const data = useSelector(dataSelector);
  const dispatch = useDispatch();
  const notificationAlertRef = useRef(null);
  const error = useSelector((state) => state.manageFR.fetchError);

  useEffect(() => {
    dispatch(
      fetchFresher({
        pageNum: currentIndex,
        pageSize: pageSize,
        params: queryParams,
      })
    );
  }, [dispatch, pageSize, queryParams, currentIndex]);

  useEffect(() => {
    if (error.error) {
      notify("tr", "danger", error.message, notificationAlertRef);
    }
  }, [data]);

  const handleFilterParams = (input) => {
    setCurrentIndex(1);
    setQueryParams(input);
  };

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

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "userId",
      },
      {
        Header: "username",
        accessor: "username",
      },
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Class",
        accessor: "className",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  return (
    <Container fluid>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <TablePenalty
        columns={columns}
        data={data}
        queryParams={queryParams}
        setQueryParams={handleFilterParams}
        pageSize={pageSize}
        setPageSize={setPageSize}
        maxIndex={maxIndex}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </Container>
  );
}

export default Penalty;
