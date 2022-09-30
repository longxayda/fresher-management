import HistoryReportListTable from "components/MonthlyReportTables/HistoryReportListTable";
import {searchHistoryReportList} from "components/MonthlyReportTables/historyReportListTableSlice";
import {fetchHistoryReportList} from "components/MonthlyReportTables/historyReportListTableSlice";
import {deleteHistoryReportList} from "components/MonthlyReportTables/historyReportListTableSlice";
import {MonthlyModalList} from "components/ReportModal/MonthlyModal";
import useDeleteReport from "hook/useDeteleReport";
import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row, Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import "./HistoryReportList.scss";

function HistoryReportList() {
	const [delItems, setDelItems] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchHistoryReportList({page: 0, num: 10}));
	}, []);

	const handleInputChange = (e) => {
		const value = e.target.value;
		dispatch(searchHistoryReportList(value));
	};

	const handleDeleteHistoryReport = async () => {
		try {
			if (delItems.length <= 0) {
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
						delItems.forEach((item) => {
							value.push(item.id);
						});
						dispatch(deleteHistoryReportList({listId: value}));
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container fluid className="historyReport">
			<Row>
				<Col md="12">
					<Card className="strpied-tabled-with-hover">
						<Card.Header>
							<Card.Title as="h4">History Report List</Card.Title>
							<div className="headerContent">
								<div className="headerLeft">
									<Button
										onClick={handleDeleteHistoryReport}
										variant="danger"
										className="btn-fill"
									>
										<span>
											<i className="far fa-trash-alt"></i>
										</span>
										<span>Delete</span>
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
										onChange={handleInputChange}
										type="text"
										placeholder="search here..."
									/>
								</div>
							</div>
						</Card.Header>
						<Card.Body className="table-full-width table-responsive px-0">
							<HistoryReportListTable setDelItems={setDelItems} />
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<MonthlyModalList showModal={showModal} setShowModal={setShowModal} />
		</Container>
	);
}

export default HistoryReportList;
