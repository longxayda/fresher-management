// import Button from "components/button/Button";
import OutputsReportTable from "components/OutputsReportTables/OutputsReportTable";
import {deleteOutputsReport} from "components/OutputsReportTables/outputsReportTableSlice";
import {searchOutputsReport} from "components/OutputsReportTables/outputsReportTableSlice";
import {fetchOutputsReport} from "components/OutputsReportTables/outputsReportTableSlice";
import OutputsModal from "components/ReportModal/OutputsModal";
import ToasifyReport from "components/toasify";
import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getStatusOutputs} from "redux/selectors";
import {getStatusContentOutputs} from "redux/selectors";
import Swal from "sweetalert2";
import "./OutputsReport.scss";

function OutputsReport() {
	const [deleteList, setDeleteList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const status = useSelector(getStatusOutputs);
	const statusContent = useSelector(getStatusContentOutputs);
	useEffect(() => {
		dispatch(fetchOutputsReport({page: 0, num: 10}));
	}, []);

	const handleInputChange = (e) => {
		const value = e.target.value;
		dispatch(searchOutputsReport(value));
	};

	const handleDeleteOutputsReport = async () => {
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
						let value = [];
						deleteList.forEach((item) => {
							value.push(item.id);
						});
						dispatch(deleteOutputsReport(value));
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className="outputReport" fluid>
			<Row>
				<Col md="12">
					<Card className="strpied-tabled-with-hover">
						<Card.Header>
							<Card.Title as="h4">Outputs Report </Card.Title>
							<div className="headerContent">
								<div className="headerLeft">
									<Button
										onClick={handleDeleteOutputsReport}
										variant="danger"
										className="btn-fill"
									>
										<span>
											<i className="far fa-trash-alt"></i>
										</span>
										<span>Delete {deleteList?.length}</span>
									</Button>
									<Button
										variant="primary"
										className="btn-fill"
										onClick={() => setShowModal(true)}
									>
										<span>
											<i className="fas fa-plus"></i>
										</span>
										<span>Create New Report</span>
									</Button>
								</div>
								<div className="headerRight">
									<input
										className="searchOutput"
										onChange={handleInputChange}
										type="text"
										placeholder="search here..."
									/>
								</div>
							</div>
						</Card.Header>
						<Card.Body className="table-full-width table-responsive px-0">
							<OutputsReportTable setDeleteList={setDeleteList} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<ToasifyReport status={status} statusContent={statusContent} />
			<OutputsModal showModal={showModal} setShowModal={setShowModal} />
		</Container>
	);
}

export default OutputsReport;
