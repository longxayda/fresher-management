import React, {useMemo, useState} from "react";
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useSortBy,
	useFilters,
	useRowSelect,
} from "react-table";
import {useEffect, useRef} from "react";
import {Table, Input, Label} from "reactstrap";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import {getDetailFresherReport} from "redux/selectors";
import {useLocation} from "react-router";
import {MyCheckbox} from "components/validation/Validation";
import Swal from "sweetalert2";
import {formatDate} from "utils";
import {
	deleteDetailFresherReport,
	fetchDetailFresherReport,
	searchDetailFresherReport,
	updateDetailFresherReport,
} from "./detailFresherReportSlice";
import Pagination from "components/pagination/Pagination";
import {getNumPageFresher} from "redux/selectors";

const EditableCell = ({
	value: initialValue,
	row: {index},
	column: {id},
	updateMyData,
	editableRowIndex,
}) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		updateMyData(index, id, value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);
	return index === editableRowIndex ? (
		<input value={value} onChange={onChange} onBlur={onBlur} />
	) : (
		<p>{value}</p>
	);
};

const defaultColumn = {
	Cell: EditableCell,
};
function WrapTable({columns, setData, data}) {
	const [editableRowIndex, setEditableRowIndex] = useState(null);
	const updateMyData = (rowIndex, columnId, value) => {
		setData((old) =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			})
		);
	};
	const handleUpdateItem = (value) => {
		dispatch(updateDetailFresherReport(value));
	};
	const props = useTable(
		{
			columns,
			data,
			defaultColumn,
			updateMyData,
			editableRowIndex,
			setEditableRowIndex,
			handleUpdateItem,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					{
						id: "selection",
						Header: ({getToggleAllRowsSelectedProps}) => (
							<MyCheckbox {...getToggleAllRowsSelectedProps()} />
						),
						Cell: ({
							row,
							setEditableRowIndex,
							editableRowIndex,
							handleUpdateItem,
							handleAddNewReportItem,
						}) => (
							<div className="actions">
								<MyCheckbox {...row.getToggleRowSelectedProps()} />
								<Button
									size="sm"
									variant="outline-success"
									style={{borderColor: "green", cusor: "pointer"}}
									onClick={() => {
										const currentIndex = row.index;
										if (editableRowIndex !== currentIndex) {
											setEditableRowIndex(currentIndex);
										} else {
											setEditableRowIndex(null);

											const updatedRow = row.original;
											handleUpdateItem(updatedRow);
										}
									}}
								>
									{editableRowIndex !== row.index ? (
										<i
											style={{fontSize: 14, color: "green"}}
											className="fas fa-edit"
										></i>
									) : (
										<i
											style={{fontSize: 14, color: "green"}}
											className="fas fa-save"
										></i>
									)}
								</Button>
							</div>
						),
					},
					...columns,
				];
			});
		}
	);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		state,
		page,
		canPreviousPage,
		canNextPage,
		selectedFlatRows,
		setPageSize,
		state: {pageSize, globalFilter},
	} = props;
	const [deleteFreshers, setDeleteFreshers] = useState();
	const dispatch = useDispatch();
	const location = useLocation();
	const numPageList = useSelector(getNumPageFresher);
	const handleDeleteFreshers = () => {
		if (deleteFreshers.length <= 0) {
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
					const value = [];
					deleteFreshers.forEach((item) => {
						value.push(item.id);
					});
					dispatch(deleteDetailFresherReport(value));
				}
			});
		}
	};
	const handleInputChange = (e) => {
		const value = e.target.value;
		dispatch(searchDetailFresherReport({outputId: location?.state?.id, value}));
	};

	const [pageIndex, setPageIndex] = useState(0);
	const handleNextPage = () => {
		dispatch(
			fetchDetailFresherReport({
				id: location?.state?.id,
				page: Number(pageIndex + 1),
				num: pageSize,
			})
		);
		setPageIndex((prev) => prev + 1);
	};
	const handlePreviousPage = () => {
		dispatch(
			fetchDetailFresherReport({
				id: location?.state?.id,
				page: Number(pageIndex - 1),
				num: pageSize,
			})
		);
		setPageIndex((prev) => prev - 1);
	};
	const handleGotoNextPage = () => {
		dispatch(
			fetchDetailFresherReport({
				id: location?.state?.id,
				page: Number(numPageList - 1),
				num: pageSize,
			})
		);
		setPageIndex(Number(numPageList - 1));
	};
	const handleGotoPreviousPage = () => {
		dispatch(
			fetchDetailFresherReport({
				id: location?.state?.id,
				page: 0,
				num: pageSize,
			})
		);
		setPageIndex(0);
	};
	const handleShowPageSize = (num) => {
		setPageSize(num);
		dispatch(
			fetchDetailFresherReport({
				id: location?.state?.id,
				page: pageIndex,
				num: num,
			})
		);
	};
	const handleGoToPage = (pageIdex) => {
		if (pageIdex <= numPageList && pageIdex !== 0) {
			dispatch(
				fetchDetailFresherReport({
					id: location?.state?.id,
					page: Number(pageIdex - 1),
					num: pageSize,
				})
			);
			setPageIndex(Number(pageIdex - 1));
		} else {
			return;
		}
	};
	useEffect(() => {
		let res = selectedFlatRows.map((row) => row.original);
		setDeleteFreshers(res);
	}, [selectedFlatRows]);
	return (
		<div className="d-flex flex-row align-items-center justify-content-between pb-3">
			<div className="d-flex flex-row align-items-center justify-content-between pb-3">
				<div className="mr-3 d-flex align-items-center">
					<Label className="mb-0 searchLabel">Search: </Label>
					<Input
						className="searchBox"
						placeholder="..."
						type="search"
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<Button
						variant="danger"
						type="button"
						className="deleteBtn btn-fill"
						onClick={handleDeleteFreshers}
					>
						<i className="fas fa-trash-alt"></i>
						<span>DELETE</span> {deleteFreshers?.length}
					</Button>
				</div>
			</div>
			<style>{`td,tr,th{text-align: center;}`}</style>
			<pre className="chorma">
				<Table bordered striped hover {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										<div
											className="heading"
											style={{
												fontFamily: "Arial",
												fontSize: "15px",
												fontWeight: "500",
												display: "flex",
												justifyContent: "center",
												textAlign: "center",
												width: "100%",
											}}
										>
											{column.render("Header")}
										</div>
										<div>
											{column.canFilter ? column.render("Filter") : null}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</Table>
			</pre>
			<Pagination
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				numPageList={numPageList}
				handleGotoNextPage={handleGotoNextPage}
				handleGotoPreviousPage={handleGotoPreviousPage}
				handleGoToPage={handleGoToPage}
				pageIndex={pageIndex}
				pageSize={pageSize}
				setPageSize={setPageSize}
				canNextPage={canNextPage}
				canPreviousPage={canPreviousPage}
				handleShowPageSize={handleShowPageSize}
			/>
		</div>
	);
}

