import {ToggleModal} from "components/ReportModal/reportModalSlice";
import {Search} from "components/Search";
import {fetchClassNameInfoItem} from "components/WeeklyReportTables/addNewReportTableSlice";
import {destroyReportList} from "components/WeeklyReportTables/reportListTableSlice";
import useDeleteReport from "hook/useDeteleReport";
import {v4 as uuidv4} from "uuid";
import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getDeleteList} from "redux/selectors";
import {fetchClassNameList} from "components/WeeklyReportTables/addNewReportTableSlice";
import {getClassNameList} from "redux/selectors";
import {getModal} from "redux/selectors";
import {destroyDetailReportList} from "components/WeeklyReportTables/detailReportTableSlice";
import {getDeleteDetailList} from "redux/selectors";
import {useLocation} from "react-router";
import {getDetailReportList} from "redux/selectors";
import "./index.scss";
import {deleteClassName} from "components/WeeklyReportTables/addNewReportTableSlice";
function ReportHeader() {
	const dispatch = useDispatch();
	const [classNameList, setClassNameList] = useState([]);
	const classItems = useSelector(getClassNameList);
	const deleteList = useSelector(getDeleteList);
	const deleteDetailList = useSelector(getDeleteDetailList);
	const detailReportList = useSelector(getDetailReportList);
	const location = useLocation();
	const showModal = useSelector(getModal);
	console.log(deleteList);
	const handleDeleteReport = async () => {
		try {
			let value = [];
			deleteList.forEach((item) => {
				value.push(Number(item.id));
			});
			dispatch(destroyReportList(value));
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteDetailReport = async () => {
		try {
			let value = [];
			deleteDetailList.forEach((item) => {
				value.push(Number(item.id));
			});
			dispatch(destroyDetailReportList(value));
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteClassesName = () => {
		let listId = [];
		deleteList.forEach((item) => {
			listId.push(Number(item.classId));
		});
		dispatch(deleteClassName(listId));
	};

	const {handleDelete} = useDeleteReport(
		handleDeleteReport,
		handleDeleteDetailReport,
		handleDeleteClassesName
	);

	const handleSelectClassName = async (e) => {
		let classId = Number(e.target.value);
		dispatch(ToggleModal(true));
		dispatch(fetchClassNameInfoItem(classId));
	};

	useEffect(() => {
		dispatch(fetchClassNameList());
	}, []);
	useEffect(() => {
		if (classItems) {
			if (location?.state?.add) {
				let classList = [];
				detailReportList.forEach((item) => {
					classList.push(item.taskName);
				});
				setClassNameList(
					classItems.filter((item) => !classList.includes(item.taskName))
				);
			} else {
				setClassNameList(classItems);
			}
		}
	}, [classItems]);
	return (
		<div className="wrapHeader">
			<div className="headerLeft">
				<Button
					className="btn-fill btnDel"
					onClick={handleDelete}
					variant="danger"
				>
					<span>
						<i className="far fa-trash-alt"></i>
					</span>
					<span>Delete {deleteList.length || deleteDetailList.length}</span>
				</Button>
				{location?.state?.new || location?.state?.add ? (
					<Form.Select className="selectClass" onChange={handleSelectClassName}>
						<option defaultValue={!showModal}>Select menu</option>
						{classNameList?.map((item) => (
							<option key={uuidv4()} value={item.classId}>
								{item.classname}
							</option>
						))}
					</Form.Select>
				) : null}
				{location?.state?.new ||
				location?.state?.add ||
				location?.state?.detail ? null : (
					<Button
						className="btn-fill "
						variant="primary"
						onClick={() => dispatch(ToggleModal(true))}
					>
						<span>
							<i className="fas fa-plus"></i>
						</span>
						<span>Create New Report</span>
					</Button>
				)}
			</div>
			<div className="headerRight">
				{location?.state?.new || location?.state?.add ? null : <Search />}
			</div>
		</div>
	);
}

export default ReportHeader;
