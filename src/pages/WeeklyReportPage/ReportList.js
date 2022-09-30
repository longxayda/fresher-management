import {ReportListModal} from "components/ReportModal/ReportModal";
import ToasifyReport from "components/toasify";
import ReportHeader from "components/WeeklyReportHeader/ReportHeader";
import ReportListTable from "components/WeeklyReportTables/ReportListTable";
import {fetchReportList} from "components/WeeklyReportTables/reportListTableSlice";
import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getStatusContentReportList} from "redux/selectors";
import {getStatusReportList} from "redux/selectors";
import "./WeeklyReport.scss";

function ReportList() {
	const dispatch = useDispatch();
	const status = useSelector(getStatusReportList);
	const statusContent = useSelector(getStatusContentReportList);
	useEffect(() => {
		dispatch(fetchReportList({page: 0, num: 10}));
	}, []);
	return (
		<>
			<Container className="weeklyReport" fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<Card.Title as="h4">Weekly Report List</Card.Title>
								<ReportHeader />
							</Card.Header>
							<Card.Body className="table-full-width table-responsive px-0">
								<ReportListTable />
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<ReportListModal />
				<ToasifyReport status={status} statusContent={statusContent} />
			</Container>
		</>
	);
}

export default ReportList;
