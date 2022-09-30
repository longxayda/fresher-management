import React, {useEffect, useMemo, useState} from "react";
import {Button, Dropdown, Form, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from "react-table";
import {
	getDetailReportList,
	getNewReportItem,
	getClassNameInfoList,
	getClassNameList,
} from "redux/selectors";
import {v4 as uuidv4} from "uuid";
import {fetchClassNameList} from "./addNewReportTableSlice";
import {AddNewReportColumns} from "./Columns";
import {fetchDetailReportList} from "./detailReportTableSlice";
import "./Table.scss";
import {AddNewReportModal} from "components/ReportModal/ReportModal";
import {GlobalFilter} from "components/Search";

import {IndeterminateCheckbox} from "components/validation/Validation";
import {EditReportModal} from "components/ReportModal/ReportModal";

import {deleteReportList} from "./reportListTableSlice";
import {getModal} from "redux/selectors";
import {useLocation} from "react-router";
import {getClassNameInfoItem} from "redux/selectors";

function AddNewReportTable() {
	const columns = useMemo(() => AddNewReportColumns, []);
	const [modalEdit, setModalEdit] = useState(false);
	const [recordItemEdit, setRecordItemEdit] = useState({});
	const classNameInfoList = useSelector(getClassNameInfoList);
	const [data, setData] = useState([]);
	const classNameInfoItem = useSelector(getClassNameInfoItem);
	const [no, setNo] = useState(1);
	const showModal = useSelector(getModal);
	const dispatch = useDispatch();
	const location = useLocation();

	const tableInstanse = useTable(
		{columns, data, initialState: {pageIndex: 0}},
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
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						),
						Cell: ({row}) => (
							<div className="actions">
								<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
								<Button
									size="sm"
									variant="outline-success"
									onClick={() => {
										setModalEdit(true);
										setRecordItemEdit(row);
									}}
									style={{borderColor: "green", cusor: "pointer"}}
								>
									<i
										style={{fontSize: 14, color: "green"}}
										className="fas fa-edit"
									></i>
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
		page,
		rows,
		state,
		nextPage,
		pageOptions,
		canNextPage,
		canPreviousPage,
		gotoPage,
		pageCount,
		setPageSize,
		previousPage,
		prepareRow,
		selectedFlatRows,
		allColumns,
		getToggleHideAllColumnsProps,
		setGlobalFilter,
	} = tableInstanse;
	const {globalFilter, pageIndex, pageSize} = state;

	useEffect(() => {
		if (selectedFlatRows) {
			let res = selectedFlatRows.map((row) => row.original);
			dispatch(deleteReportList(res));
		}
	}, [selectedFlatRows]);
	console.log(classNameInfoList);
	useEffect(() => {
		setData(classNameInfoList);
	}, [classNameInfoList]);
	return (
		<div className="weeklyTable">
			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			<Dropdown>
				<Dropdown.Toggle className="btn-fill" id="dropdown-basic">
					Hide Columns
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<div style={{paddingLeft: 16}}>
						<IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
						Toggle All
					</div>
					{allColumns.map((column) => {
						if (column.id !== "selection") {
							return (
								<Dropdown.Item key={uuidv4()}>
									<input type="checkbox" {...column.getToggleHiddenProps()} />
									{column.Header}
								</Dropdown.Item>
							);
						}
					})}
				</Dropdown.Menu>
			</Dropdown>
			<Table className="table-hover table-striped" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr key={uuidv4()} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									key={uuidv4()}
									{...column.getHeaderProps(column.getSortByToggleProps())}
								>
									{column.render("Header")}
									<span>
										{column.isSorted ? (
											column.isSortedDesc ? (
												<span>
													<i className="fas fa-sort-amount-up"></i>
												</span>
											) : (
												<span>
													<i className="fas fa-sort-amount-up-alt"></i>
												</span>
											)
										) : (
											""
										)}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr key={uuidv4()} {...row.getRowProps}>
								{row.cells.map((cell) => {
									return (
										<td key={uuidv4()} {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>

			{showModal && classNameInfoItem?.classId && (
				<AddNewReportModal no={no} setNo={setNo} />
			)}

			{modalEdit && (
				<EditReportModal
					data={data}
					setData={setData}
					modalEdit={modalEdit}
					setModalEdit={setModalEdit}
					recordItemEdit={recordItemEdit}
				/>
			)}
			<div className="paginate">
				<span>
					Page
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>
				</span>
				<span>
					| Go to page:
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const pageNumber = e.target.value
								? Number(e.target.value) - 1
								: 0;
							gotoPage(pageNumber);
						}}
						style={{width: 50}}
					/>
				</span>
				<select
					style={{height: 30}}
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
				>
					{[5, 10, 15, 20].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
				<div className="groupBtn">
					<Button
						size="sm"
						className="btn btn-fill"
						variant="primary"
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
					>
						<i className="fas fa-angle-double-left"></i>
					</Button>
					<Button
						style={{marginRight: "5px"}}
						size="sm"
						className="btn btn-fill"
						variant="primary"
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						<i className="fas fa-angle-left"></i>
					</Button>

					<Button
						size="sm"
						className="btn btn-fill"
						variant="primary"
						onClick={() => nextPage()}
						disabled={!canNextPage}
					>
						<i className="fas fa-chevron-right"></i>
					</Button>
					<Button
						size="sm"
						className="btn btn-fill"
						variant="primary"
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						<i className="fas fa-angle-double-right"></i>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AddNewReportTable;
