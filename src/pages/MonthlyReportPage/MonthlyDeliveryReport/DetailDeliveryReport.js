import { fetchDetailDelivery } from "components/MonthlyReportTables/detailDeliveryTableSlice";
import DetailDeliveryTable from "components/MonthlyReportTables/DetailDeliveryTable";

import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table, Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";

import "./DetailDelivery.scss";
import { useLocation } from "react-router";
import { searchDetailDelivery } from "components/MonthlyReportTables/detailDeliveryTableSlice";
import { deleteDetailDelivery } from "components/MonthlyReportTables/detailDeliveryTableSlice";
function DetailDelivery() {
  const [showBtnSave, setShowBtnSave] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const location = useLocation();
  const handleInputChange = (e) => {
    dispatch(searchDetailDelivery(e.target.value));
  };
  const dispatch = useDispatch();
  const handleDeleteDetailDelivery = async () => {
    try {
      if (deleteList.length <= 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No value is selected!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            deleteList.forEach((item) => {
              dispatch(deleteDetailDelivery(item.id));
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(fetchDetailDelivery(location?.state?.id));
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{location?.state?.name}</Card.Title>
                <div className="headerContent">
                  <div className="headerLeft">
                    <Button
                      onClick={handleDeleteDetailDelivery}
                      variant="danger" className="btn-fill"
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="headerRight">
                    <input type="text" onChange={handleInputChange} />
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-report-week  table-responsive px-0">
                <DetailDeliveryTable
                  setDeleteList={setDeleteList}
                  setShowBtnSave={setShowBtnSave}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="groupbBtn">
          {showBtnSave && (
            <Button onClick={handleSaveUpdateReport} className="primary">
              Save
            </Button>
          )}
          <Button className="success">
            <CSVLink
              style={{ color: "#fff", textDecoration: "none" }}
              data={[]}
              filename={"MonthlyReport"}
            >
              <i class="fas fa-download"></i>
              <span style={{ paddingLeft: 10 }}>Export</span>
            </CSVLink>
          </Button>
        </div>
      </Container>
    </>
  );
}

export default DetailDelivery;
