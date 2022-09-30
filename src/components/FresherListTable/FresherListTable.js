import { useTable } from "react-table";
import {
  Button,
  Table,
  Container,
  Row,
  Col,
  Stack,
  Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FresherListFilter from "components/FresherListTable/FresherListFilter";
import AddTraineeMD from "components/Modal/AddTraineeModal";
import DelTraineeMD from "components/Modal/DelTraineeModal";
import EditTraineeMD from "components/Modal/EditTraineeModal";
import {
  selectAllCheckbox,
  toggleCheckbox,
  resetAllCheckbox,
} from "redux/fresherManageSlice/checkboxFresherSlice";
import { Input } from "reactstrap";
import { useState, useRef, useEffect } from "react";
import { notify } from "components/Modal/notify";
import NotificationAlert from "react-notification-alert";
import { importFreshers } from "redux/fresherManageSlice/fresherManagementSlice";
import fresherService from "services/fresherManagement/fresherService";

function isPositiveInteger(str) {
  if (typeof str !== "string") {
    return false;
  }

  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
}

export default function FresherListTable({
  columns,
  tableData,
  pageSize,
  setPageSize,
  maxIndex,
  currentIndex,
  setCurrentIndex,
  setQueryParams,
  isLoading,
}) {
  const dispatch = useDispatch();
  const { checkedIDs } = useSelector((state) => state.checkboxFR);
  const notificationAlertRef = useRef(null);
  const [importing, setImporting] = useState(false);
  const data = tableData.slice(0, pageSize);

  if (currentIndex > maxIndex) {
    setCurrentIndex(maxIndex);
  }

  const handleToggleCheckbox = (e) => {
    dispatch(toggleCheckbox(parseInt(e.target.value)));
  };
  const handleResetToggleCheckbox = (e) => {
    dispatch(resetAllCheckbox());
  };

  useEffect(() => {
    handleResetToggleCheckbox();
  }, [tableData]);

  const handleSelectAll = (e) => {
    const idsArray = data.map((item) => item.userId);
    dispatch(selectAllCheckbox({ checked: e.target.checked, idsArray }));
  };

  const handleChangePageSize = (e) => {
    var newIndex =
      Math.floor(((currentIndex - 1) * pageSize) / Number(e.target.value)) + 1;
    // console.log(newIndex);
    setCurrentIndex(newIndex);
    setPageSize(Number(e.target.value));
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  function handleChangeIndexEvent(e) {
    if (isPositiveInteger(e.target.value)) {
      if (e.target.value < maxIndex) {
        setCurrentIndex(e.target.value);
      } else {
        setCurrentIndex(maxIndex);
      }
    } else {
      setCurrentIndex(1);
    }
  }
  function goToPage(index) {
    if (index == currentIndex) {
      return;
    }
    if (index > maxIndex) {
      if (maxIndex != currentIndex) {
        setCurrentIndex(maxIndex);
      }
    } else if (index <= 0) {
      if (1 != currentIndex) {
        setCurrentIndex(1);
      }
    } else {
      setCurrentIndex(index);
    }
  }
  function handleUploadBtnClick() {
    document.getElementById("myfile").click();
  }
  const handleUploadChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (e.target.value.length > 0) {
      if (e.target.value.endsWith(".xlsx")) {
        setImporting(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const adminID = user.id;
        const res = await fresherService.importFreshers(adminID, formData);
        if (res?.status === 200) {
          console.log(res);
          setImporting(false);
          notify("tr", "success", "Import successfully", notificationAlertRef);
        } else {
          console.log(res);
          setImporting(false);
          notify("tr", "danger", res.response.message, notificationAlertRef);
        }
      } else {
        notify(
          "tr",
          "danger",
          "Please upload a .xlsx file !!!",
          notificationAlertRef
        );
      }
    } else
      notify("tr", "danger", "Please choose a file !!!", notificationAlertRef);
  }

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <Container>
        <Row>
          <Col md="7" xl="5" xxl="6" className="d-flex align-items-center">
            <FresherListFilter setFilterParam={setQueryParams} />
          </Col>

          <Col md="5" xl="7" xxl="6">
            <Row className=" p-2 d-flex align-items-center">
              <Col md="4" className="mt-1 mb-1">
                <input
                  className="d-none"
                  type="file"
                  id="myfile"
                  name="myfile"
                  onChange={handleUploadChange}
                />
                <Button
                  variant="success"
                  className="btn-fill w-100"
                  onClick={() => handleUploadBtnClick()}
                  disabled={importing}
                >
                  <i className="fa-solid fa-file-import fs-5 fw-bold ms-2 me-2 "></i>
                  {importing ? "Importing..." : "Import"}
                  <Spinner
                    animation="border"
                    role="status"
                    size="sm"
                    hidden={!importing}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Button>
              </Col>

              <Col md="4" className="mt-1 mb-1">
                <AddTraineeMD />
              </Col>

              <Col md="4" className="mt-1 mb-1">
                <DelTraineeMD optionSmall={false}>
                  <i className="fas fa-trash fs-5 fw-bold ms-2 me-2 "></i>Delete
                </DelTraineeMD>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ height: "74vh", overflow: "auto" }} className="pt-2">
          <Container fluid>
            {isLoading ? (
              <Spinner
                variant="primary"
                animation="border"
                role="status"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "50px",
                  height: "50px",
                }}
              ></Spinner>
            ) : (
              <Table {...getTableProps()} striped hover className="text-nowrap">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      <th>
                        <input
                          className="form-check-input align-middle"
                          type="checkbox"
                          onChange={handleSelectAll}
                          aria-label="Checkbox all"
                          checked={
                            checkedIDs.length !== 0 &&
                            checkedIDs.length === data.length
                          }
                        ></input>
                      </th>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="sfr__header-middle"
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
                        </th>
                      ))}
                      <th
                        className="sfr__header-middle"
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
                        Action
                      </th>
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        <td className="text-center">
                          <input
                            className="form-check-input align-middle"
                            type="checkbox"
                            value={row.values.userId}
                            checked={checkedIDs.includes(row.values.userId)}
                            onChange={handleToggleCheckbox}
                            aria-label="Checkbox for following text input"
                          ></input>
                        </td>
                        <td className="text-center">{row.values.userId}</td>
                        <td className="text-center">{row.values.username}</td>
                        <td className="text-center">{row.values.fullName}</td>
                        <td className="text-center">{row.values.email}</td>
                        <td className="text-center">{row.values.phone}</td>

                        <td
                          className="text-center"
                          style={{ fontSize: "16px" }}
                        >
                          {(row.values.status == "In progress" && (
                            <span className="badge bg-success">
                              {row.values.status}
                            </span>
                          )) ||
                            (row.values.status == "Drop out" && (
                              <span className="badge bg-danger">
                                {row.values.status}
                              </span>
                            )) ||
                            (row.values.status == "Fail" && (
                              <span className="badge bg-warning">
                                {row.values.status}
                              </span>
                            )) ||
                            (row.values.status == "Done" && (
                              <span className="badge bg-primary">
                                {row.values.status}
                              </span>
                            ))}
                        </td>
                        <td className="text-center">{row.values.className}</td>
                        {/* <td className="text-center">{row.values.classId}</td> */}
                        <td className="text-center pt-2 pb-2" rol="cell">
                          <Container fluid>
                            <Stack
                              className="d-flex align-items-center justify-content-center"
                              direction="horizontal"
                              gap={2}
                            >
                              <EditTraineeMD id={row.values.userId} />
                              <DelTraineeMD id={row.values.userId}>
                                <i className="fas fa-trash"></i>
                              </DelTraineeMD>
                            </Stack>
                          </Container>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Container>
        </Row>
        <Row>
          <Col>
            <Container
              fluid
              // className="pagination d-flex align-items-center justify-content-between"
              className="pagination d-flex align-items-center justify-content-center"
            >
              <Button
                className="btn-fill m-1 btn-sm"
                onClick={() => goToPage(1)}
                disabled={currentIndex <= 1}
              >
                {"<<"}
              </Button>
              <Button
                className="btn-fill m-1 btn-sm"
                onClick={() => goToPage(currentIndex - 1)}
                disabled={currentIndex <= 1}
              >
                {"<"}
              </Button>
              <Button
                className="btn-fill m-1 btn-sm"
                onClick={() => goToPage(currentIndex + 1)}
                disabled={currentIndex >= maxIndex}
              >
                {">"}
              </Button>
              <Button
                className="btn-fill m-1 btn-sm me-3"
                onClick={() => goToPage(maxIndex)}
                disabled={currentIndex >= maxIndex}
              >
                {">>"}
              </Button>
              <span className="mr-3 ml-5" style={{ marginRight: "10px" }}>
                Page <strong>{currentIndex} </strong>
                of <strong>{maxIndex}</strong>{" "}
              </span>
              <span className="mr-3 ml-5" style={{ marginRight: "10px" }}>
                Go to page:{" "}
                <Input
                  type="number"
                  className="d-inline"
                  value={currentIndex}
                  style={{ width: "100px" }}
                  onChange={(e) => handleChangeIndexEvent(e)}
                />
              </span>{" "}
              <Input
                className="d-inline"
                type="select"
                style={{ width: "90px" }}
                value={pageSize}
                onChange={(e) => {
                  handleChangePageSize(e);
                }}
              >
                {[10, 20, 30, 40, 50].map((_pageSize) => (
                  <option key={_pageSize} value={_pageSize}>
                    Show {_pageSize}
                  </option>
                ))}
              </Input>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