export default function DetailFresherReport() {
	const detailFresherReport = useSelector(getDetailFresherReport);

	const location = useLocation();
	const dispatch = useDispatch();
	const [data, setData] = useState([]);

	useEffect(() => {
		if (location?.state?.id) {
			dispatch(
				fetchDetailFresherReport({id: location?.state?.id, page: 0, num: 10})
			);
		}
	}, [location?.state?.id]);
	useEffect(() => {
		setData(detailFresherReport);
	}, [detailFresherReport]);
	const columns = useMemo(
		() => [
			{
				Header: "No",
				accessor: "no",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "Class Code",
				accessor: "classCode",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "Class Type",
				accessor: "classType",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "Class Status",
				accessor: "classStatus",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "Skill",
				accessor: "skill",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "OB",
				accessor: "ob",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "Note",
				accessor: "note",
				disableFilters: true,
			},
			{
				Header: "Drop Out",
				accessor: "dropOut",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "Fail",
				accessor: "fail",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "TrainingInFA",
				accessor: "trainingInFA",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},

			{
				Header: "Start Date",
				accessor: "startDate",
				disableFilters: true,
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
			{
				Header: "Pass",
				accessor: "pass",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "End Date",
				accessor: "end_date",
				disableFilters: true,
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
			{
				Header: "FSU Booked",
				accessor: "fsuBooked",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},

			{
				Header: "Update By",
				accessor: "updateBy",
				disableFilters: true,
				Cell: ({value}) => {
					return value;
				},
			},
			{
				Header: "Update Date",
				accessor: "updateDate",
				disableFilters: true,
				Cell: ({value}) => {
					return formatDate(new Date(value), "dd/MM/yyyy");
				},
			},
		],
		[]
	);
	return (
		<>
			<WrapTable columns={columns} setData={setData} data={data} />
		</>
	);
}
