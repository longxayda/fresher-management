import Button from "components/button/Button";
import ToasifyReport from "components/toasify";
import ReportHeader from "components/WeeklyReportHeader/ReportHeader";
import DetailReportTable from "components/WeeklyReportTables/DetailReportTable";
import {
	updateDetailReportList,
	fetchDetailReportList,
} from "components/WeeklyReportTables/detailReportTableSlice";
import {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {CSVLink} from "react-csv";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {getStatusDetailReport} from "redux/selectors";
import {getStatusContentDetailReport} from "redux/selectors";
import {getDetailReportList} from "redux/selectors";
import "./WeeklyReport.scss";
function DetailReport() {
	const [showBtnSave, setShowBtnSave] = useState(false);
	const detailReportList = useSelector(getDetailReportList);
	const location = useLocation();
	const dispatch = useDispatch();
	const status = useSelector(getStatusDetailReport);
	const statusContent = useSelector(getStatusContentDetailReport);
	const handleSaveUpdateReport = async () => {
		try {
			dispatch(updateDetailReportList(detailReportList));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (location?.state?.id)
			return dispatch(
				fetchDetailReportList({
					weeklyReportId: location?.state?.id,
					page: 0,
					num: 10,
				})
			);
	}, []);
	return (
		<>
			<Container className="weeklyReport" fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<Card.Title as="h4">{location?.state?.reportName}</Card.Title>
								<ReportHeader />
							</Card.Header>
							<Card.Body className="table-full-width table-report-week  table-responsive px-0">
								<DetailReportTable setShowBtnSave={setShowBtnSave} />
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<div className="groupbBtn">
					{showBtnSave ? (
						<Button onClick={handleSaveUpdateReport} className="primary">
							Save
						</Button>
					) : (
						<Button
							disabled
							style={{opacity: 0.5, cursor: "default"}}
							className="primary"
						>
							Save
						</Button>
					)}
					<Button className="success">
						<CSVLink
							style={{color: "#fff", textDecoration: "none"}}
							data={detailReportList}
							filename={"WeeklyReport"}
						>
							<i className="fas fa-download"></i>
							<span style={{paddingLeft: 10}}>Export</span>
						</CSVLink>
					</Button>
				</div>
				<ToasifyReport status={status} statusContent={statusContent} />
			</Container>
		</>
	);
}

export default DetailReport;
