import Button from "components/button/Button";
import ReportHeader from "components/WeeklyReportHeader/ReportHeader";
import AddNewReportTable from "components/WeeklyReportTables/AddNewReportTable";
import {addNewReport} from "components/WeeklyReportTables/addNewReportTableSlice";
import {createNewReport} from "components/WeeklyReportTables/addNewReportTableSlice";
import {
	classesName,
	deleteClassName,
} from "components/WeeklyReportTables/addNewReportTableSlice";
import {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router";
import {getClassNameInfoList, getClassNameList} from "redux/selectors";
import "./WeeklyReport.scss";

function AddNewReport() {
	const [data, setData] = useState([]);
	const [deleteList, setDeleteList] = useState([]);
	const dispatch = useDispatch();
	const classNameList = useSelector(getClassNameList);
	const classNameInfoList = useSelector(getClassNameInfoList);
	const location = useLocation();

	let history = useHistory();

	const handleCreateReport = async () => {
		try {
			if (location.state.new) {
				const {reportName, createdAt} = location.state;
				const newValue = {
					reportName,
					createdAt,
					weeklyReportItemRequestList: classNameInfoList,
				};
				console.log(newValue);
				dispatch(createNewReport(newValue));
			} else if (location.state.add) {
				dispatch(addNewReport(classNameInfoList));
			}
			history.push("/admin/report/weekly-report-list");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Container className="weeklyReport" fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<Card.Title as="h4">{location?.state?.reportName}</Card.Title>
								<ReportHeader created={true} />
							</Card.Header>
							<Card.Body className="table-full-width table-report-week  table-responsive px-0">
								<AddNewReportTable
									data={data}
									setData={setData}
									setDeleteList={setDeleteList}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<div className="btn-save">
					{classNameInfoList.length > 0 ? (
						<Button onClick={handleCreateReport} kind="success">
							Create
						</Button>
					) : (
						<Button
							onClick={handleCreateReport}
							style={{opacity: 0.5}}
							kind="success"
							disabled
						>
							Create
						</Button>
					)}
				</div>
			</Container>
		</>
	);
}

export default AddNewReport;
