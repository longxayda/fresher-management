import React from "react";
import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {CSVLink} from "react-csv";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import "react-tabs/style/react-tabs.css";
import "./DetailOutputsReport.scss";
import DetailFresherReport from "./fresher/DetailFresherReport";
import {getDetailFresherReport} from "redux/selectors";
import DetailSVTTReport from "./svtt/DetailSVTTReport";
import {getDetailSVTTReport} from "redux/selectors";
import {updateDetailOutputsReport} from "./detailOutputsReportSlice";
import {getStatusContentDetailOutputs} from "redux/selectors";
import {getStatusDetailOutputs} from "redux/selectors";
import ToasifyReport from "components/toasify";

let saved = false;
let noMove = "/admin/report/detail-Outputs-report";
let move = "/admin/report/Outputs-report-list";

export default function DetailOutputsReport() {
	const [showReturn, setShowReturn] = useState(false);
	const [showExport, setShowExport] = useState(false);
	const [key, setKey] = useState("fresher");
	const location = useLocation();
	const dispatch = useDispatch();
	const detailFresherReport = useSelector(getDetailFresherReport);
	const detailSVTTReport = useSelector(getDetailSVTTReport);
	const status = useSelector(getStatusDetailOutputs);
	const statusContent = useSelector(getStatusContentDetailOutputs);
	const handleSaveReport = () => {
		const fresher = [];
		const svtt = [];
		detailFresherReport.forEach((item) => {
			const {id, note} = item;
			fresher.push({id, note});
		});
		detailSVTTReport.forEach((item) => {
			const {id, note} = item;
			svtt.push({id, note});
		});
		const detailValue = [...fresher, ...svtt];
		dispatch(updateDetailOutputsReport(detailValue));
	};
	return (
		<>
			<div
				className="text-secondary"
				style={{fontSize: "25px", textAlign: "center"}}
			>
				{location?.state?.reportName}
			</div>
			<Tabs
				className="mb-3"
				id="controlled-tab-example"
				activeKey={key}
				onSelect={(k) => setKey(k)}
			>
				<Tab eventKey="fresher" title="Fresher">
					<DetailFresherReport />
				</Tab>
				<Tab eventKey="svtt" title="SVTT">
					<DetailSVTTReport />
				</Tab>
			</Tabs>
			<div className="m-3 d-flex justify-content-center">
				<Button
					onClick={() => {
						setShowReturn(saved ? false : true);
					}}
					type="button"
					className="btn-fill returnBtn"
				>
					<Link
						style={{textDecoration: "none", color: "#fff"}}
						to={`${saved ? move : noMove}`}
					>
						RETURN
					</Link>
				</Button>
				<Button
					onClick={() => handleSaveReport()}
					type="button"
					className="btn-fill saveBtn"
				>
					SAVE
				</Button>
				<Button
					onClick={() => setShowExport(true)}
					type="button"
					className="btn-fill exportBtn"
				>
					<CSVLink
						style={{color: "#fff", textDecoration: "none"}}
						data={[]}
						filename={"Report"}
					>
						<span>EXPORT </span>
						<i className="fas fa-download"></i>
					</CSVLink>
				</Button>
				<ToasifyReport status={status} statusContent={statusContent} />
			</div>
		</>
	);
}
