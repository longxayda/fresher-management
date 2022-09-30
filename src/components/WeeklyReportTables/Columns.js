import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {formatDate} from "utils";

export const AddNewReportColumns = [
	{
		Header: "No",
		accessor: "no",
		Cell: ({row}) => {
			return <span>{row.index + 1}</span>;
		},
	},
	{
		Header: "Task Name",
		accessor: "taskName",
	},
	{
		Header: "Skill",
		accessor: "skill",
	},
	{
		Header: "Pic",
		columns: [
			{
				Header: "Trainer",
				accessor: "trainer",
			},
			{
				Header: "Admin",
				accessor: "admin",
			},
		],
	},
	{
		Header: "Status",
		accessor: "status",
		Cell: () => {
			return <span className="status">Progress</span>;
		},
	},
	{
		Header: "Fsu",
		accessor: "fsu",
	},
	{
		Header: "Plan",
		columns: [
			{
				Header: "START DATE",
				accessor: "startDate",
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
			{
				Header: "END DATE",
				accessor: "endDate",
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
		],
	},
	{
		Header: "Ob",
		accessor: "ob",
	},
	{
		Header: "ACTUAL",
		columns: [
			{
				Header: "FAIL",
				accessor: "fail",
			},
			{
				Header: "DROP OUT",
				accessor: "dropOut",
			},
			{
				Header: "CONTRACT TRANSFER DATE",
				accessor: "changeContact",
			},
			{
				Header: "STUDYING",
				accessor: "studying",
			},
		],
	},
	{
		Header: "UPDATE",
		columns: [
			{
				Header: "Pic",
				accessor: "updateBy",
			},
			{
				Header: "DATE UPDATE",
				accessor: "updateAt",
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
		],
	},
	{
		Header: "Note",
		accessor: "note",
	},
];

export const ReportListColumns = [
	{
		Header: "Created At",
		accessor: "createdAt",
		Cell: ({value}) => {
			return formatDate(new Date(value), "dd/MM/yyyy");
		},
	},
	{
		Header: "Report Name",
		accessor: "reportName",

		disableFilters: true,
	},
	{
		Header: "Action",
		accessor: "action",

		disableFilters: true,
		disableSortBy: true,
		Cell: ({
			row,
			setEditableRowIndex,
			editableRowIndex,
			handleUpdateItem,
			handleAddNewReportItem,
		}) => (
			<div className="actions">
				<Button
					size="sm"
					variant="outline-secondary"
					className="btn-fill"
					style={{
						borderColor: "gray",
						cusor: "pointer",
						background: "white",
					}}
				>
					<Link
						to={{
							pathname: "/admin/report/detail-weekly-report",
							state: {...row.original, detail: true},
						}}
					>
						<i style={{fontSize: 14, color: "gray"}} className="far fa-eye"></i>
					</Link>
				</Button>
				<Button
					size="sm"
					variant="outline-primary"
					className="btn-fill"
					style={{
						borderColor: "blue",
						cusor: "pointer",
						background: "white",
					}}
					onClick={() => {
						const currentIndex = row.index;
						if (editableRowIndex !== currentIndex) {
							// row requested for edit access
							setEditableRowIndex(currentIndex);
						} else {
							// request for saving the updated row
							setEditableRowIndex(null);

							const updatedRow = row.original;
							handleUpdateItem(updatedRow);
							// call your updateRow API
						}
					}}
				>
					{editableRowIndex !== row.index ? (
						<i
							style={{fontSize: 14, color: "blue"}}
							className="fas fa-edit"
						></i>
					) : (
						<i
							style={{fontSize: 14, color: "blue"}}
							className="fas fa-save"
						></i>
					)}
				</Button>

				<Button
					size="sm"
					variant="outline-primary"
					style={{borderColor: "green", cusor: "pointer"}}
				>
					<Link
						to={{
							pathname: "/admin/report/new-weekly-report",
							state: {...row.original, add: true},
						}}
					>
						<i
							style={{fontSize: 14, color: "green"}}
							className="fas fa-plus"
						></i>
					</Link>
				</Button>
			</div>
		),
	},
];

export const DetailReportColumns = [
	{
		Header: "No",
		accessor: "no",
	},
	{
		Header: "Task Name",
		accessor: "taskName",
	},
	{
		Header: "Skill",
		accessor: "skill",
	},
	{
		Header: "Pic",
		columns: [
			{
				Header: "Trainer",
				accessor: "trainer",
			},
			{
				Header: "Admin",
				accessor: "admin",
			},
		],
	},
	{
		Header: "Status",
		accessor: "status",
		Cell: () => {
			return <span className="status">Progress</span>;
		},
	},
	{
		Header: "Fsu",
		accessor: "fsu",
	},
	{
		Header: "Plan",
		columns: [
			{
				Header: "START DATE",
				accessor: "startDate",
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
			{
				Header: "END DATE",
				accessor: "endDate",
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
		],
	},
	{
		Header: "Ob",
		accessor: "ob",
	},
	{
		Header: "ACTUAL",
		columns: [
			{
				Header: "FAIL",
				accessor: "fail",
			},
			{
				Header: "DROP OUT",
				accessor: "dropOut",
			},
			{
				Header: "CONTRACT TRANSFER DATE",
				accessor: "changeContact",
			},
			{
				Header: "STUDYING",
				accessor: "studying",
			},
		],
	},
	{
		Header: "UPDATE",
		columns: [
			{
				Header: "Pic",
				accessor: "updateBy",
			},
			{
				Header: "DATE UPDATE",
				accessor: "updateAt",
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
		],
	},
	{
		Header: "Note",
		accessor: "note",
	},
];
